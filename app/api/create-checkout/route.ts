import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICES } from '@/lib/stripe';
import { sendCAPIEvent } from '@/lib/meta-capi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { priceType } = body;

    // Get base URL from origin header or environment variable
    const baseUrl = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Validate price type
    if (priceType !== 'early_bird' && priceType !== 'regular') {
      return NextResponse.json(
        { error: 'Invalid price type' },
        { status: 400 }
      );
    }

    const price = priceType === 'early_bird' ? PRICES.EARLY_BIRD : PRICES.REGULAR;
    const displayPrice = '€15';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Как да превърнеш AI в реален доход',
              description: 'Пълният наръчник за Prompt Engineering и бизнес стратегии',
              images: [`${baseUrl}/ebook-cover.png`],
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      customer_email: body.email || undefined,
      metadata: {
        priceType,
        displayPrice,
      },
      billing_address_collection: 'required',
      locale: 'bg',
    });

    // Send InitiateCheckout event to Meta CAPI (fire-and-forget)
    sendCAPIEvent({
      eventName: 'InitiateCheckout',
      email: body.email,
      value: price / 100,
      currency: 'EUR',
      sourceUrl: baseUrl,
      eventId: session.id,
      userAgent: req.headers.get('user-agent') || undefined,
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
    }).catch((err) => console.error('Meta CAPI InitiateCheckout error:', err));

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
