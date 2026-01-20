// EVAL TASK: Cohesion - Payment Hook in Generic Hooks Directory
// Expected: This payment-specific hook is in generic 'hooks' folder, far from payment components
// Domain: E-commerce payment processing
// Simulated path: src/hooks/usePaymentValidation.ts

import { useState, useCallback } from 'react';
// Imports from scattered locations
import {
  CreditCardData,
  CardValidationResult,
  PaymentError
} from '../types/payment';
import {
  validateLuhn,
  isCardExpired,
  detectCardType
} from '../utils/pricing';
import {
  PAYMENT_ERRORS,
  CARD_NUMBER_LENGTH,
  CVV_LENGTH,
  AMEX_CVV_LENGTH
} from '../constants/payment-config';
import { tokenizeCard } from '../services/payment-api';

interface ValidationState {
  errors: Record<string, string>;
  isValidating: boolean;
  lastValidatedCard: string | null;
}

export function usePaymentValidation() {
  const [state, setState] = useState<ValidationState>({
    errors: {},
    isValidating: false,
    lastValidatedCard: null,
  });

  const setError = useCallback((field: string, message: string) => {
    setState(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: message },
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setState(prev => ({ ...prev, errors: {} }));
  }, []);

  const clearError = useCallback((field: string) => {
    setState(prev => {
      const { [field]: _, ...rest } = prev.errors;
      return { ...prev, errors: rest };
    });
  }, []);

  const validateCardNumber = useCallback((cardNumber: string): boolean => {
    const cleaned = cardNumber.replace(/\D/g, '');

    if (cleaned.length < 13 || cleaned.length > CARD_NUMBER_LENGTH + 3) {
      setError('cardNumber', PAYMENT_ERRORS.INVALID_CARD_NUMBER);
      return false;
    }

    if (!validateLuhn(cleaned)) {
      setError('cardNumber', PAYMENT_ERRORS.INVALID_CARD_NUMBER);
      return false;
    }

    clearError('cardNumber');
    return true;
  }, [setError, clearError]);

  const validateExpiry = useCallback((expiry: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    if (!regex.test(expiry)) {
      setError('expiry', PAYMENT_ERRORS.INVALID_EXPIRY);
      return false;
    }

    if (isCardExpired(expiry)) {
      setError('expiry', PAYMENT_ERRORS.EXPIRED_CARD);
      return false;
    }

    clearError('expiry');
    return true;
  }, [setError, clearError]);

  const validateCvv = useCallback((cvv: string, cardType?: string): boolean => {
    const expectedLength = cardType === 'amex' ? AMEX_CVV_LENGTH : CVV_LENGTH;

    if (cvv.length !== expectedLength || !/^\d+$/.test(cvv)) {
      setError('cvv', PAYMENT_ERRORS.INVALID_CVV);
      return false;
    }

    clearError('cvv');
    return true;
  }, [setError, clearError]);

  const validateCardholderName = useCallback((name: string): boolean => {
    if (!name.trim() || name.trim().length < 2) {
      setError('cardholderName', PAYMENT_ERRORS.INVALID_NAME);
      return false;
    }

    clearError('cardholderName');
    return true;
  }, [setError, clearError]);

  const validateCard = useCallback(async (
    data: CreditCardData
  ): Promise<CardValidationResult> => {
    setState(prev => ({ ...prev, isValidating: true }));

    const cardType = detectCardType(data.cardNumber) || 'unknown';

    const isCardNumberValid = validateCardNumber(data.cardNumber);
    const isExpiryValid = validateExpiry(data.expiry);
    const isCvvValid = validateCvv(data.cvv, cardType);
    const isNameValid = validateCardholderName(data.cardholderName);

    if (!isCardNumberValid || !isExpiryValid || !isCvvValid || !isNameValid) {
      setState(prev => ({ ...prev, isValidating: false }));
      return {
        success: false,
        errors: state.errors,
      };
    }

    try {
      // Tokenize card for secure processing
      const tokenizedCard = await tokenizeCard(data);

      setState(prev => ({
        ...prev,
        isValidating: false,
        lastValidatedCard: data.cardNumber.slice(-4),
      }));

      return {
        success: true,
        tokenizedCard,
      };
    } catch (error) {
      const paymentError = error as PaymentError;
      setError('general', paymentError.message || PAYMENT_ERRORS.VALIDATION_FAILED);

      setState(prev => ({ ...prev, isValidating: false }));

      return {
        success: false,
        errors: { general: paymentError.message },
      };
    }
  }, [validateCardNumber, validateExpiry, validateCvv, validateCardholderName, setError, state.errors]);

  return {
    errors: state.errors,
    isValidating: state.isValidating,
    lastValidatedCard: state.lastValidatedCard,
    validateCard,
    validateCardNumber,
    validateExpiry,
    validateCvv,
    validateCardholderName,
    clearErrors,
    clearError,
  };
}

export default usePaymentValidation;
