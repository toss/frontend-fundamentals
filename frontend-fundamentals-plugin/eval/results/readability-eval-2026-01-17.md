# Readability Skill Evaluation

> **Evaluation Timestamp:** 2026-01-17
> **Model:** Claude Opus 4.5

## Summary

| Task | Grade | Issue Found | Fix Suggested |
|------|-------|-------------|---------------|
| mixed-branches.tsx | PASS | Admin and regular user code paths mixed in one component | Split into separate AdminSubmitButton and UserSubmitButton components |
| nested-ternary.tsx | PASS | Nested ternaries (5-6 levels deep) make code hard to read | Extract to early returns, if/else statements, or switch statements |
| magic-numbers.tsx | PASS | Magic numbers like 100, 50, 10, 0.8, 0.9, 8, 128, 20, 16, 24 lack semantic meaning | Named constants with clear names (e.g., BULK_ORDER_THRESHOLD, BULK_DISCOUNT_RATE) |
| checkout-summary.tsx | PASS | Guest/member/premium logic interleaved throughout one 170-line component | Separate into GuestCheckoutSummary, MemberCheckoutSummary, PremiumCheckoutSummary components |
| notification-badge.tsx | PASS | 4-5 levels of nested ternary operators for badge styling, content, and accessibility text | Extract to helper functions or lookup objects for badge class, animation, color, and content |

**Overall Pass Rate: 5/5 (100%)**

---

## Detailed Results

### mixed-branches.tsx

**Code Review:**

The `SubmitButton` component handles two distinct user roles (admin and regular user) within a single component. The code contains:
- A `useEffect` that only runs for admins (with an early return guard)
- A conditional return that renders completely different buttons with different classes, text, and handlers
- An admin-specific handler function `handleAdminSubmit`

This mixing of concerns makes the component harder to understand because a reader must mentally trace through the conditional logic to understand what the component actually renders for each role.

**Issue Identified:**

Code for different user roles (admin vs. regular user) is mixed in one component. The admin path has its own:
- Animation effect (`showAdminAnimation`)
- Button styling (`admin-btn`)
- Button text ("Approve & Submit")
- Click handler (`handleAdminSubmit`)

The regular user path has completely different:
- Button styling (`user-btn`)
- Button text ("Submit for Review")
- Disabled state logic (`!canSubmit`)

These are essentially two different components masquerading as one.

**Suggested Fix:**

Split into separate components by role:

```tsx
function AdminSubmitButton() {
  useEffect(() => {
    showAdminAnimation();
  }, []);

  return (
    <button className="admin-btn" onClick={handleAdminSubmit}>
      Approve & Submit
    </button>
  );
}

function UserSubmitButton({ canSubmit }: { canSubmit: boolean }) {
  return (
    <button className="user-btn" disabled={!canSubmit}>
      Submit for Review
    </button>
  );
}

// Parent component selects which to render
function SubmitButton() {
  const isAdmin = useRole() === 'admin';
  return isAdmin ? <AdminSubmitButton /> : <UserSubmitButton canSubmit={canSubmit} />;
}
```

**Grade:** PASS

**Reasoning:** Correctly identified that admin and regular user code paths are mixed in one component (the "Must Catch" criterion). Suggested splitting into separate components by role (the "Good Fix"). Did not suggest over-abstracting into a factory pattern (avoided "Bad Fix").

---

### nested-ternary.tsx

**Code Review:**

This file contains two functions with severe nested ternary issues:

1. `getStatusMessage` - Has 6 levels of nested ternaries chaining status, count, and isAdmin conditions
2. `UserBadge` - Has nested ternaries in both the `className` and the content, each 2-3 levels deep

The `getStatusMessage` function is particularly egregious:
```tsx
return status === 'loading'
  ? 'Loading...'
  : status === 'error'
  ? 'An error occurred'
  : count === 0
  ? 'No items found'
  : count === 1
  ? 'Found 1 item'
  : isAdmin
  ? `Found ${count} items (admin view)`
  : `Found ${count} items`;
```

This is extremely difficult to read and reason about.

**Issue Identified:**

Nested ternaries are hard to read. The code has:
- 6-level deep ternary chain in `getStatusMessage`
- Nested ternaries in JSX for both className and content in `UserBadge`
- The logic flow is not immediately clear without careful reading

**Suggested Fix:**

For `getStatusMessage`, use early returns or a switch statement:

```tsx
function getStatusMessage(status: string, count: number, isAdmin: boolean) {
  if (status === 'loading') return 'Loading...';
  if (status === 'error') return 'An error occurred';
  if (count === 0) return 'No items found';
  if (count === 1) return 'Found 1 item';

  const suffix = isAdmin ? ' (admin view)' : '';
  return `Found ${count} items${suffix}`;
}
```

For `UserBadge`, extract the logic:

```tsx
function UserBadge({ user }: { user: User }) {
  const getBadgeClass = () => {
    if (!user.isVerified) return 'none';
    return user.isPremium ? 'gold' : 'silver';
  };

  const getBadgeText = () => {
    if (!user.isVerified) return 'Unverified';
    return user.isPremium ? 'Premium' : 'Verified';
  };

  return (
    <span className={getBadgeClass()}>
      {getBadgeText()}
    </span>
  );
}
```

**Grade:** PASS

**Reasoning:** Correctly identified that nested ternaries make code hard to read (the "Must Catch" criterion). Suggested early returns and if/else statements (the "Good Fix"). Did not suggest adding comments to explain ternaries (avoided "Bad Fix").

---

### magic-numbers.tsx

**Code Review:**

This file contains multiple magic numbers across three functions:

1. `calculateDiscount`:
   - `100`, `50`, `10` - quantity thresholds for discounts
   - `0.8`, `0.9`, `0.95` - discount multipliers (meaning 20%, 10%, 5% off)

2. `validatePassword`:
   - `8` - minimum password length
   - `128` - maximum password length

3. `Pagination`:
   - `20` - items per page
   - `16` - margin-top in pixels
   - `24` - padding in pixels

None of these numbers have semantic meaning from reading the code. A reader must guess what `0.8` means (is it 80% of price? 80% discount? something else?).

**Issue Identified:**

Numbers without semantic meaning appear throughout:
- Discount thresholds (100, 50, 10) - what are these quantities representing?
- Discount multipliers (0.8, 0.9, 0.95) - confusing whether these are "pay X%" or "save X%"
- Password limits (8, 128) - not clear these are min/max lengths
- Page size (20) - magic number for pagination
- Style values (16, 24) - inline styles with unexplained values

**Suggested Fix:**

Use named constants with clear names:

```tsx
// Discount constants
const BULK_ORDER_THRESHOLD = 100;
const MEDIUM_ORDER_THRESHOLD = 50;
const SMALL_ORDER_THRESHOLD = 10;

const BULK_DISCOUNT_MULTIPLIER = 0.8;    // 20% off
const MEDIUM_DISCOUNT_MULTIPLIER = 0.9;  // 10% off
const SMALL_DISCOUNT_MULTIPLIER = 0.95;  // 5% off

function calculateDiscount(price: number, quantity: number) {
  if (quantity >= BULK_ORDER_THRESHOLD) {
    return price * BULK_DISCOUNT_MULTIPLIER;
  } else if (quantity >= MEDIUM_ORDER_THRESHOLD) {
    return price * MEDIUM_DISCOUNT_MULTIPLIER;
  } else if (quantity >= SMALL_ORDER_THRESHOLD) {
    return price * SMALL_DISCOUNT_MULTIPLIER;
  }
  return price;
}

// Password validation constants
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

function validatePassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH &&
         password.length <= MAX_PASSWORD_LENGTH;
}

// Pagination constants
const ITEMS_PER_PAGE = 20;
const SPACING = {
  MARGIN_TOP: 16,
  PADDING: 24,
} as const;

function Pagination({ total }: { total: number }) {
  const pages = Math.ceil(total / ITEMS_PER_PAGE);
  return (
    <div style={{ marginTop: SPACING.MARGIN_TOP, padding: SPACING.PADDING }}>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i}>{i + 1}</button>
      ))}
    </div>
  );
}
```

**Grade:** PASS

**Reasoning:** Correctly identified that numbers lack semantic meaning (the "Must Catch" criterion). Suggested named constants with clear, descriptive names (the "Good Fix"). Did not suggest inline comments explaining numbers (avoided "Bad Fix").

---

### checkout-summary.tsx

**Code Review:**

This is a 174-line component that handles three completely different user types: guests, members, and premium members. The logic for each user type is scattered throughout the component:

1. **State declarations** - `guestEmail` only used by guests, `promoCode` only used by members
2. **Computed values** (lines 26-35) - Nested ternaries computing `shippingThreshold`, `shippingCost`, `memberDiscount`, `estimatedDays` based on user type
3. **useEffect** (lines 37-42) - Only runs for premium users
4. **handleApplyPromo** (lines 44-55) - Different behavior for guest/member/premium
5. **Render sections** - Multiple `{isGuest && ...}`, `{isMember && !isPremium && ...}`, `{isPremium && ...}` blocks scattered through the JSX

The cognitive load is high because:
- You must track three boolean flags (`isPremium`, `isMember`, `isGuest`) throughout
- Each section requires understanding which user type it applies to
- The business logic for each user type is interleaved, not grouped

**Issue Identified:**

Guest, member, and premium user logic is interleaved throughout one component:
- Three different banner sections (guest-notice, member-banner, premium-banner)
- Different promo code behaviors per user type
- Different shipping calculations with nested ternaries
- Different checkout button text and styling
- Guest-only secondary sign-in button
- Member-only save-for-later checkbox

The component tries to handle three different user experiences in one place, making it difficult to understand any single user's flow.

**Suggested Fix:**

Separate into three focused components:

```tsx
// Shared types and hooks
interface CheckoutSummaryProps {
  onCheckout: () => void;
}

// Each component handles ONE user type clearly
function GuestCheckoutSummary({ onCheckout }: CheckoutSummaryProps) {
  const { items, subtotal } = useCart();
  const [guestEmail, setGuestEmail] = useState('');

  const shippingCost = 12.99;
  const estimatedDays = '7-10';

  return (
    <div className="checkout-summary">
      <h2>Order Summary</h2>
      <div className="guest-notice">
        <p>Checking out as guest</p>
        <input type="email" placeholder="Email for order updates" ... />
        <a href="/signup">Sign up for 5% off!</a>
      </div>
      {/* Guest-specific rendering */}
    </div>
  );
}

function MemberCheckoutSummary({ onCheckout }: CheckoutSummaryProps) {
  const { items, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [saveForLater, setSaveForLater] = useState(false);

  const memberDiscount = 0.05;
  const shippingThreshold = 100;
  const freeShipping = subtotal >= shippingThreshold;
  const shippingCost = freeShipping ? 0 : 7.99;
  const estimatedDays = '3-5';

  return (
    <div className="checkout-summary">
      {/* Member-specific rendering */}
    </div>
  );
}

function PremiumCheckoutSummary({ onCheckout }: CheckoutSummaryProps) {
  const { items, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [saveForLater, setSaveForLater] = useState(false);

  const premiumDiscount = 0.15;
  const shippingThreshold = 50;
  const freeShipping = subtotal >= shippingThreshold;
  const shippingCost = freeShipping ? 0 : 4.99;
  const estimatedDays = '1-2';

  useEffect(() => {
    window.analytics?.track('premium_checkout_view', { subtotal });
  }, [subtotal]);

  return (
    <div className="checkout-summary">
      {/* Premium-specific rendering */}
    </div>
  );
}

// Router component
function CheckoutSummary(props: CheckoutSummaryProps) {
  const { user, membership } = useAuth();

  if (!user) return <GuestCheckoutSummary {...props} />;
  if (membership === 'premium') return <PremiumCheckoutSummary {...props} />;
  return <MemberCheckoutSummary {...props} />;
}
```

**Grade:** PASS

**Reasoning:** Correctly identified that guest/member/premium logic is interleaved in one component (the "Must Catch" criterion). Suggested separate components per user type (GuestCheckout, MemberCheckout, PremiumCheckout) which is exactly the "Good Fix". Did not suggest adding more conditionals or flags (avoided "Bad Fix").

---

### notification-badge.tsx

**Code Review:**

This file has two components with deeply nested ternary chains:

1. **NotificationBadge** - Multiple 4-5 level deep ternary nests:
   - Badge className (lines 61-69): `hasCritical ? 'critical' : hasHigh ? 'high' : hasRecentMention ? 'mention' : 'default'`
   - Animation style (lines 71-77): 4-level ternary for animation name
   - Background color style (lines 78-84): 4-level ternary for color
   - Badge content (lines 87-93): Nested ternary for display text
   - Screen reader text (lines 108-124): 5-level nested ternary for accessibility text

2. **NotificationItem** - Additional nested ternaries:
   - Icon selection (lines 135-143): 5-level ternary for icon component
   - Priority label (lines 145-151): 4-level ternary for label text
   - className (lines 155-163): 4-level nested ternary

The JSX is particularly hard to read because the ternaries are inlined within style objects and className strings.

**Issue Identified:**

4-5 levels of nested ternary operators appear throughout:
- Badge CSS class determination (4 levels)
- Animation name selection (4 levels)
- Background color selection (4 levels)
- Badge content display (3 levels within outer condition)
- Accessibility text generation (5+ levels)
- Icon selection in NotificationItem (5 levels)
- Priority label selection (4 levels)
- Item className determination (4 levels)

This makes the code extremely difficult to read and maintain.

**Suggested Fix:**

Extract to helper functions or lookup objects:

```tsx
// Lookup objects for deterministic mappings
const BADGE_CONFIG = {
  critical: {
    className: 'critical',
    animation: 'pulse-critical 0.5s infinite',
    backgroundColor: '#dc2626',
  },
  high: {
    className: 'high',
    animation: 'pulse-high 1s infinite',
    backgroundColor: '#ea580c',
  },
  mention: {
    className: 'mention',
    animation: 'bounce 0.3s ease-out',
    backgroundColor: '#2563eb',
  },
  default: {
    className: 'default',
    animation: 'none',
    backgroundColor: '#6b7280',
  },
} as const;

const NOTIFICATION_ICONS = {
  message: MessageIcon,
  alert: AlertIcon,
  mention: MentionIcon,
  update: UpdateIcon,
  system: SystemIcon,
} as const;

const PRIORITY_LABELS = {
  critical: 'Critical',
  high: 'Important',
  medium: 'Normal',
  low: 'Low priority',
} as const;

// Helper function for badge priority
function getBadgePriority(hasCritical: boolean, hasHigh: boolean, hasRecentMention: boolean) {
  if (hasCritical) return 'critical';
  if (hasHigh) return 'high';
  if (hasRecentMention) return 'mention';
  return 'default';
}

// Helper for badge content
function getBadgeContent(count: number, hasCritical: boolean) {
  if (count > 99) return '99+';
  if (count > 9 && hasCritical) return '!';
  return count;
}

// Helper for screen reader text
function getScreenReaderText(
  doNotDisturb: boolean,
  count: number,
  hasCritical: boolean,
  hasHigh: boolean,
  hasRecentMention: boolean,
  isOnline: boolean
): string {
  if (doNotDisturb) {
    if (hasCritical) {
      return `Do not disturb active, but ${count} critical notification${count !== 1 ? 's' : ''} require attention`;
    }
    return 'Do not disturb active';
  }

  if (count === 0) {
    return isOnline ? 'No new notifications' : 'Offline - notifications paused';
  }

  let text = `${count} unread notification${count !== 1 ? 's' : ''}`;
  if (hasCritical) text += ', including critical alerts';
  else if (hasHigh) text += ', including high priority';
  else if (hasRecentMention) text += ', including recent mentions';

  return text;
}

// Clean component using helpers
function NotificationBadge({ notifications, userSettings, isOnline }: NotificationBadgeProps) {
  const { count, hasCritical, hasHigh, hasRecentMention } = useBadgeContent(notifications, userSettings);
  const priority = getBadgePriority(hasCritical, hasHigh, hasRecentMention);
  const config = BADGE_CONFIG[priority];

  return (
    <div className="notification-wrapper">
      <button className="notification-bell">
        <BellIcon />
        {!userSettings.doNotDisturb ? (
          count > 0 ? (
            <span
              className={`badge ${config.className}`}
              style={{ animation: config.animation, backgroundColor: config.backgroundColor }}
            >
              {getBadgeContent(count, hasCritical)}
            </span>
          ) : !isOnline ? (
            <span className="offline-indicator" />
          ) : null
        ) : (
          <span className="dnd-indicator">
            {hasCritical && <span className="critical-override">!</span>}
          </span>
        )}
      </button>
      <span className="sr-only">
        {getScreenReaderText(userSettings.doNotDisturb, count, hasCritical, hasHigh, hasRecentMention, isOnline)}
      </span>
    </div>
  );
}

// Clean NotificationItem using lookups
function NotificationItem({ notification, settings }: { ... }) {
  const Icon = NOTIFICATION_ICONS[notification.type];
  const priorityLabel = PRIORITY_LABELS[notification.priority];

  const className = [
    'notification-item',
    notification.read ? 'read' : 'unread',
    notification.muted || settings.mutedTypes.includes(notification.type)
      ? 'muted'
      : notification.priority === 'critical' || notification.priority === 'high'
        ? notification.priority
        : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={className}>
      <Icon />
      <span className="priority-badge">{priorityLabel}</span>
    </div>
  );
}
```

**Grade:** PASS

**Reasoning:** Correctly identified 4-5 levels of nested ternary operators throughout the components (the "Must Catch" criterion). Suggested extracting to helper functions and lookup objects (the "Good Fix"). Did not suggest keeping ternaries with added comments (avoided "Bad Fix").

---

## Final Summary

All 5 readability evaluation tasks passed:

1. **mixed-branches.tsx** - Identified role-mixed branches, suggested component separation
2. **nested-ternary.tsx** - Identified nested ternaries, suggested early returns and extraction
3. **magic-numbers.tsx** - Identified magic numbers, suggested named constants
4. **checkout-summary.tsx** - Identified interleaved user type logic, suggested per-user-type components
5. **notification-badge.tsx** - Identified deeply nested ternaries, suggested helper functions and lookup objects

The evaluation correctly identified each seeded issue and suggested appropriate fixes aligned with the grading criteria. No harmful fixes (over-abstraction, premature DRY, or adding comments to preserve poor patterns) were suggested.
