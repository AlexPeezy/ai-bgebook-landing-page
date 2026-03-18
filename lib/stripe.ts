import Stripe from 'stripe';
export type { CheckoutType } from '@/lib/bonus';

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
