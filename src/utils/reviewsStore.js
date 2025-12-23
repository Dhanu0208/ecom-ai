const KEY = 'nm_reviews_v1'

/**
 * Stored as: { [productId]: Review[] }
 * Review: { id, name, rating(1..5), text, createdAt }
 */

function safeParse(json) {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

function readAll() {
  const raw = localStorage.getItem(KEY)
  const data = safeParse(raw || '')
  if (!data || typeof data !== 'object') return {}
  return data
}

function writeAll(all) {
  localStorage.setItem(KEY, JSON.stringify(all))
}

export function getReviews(productId) {
  const all = readAll()
  const list = all[productId]
  return Array.isArray(list) ? list : []
}

export function addReview(productId, { name, rating, text }) {
  const r = {
    id: crypto.randomUUID(),
    name: String(name || 'Anonymous').trim() || 'Anonymous',
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    text: String(text || '').trim(),
    createdAt: new Date().toISOString(),
  }
  const all = readAll()
  const prev = Array.isArray(all[productId]) ? all[productId] : []
  all[productId] = [r, ...prev]
  writeAll(all)
  return r
}

export function reviewStats(reviews) {
  const count = reviews.length
  const avg =
    count === 0
      ? 0
      : reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / count
  const byStar = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  for (const r of reviews) {
    const s = Math.min(5, Math.max(1, Number(r.rating) || 0))
    if (byStar[s] != null) byStar[s] += 1
  }
  return { count, avg, byStar }
}


