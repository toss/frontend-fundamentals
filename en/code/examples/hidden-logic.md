# Revealing Hidden Logic

<div style="margin-top: 16px">
<Badge type="info" text="Predictability" />
</div>
If there is hidden logic that is not revealed in the name, parameters, or return value of a function or component, it can be difficult for collaborating colleagues to predict its behavior.

## 📝 Code Example

The following code is a `fetchBalance` function that can be used to check a user's account balance. Each time the function is called, it implicitly logs `balance_fetched`.

```typescript 4
async function fetchBalance(): Promise<number> {  
  const balance = await http.get<number>('...');

  logging.log('balance_fetched');

  return balance;
}
```

## 👃 Smell the Code

### Predictability

From the name and return type of the `fetchBalance` function, it is not clear that logging of `balance_fetched` is taking place. Therefore, logging might occur even in places where it is not desired.

Additionally, if an error occurs in the logging logic, the logic for fetching the account balance might suddenly break.

## ✏️ Work on Improving
Leave only the logic that can be predicted by the function's name, parameters, and return type in the implementation.

```typescript
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>('...');

  return balance;
}
```

Separate the logging code.

```tsx
<Button 
  onClick={async () => {
    const balance = await fetchBalance();
    logging.log('balance_fetched');

    await syncBalance(balance);
  }}
>
  Update Account Balance
</Button>
```