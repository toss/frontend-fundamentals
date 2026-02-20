// EVAL TASK: Cohesion - Payment Utilities Mixed with General Pricing Utils
// Expected: Payment-specific utilities are in generic 'utils/pricing.ts' file
// Domain: E-commerce payment processing
// Simulated path: src/utils/pricing.ts (contains mixed concerns)

// This file mixes general pricing utilities with payment-specific functions
// Payment functions should be colocated with payment feature

import { CARD_PATTERNS } from '../constants/payment-config';

// ============ General Pricing Utils ============
// These belong here

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function calculateTax(amount: number, rate: number): number {
  return amount * rate;
}

export function applyDiscount(amount: number, discountPercent: number): number {
  return amount * (1 - discountPercent / 100);
}

// ============ Payment-Specific Utils ============
// These should be colocated with payment components, not in generic pricing.ts

export function formatCardNumber(cardNumber: string): string {
  // Format as groups of 4 digits: 1234 5678 9012 3456
  const cleaned = cardNumber.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(' ');
}

export function maskCardNumber(lastFour: string): string {
  return `**** **** **** ${lastFour}`;
}

export function detectCardType(cardNumber: string): string | null {
  const cleaned = cardNumber.replace(/\D/g, '');

  for (const [type, pattern] of Object.entries(CARD_PATTERNS)) {
    if (pattern.test(cleaned)) {
      return type;
    }
  }

  return null;
}

export function validateLuhn(cardNumber: string): boolean {
  // Luhn algorithm for card number validation
  const cleaned = cardNumber.replace(/\D/g, '');

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function isCardExpired(expiry: string): boolean {
  const [month, year] = expiry.split('/').map(Number);
  const fullYear = 2000 + year;
  const expiryDate = new Date(fullYear, month, 0); // Last day of expiry month
  return expiryDate < new Date();
}

export function formatExpiry(month: number, year: number): string {
  return `${String(month).padStart(2, '0')}/${String(year).slice(-2)}`;
}

// Payment amount validation - also payment-specific
export function validatePaymentAmount(
  amount: number,
  min: number,
  max: number
): { valid: boolean; error?: string } {
  if (amount < min) {
    return { valid: false, error: `Minimum payment amount is ${formatCurrency(min)}` };
  }
  if (amount > max) {
    return { valid: false, error: `Maximum payment amount is ${formatCurrency(max)}` };
  }
  return { valid: true };
}
