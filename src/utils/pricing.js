export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export function moneyINR(amount) {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `₹${Math.round(amount)}`
  }
}

export function discountedUnitPrice(price, discountPct) {
  const pct = clamp(Number(discountPct || 0), 0, 100)
  return Math.round(Number(price) * (1 - pct / 100))
}


