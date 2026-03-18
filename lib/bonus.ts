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
