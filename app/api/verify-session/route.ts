import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(request: NextRequest) {
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
        amountPaid: session.amount_total,
        currency: session.currency,
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
