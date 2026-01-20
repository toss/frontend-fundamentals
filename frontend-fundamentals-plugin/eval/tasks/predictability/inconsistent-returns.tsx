// EVAL TASK: Predictability - Inconsistent Return Types
// Expected: Identify that validation functions return different types, suggest discriminated union

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

function validateEmail(email: string) {
  if (!email) {
    return 'Email is required'; // Returns string
  }
  if (!email.includes('@')) {
    return 'Invalid email format'; // Returns string
  }
  return true; // Returns boolean
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return { valid: false, error: 'Too short' }; // Different shape
  }
  return { valid: true }; // Missing error field
}

function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false }; // Missing message
  }
  return { isValid: true, message: 'Valid' }; // Unnecessary message for success
}
