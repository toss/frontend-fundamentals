# Cohesion Skill Evaluation

> **Evaluation Timestamp:** 2026-01-17
> **Model:** Claude Opus 4.5

## Summary

| Task | Grade | Issue Found | Fix Suggested |
|------|-------|-------------|---------------|
| scattered-files.md | PASS | User-related files scattered across 5 directories | Colocate in `features/user/` |
| magic-number-duplication.tsx | PASS | Same magic number (20) duplicated in 3 files | Create single source of truth constant `PAGE_SIZE` |
| payment-flow/ | PASS | Payment feature code scattered across 7 directories | Colocate all payment code in `features/payment/` |

**Overall Result: 3/3 PASS**

---

## Detailed Results

### scattered-files.md

**Code Review:**

The task presents a file structure where user-related functionality is spread across 5 different directories:

```
src/
  components/UserForm.tsx
  hooks/useUserValidation.ts
  utils/userHelpers.ts
  types/userTypes.ts
  api/userApi.ts
```

The context explicitly states:
- UserForm.tsx imports useUserValidation
- useUserValidation imports userTypes
- userHelpers is only used by UserForm
- userApi is called by useUserValidation
- All 5 files change together when user requirements change

**Issue Identified:**

Related files for the "user" feature are scattered across the codebase by file type (components, hooks, utils, types, api) rather than by feature/domain. This violates the principle of cohesion because:

1. Developers must navigate 5 different directories to understand the user feature
2. When user requirements change, modifications span multiple unrelated folders
3. The tight coupling between these files (imports, shared changes) indicates they belong together
4. It's difficult to see the "user" feature as a cohesive unit

**Suggested Fix:**

Colocate all user-related files in a feature directory:

```
src/
  features/
    user/
      UserForm.tsx
      useUserValidation.ts
      userHelpers.ts
      userTypes.ts
      userApi.ts
      index.ts  (optional barrel export)
```

This structure:
- Groups related code by domain/feature
- Makes the user feature self-contained and easy to understand
- Simplifies imports (shorter relative paths)
- Makes it clear what code changes together

**Grade:** PASS

**Reasoning:** Correctly identified that scattered files across type-based directories is the cohesion issue. The suggested fix (colocate by feature in `features/user/`) matches the expected solution exactly. Did not suggest creating one giant file or over-abstracting.

---

### magic-number-duplication.tsx

**Code Review:**

The task shows the same magic number `20` (page size) appearing in three different files:

1. `components/Pagination.tsx`: `const pageSize = 20;`
2. `hooks/useItems.ts`: `const offset = (page - 1) * 20;` and `return fetchItems({ offset, limit: 20 });`
3. `api/items.ts`: `const limit = params.limit || 20;`

**Issue Identified:**

The page size value `20` is duplicated across 3 files with no single source of truth. This creates several problems:

1. **Inconsistency risk**: If page size needs to change, developers must find and update all occurrences
2. **No semantic meaning**: The number 20 doesn't convey intent - is it a page size? A timeout? A retry count?
3. **Hidden coupling**: These files are implicitly coupled through this shared value but that relationship is invisible
4. **Bug-prone**: Easy to miss one occurrence during updates, causing pagination mismatches

**Suggested Fix:**

Create a centralized constant with a descriptive name:

```typescript
// constants/pagination.ts (or constants.ts)
export const PAGE_SIZE = 20;
```

Then import and use this constant everywhere:

```typescript
// components/Pagination.tsx
import { PAGE_SIZE } from '../constants/pagination';
const pages = Math.ceil(total / PAGE_SIZE);

// hooks/useItems.ts
import { PAGE_SIZE } from '../constants/pagination';
const offset = (page - 1) * PAGE_SIZE;
return fetchItems({ offset, limit: PAGE_SIZE });

// api/items.ts
import { PAGE_SIZE } from '../constants/pagination';
const limit = params.limit || PAGE_SIZE;
```

This provides:
- Single source of truth
- Semantic meaning through the constant name
- Explicit coupling via imports
- One place to change if requirements change

**Grade:** PASS

**Reasoning:** Correctly identified the magic number duplication issue (value `20` repeated across files). The suggested fix creates a single source of truth constant `PAGE_SIZE`, which is the expected solution. Did not suggest creating different constants per file or inline comments - the bad fixes listed in the grading criteria.

---

### payment-flow/

**Code Review:**

This task contains 7 payment-related files spread across what would be 7 different directories in the problematic structure:

**Simulated file locations:**
- `src/components/common/PaymentMethodSelector.tsx`
- `src/components/forms/CreditCardForm.tsx`
- `src/hooks/usePaymentValidation.ts`
- `src/types/payment.ts`
- `src/utils/pricing.ts` (mixed payment + general pricing utils)
- `src/constants/payment-config.ts`
- `src/services/payment-api.ts`

**Evidence of scattered code from file imports:**

`PaymentMethodSelector.tsx` imports from 5 different locations:
```typescript
import { PaymentMethod, PaymentConfig } from '../../../types/payment';
import { usePaymentValidation } from '../../../hooks/usePaymentValidation';
import { formatCardNumber, maskCardNumber } from '../../../utils/pricing';
import { SUPPORTED_CARD_TYPES, PAYMENT_ERRORS, MIN_PAYMENT_AMOUNT } from '../../../constants/payment-config';
import { validatePaymentMethod } from '../../../services/payment-api';
import CreditCardForm from '../../forms/CreditCardForm';
```

`CreditCardForm.tsx` has similar scattered imports:
```typescript
import { CreditCardData, CardValidationResult } from '../../../types/payment';
import { detectCardType, validateLuhn } from '../../../utils/pricing';
import { CARD_NUMBER_LENGTH, CVV_LENGTH, EXPIRY_FORMAT_REGEX } from '../../../constants/payment-config';
```

**Issue Identified:**

The payment feature is scattered across 7 directories organized by file type rather than by feature. This causes several cohesion problems:

1. **Long import paths**: Multiple `../../../` traversals indicate files are far from related code
2. **Mixed concerns**: `utils/pricing.ts` contains both general pricing utilities AND payment-specific functions (formatCardNumber, validateLuhn, detectCardType, isCardExpired)
3. **Types far from usage**: Payment types are only used by payment components but stored in generic `types/` folder
4. **Constants isolated**: Payment-specific constants like `CARD_NUMBER_LENGTH`, `CVV_LENGTH`, and `CARD_PATTERNS` are in a generic constants folder
5. **Hook separated from components**: `usePaymentValidation` is tightly coupled with `CreditCardForm` but stored in different directory trees
6. **API calls separated**: Payment API functions are in `services/` despite being exclusively used by payment components

All 7 files are tightly coupled and change together when payment requirements change, yet they're scattered by type.

**Suggested Fix:**

Colocate all payment-related code in a feature directory:

```
src/
  features/
    payment/
      components/
        PaymentMethodSelector.tsx
        CreditCardForm.tsx
      hooks/
        usePaymentValidation.ts
      types.ts
      utils.ts
      constants.ts
      api.ts
      index.ts
```

Or flatten for smaller features:

```
src/
  features/
    payment/
      PaymentMethodSelector.tsx
      CreditCardForm.tsx
      usePaymentValidation.ts
      types.ts
      utils.ts
      constants.ts
      api.ts
      index.ts
```

Benefits:
- All payment code in one place - easy to understand the feature as a whole
- Short, simple imports within the feature
- Clear boundary between payment and other features
- `utils/pricing.ts` can remain for general pricing, but payment-specific utilities move to `payment/utils.ts`
- When payment requirements change, all changes are localized

**What NOT to do:**
- Do NOT create abstract "shared" modules that increase indirection
- Do NOT create deep folder hierarchies (payment/validation/card/helpers/...)
- Do NOT force unrelated code together

**Grade:** PASS

**Reasoning:** Correctly identified that payment feature code is scattered across 7 directories (components/common, components/forms, hooks, types, utils, constants, services). The suggested fix colocates all payment code in `features/payment/`, which matches the expected solution exactly. Did not suggest creating abstract shared modules or forcing unrelated code together - the bad fixes listed in the grading criteria.

---

## Evaluation Summary

All three cohesion tasks were evaluated successfully:

| Task | Expected Issue | Issue Identified | Expected Fix | Fix Suggested | Grade |
|------|---------------|------------------|--------------|---------------|-------|
| scattered-files.md | Files spread across directories | YES - user files in 5 dirs | Colocate by feature | YES - features/user/ | PASS |
| magic-number-duplication.tsx | Same magic number in multiple files | YES - value 20 in 3 files | Single source of truth constant | YES - PAGE_SIZE constant | PASS |
| payment-flow/ | Payment code scattered across 7 directories | YES - 7 dirs identified | Colocate in features/payment/ | YES - features/payment/ | PASS |

**Final Result: 3/3 PASS (100%)**

The cohesion skill evaluation demonstrates correct identification of:
1. Feature-related files scattered by type rather than domain
2. Magic number duplication requiring centralized constants
3. Complex feature code spread across multiple unrelated directories

All suggested fixes align with the principle of improving cohesion through colocation without over-abstraction.
