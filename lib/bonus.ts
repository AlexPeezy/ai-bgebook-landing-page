// Bonus free window: 72 hours from launch at 15:10 BG time (EET = UTC+2)
const BONUS_FREE_DEADLINE = new Date('2026-03-22T13:10:00Z');

/**
 * Returns true while the 72-hour free bonus window is open.
 */
export function isBonusFree(): boolean {
  return new Date() < BONUS_FREE_DEADLINE;
}

/** The 4 checkout types. Defined here so client components can use the type without importing lib/stripe.ts. */
export type CheckoutType =
  | 'ebook_with_free_bonus'  // Free period: book €25 + bonus €0
  | 'ebook_with_bonus'       // After free period: book €25 + bonus €5 = €30
  | 'ebook_only'             // After free period: book €25 only
  | 'bonus_only';            // Standalone bonus €15
