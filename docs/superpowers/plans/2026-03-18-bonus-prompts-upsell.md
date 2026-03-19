# Bonus Prompts Upsell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "10 промпта за напреднали" as a free bonus PDF bundled with every ebook purchase for 72 hours, then sell it as a standalone €15 product and a €5 add-on to the €25 ebook (bundle = €30).

**Architecture:** A deadline env var (`NEXT_PUBLIC_BONUS_FREE_DEADLINE`) controls the free period globally. The Stripe checkout API handles 4 order types. The DB tracks `includes_bonus` on orders and `token_type` on download tokens, so the download API can serve the correct PDF. UI components read the deadline to show the right pricing before checkout.

**Tech Stack:** Next.js 16 App Router, Stripe (multi-line-item checkout), Supabase (schema migration), Resend (email), Tailwind CSS, Framer Motion.

---

## Pricing Logic Summary

| Period | Buy ebook | Buy bundle | Buy bonus alone |
|--------|-----------|-----------|----------------|
| Free period (≤72h) | €25 — bonus included FREE | N/A | N/A |
| After 72h | €25 — no bonus | €30 (book €25 + bonus €5) | €15 |

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `supabase/schema.sql` | Modify | Add migration: `includes_bonus` on orders, `token_type` on download_tokens |
| `lib/bonus.ts` | **Create** | Client-safe `isBonusFree()` helper (no server deps) — imported by UI components |
| `lib/stripe.ts` | Modify | New PRICES constants, `CheckoutType` union — server-only, NOT imported by client components |
| `app/api/create-checkout/route.ts` | Modify | Handle 4 checkout types, enforce pricing server-side |
| `lib/supabase.ts` | Modify | `createOrder` accepts `includesBonus`, `createDownloadToken` accepts `tokenType` |
| `app/api/webhooks/stripe/route.ts` | Modify | Create bonus token when `includes_bonus` metadata is true; pass token to email |
| `app/api/download/route.ts` | Modify | Serve correct PDF by `token_type`; update `session_id` branch to handle bonus |
| `lib/email.ts` | Modify | `sendPurchaseConfirmation` accepts optional `bonusDownloadToken`; two-button template |
| `lib/useCheckout.ts` | Modify | New `CheckoutType`, resolve correct type from deadline on client |
| `components/Hero.tsx` | Modify | Show €25, bonus badge during free period; bundle/ebook-only options after |
| `components/Pricing.tsx` | Modify | Show €25, bonus badge during free period; bundle/ebook-only options after |
| `components/StickyMobileCTA.tsx` | Modify | Update price from €15 → €25 |
| `app/bonus/page.tsx` | Create | Standalone €15 bonus purchase page (always accessible) |
| `.env.example` | Create | Document all env vars including new bonus vars |

---

## Task 1: Database Schema Migration

**Files:**
- Modify: `supabase/schema.sql`

Run the following SQL in the **Supabase SQL Editor** (not a migration file — this project has no migration runner):

- [ ] **Step 1: Add migration SQL to bottom of schema.sql**

Append to `supabase/schema.sql`:

```sql
-- Migration: Bonus prompts upsell
-- Add includes_bonus to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS includes_bonus BOOLEAN NOT NULL DEFAULT false;

-- Add token_type to download_tokens
ALTER TABLE download_tokens ADD COLUMN IF NOT EXISTS token_type TEXT NOT NULL DEFAULT 'ebook'
  CHECK (token_type IN ('ebook', 'bonus'));

-- Index for bonus token lookups
CREATE INDEX IF NOT EXISTS idx_download_tokens_type ON download_tokens(token_type);
```

- [ ] **Step 2: Run the migration in Supabase SQL Editor**

Copy the three statements above and execute them in your Supabase project's SQL Editor. Verify no errors.

- [ ] **Step 3: Verify columns exist**

In Supabase Table Editor, confirm:
- `orders` has column `includes_bonus` (boolean, default false)
- `download_tokens` has column `token_type` (text, default 'ebook')

---

## Task 2: Create `lib/bonus.ts` + Update `lib/stripe.ts`

**Files:**
- Create: `lib/bonus.ts`
- Modify: `lib/stripe.ts`

> **Why two files?** `lib/stripe.ts` imports the Stripe SDK and throws at module load if `STRIPE_SECRET_KEY` is missing — it is **server-only** and must never be bundled into client components. `isBonusFree()` only reads a `NEXT_PUBLIC_` env var and is safe for the browser. Keeping it in a separate file prevents the Stripe SDK from being included in the client bundle.

- [ ] **Step 1: Create `lib/bonus.ts`** (client-safe, no server deps)

```typescript
/**
 * Returns true while the 72-hour free bonus window is open.
 * Reads NEXT_PUBLIC_BONUS_FREE_DEADLINE (ISO date string).
 * Safe to import in both server and client ('use client') components.
 * If the env var is not set, defaults to true (bonus is free) — safe for launch.
 */
export function isBonusFree(): boolean {
  const deadline = process.env.NEXT_PUBLIC_BONUS_FREE_DEADLINE;
  if (!deadline) return true;
  return new Date() < new Date(deadline);
}

/** The 4 checkout types. Defined here so client components can use the type without importing lib/stripe.ts. */
export type CheckoutType =
  | 'ebook_with_free_bonus'  // Free period: book €25 + bonus €0
  | 'ebook_with_bonus'       // After free period: book €25 + bonus €5 = €30
  | 'ebook_only'             // After free period: book €25 only
  | 'bonus_only';            // Standalone bonus €15
```

- [ ] **Step 2: Replace `lib/stripe.ts` contents** (server-only — no `isBonusFree`, re-exports `CheckoutType` from `lib/bonus.ts`)

```typescript
import Stripe from 'stripe';
export type { CheckoutType } from '@/lib/bonus';
export { isBonusFree } from '@/lib/bonus';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

// All prices in cents
export const PRICES = {
  EBOOK: 2500,             // €25.00 — main book
  BONUS_FREE: 0,           // €0.00  — bonus during free period
  BONUS_ADDON: 500,        // €5.00  — bonus add-on after free period (25+5=30 bundle)
  BONUS_STANDALONE: 1500,  // €15.00 — bonus purchased alone
};
```

> **Important for client components:** Always import `isBonusFree` and `CheckoutType` from `@/lib/bonus`, not from `@/lib/stripe`. This applies to all client components and hooks including `lib/useCheckout.ts`.

- [ ] **Step 3: Verify build compiles**

```bash
npm run build 2>&1 | head -30
```

Expected: No TypeScript errors.

---

## Task 3: Update `app/api/create-checkout/route.ts`

**Files:**
- Modify: `app/api/create-checkout/route.ts`

- [ ] **Step 1: Replace the file contents**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRICES, CheckoutType, isBonusFree } from '@/lib/stripe';
import { sendCAPIEvent } from '@/lib/meta-capi';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkoutType, email }: { checkoutType: CheckoutType; email?: string } = body;

    const baseUrl =
      req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const bonusFree = isBonusFree();

    // Validate checkout type and enforce server-side business rules
    if (!['ebook_with_free_bonus', 'ebook_with_bonus', 'ebook_only', 'bonus_only'].includes(checkoutType)) {
      return NextResponse.json({ error: 'Invalid checkout type' }, { status: 400 });
    }

    // Prevent buying the free-bonus type after the deadline
    if (checkoutType === 'ebook_with_free_bonus' && !bonusFree) {
      return NextResponse.json(
        { error: 'Free bonus period has ended. Use ebook_with_bonus or ebook_only.' },
        { status: 400 }
      );
    }

    // Prevent buying bundle/standalone bonus before deadline ends (they don't exist yet)
    if ((checkoutType === 'ebook_with_bonus' || checkoutType === 'bonus_only') && bonusFree) {
      return NextResponse.json(
        { error: 'Paid bonus not available during free period.' },
        { status: 400 }
      );
    }

    const lineItems = buildLineItems(checkoutType, baseUrl);
    const totalCents = lineItems.reduce((sum, item) => sum + item.price_data.unit_amount, 0);
    const includesBonus =
      checkoutType === 'ebook_with_free_bonus' || checkoutType === 'bonus_only' || checkoutType === 'ebook_with_bonus';

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
    });

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
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 4: Update `lib/supabase.ts` — DB operations

**Files:**
- Modify: `lib/supabase.ts`

- [ ] **Step 1: Update `Order` interface**

Add `includes_bonus` field:

```typescript
export interface Order {
  id: string;
  email: string;
  stripe_session_id: string;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'completed';
  includes_bonus: boolean;
  created_at: string;
}
```

- [ ] **Step 2: Update `DownloadToken` interface**

Add `token_type` field:

```typescript
export interface DownloadToken {
  id: string;
  order_id: string;
  token: string;
  token_type: 'ebook' | 'bonus';
  download_count: number;
  max_downloads: number;
  expires_at: string;
  created_at: string;
}
```

- [ ] **Step 3: Update `createOrder` to accept `includesBonus`**

Replace the `createOrder` function:

```typescript
export async function createOrder(data: {
  email: string;
  stripeSessionId: string;
  amountCents: number;
  currency: string;
  includesBonus?: boolean;
}): Promise<Order | null> {
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .insert({
      email: data.email,
      stripe_session_id: data.stripeSessionId,
      amount_cents: data.amountCents,
      currency: data.currency,
      status: 'completed',
      includes_bonus: data.includesBonus ?? false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }

  return order;
}
```

- [ ] **Step 4: Update `createDownloadToken` to accept `tokenType`**

Replace the `createDownloadToken` function:

```typescript
export async function createDownloadToken(
  orderId: string,
  tokenType: 'ebook' | 'bonus' = 'ebook'
): Promise<string | null> {
  const token = generateSecureToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 72);

  const { error } = await supabaseAdmin
    .from('download_tokens')
    .insert({
      order_id: orderId,
      token,
      token_type: tokenType,
      max_downloads: 5,
      expires_at: expiresAt.toISOString(),
    });

  if (error) {
    console.error('Error creating download token:', error);
    return null;
  }

  return token;
}
```

- [ ] **Step 5: Update `validateDownloadToken` return type to include `tokenType`**

```typescript
export async function validateDownloadToken(token: string): Promise<{
  valid: boolean;
  orderId?: string;
  tokenType?: 'ebook' | 'bonus';
  error?: string;
}> {
  const { data, error } = await supabaseAdmin
    .from('download_tokens')
    .select('*')
    .eq('token', token)
    .single();

  if (error || !data) {
    return { valid: false, error: 'Invalid token' };
  }

  if (new Date(data.expires_at) < new Date()) {
    return { valid: false, error: 'Token expired' };
  }

  if (data.download_count >= data.max_downloads) {
    return { valid: false, error: 'Download limit reached' };
  }

  await supabaseAdmin
    .from('download_tokens')
    .update({ download_count: data.download_count + 1 })
    .eq('id', data.id);

  return { valid: true, orderId: data.order_id, tokenType: data.token_type ?? 'ebook' };
}
```

- [ ] **Step 6: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 5: Update Stripe Webhook — create bonus token + update email call

**Files:**
- Modify: `app/api/webhooks/stripe/route.ts`

- [ ] **Step 1: Replace `handleCheckoutCompleted`**

```typescript
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Processing checkout.session.completed:', session.id);

  if (await orderExists(session.id)) {
    console.log('Order already exists for session:', session.id);
    return;
  }

  const customerEmail = session.customer_details?.email;
  if (!customerEmail) {
    console.error('No customer email in session');
    return;
  }

  const includesBonus = session.metadata?.includes_bonus === 'true';

  const order = await createOrder({
    email: customerEmail,
    stripeSessionId: session.id,
    amountCents: session.amount_total || 0,
    currency: session.currency || 'eur',
    includesBonus,
  });

  if (!order) {
    throw new Error('Failed to create order');
  }

  // Always create the ebook download token
  const ebookToken = await createDownloadToken(order.id, 'ebook');
  if (!ebookToken) {
    throw new Error('Failed to create ebook download token');
  }

  // Create bonus token if order includes bonus
  let bonusToken: string | null = null;
  if (includesBonus) {
    bonusToken = await createDownloadToken(order.id, 'bonus');
    if (!bonusToken) {
      console.error('Failed to create bonus download token — order still valid');
      // Don't throw: ebook token exists, order is valid. Bonus can be retried manually.
    }
  }

  const amount = formatAmount(session.amount_total || 0, session.currency || 'eur');

  const emailSent = await sendPurchaseConfirmation({
    to: customerEmail,
    downloadToken: ebookToken,
    bonusDownloadToken: bonusToken ?? undefined,
    orderAmount: amount,
  });

  if (!emailSent) {
    console.error('Failed to send confirmation email to:', customerEmail);
  }

  sendCAPIEvent({
    eventName: 'Purchase',
    email: customerEmail,
    value: (session.amount_total || 0) / 100,
    currency: (session.currency || 'eur').toUpperCase(),
    eventId: session.id,
  }).catch((err) => console.error('Meta CAPI Purchase error:', err));

  console.log('Successfully processed order:', order.id);
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 6: Update `lib/email.ts` — two download buttons

**Files:**
- Modify: `lib/email.ts`

- [ ] **Step 1: Update `SendPurchaseEmailParams` interface**

```typescript
interface SendPurchaseEmailParams {
  to: string;
  downloadToken: string;
  bonusDownloadToken?: string;
  orderAmount: string;
}
```

- [ ] **Step 2: Update `sendPurchaseConfirmation` to pass bonus URL to template**

```typescript
export async function sendPurchaseConfirmation({
  to,
  downloadToken,
  bonusDownloadToken,
  orderAmount,
}: SendPurchaseEmailParams): Promise<boolean> {
  const downloadUrl = `${BASE_URL}/api/download?token=${downloadToken}`;
  const bonusUrl = bonusDownloadToken
    ? `${BASE_URL}/api/download?token=${bonusDownloadToken}`
    : null;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Вашето съдържание е готово за изтегляне! 📚',
      html: getPurchaseEmailTemplate(downloadUrl, orderAmount, bonusUrl),
    });

    if (error) {
      console.error('Error sending email:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Failed to send email:', err);
    return false;
  }
}
```

- [ ] **Step 3: Update `getPurchaseEmailTemplate` to accept and render optional bonus button**

Replace the function signature and add the bonus download block after the ebook button:

```typescript
function getPurchaseEmailTemplate(
  downloadUrl: string,
  amount: string,
  bonusUrl: string | null
): string {
```

Inside the template, after the ebook download button table, add this block conditionally. Insert after the `<!-- Download Button -->` table closing `</table>` tag:

```html
${bonusUrl ? `
<!-- Bonus Download Button -->
<table width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0;">
  <tr>
    <td align="center">
      <a href="${bonusUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-size: 16px; font-weight: bold;">
        🎁 Изтегли Бонус: 10 Промпта за Напреднали
      </a>
    </td>
  </tr>
</table>
<p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 20px 0;">
  Безплатен бонус към твоята поръчка
</p>
` : ''}
```

Also update the "Какво следва?" list to mention the bonus when present:

```html
<ul style="color: #374151; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
  <li>Изтегли PDF файла на книгата</li>
  ${bonusUrl ? '<li>Изтегли бонус PDF — 10 Промпта за Напреднали</li>' : ''}
  <li>Запази ги на удобно място</li>
  <li>Започни да учиш и прилагай веднага!</li>
</ul>
```

- [ ] **Step 4: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 7: Update `app/api/download/route.ts` — serve correct PDF by token type

**Files:**
- Modify: `app/api/download/route.ts`

- [ ] **Step 1: Add bonus file constants at the top**

```typescript
// Bonus prompts PDF
const BONUS_FILENAME_ASCII = 'Bonus-10-Prompts.pdf';
const BONUS_FILENAME_UTF8 = '10-Промпта-за-Напреднали.pdf';
const BONUS_STORAGE_FILE_PATH = process.env.BONUS_PDF_FILE_PATH || 'bonus-prompts.pdf';
```

- [ ] **Step 2: Update the `session_id` branch (lines 16–104) to use `createDownloadToken` and handle bonus**

The current `session_id` branch creates tokens inline with an insecure `Math.random()` generator and doesn't know about bonus tokens. Replace the entire `if (sessionId && !token)` block with:

```typescript
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
          if (includesBonus) {
            await createDownloadToken(newOrder.id, 'bonus');
          }
          if (ebookToken) {
            return NextResponse.redirect(new URL(`/api/download?token=${ebookToken}`, request.url));
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

  // Order exists — find ebook token or create one
  const { data: existingToken } = await supabaseAdmin
    .from('download_tokens')
    .select('token')
    .eq('order_id', order.id)
    .eq('token_type', 'ebook')
    .single();

  if (existingToken) {
    return NextResponse.redirect(new URL(`/api/download?token=${existingToken.token}`, request.url));
  }

  // Create missing ebook token (idempotency fallback)
  const { createDownloadToken } = await import('@/lib/supabase');
  const newToken = await createDownloadToken(order.id, 'ebook');
  if (order.includes_bonus) {
    await createDownloadToken(order.id, 'bonus');
  }
  if (newToken) {
    return NextResponse.redirect(new URL(`/api/download?token=${newToken}`, request.url));
  }

  return NextResponse.redirect(
    new URL(`/download-error?message=${encodeURIComponent('Грешка при генерирането на токен.')}`, request.url)
  );
}
```

- [ ] **Step 3: Update the token validation branch to use `tokenType`**

After the `validateDownloadToken` call, replace the storage download block:

```typescript
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
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 8: Update `lib/useCheckout.ts` — new checkout types

**Files:**
- Modify: `lib/useCheckout.ts`

- [ ] **Step 1: Replace the file contents**

```typescript
'use client';

import { useState } from 'react';
import { trackInitiateCheckout, trackLead } from '@/lib/meta-pixel';
import type { CheckoutType } from '@/lib/bonus';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiateCheckout = async (checkoutType: CheckoutType, email?: string) => {
    setLoading(true);
    setError(null);
    trackLead();

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkoutType, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Грешка при създаване на поръчката');
      }

      trackInitiateCheckout(data.sessionId);

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Нещо се обърка. Моля, опитайте отново.');
      setLoading(false);
    }
  };

  return { initiateCheckout, loading, error };
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 9: Update UI Components

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Pricing.tsx`
- Modify: `components/StickyMobileCTA.tsx`

### 9a — Hero.tsx

- [ ] **Step 1: Add `isBonusFree` import and resolve checkout type**

At the top of `Hero.tsx`, add:

```typescript
import { isBonusFree } from '@/lib/bonus';
```

Replace the `handleBuyNow` function:

```typescript
const bonusFree = isBonusFree();

const handleBuyNow = () => {
  trackAddToCart();
  initiateCheckout(bonusFree ? 'ebook_with_free_bonus' : 'ebook_only');
};

const handleBuyBundle = () => {
  trackAddToCart();
  initiateCheckout('ebook_with_bonus');
};
```

- [ ] **Step 2: Update the Hero pricing card**

Replace the pricing display block (currently shows `€15` and "Early Bird") with:

```tsx
{/* Pricing display */}
<div className="mb-4 text-center">
  <div className="flex items-center justify-center gap-2 mb-1">
    <span className="text-4xl font-bold text-white">€25</span>
    {bonusFree && (
      <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full">
        + БОНУС БЕЗПЛАТНО
      </span>
    )}
  </div>
  {!bonusFree && (
    <p className="text-gray-500 text-xs mb-1">Или €30 с бонус промптовете</p>
  )}
  <div className="inline-block bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full">
    Еднократно плащане • Без абонамент
  </div>
</div>

{/* Bonus badge during free period */}
{bonusFree && (
  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-center">
    <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-1">🎁 Включен безплатен бонус</p>
    <p className="text-white text-sm font-semibold">10 Промпта за Напреднали</p>
    <p className="text-gray-400 text-xs">PDF на стойност €15 — безплатно с книгата</p>
  </div>
)}
```

- [ ] **Step 3: Update the CTA button(s)**

During free period: single button "ВЗЕМИ НАРЪЧНИКА + БОНУС ЗА €25"
After free period: two buttons — bundle €30 and ebook-only €25

```tsx
{/* CTA Button(s) */}
{bonusFree ? (
  <Button size="lg" fullWidth onClick={handleBuyNow} isLoading={loading}>
    ВЗЕМИ НАРЪЧНИКА + БОНУС ЗА €25
  </Button>
) : (
  <div className="space-y-2">
    <Button size="lg" fullWidth onClick={handleBuyBundle} isLoading={loading}>
      ВЗЕМИ ДВАТА PDF-А ЗА €30
    </Button>
    <button
      onClick={handleBuyNow}
      disabled={loading}
      className="w-full text-gray-400 text-sm underline hover:text-white transition-colors py-1"
    >
      Само книгата — €25
    </button>
  </div>
)}
```

- [ ] **Step 4: Add bonus to the key features list**

In the features array, add (only shown during free period or always visible as "included"):

```tsx
{bonusFree && (
  <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-green-400 font-medium">🎁 Бонус: 10 Промпта за Напреднали (PDF)</span>
  </div>
)}
```

### 9b — Pricing.tsx

- [ ] **Step 5: Replace `Pricing.tsx` with the following**

The existing `pricingPlan` const is removed since data is now dynamic based on `bonusFree`:

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from './Section';
import Card from './Card';
import Button from './Button';
import { useCheckout } from '@/lib/useCheckout';
import { trackAddToCart } from '@/lib/meta-pixel';
import { useIsMobile } from '@/lib/useIsMobile';
import { isBonusFree } from '@/lib/bonus';

const baseFeatures = [
  '12 глави практическо съдържание',
  'Формулата за силни AI промптове (5 стъпки)',
  '7 AI услуги без програмиране',
  'Готов 30-дневен план стъпка по стъпка',
  '4 стратегии за намиране на клиенти без реклама',
  'Как да създадеш първата си оферта с AI',
  '7 грешки, които да избегнеш от старта',
  'Написана изцяло за българския пазар',
  '50 персонализирани AI консултации (до 24 часа)',
  'Моментално получаване (PDF)',
  'Достъп от всички устройства',
];

export default function Pricing() {
  const { initiateCheckout, loading, error } = useCheckout();
  const isMobile = useIsMobile();
  const bonusFree = isBonusFree();

  const handleBuyNow = () => {
    trackAddToCart();
    initiateCheckout(bonusFree ? 'ebook_with_free_bonus' : 'ebook_only');
  };

  const handleBuyBundle = () => {
    trackAddToCart();
    initiateCheckout('ebook_with_bonus');
  };

  return (
    <Section
      id="pricing"
      background="dark"
      backgroundEffects={
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 right-0 h-[700px]" style={{ background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[600px]" style={{ background: 'linear-gradient(0deg, rgba(59, 130, 246, 0.18) 0%, rgba(6, 182, 212, 0.08) 50%, transparent 100%)' }} />
          <div className="absolute top-[10%] right-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 60%)', filter: 'blur(120px)' }} />
          <div className="absolute bottom-[10%] left-0 w-[550px] h-[550px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%)', filter: 'blur(120px)' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      }
    >
      {/* Book cover */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-12">
        <motion.div className="relative" style={{ filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.2))' }} animate={isMobile ? undefined : { y: [0, -15, 0], x: [0, 5, 0, -5, 0], rotate: [0, 1, 0, -1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <motion.div animate={isMobile ? undefined : { opacity: [0.3, 0.6, 0.3], scale: [1.08, 1, 1.08] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -inset-8 bg-gradient-to-tr from-blue/30 via-cyan/40 to-blue/30 rounded-2xl blur-3xl" />
          <motion.div animate={isMobile ? undefined : { opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="absolute -inset-4 bg-gradient-to-r from-cyan/30 via-blue/40 to-cyan/30 rounded-xl blur-2xl" />
          {!isMobile && (
            <motion.div className="absolute inset-0 rounded-xl overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }} />
            </motion.div>
          )}
          <Image src="/ebook-cover.webp" alt="AI Ebook Cover" width={400} height={600} sizes="(max-width: 768px) 280px, 350px" quality={90} className="relative z-10 max-w-[280px] md:max-w-[350px]" style={{ boxShadow: '0 0 30px rgba(34, 197, 230, 0.25), 0 0 60px rgba(59, 130, 246, 0.15)', mixBlendMode: 'lighten', filter: 'contrast(1.15) saturate(1.1)' }} />
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-heading">Вземи книгата сега</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">Инвестирай в себе си днес.</p>
      </motion.div>

      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <Card glass hover className="h-full relative transition-all duration-300 border-2 border-cyan shadow-2xl shadow-cyan/20">
            {/* Badge */}
            <div className="mb-6">
              <div className="inline-block bg-gradient-to-r from-cyan to-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                {bonusFree ? 'КНИГА + БОНУС ПРОМПТА' : 'НАРЪЧНИКЪТ ЗА AI ДОХОД'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                Как да превърнеш AI в реален доход
              </h3>
              <p className="text-gray-400 text-sm">
                {bonusFree ? 'Включва безплатен бонус PDF на стойност €15' : 'Пълният наръчник за Prompt Engineering'}
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-6">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-end gap-2 mb-1">
                <motion.span animate={isMobile ? undefined : { textShadow: ['0 0 10px rgba(34, 197, 230, 0)', '0 0 20px rgba(34, 197, 230, 0.4)', '0 0 10px rgba(34, 197, 230, 0)'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="text-5xl font-bold text-white">
                  €{bonusFree ? '25' : '25'}
                </motion.span>
                {bonusFree && (
                  <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full mb-2">+ БОНУС БЕЗПЛАТНО</span>
                )}
              </motion.div>
              {!bonusFree && <p className="text-gray-500 text-xs mb-2">Или €30 с бонус промптовете</p>}
            </div>

            {/* Bonus badge during free period */}
            {bonusFree && (
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-3 mb-6 text-center">
                <p className="text-green-400 text-xs font-bold uppercase tracking-wide mb-1">🎁 Включен безплатен бонус</p>
                <p className="text-white text-sm font-semibold">10 Промпта за Напреднали</p>
                <p className="text-gray-400 text-xs">PDF на стойност €15 — безплатно с книгата</p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-3 mb-8">
              {bonusFree && (
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.65, duration: 0.3 }} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-green-400 text-sm font-medium">🎁 Бонус: 10 Промпта за Напреднали (PDF)</span>
                </motion.div>
              )}
              {baseFeatures.map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 + idx * 0.05, duration: 0.3 }} className="flex items-start gap-3">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 + idx * 0.05 + 0.2, type: 'spring', stiffness: 400, damping: 15 }} className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan to-blue flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.7 + idx * 0.05 + 0.3, duration: 0.3, ease: 'easeOut' }} strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <motion.span className="text-gray-300 text-sm" whileHover={{ x: 3, color: '#ffffff' }} transition={{ duration: 0.2 }}>{feature}</motion.span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            {bonusFree ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className="relative overflow-hidden rounded-lg">
                <Button variant="primary" size="lg" fullWidth onClick={handleBuyNow} isLoading={loading} className="relative z-10">
                  ВЗЕМИ КНИГАТА + БОНУС ЗА €25
                </Button>
                {!loading && !isMobile && (
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" animate={{ x: ['-200%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }} />
                )}
              </motion.div>
            ) : (
              <div className="space-y-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }} className="relative overflow-hidden rounded-lg">
                  <Button variant="primary" size="lg" fullWidth onClick={handleBuyBundle} isLoading={loading} className="relative z-10">
                    ВЗЕМИ ДВАТА PDF-А ЗА €30
                  </Button>
                </motion.div>
                <button onClick={handleBuyNow} disabled={loading} className="w-full text-gray-400 text-sm underline hover:text-white transition-colors py-1">
                  Само книгата — €25
                </button>
              </div>
            )}

            <div className="mt-4 text-center text-xs text-gray-400">🔒 Сигурно плащане чрез Stripe</div>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 bg-red-500/10 border border-red-500/30 rounded-lg p-2 text-red-400 text-xs">
                {error}
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
```

### 9c — StickyMobileCTA.tsx

- [ ] **Step 6: Update StickyMobileCTA**

```typescript
import { isBonusFree } from '@/lib/bonus';

// Inside component:
const bonusFree = isBonusFree();

const handleClick = () => {
  trackAddToCart();
  initiateCheckout(bonusFree ? 'ebook_with_free_bonus' : 'ebook_only');
};

// Button text:
{bonusFree ? 'КУПИ ЗА €25 + БОНУС' : 'КУПИ ЗА €25'}
```

- [ ] **Step 7: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 10: Create Bonus Standalone Purchase Page

**Files:**
- Create: `app/bonus/page.tsx`

This page is always accessible at `/bonus`. It shows the bonus product details and a Stripe checkout for €15.

- [ ] **Step 1: Create `app/bonus/page.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import { useCheckout } from '@/lib/useCheckout';
import { isBonusFree } from '@/lib/bonus';
import { trackAddToCart } from '@/lib/meta-pixel';

const prompts = [
  'Prompt за бизнес яснота и стратегия',
  'Prompt за опростяване на текст и ясно послание',
  'Prompt за създаване на 5 рекламни ъгъла',
  'Prompt за откриване на слабости в оферта',
  'Prompt за имейл последователност за продажби',
  'Prompt за 10 социални поста от една идея',
  'Prompt за анализ на конкуренция и стратегия',
  'Prompt за проверка на убедителност на текст',
  'Prompt за превръщане на сложна идея в обучение',
  'Prompt за създаване на оферта и ценообразуване',
];

export default function BonusPage() {
  const { initiateCheckout, loading, error } = useCheckout();
  const bonusFree = isBonusFree();

  const handleBuy = () => {
    trackAddToCart();
    initiateCheckout('bonus_only');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-navy-darker via-navy-dark to-navy flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-cyan/20 p-8 shadow-2xl"
        >
          <div className="text-center mb-8">
            <span className="inline-block bg-gradient-to-r from-cyan to-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Самостоятелен продукт
            </span>
            <h1 className="text-3xl font-bold text-white mb-3 font-heading">
              10 Промпта за Напреднали
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              10 структурирани инструмента за работа с AI — за по-ясно мислене, по-силен маркетинг и по-добри бизнес решения.
            </p>
          </div>

          <div className="space-y-2 mb-8">
            {prompts.map((prompt, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-cyan to-blue flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">{prompt}</span>
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-white mb-1">€15</div>
            <p className="text-gray-500 text-xs">Еднократно плащане • PDF изтегляне</p>
          </div>

          {bonusFree ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center mb-4">
              <p className="text-green-400 text-sm font-semibold">
                🎁 Получи тези промпта БЕЗПЛАТНО когато купиш книгата!
              </p>
              <a
                href="/#pricing"
                className="inline-block mt-2 text-cyan text-sm underline hover:text-white transition-colors"
              >
                Виж офертата за книгата →
              </a>
            </div>
          ) : (
            <>
              <Button size="lg" fullWidth onClick={handleBuy} isLoading={loading}>
                КУПИ ЗА €15
              </Button>
              {error && (
                <p className="mt-2 text-red-400 text-xs text-center">{error}</p>
              )}
              <p className="mt-3 text-center text-xs text-gray-500">
                🔒 Сигурно плащане чрез Stripe
              </p>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | head -30
```

---

## Task 11: Environment Variables

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create `.env.example`**

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Resend email
RESEND_API_KEY=re_...
EMAIL_FROM=AI Ebook <noreply@bgpromptbook.shop>

# App
NEXT_PUBLIC_BASE_URL=https://bgpromptbook.shop

# Bonus prompts upsell
# ISO date string — while current time is BEFORE this deadline, bonus is free with ebook purchase.
# After this deadline, bonus becomes a standalone €15 product and a €5 add-on (€30 bundle).
# Example: set to 72 hours from your launch time.
NEXT_PUBLIC_BONUS_FREE_DEADLINE=2026-03-21T12:00:00Z

# Filename/path of bonus PDF inside the Supabase 'ebooks' storage bucket.
BONUS_PDF_FILE_PATH=bonus-prompts.pdf
```

- [ ] **Step 2: Set env vars in production**

In Vercel (or your hosting provider):
1. Add `NEXT_PUBLIC_BONUS_FREE_DEADLINE` — set to exactly 72 hours from now in ISO format
2. Add `BONUS_PDF_FILE_PATH=bonus-prompts.pdf`

- [ ] **Step 3: Upload bonus PDF to Supabase Storage**

1. Go to Supabase Dashboard → Storage → `ebooks` bucket
2. Upload `10 ПРОМПТА ЗА НАПРЕДНАЛИ.pdf` with the filename `bonus-prompts.pdf`
3. Confirm the file is in the same bucket as `ai-income-book.pdf`

---

## Task 12: Final Verification Checklist

- [ ] Run `npm run build` — zero errors
- [ ] Run `npm run lint` — zero warnings
- [ ] Test free-period checkout: `checkoutType: 'ebook_with_free_bonus'` → Stripe shows 2 line items (book €25, bonus €0)
- [ ] Test email: both download buttons appear when `bonusDownloadToken` is set
- [ ] Test `/api/download?token=<bonus_token>` → downloads `bonus-prompts.pdf`
- [ ] Test `/api/download?token=<ebook_token>` → downloads `ai-income-book.pdf`
- [ ] Test `/bonus` page during free period → shows "get it free with the book" message, no buy button
- [ ] Set deadline to past date, re-test `/bonus` page → shows €15 buy button
- [ ] Test after-deadline checkout: `ebook_with_bonus` → Stripe shows book €25 + bonus €5 = €30
- [ ] Test `ebook_only` → Stripe shows book €25 only
- [ ] Test `bonus_only` → Stripe shows bonus €15 only
- [ ] Verify server rejects `ebook_with_free_bonus` when deadline has passed (HTTP 400)
- [ ] Commit all changes

---

## Commit Sequence

```
feat: add includes_bonus and token_type to DB schema
feat: update stripe prices and add CheckoutType helpers
feat: update create-checkout to handle 4 checkout types
feat: update supabase ops for bonus token support
feat: update webhook to create bonus download token
feat: update email template with optional bonus download button
feat: update download API to serve correct PDF by token type
feat: update useCheckout for new CheckoutType
feat: update UI components for €25 price and bonus display
feat: add /bonus standalone purchase page
chore: add .env.example with bonus env vars
```
