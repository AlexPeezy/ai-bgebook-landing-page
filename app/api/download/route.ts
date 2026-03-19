import { NextRequest, NextResponse } from 'next/server';
import { validateDownloadToken, supabaseAdmin } from '@/lib/supabase';

// Ebook filename for download (ASCII fallback + UTF-8 encoded)
const EBOOK_FILENAME_ASCII = 'AI-Income-Book.pdf';
const EBOOK_FILENAME_UTF8 = 'Как-да-превърнеш-AI-в-реален-доход.pdf';
// Supabase Storage bucket and file path
const STORAGE_BUCKET = 'ebooks';
const STORAGE_FILE_PATH = 'ai-income-book.pdf';

// Bonus prompts PDF
const BONUS_FILENAME_ASCII = 'Bonus-30-Prompts.pdf';
const BONUS_FILENAME_UTF8 = '30-Промпта-за-Напреднали.pdf';
const BONUS_STORAGE_FILE_PATH = process.env.BONUS_PDF_FILE_PATH || 'bonus-prompts.pdf';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const sessionId = request.nextUrl.searchParams.get('session_id');
  const typeParam = request.nextUrl.searchParams.get('type');
  const downloadType: 'ebook' | 'bonus' = typeParam === 'bonus' ? 'bonus' : 'ebook';

  // Handle download by session_id (from success page)
  if (sessionId && !token) {
    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('id, includes_bonus')
      .eq('stripe_session_id', sessionId)
      .single();

    if (!order) {
      // Order doesn't exist yet — retrieve from Stripe and create
      const stripe = (await import('@/lib/stripe')).stripe;
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
          const includesBonus = session.metadata?.includes_bonus === 'true';
          const { data: newOrder } = await supabaseAdmin
            .from('orders')
            .insert({
              email: session.customer_details?.email || 'unknown@example.com',
              stripe_session_id: sessionId,
              amount_cents: session.amount_total || 0,
              currency: session.currency || 'eur',
              status: 'completed',
              includes_bonus: includesBonus,
            })
            .select()
            .single();

          if (newOrder) {
            const { createDownloadToken } = await import('@/lib/supabase');
            const ebookToken = await createDownloadToken(newOrder.id, 'ebook');
            let bonusToken: string | null = null;
            if (includesBonus) {
              bonusToken = await createDownloadToken(newOrder.id, 'bonus');
            }
            const redirectToken = downloadType === 'bonus' && bonusToken ? bonusToken : ebookToken;
            if (redirectToken) {
              return NextResponse.redirect(new URL(`/api/download?token=${redirectToken}`, request.url));
            }
          }
        }
      } catch (err) {
        console.error('Error retrieving Stripe session:', err);
      }
      return NextResponse.redirect(
        new URL(`/download-error?message=${encodeURIComponent('Плащането не е намерено. Моля, свържете се с поддръжката.')}`, request.url)
      );
    }

    // Order exists — find token for the requested type
    const { data: existingToken } = await supabaseAdmin
      .from('download_tokens')
      .select('token')
      .eq('order_id', order.id)
      .eq('token_type', downloadType)
      .single();

    if (existingToken) {
      return NextResponse.redirect(new URL(`/api/download?token=${existingToken.token}`, request.url));
    }

    // Create missing token (idempotency fallback) — only create bonus if order includes it
    const { createDownloadToken } = await import('@/lib/supabase');
    if (downloadType === 'bonus' && !order.includes_bonus) {
      return NextResponse.redirect(
        new URL(`/download-error?message=${encodeURIComponent('Бонусът не е включен в тази поръчка.')}`, request.url)
      );
    }
    const newToken = await createDownloadToken(order.id, downloadType);
    if (newToken) {
      return NextResponse.redirect(new URL(`/api/download?token=${newToken}`, request.url));
    }

    return NextResponse.redirect(
      new URL(`/download-error?message=${encodeURIComponent('Грешка при генерирането на токен.')}`, request.url)
    );
  }

  if (!token) {
    return NextResponse.json(
      { error: 'Липсва токен за изтегляне' },
      { status: 400 }
    );
  }

  // Peek at token type WITHOUT consuming it, then verify the file exists
  const { data: tokenPeek } = await supabaseAdmin
    .from('download_tokens')
    .select('token_type')
    .eq('token', token)
    .single();

  if (tokenPeek) {
    const peekIsBonus = tokenPeek.token_type === 'bonus';
    const peekFilePath = peekIsBonus ? BONUS_STORAGE_FILE_PATH : STORAGE_FILE_PATH;
    const { error: fileCheckError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(peekFilePath, 5);
    if (fileCheckError) {
      console.error('File not found in storage:', peekFilePath, fileCheckError);
      return NextResponse.redirect(
        new URL(`/download-error?message=${encodeURIComponent('Файлът не е наличен. Моля, свържете се с поддръжката.')}`, request.url)
      );
    }
  }

  const validation = await validateDownloadToken(token);

  if (!validation.valid) {
    const errorMessages: Record<string, string> = {
      'Invalid token': 'Невалиден линк за изтегляне',
      'Token expired': 'Линкът е изтекъл. Моля, свържете се с поддръжката.',
      'Download limit reached': 'Достигнат е лимитът за изтегляния (5 пъти)',
    };
    const message = errorMessages[validation.error || ''] || 'Грешка при изтеглянето';
    return NextResponse.redirect(
      new URL(`/download-error?message=${encodeURIComponent(message)}`, request.url)
    );
  }

  // Select the correct file based on token type
  const isBonus = validation.tokenType === 'bonus';
  const filePath = isBonus ? BONUS_STORAGE_FILE_PATH : STORAGE_FILE_PATH;
  const filenameAscii = isBonus ? BONUS_FILENAME_ASCII : EBOOK_FILENAME_ASCII;
  const filenameUtf8 = isBonus ? BONUS_FILENAME_UTF8 : EBOOK_FILENAME_UTF8;

  const { data, error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .download(filePath);

  if (error || !data) {
    console.error('Error downloading file from storage:', error);
    return NextResponse.redirect(
      new URL(`/download-error?message=${encodeURIComponent('Файлът не е намерен. Моля, свържете се с поддръжката.')}`, request.url)
    );
  }

  const arrayBuffer = await data.arrayBuffer();
  const encodedFilename = encodeURIComponent(filenameUtf8).replace(/'/g, '%27');

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filenameAscii}"; filename*=UTF-8''${encodedFilename}`,
      'Content-Length': arrayBuffer.byteLength.toString(),
    },
  });
}
