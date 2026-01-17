// EVAL TASK: Predictability - Hidden Side Effects in Cart Hook
// Expected: Identify that getters and calculators have hidden side effects (analytics tracking, localStorage writes, console logs)
// Domain: E-commerce shopping cart

import { useState, useCallback, useMemo } from 'react';
import { analytics } from '@/lib/analytics';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
}

interface UseCartReturn {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemById: (id: string) => CartItem | undefined;
  calculateShipping: (zipCode: string) => number;
  isEligibleForFreeShipping: () => boolean;
}

export function useCart(): UseCartReturn {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initial load from localStorage
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // This looks like a simple getter but has hidden side effects!
  const itemCount = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    // Hidden side effect: tracking every time itemCount is calculated
    analytics.track('cart_count_calculated', { count });

    // Hidden side effect: logging
    console.log('[Cart] Item count:', count);

    return count;
  }, [items]);

  // This also has hidden side effects
  const subtotal = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Hidden side effect: persisting to localStorage on every calculation
    localStorage.setItem('lastCartSubtotal', String(total));

    // Hidden side effect: analytics
    if (total > 100) {
      analytics.track('high_value_cart', { subtotal: total });
    }

    return total;
  }, [items]);

  const addItem = useCallback((newItem: Omit<CartItem, 'id'>) => {
    setItems(prev => {
      const id = `${newItem.productId}-${newItem.variant || 'default'}`;
      const existing = prev.find(item => item.id === id);

      let updated: CartItem[];
      if (existing) {
        updated = prev.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updated = [...prev, { ...newItem, id }];
      }

      // This side effect is expected in a setter
      localStorage.setItem('cart', JSON.stringify(updated));
      analytics.track('item_added', { productId: newItem.productId });

      return updated;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem('cart');
    analytics.track('cart_cleared');
  }, []);

  // "get" prefix suggests pure getter, but has side effects!
  const getItemById = useCallback((id: string): CartItem | undefined => {
    const item = items.find(item => item.id === id);

    // Hidden side effect: tracking item lookups
    analytics.track('cart_item_lookup', { id, found: !!item });

    // Hidden side effect: updating "recently viewed in cart"
    if (item) {
      const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewedInCart') || '[]');
      if (!recentlyViewed.includes(id)) {
        localStorage.setItem('recentlyViewedInCart', JSON.stringify([...recentlyViewed, id].slice(-5)));
      }
    }

    return item;
  }, [items]);

  // "calculate" prefix suggests pure calculation, but has side effects!
  const calculateShipping = useCallback((zipCode: string): number => {
    // Side effect: validating and storing zip code
    localStorage.setItem('lastShippingZip', zipCode);

    // Side effect: analytics
    analytics.track('shipping_calculated', { zipCode });

    // Actual calculation
    const baseRate = 5.99;
    const distanceMultiplier = zipCode.startsWith('9') ? 1.5 : 1;
    const weightSurcharge = items.length > 5 ? 2.99 : 0;

    const total = baseRate * distanceMultiplier + weightSurcharge;

    // Side effect: caching result
    sessionStorage.setItem(`shipping_${zipCode}`, String(total));

    return total;
  }, [items]);

  // "is" prefix suggests pure boolean check, but has side effects!
  const isEligibleForFreeShipping = useCallback((): boolean => {
    const eligible = subtotal >= 75;

    // Hidden side effect: tracking eligibility checks
    analytics.track('free_shipping_check', {
      eligible,
      subtotal,
      needed: eligible ? 0 : 75 - subtotal
    });

    // Hidden side effect: showing toast if close to threshold
    if (!eligible && subtotal >= 50) {
      console.log(`[Cart] User is $${(75 - subtotal).toFixed(2)} away from free shipping`);
      // This could trigger a toast notification in some implementations
      window.dispatchEvent(new CustomEvent('cart:nearFreeShipping', {
        detail: { remaining: 75 - subtotal }
      }));
    }

    return eligible;
  }, [subtotal]);

  return {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemById,
    calculateShipping,
    isEligibleForFreeShipping,
  };
}
