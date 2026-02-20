// EVAL TASK: Cohesion - Related Files Scattered Across Directories
// Expected: This payment form is in a generic 'forms' folder but is tightly coupled to payment feature
// Domain: E-commerce payment processing
// Simulated path: src/components/forms/CreditCardForm.tsx

import { useState, useRef, useEffect } from 'react';
// More scattered imports
import { CreditCardData, CardValidationResult } from '../../../types/payment';
import { detectCardType, validateLuhn } from '../../../utils/pricing';
import {
  CARD_NUMBER_LENGTH,
  CVV_LENGTH,
  EXPIRY_FORMAT_REGEX
} from '../../../constants/payment-config';

interface CreditCardFormProps {
  onSubmit: (data: CreditCardData) => Promise<CardValidationResult>;
  formatCardNumber: (num: string) => string;
  errors: Record<string, string>;
}

export function CreditCardForm({
  onSubmit,
  formatCardNumber,
  errors
}: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [detectedType, setDetectedType] = useState<string | null>(null);

  const cardInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-detect card type as user types
    if (cardNumber.length >= 4) {
      const type = detectCardType(cardNumber);
      setDetectedType(type);
    }
  }, [cardNumber]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length <= CARD_NUMBER_LENGTH) {
      setCardNumber(formatCardNumber(raw));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiry(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanCardNumber = cardNumber.replace(/\s/g, '');

    if (!validateLuhn(cleanCardNumber)) {
      return;
    }

    if (!EXPIRY_FORMAT_REGEX.test(expiry)) {
      return;
    }

    const result = await onSubmit({
      cardNumber: cleanCardNumber,
      expiry,
      cvv,
      cardholderName,
      cardType: detectedType || 'unknown',
    });

    if (result.success) {
      // Clear form on success
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setCardholderName('');
    }
  };

  return (
    <form className="credit-card-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="cardNumber">Card Number</label>
        <div className="card-input-wrapper">
          <input
            ref={cardInputRef}
            id="cardNumber"
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            autoComplete="cc-number"
          />
          {detectedType && <span className={`card-type-icon ${detectedType}`} />}
        </div>
        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expiry">Expiry</label>
          <input
            id="expiry"
            type="text"
            value={expiry}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            maxLength={5}
            autoComplete="cc-exp"
          />
          {errors.expiry && <span className="error">{errors.expiry}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, CVV_LENGTH))}
            placeholder="123"
            maxLength={CVV_LENGTH}
            autoComplete="cc-csc"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cardholderName">Cardholder Name</label>
        <input
          id="cardholderName"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Doe"
          autoComplete="cc-name"
        />
        {errors.cardholderName && <span className="error">{errors.cardholderName}</span>}
      </div>

      <button type="submit" className="submit-btn">
        Continue
      </button>
    </form>
  );
}

export default CreditCardForm;
