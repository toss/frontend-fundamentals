# EVAL TASK: Cohesion - Payment Feature with Scattered Files

## Expected Issue
Identify that payment-related code is scattered across multiple unrelated directories instead of being colocated. Related files should be grouped together (types, components, hooks, utils for the payment feature).

## Domain
E-commerce payment processing

## File Structure (Problematic)
```
src/
  components/
    common/
      PaymentMethodSelector.tsx  <- Payment UI scattered in common
    forms/
      CreditCardForm.tsx         <- Payment form in generic forms folder
  hooks/
    usePaymentValidation.ts      <- Payment hook mixed with other hooks
  types/
    payment.ts                   <- Types far from components
  utils/
    pricing.ts                   <- Payment calculations mixed with general utils
  constants/
    payment-config.ts            <- Config in separate constants folder
  services/
    payment-api.ts               <- API calls in services folder
```

## Better Structure Would Be
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
```

## Files in This Task
Examine each file and note how they reference each other across distant directories, making it hard to understand the payment feature as a whole.
