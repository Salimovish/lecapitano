// Generate a random order number with a specific format (e.g., PZ-2024-XXXX)
export function generateOrderNumber(): string {
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PZ-${new Date().getFullYear()}-${random}`;
}