import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createOrder, createDownloadToken, orderExists } from '@/lib/supabase';
import { sendPurchaseConfirmation, sendRefundConfirmation } from '@/lib/email';
import Stripe from 'stripe';

// Disable body parsing - Stripe needs raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object as Stripe.Charge);
        break;

      case 'charge.dispute.created':
        await handleDispute(event.data.object as Stripe.Dispute);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    // Return 500 so Stripe will retry
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.completed:', session.id);

  // Idempotency check - don't process same session twice
  if (await orderExists(session.id)) {
    console.log('Order already exists for session:', session.id);
    return;
  }

  const customerEmail = session.customer_details?.email;
  if (!customerEmail) {
    console.error('No customer email in session');
    return;
  }

  // Create order in database
  const order = await createOrder({
    email: customerEmail,
    stripeSessionId: session.id,
    amountCents: session.amount_total || 0,
    currency: session.currency || 'eur',
  });

  if (!order) {
    throw new Error('Failed to create order');
  }

  // Generate download token
  const downloadToken = await createDownloadToken(order.id);
  if (!downloadToken) {
    throw new Error('Failed to create download token');
  }

  // Format amount for email
  const amount = formatAmount(session.amount_total || 0, session.currency || 'eur');

  // Send purchase confirmation email
  const emailSent = await sendPurchaseConfirmation({
    to: customerEmail,
    downloadToken,
    orderAmount: amount,
  });

  if (!emailSent) {
    console.error('Failed to send confirmation email to:', customerEmail);
    // Don't throw - order is created, email can be resent manually
  }

  console.log('Successfully processed order:', order.id);
}

async function handleRefund(charge: Stripe.Charge) {
  console.log('Processing refund for charge:', charge.id);

  const customerEmail = charge.billing_details?.email || charge.receipt_email;
  if (!customerEmail) {
    console.error('No email for refund notification');
    return;
  }

  const amount = formatAmount(charge.amount_refunded, charge.currency);
  await sendRefundConfirmation(customerEmail, amount);

  console.log('Refund confirmation sent to:', customerEmail);
}

async function handleDispute(dispute: Stripe.Dispute) {
  console.log('DISPUTE CREATED:', dispute.id);
  console.log('Amount:', dispute.amount, dispute.currency);
  console.log('Reason:', dispute.reason);

  // In production: Send alert to admin, pause customer account, etc.
  // For now, just log it
}

function formatAmount(cents: number, currency: string): string {
  const amount = cents / 100;
  const formatter = new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  return formatter.format(amount);
}
