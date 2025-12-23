export function StarRating({ value = 0, outOf = 5, size = 14, showValue = false }) {
  const v = Math.max(0, Math.min(outOf, Number(value) || 0))
  const full = Math.floor(v)
  const half = v - full >= 0.5

  const stars = []
  for (let i = 1; i <= outOf; i++) {
    const isFull = i <= full
    const isHalf = !isFull && half && i === full + 1
    stars.push(
      <span
        key={i}
        className={`star ${isFull ? 'full' : isHalf ? 'half' : 'empty'}`}
        style={{ fontSize: size }}
        aria-hidden="true"
      >
        ★
      </span>,
    )
  }

  return (
    <span className="stars" aria-label={`Rating ${v.toFixed(1)} out of ${outOf}`}>
      {stars}
      {showValue ? <span className="starValue">{v.toFixed(1)}</span> : null}
    </span>
  )
}


