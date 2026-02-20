// EVAL TASK: Readability - Magic Numbers
// Expected: Identify magic numbers that lack semantic meaning, suggest named constants

function calculateDiscount(price: number, quantity: number) {
  if (quantity >= 100) {
    return price * 0.8; // What does 0.8 mean?
  } else if (quantity >= 50) {
    return price * 0.9;
  } else if (quantity >= 10) {
    return price * 0.95;
  }
  return price;
}

function validatePassword(password: string): boolean {
  return password.length >= 8 && password.length <= 128;
}

function Pagination({ total }: { total: number }) {
  const pages = Math.ceil(total / 20);
  return (
    <div style={{ marginTop: 16, padding: 24 }}>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i}>{i + 1}</button>
      ))}
    </div>
  );
}
