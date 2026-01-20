// EVAL TASK: Readability - Nested Ternary
// Expected: Identify that nested ternary makes code hard to read, suggest early returns or if/else

function getStatusMessage(status: string, count: number, isAdmin: boolean) {
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
}

function UserBadge({ user }: { user: User }) {
  return (
    <span className={user.isVerified ? (user.isPremium ? 'gold' : 'silver') : 'none'}>
      {user.isVerified ? (user.isPremium ? '⭐ Premium' : '✓ Verified') : 'Unverified'}
    </span>
  );
}
