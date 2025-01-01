export function validateCardNumber(cardNumber: string): boolean {
  return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
}

export function validateExpiryDate(expiryDate: string): boolean {
  const [month, year] = expiryDate.split('/').map(n => parseInt(n, 10));
  if (!month || !year) return false;
  
  const now = new Date();
  const expiry = new Date(2000 + year, month - 1);
  return expiry > now;
}

export function validateCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}