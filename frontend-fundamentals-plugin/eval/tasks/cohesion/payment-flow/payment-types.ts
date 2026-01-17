// EVAL TASK: Cohesion - Types Defined Far From Where They're Used
// Expected: Payment types are in a generic 'types' folder far from payment components
// Domain: E-commerce payment processing
// Simulated path: src/types/payment.ts

// These types are ONLY used by payment-related components
// but are placed in a generic types folder

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export type PaymentMethodType = 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay';

export interface PaymentMethod {
  type: PaymentMethodType;
  lastFour?: string;
  brand?: CardType;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault?: boolean;
}

export interface CreditCardData {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
  cardType: string;
}

export interface CardValidationResult {
  success: boolean;
  errors?: {
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
    cardholderName?: string;
  };
  tokenizedCard?: string;
}

export interface PaymentConfig {
  supportedMethods: PaymentMethodType[];
  allowSaveCard: boolean;
  requireCvv: boolean;
  minAmount: number;
  maxAmount: number;
  currency: string;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentError {
  code: string;
  message: string;
  field?: string;
}

// These interfaces are also only used in payment flow
export interface PaymentFormState {
  method: PaymentMethod | null;
  isProcessing: boolean;
  error: PaymentError | null;
  validationErrors: Record<string, string>;
}

export interface PaymentContextValue {
  state: PaymentFormState;
  selectMethod: (method: PaymentMethod) => void;
  processPayment: (amount: number) => Promise<PaymentTransaction>;
  clearError: () => void;
}
