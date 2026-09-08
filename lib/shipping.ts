export const FREE_STANDARD_SHIPPING_THRESHOLD_CENTS = 7500;
export const STANDARD_SHIPPING_CENTS = 699;
export const EXPRESS_SHIPPING_CENTS = 1499;

export function standardShippingCents(subtotalCents: number) {
  return subtotalCents > FREE_STANDARD_SHIPPING_THRESHOLD_CENTS ? 0 : STANDARD_SHIPPING_CENTS;
}

/**
 * Stripe Checkout tells us the shipping amount that was charged, not which
 * named option the customer picked. Since only two options are ever offered,
 * the amount alone is enough to label it for order records/admin display.
 */
export function labelForShippingAmountCents(amountCents: number) {
  return amountCents === EXPRESS_SHIPPING_CENTS ? "express" : "standard";
}
