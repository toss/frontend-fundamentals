// EVAL TASK: Readability - Mixed Branches for Different User Types
// Expected: Identify that guest, member, and premium user logic should be separated into different components
// Domain: E-commerce checkout flow

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { applyDiscount, calculateShipping } from '@/utils/pricing';

interface CheckoutSummaryProps {
  onCheckout: () => void;
}

function CheckoutSummary({ onCheckout }: CheckoutSummaryProps) {
  const { user, membership } = useAuth();
  const { items, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [saveForLater, setSaveForLater] = useState(false);

  const isPremium = membership === 'premium';
  const isMember = !!user;
  const isGuest = !user;

  // Premium members get free shipping over $50, regular members over $100, guests always pay
  const shippingThreshold = isPremium ? 50 : isMember ? 100 : Infinity;
  const freeShipping = subtotal >= shippingThreshold;
  const shippingCost = freeShipping ? 0 : isPremium ? 4.99 : isMember ? 7.99 : 12.99;

  // Different discount rates
  const memberDiscount = isPremium ? 0.15 : isMember ? 0.05 : 0;
  const discountAmount = subtotal * memberDiscount;

  // Premium gets express, member gets standard, guest gets economy
  const estimatedDays = isPremium ? '1-2' : isMember ? '3-5' : '7-10';

  useEffect(() => {
    if (isPremium) {
      // Track premium checkout views for analytics
      window.analytics?.track('premium_checkout_view', { subtotal });
    }
  }, [isPremium, subtotal]);

  const handleApplyPromo = () => {
    if (isGuest) {
      alert('Please sign in to use promo codes');
      return;
    }
    if (isPremium) {
      // Premium members can stack promo codes
      applyDiscount(promoCode, { stackable: true });
    } else {
      applyDiscount(promoCode, { stackable: false });
    }
  };

  return (
    <div className="checkout-summary">
      <h2>Order Summary</h2>

      {isGuest && (
        <div className="guest-notice">
          <p>Checking out as guest</p>
          <input
            type="email"
            placeholder="Email for order updates"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
          />
          <a href="/signup">Sign up for 5% off!</a>
        </div>
      )}

      {isMember && !isPremium && (
        <div className="member-banner">
          <p>You're saving {(memberDiscount * 100).toFixed(0)}% as a member!</p>
          <a href="/upgrade">Upgrade to Premium for 15% off</a>
        </div>
      )}

      {isPremium && (
        <div className="premium-banner">
          <span className="premium-badge">Premium Member</span>
          <p>Enjoying 15% off + free express shipping!</p>
        </div>
      )}

      <div className="line-items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="totals">
        <div className="row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {memberDiscount > 0 && (
          <div className="row discount">
            <span>{isPremium ? 'Premium' : 'Member'} Discount ({(memberDiscount * 100).toFixed(0)}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="row">
          <span>
            Shipping ({estimatedDays} days)
            {freeShipping && <span className="free-tag">FREE</span>}
          </span>
          <span>{freeShipping ? '$0.00' : `$${shippingCost.toFixed(2)}`}</span>
        </div>

        {!freeShipping && isMember && (
          <p className="shipping-hint">
            Add ${(shippingThreshold - subtotal).toFixed(2)} more for free shipping!
          </p>
        )}
      </div>

      {isMember && (
        <div className="promo-section">
          <input
            type="text"
            placeholder={isPremium ? "Stack another promo code" : "Enter promo code"}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button onClick={handleApplyPromo}>Apply</button>
        </div>
      )}

      {isGuest && (
        <p className="promo-hint">Sign in to use promo codes</p>
      )}

      <div className="total-row">
        <span>Total</span>
        <span>${(subtotal - discountAmount + shippingCost).toFixed(2)}</span>
      </div>

      {isMember && (
        <label className="save-option">
          <input
            type="checkbox"
            checked={saveForLater}
            onChange={(e) => setSaveForLater(e.target.checked)}
          />
          Save this order configuration
        </label>
      )}

      <button
        className={`checkout-btn ${isPremium ? 'premium' : isMember ? 'member' : 'guest'}`}
        onClick={onCheckout}
        disabled={isGuest && !guestEmail}
      >
        {isPremium ? 'Express Checkout' : isMember ? 'Checkout' : 'Continue as Guest'}
      </button>

      {isGuest && (
        <button className="secondary-btn" onClick={() => window.location.href = '/login'}>
          Sign in for faster checkout
        </button>
      )}
    </div>
  );
}

export default CheckoutSummary;
