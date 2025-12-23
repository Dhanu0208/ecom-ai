import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { discountedUnitPrice, moneyINR } from '../utils/pricing.js'
import { addReview, getReviews, reviewStats } from '../utils/reviewsStore.js'
import { StarRating } from '../components/StarRating.jsx'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString()
  } catch {
    return ''
  }
}

export function ProductOverviewPage() {
  const { id } = useParams()
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id])
  const navigate = useNavigate()
  const location = useLocation()

  const { isAuthed, user } = useAuth()
  const { addToCart } = useCart()

  const [size, setSize] = useState(product?.sizes?.[0] ?? null)
  useEffect(() => {
    setSize(product?.sizes?.[0] ?? null)
  }, [product?.id])

  const [reviews, setReviews] = useState([])
  useEffect(() => {
    if (!product) return
    setReviews(getReviews(product.id))
  }, [product?.id])

  const stats = useMemo(() => reviewStats(reviews), [reviews])
  const combinedAvg =
    stats.count > 0 ? stats.avg : Number(product?.rating || 0)
  const combinedCount = stats.count > 0 ? stats.count : 0

  const unit = product ? discountedUnitPrice(product.price, product.discountPct) : 0

  const [rName, setRName] = useState('')
  const [rRating, setRRating] = useState(5)
  const [rText, setRText] = useState('')
  const [err, setErr] = useState('')

  if (!product) {
    return (
      <div className="page">
        <div className="card emptyState">
          <div className="emptyTitle">Product not found</div>
          <p className="muted">That item doesn’t exist in the demo catalog.</p>
          <Link className="btn primary" to="/products">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="breadcrumbs muted">
        <Link to="/" className="crumb">
          Home
        </Link>
        <span className="crumbSep">/</span>
        <Link to={`/category/${product.category}`} className="crumb">
          {product.category.toUpperCase()}
        </Link>
        <span className="crumbSep">/</span>
        <span className="crumbCurrent">{product.title}</span>
      </div>

      <div className="productOverview">
        <div className="card productMedia">
          <img className="productHeroImg" src={product.image} alt={product.title} />
        </div>

        <div className="productInfo">
          <div className="productTitleLg">{product.title}</div>
          <div className="muted">
            {product.brand} • <StarRating value={combinedAvg} showValue />{' '}
            {combinedCount ? (
              <span className="muted">({combinedCount} review{combinedCount === 1 ? '' : 's'})</span>
            ) : (
              <span className="muted">(no reviews yet)</span>
            )}
          </div>

          <div className="productPriceLg">
            <span className="priceNow">{moneyINR(unit)}</span>
            {product.discountPct > 0 ? (
              <>
                <span className="priceWas">{moneyINR(product.price)}</span>
                <span className="chip">-{product.discountPct}%</span>
              </>
            ) : null}
          </div>

          <div className="card productBuy">
            <label className="field">
              <span className="fieldLabel">Size</span>
              <select
                className="select"
                value={size ?? ''}
                onChange={(e) => setSize(e.target.value)}
              >
                {(product.sizes || []).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="btn primary wide"
              onClick={() => {
                if (!isAuthed) {
                  navigate('/login', { state: { from: location.pathname } })
                  return
                }
                addToCart(product.id, { qty: 1, size })
              }}
            >
              {isAuthed ? 'Add to cart' : 'Login to add'}
            </button>

            <div className="muted small">
              Tags: {(product.tags || []).join(', ')}
            </div>
          </div>
        </div>
      </div>

      <div className="reviewsGrid">
        <section className="card reviewsPanel">
          <div className="reviewsHeader">
            <div>
              <div className="reviewsTitle">Ratings & Reviews</div>
              <div className="muted">
                <StarRating value={combinedAvg} showValue />{' '}
                {combinedCount ? `• ${combinedCount} review(s)` : ''}
              </div>
            </div>
          </div>

          <div className="ratingBars">
            {[5, 4, 3, 2, 1].map((s) => {
              const c = stats.byStar[s] || 0
              const pct = stats.count ? Math.round((c / stats.count) * 100) : 0
              return (
                <div key={s} className="barRow">
                  <span className="barLabel">{s}★</span>
                  <div className="barTrack">
                    <div className="barFill" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="barCount muted">{c}</span>
                </div>
              )
            })}
          </div>

          <div className="reviewsList">
            {reviews.length === 0 ? (
              <div className="muted">No reviews yet. Be the first to review!</div>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="reviewItem">
                  <div className="reviewTop">
                    <div className="reviewName">{r.name}</div>
                    <div className="muted">{formatDate(r.createdAt)}</div>
                  </div>
                  <StarRating value={r.rating} />
                  {r.text ? <div className="reviewText">{r.text}</div> : null}
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="card reviewForm">
          <div className="reviewsTitle">Write a review</div>
          <div className="muted">
            {isAuthed ? (
              <>
                Posting as <b>{user?.name || 'Account'}</b>
              </>
            ) : (
              <>
                Please <Link to="/login">login</Link> to submit a review.
              </>
            )}
          </div>

          {err ? <div className="alert danger">{err}</div> : null}

          <label className="field">
            <span className="fieldLabel">Name</span>
            <input
              className="input"
              value={rName}
              onChange={(e) => setRName(e.target.value)}
              placeholder="Your name"
              disabled={!isAuthed}
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Rating</span>
            <select
              className="select"
              value={rRating}
              onChange={(e) => setRRating(Number(e.target.value))}
              disabled={!isAuthed}
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Okay</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Bad</option>
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Review</span>
            <textarea
              className="input"
              rows={4}
              value={rText}
              onChange={(e) => setRText(e.target.value)}
              placeholder="What did you like (or dislike)?"
              disabled={!isAuthed}
            />
          </label>

          <button
            className="btn primary wide"
            disabled={!isAuthed}
            onClick={() => {
              setErr('')
              try {
                addReview(product.id, {
                  name: (rName || user?.name || 'Anonymous').trim(),
                  rating: rRating,
                  text: rText,
                })
                setReviews(getReviews(product.id))
                setRText('')
              } catch (e) {
                setErr(e?.message || 'Could not add review')
              }
            }}
          >
            Submit review
          </button>
        </aside>
      </div>
    </div>
  )
}


