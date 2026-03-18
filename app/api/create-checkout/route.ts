import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICES } from '@/lib/stripe';
import type { CheckoutType } from '@/lib/bonus';
import { isBonusFree } from '@/lib/bonus';
import { sendCAPIEvent } from '@/lib/meta-capi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkoutType, email }: { checkoutType: CheckoutType; email?: string } = body;

    const baseUrl =
      req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const bonusFree = isBonusFree();

    // Validate checkout type
    if (!['ebook_with_free_bonus', 'ebook_with_bonus', 'ebook_only', 'bonus_only'].includes(checkoutType)) {
      return NextResponse.json({ error: 'Invalid checkout type' }, { status: 400 });
    }

    // Prevent free-bonus type after deadline
    if (checkoutType === 'ebook_with_free_bonus' && !bonusFree) {
      return NextResponse.json(
        { error: 'Free bonus period has ended. Use ebook_with_bonus or ebook_only.' },
        { status: 400 }
      );
    }

    // Prevent paid bonus types during free period
    if ((checkoutType === 'ebook_with_bonus' || checkoutType === 'bonus_only') && bonusFree) {
      return NextResponse.json(
        { error: 'Paid bonus not available during free period.' },
        { status: 400 }
      );
    }

    const lineItems = buildLineItems(checkoutType, baseUrl);
    const totalCents = lineItems.reduce((sum, item) => sum + item.price_data.unit_amount, 0);
    const includesBonus =
      checkoutType === 'ebook_with_free_bonus' ||
      checkoutType === 'bonus_only' ||
      checkoutType === 'ebook_with_bonus';

    const session = await stripe.checkout.sessions.create({
      automatic_payment_methods: { enabled: true },
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      customer_email: email || undefined,
      metadata: {
        checkoutType,
        includes_bonus: includesBonus ? 'true' : 'false',
      },
      billing_address_collection: 'auto',
      locale: 'bg',
    } as any);

    // Fire Meta CAPI (fire-and-forget)
    sendCAPIEvent({
      eventName: 'InitiateCheckout',
      email,
      value: totalCents / 100,
      currency: 'EUR',
      sourceUrl: baseUrl,
      eventId: session.id,
      userAgent: req.headers.get('user-agent') || undefined,
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
    }).catch((err) => console.error('Meta CAPI InitiateCheckout error:', err));

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}

function buildLineItems(checkoutType: CheckoutType, baseUrl: string) {
  const ebookItem = {
    price_data: {
      currency: 'eur',
      product_data: {
        name: 'Как да превърнеш AI в реален доход',
        description: 'Пълният наръчник за Prompt Engineering и бизнес стратегии',
        images: [`${baseUrl}/ebook-cover.png`],
      },
      unit_amount: PRICES.EBOOK,
    },
    quantity: 1,
  };

  const bonusFreeItem = {
    price_data: {
      currency: 'eur',
      product_data: {
        name: '10 Промпта за Напреднали',
        description: 'Бонус PDF — 10 структурирани промпта за реален резултат',
      },
      unit_amount: PRICES.BONUS_FREE,
    },
    quantity: 1,
  };

  const bonusAddonItem = {
    price_data: {
      currency: 'eur',
      product_data: {
        name: '10 Промпта за Напреднали',
        description: 'Бонус PDF — 10 структурирани промпта за реален резултат',
      },
      unit_amount: PRICES.BONUS_ADDON,
    },
    quantity: 1,
  };

  const bonusStandaloneItem = {
    price_data: {
      currency: 'eur',
      product_data: {
        name: '10 Промпта за Напреднали',
        description: '10 структурирани промпта за работа с AI — бизнес стратегия, маркетинг, съдържание',
      },
      unit_amount: PRICES.BONUS_STANDALONE,
    },
    quantity: 1,
  };

  switch (checkoutType) {
    case 'ebook_with_free_bonus':
      return [ebookItem, bonusFreeItem];
    case 'ebook_with_bonus':
      return [ebookItem, bonusAddonItem];
    case 'ebook_only':
      return [ebookItem];
    case 'bonus_only':
      return [bonusStandaloneItem];
  }
}
