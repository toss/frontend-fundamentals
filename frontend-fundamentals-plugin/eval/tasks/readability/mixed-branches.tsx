// EVAL TASK: Readability - Mixed Branches
// Expected: Identify that admin and regular user code paths should be separated into different components

import { useEffect } from 'react';
import { useRole } from './hooks';
import { showAdminAnimation } from './animations';

function SubmitButton() {
  const isAdmin = useRole() === 'admin';

  useEffect(() => {
    if (!isAdmin) return;
    showAdminAnimation();
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <button className="admin-btn" onClick={handleAdminSubmit}>
        Approve & Submit
      </button>
    );
  }

  return (
    <button className="user-btn" disabled={!canSubmit}>
      Submit for Review
    </button>
  );
}

function handleAdminSubmit() {
  // admin-specific logic
}
