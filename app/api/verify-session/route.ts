import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`verify-session:${ip}`, 10, 60_000)) {
    return NextResponse.json({ valid: false, error: 'Too many requests' }, { status: 429 });
  }

  const sessionId = request.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { valid: false, error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      return NextResponse.json({
        valid: true,
        customerEmail: session.customer_details?.email,
        amountPaid: (session.amount_total || 0) / 100,
        currency: (session.currency || 'eur').toUpperCase(),
        sessionId: session.id,
        includesBonus: session.metadata?.includes_bonus === 'true',
      });
    }

    return NextResponse.json({
      valid: false,
      error: 'Payment not completed',
      status: session.payment_status,
    });
  } catch (error) {
    console.error('Error verifying session:', error);
    return NextResponse.json(
      { valid: false, error: 'Invalid session ID' },
      { status: 400 }
    );
  }
}
