// EVAL TASK: Cohesion - Related Files Scattered Across Directories
// Expected: This payment component imports from many distant directories; all payment-related code should be colocated
// Domain: E-commerce payment processing
// Simulated path: src/components/common/PaymentMethodSelector.tsx

import { useState } from 'react';
// Imports scattered across the codebase
import { PaymentMethod, PaymentConfig } from '../../../types/payment';
import { usePaymentValidation } from '../../../hooks/usePaymentValidation';
import { formatCardNumber, maskCardNumber } from '../../../utils/pricing';
import {
  SUPPORTED_CARD_TYPES,
  PAYMENT_ERRORS,
  MIN_PAYMENT_AMOUNT
} from '../../../constants/payment-config';
import { validatePaymentMethod } from '../../../services/payment-api';
import CreditCardForm from '../../forms/CreditCardForm';

interface PaymentMethodSelectorProps {
  amount: number;
  onMethodSelect: (method: PaymentMethod) => void;
  config?: Partial<PaymentConfig>;
}

export function PaymentMethodSelector({
  amount,
  onMethodSelect,
  config
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const { errors, validateCard, clearErrors } = usePaymentValidation();

  const handleMethodChange = async (method: PaymentMethod) => {
    if (amount < MIN_PAYMENT_AMOUNT) {
      return;
    }

    setIsValidating(true);
    clearErrors();

    try {
      const isValid = await validatePaymentMethod(method);
      if (isValid) {
        setSelectedMethod(method);
        onMethodSelect(method);
      }
    } catch (error) {
      console.error(PAYMENT_ERRORS.VALIDATION_FAILED, error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="payment-method-selector">
      <h3>Select Payment Method</h3>

      <div className="method-options">
        {SUPPORTED_CARD_TYPES.map(cardType => (
          <button
            key={cardType}
            className={`method-btn ${selectedMethod?.type === cardType ? 'selected' : ''}`}
            onClick={() => handleMethodChange({ type: cardType } as PaymentMethod)}
            disabled={isValidating}
          >
            <CardIcon type={cardType} />
            <span>{cardType}</span>
          </button>
        ))}
      </div>

      {selectedMethod?.type === 'credit_card' && (
        <CreditCardForm
          onSubmit={validateCard}
          formatCardNumber={formatCardNumber}
          errors={errors}
        />
      )}

      {selectedMethod && (
        <div className="selected-summary">
          <p>Selected: {selectedMethod.type}</p>
          {selectedMethod.lastFour && (
            <p>Card ending in {maskCardNumber(selectedMethod.lastFour)}</p>
          )}
        </div>
      )}
    </div>
  );
}

const CardIcon = ({ type }: { type: string }) => <span className={`icon-${type}`} />;

export default PaymentMethodSelector;
