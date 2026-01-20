// EVAL TASK: Predictability - Hidden Side Effects
// Expected: Identify that getUser name suggests pure getter but has hidden side effects

import { analytics } from './analytics';
import { cache } from './cache';

function useUser() {
  const user = getUser();
  return user;
}

function getUser() {
  const user = cache.get('user');
  analytics.track('user_fetched'); // Hidden side effect!
  return user;
}

// Another example
function calculateTotal(items: Item[]) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  localStorage.setItem('lastTotal', String(total)); // Hidden side effect!
  return total;
}

// Another example
function formatDate(date: Date) {
  console.log('Formatting date:', date); // Hidden side effect (logging)
  return date.toLocaleDateString();
}
