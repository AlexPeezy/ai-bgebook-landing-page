# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bulgarian AI ebook landing page with integrated Stripe payments, Supabase database, and Resend email delivery. The product is "Как да превърнеш AI в реален доход" (How to Turn AI into Real Income) - a prompt engineering and business strategies guide.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 (using @tailwindcss/postcss)
- Stripe for payments
- Supabase for order/token storage
- Resend for transactional emails
- Framer Motion for animations

## Architecture

### Purchase Flow

1. Landing page (`app/page.tsx`) displays Hero with pricing
2. `useCheckout` hook (client-side) triggers `/api/create-checkout` to create Stripe session
3. User completes payment on Stripe hosted checkout
4. Stripe webhook (`/api/webhooks/stripe`) handles:
   - `checkout.session.completed`: Creates order, generates download token, sends email
   - `charge.dispute.created`: Logs dispute for admin review
5. User downloads ebook via `/api/download?token=xxx`

### Pricing Logic

Two price tiers defined in `lib/stripe.ts`:
- Early bird: €14.99 (1499 cents)
- Regular: €24.99 (2499 cents)

Early bird deadline controlled by `NEXT_PUBLIC_EARLY_BIRD_DEADLINE` env var.

### Database Schema

Located in `supabase/schema.sql`. Two tables:
- `orders`: Stores completed purchases (email, stripe_session_id, amount, status)
- `download_tokens`: Time-limited tokens (72hr expiry, max 5 downloads)

### Key Files

- `lib/stripe.ts` - Stripe client and price constants
- `lib/supabase.ts` - Database operations (createOrder, createDownloadToken, validateDownloadToken)
- `lib/email.ts` - Email templates and sending via Resend
- `lib/useCheckout.ts` - Client-side checkout hook
- `lib/useCountdown.ts` - Countdown timer for early bird deadline
- `app/legal/*` - Terms and privacy policy pages

## Environment Variables

Copy `.env.example` to `.env.local`. Required:
- `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`, `EMAIL_FROM`
- `NEXT_PUBLIC_BASE_URL`
- `EBOOK_DOWNLOAD_URL`

## Notes

- All user-facing text is in Bulgarian
- Stripe checkout configured with `locale: 'bg'` for Bulgarian UI
- Webhook signature verification required - use raw body parsing
- Download tokens are single-use tracking (increments count on each download)
