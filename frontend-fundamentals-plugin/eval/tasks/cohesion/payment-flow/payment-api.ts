// EVAL TASK: Cohesion - Payment API in Generic Services Directory
// Expected: Payment API functions are in generic 'services' folder, far from payment feature
// Domain: E-commerce payment processing
// Simulated path: src/services/payment-api.ts

import {
  PaymentMethod,
  CreditCardData,
  PaymentTransaction,
  CardValidationResult
} from '../types/payment';
import {
  PAYMENT_API_ENDPOINTS,
  PAYMENT_TIMEOUT_MS,
  PAYMENT_ERRORS
} from '../constants/payment-config';

// API base URL from environment
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit
): Promise<ApiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), PAYMENT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || PAYMENT_ERRORS.PROCESSING_ERROR,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return { success: false, error: PAYMENT_ERRORS.NETWORK_ERROR };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : PAYMENT_ERRORS.PROCESSING_ERROR,
    };
  }
}

export async function validatePaymentMethod(method: PaymentMethod): Promise<boolean> {
  const response = await fetchWithTimeout<{ valid: boolean }>(
    `${API_BASE}${PAYMENT_API_ENDPOINTS.VALIDATE}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method }),
    }
  );

  return response.success && response.data?.valid === true;
}

export async function tokenizeCard(cardData: CreditCardData): Promise<string> {
  const response = await fetchWithTimeout<{ token: string }>(
    `${API_BASE}${PAYMENT_API_ENDPOINTS.TOKENIZE}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardNumber: cardData.cardNumber,
        expiry: cardData.expiry,
        cvv: cardData.cvv,
        cardholderName: cardData.cardholderName,
      }),
    }
  );

  if (!response.success || !response.data?.token) {
    throw new Error(response.error || PAYMENT_ERRORS.VALIDATION_FAILED);
  }

  return response.data.token;
}

export async function processPayment(
  token: string,
  amount: number,
  currency = 'USD'
): Promise<PaymentTransaction> {
  const response = await fetchWithTimeout<PaymentTransaction>(
    `${API_BASE}${PAYMENT_API_ENDPOINTS.PROCESS}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, amount, currency }),
    }
  );

  if (!response.success || !response.data) {
    throw new Error(response.error || PAYMENT_ERRORS.PROCESSING_ERROR);
  }

  return response.data;
}

export async function refundPayment(
  transactionId: string,
  amount?: number
): Promise<PaymentTransaction> {
  const response = await fetchWithTimeout<PaymentTransaction>(
    `${API_BASE}${PAYMENT_API_ENDPOINTS.REFUND}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId, amount }),
    }
  );

  if (!response.success || !response.data) {
    throw new Error(response.error || PAYMENT_ERRORS.PROCESSING_ERROR);
  }

  return response.data;
}

// This function is only used by payment components
export async function getSavedPaymentMethods(userId: string): Promise<PaymentMethod[]> {
  const response = await fetchWithTimeout<{ methods: PaymentMethod[] }>(
    `${API_BASE}/users/${userId}/payment-methods`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  return response.data?.methods || [];
}

// Also payment-specific
export async function savePaymentMethod(
  userId: string,
  method: PaymentMethod,
  setAsDefault = false
): Promise<PaymentMethod> {
  const response = await fetchWithTimeout<PaymentMethod>(
    `${API_BASE}/users/${userId}/payment-methods`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, setAsDefault }),
    }
  );

  if (!response.success || !response.data) {
    throw new Error(response.error || 'Failed to save payment method');
  }

  return response.data;
}
