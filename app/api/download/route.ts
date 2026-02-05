import { NextRequest, NextResponse } from 'next/server';
import { validateDownloadToken, supabaseAdmin } from '@/lib/supabase';

// Ebook filename for download (ASCII fallback + UTF-8 encoded)
const EBOOK_FILENAME_ASCII = 'AI-Income-Book.pdf';
const EBOOK_FILENAME_UTF8 = 'Как-да-превърнеш-AI-в-реален-доход.pdf';
// Supabase Storage bucket and file path
const STORAGE_BUCKET = 'ebooks';
const STORAGE_FILE_PATH = 'ai-income-book.pdf';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  const sessionId = request.nextUrl.searchParams.get('session_id');

  // Handle download by session_id (from success page)
  if (sessionId && !token) {
    // Look up order by session_id and get/create token
    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('id')
      .eq('stripe_session_id', sessionId)
      .single();

    if (!order) {
      // Order doesn't exist yet - create it from Stripe session
      const stripe = (await import('@/lib/stripe')).stripe;
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
          // Create order
          const { data: newOrder } = await supabaseAdmin
            .from('orders')
            .insert({
              email: session.customer_details?.email || 'unknown@example.com',
              stripe_session_id: sessionId,
              amount_cents: session.amount_total || 0,
              currency: session.currency || 'eur',
              status: 'completed'
            })
            .select()
            .single();

          if (newOrder) {
            // Create download token
            const newToken = 'DL_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 72);

            await supabaseAdmin
              .from('download_tokens')
              .insert({
                order_id: newOrder.id,
                token: newToken,
                max_downloads: 5,
                expires_at: expiresAt.toISOString()
              });

            // Redirect to download with the new token
            return NextResponse.redirect(
              new URL(`/api/download?token=${newToken}`, request.url)
            );
          }
        }
      } catch (err) {
        console.error('Error retrieving Stripe session:', err);
      }

      return NextResponse.redirect(
        new URL(`/download-error?message=${encodeURIComponent('Плащането не е намерено. Моля, свържете се с поддръжката.')}`, request.url)
      );
    }

    // Order exists - find or create token
    const { data: existingToken } = await supabaseAdmin
      .from('download_tokens')
      .select('token')
      .eq('order_id', order.id)
      .single();

    if (existingToken) {
      return NextResponse.redirect(
        new URL(`/api/download?token=${existingToken.token}`, request.url)
      );
    }

    // Create new token for existing order
    const newToken = 'DL_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 72);

    await supabaseAdmin
      .from('download_tokens')
      .insert({
        order_id: order.id,
        token: newToken,
        max_downloads: 5,
        expires_at: expiresAt.toISOString()
      });

    return NextResponse.redirect(
      new URL(`/api/download?token=${newToken}`, request.url)
    );
  }

  if (!token) {
    return NextResponse.json(
      { error: 'Липсва токен за изтегляне' },
      { status: 400 }
    );
  }

  // Validate the download token
  const validation = await validateDownloadToken(token);

  if (!validation.valid) {
    // Redirect to error page with appropriate message
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

  // Stream file from Supabase Storage
  const { data, error } = await supabaseAdmin.storage
    .from(STORAGE_BUCKET)
    .download(STORAGE_FILE_PATH);

  if (error || !data) {
    console.error('Error downloading ebook from storage:', error);
    return NextResponse.redirect(
      new URL(`/download-error?message=${encodeURIComponent('Файлът не е намерен. Моля, свържете се с поддръжката.')}`, request.url)
    );
  }

  // Convert Blob to ArrayBuffer for streaming
  const arrayBuffer = await data.arrayBuffer();

  // Use RFC 5987 encoding for UTF-8 filename
  const encodedFilename = encodeURIComponent(EBOOK_FILENAME_UTF8).replace(/'/g, '%27');

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${EBOOK_FILENAME_ASCII}"; filename*=UTF-8''${encodedFilename}`,
      'Content-Length': arrayBuffer.byteLength.toString(),
    },
  });
}
