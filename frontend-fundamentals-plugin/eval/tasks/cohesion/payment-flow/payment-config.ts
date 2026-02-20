// EVAL TASK: Cohesion - Constants Scattered in Separate Directory
// Expected: Payment constants are in generic 'constants' folder, duplicated magic values
// Domain: E-commerce payment processing
// Simulated path: src/constants/payment-config.ts

// These constants are ONLY used by payment features
// but are in a generic constants folder

export const SUPPORTED_CARD_TYPES = [
  'visa',
  'mastercard',
  'amex',
  'discover',
] as const;

export const SUPPORTED_PAYMENT_METHODS = [
  'credit_card',
  'debit_card',
  'paypal',
  'apple_pay',
  'google_pay',
] as const;

// Magic numbers that should be colocated with payment logic
export const CARD_NUMBER_LENGTH = 16;
export const CVV_LENGTH = 3;
export const AMEX_CVV_LENGTH = 4; // Different but defined here, not near AMEX logic
export const MIN_PAYMENT_AMOUNT = 0.50;
export const MAX_PAYMENT_AMOUNT = 999999.99;

// Regex patterns for payment validation
export const EXPIRY_FORMAT_REGEX = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
export const CARD_NUMBER_REGEX = /^[0-9]{13,19}$/;
export const CVV_REGEX = /^[0-9]{3,4}$/;

// Card type detection patterns - should be with card detection logic
export const CARD_PATTERNS = {
  visa: /^4/,
  mastercard: /^5[1-5]/,
  amex: /^3[47]/,
  discover: /^6(?:011|5)/,
} as const;

// Error messages - used across multiple payment components
export const PAYMENT_ERRORS = {
  INVALID_CARD_NUMBER: 'Please enter a valid card number',
  INVALID_EXPIRY: 'Please enter a valid expiry date',
  EXPIRED_CARD: 'This card has expired',
  INVALID_CVV: 'Please enter a valid CVV',
  INVALID_NAME: 'Please enter the cardholder name',
  VALIDATION_FAILED: 'Payment validation failed',
  PROCESSING_ERROR: 'An error occurred while processing your payment',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  CARD_DECLINED: 'Your card was declined',
  NETWORK_ERROR: 'Network error. Please try again.',
} as const;

// API endpoints - mixed with other config
export const PAYMENT_API_ENDPOINTS = {
  VALIDATE: '/api/payment/validate',
  PROCESS: '/api/payment/process',
  TOKENIZE: '/api/payment/tokenize',
  REFUND: '/api/payment/refund',
} as const;

// Timeout values
export const PAYMENT_TIMEOUT_MS = 30000;
export const VALIDATION_DEBOUNCE_MS = 300;
