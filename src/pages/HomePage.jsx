import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products.js'
import { discountedUnitPrice, moneyINR } from '../utils/pricing.js'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { StarRating } from '../components/StarRating.jsx'

export function HomePage() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthed } = useAuth()

  const topItems = useMemo(() => {
    return PRODUCTS.slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
  }, [])

  const [idx, setIdx] = useState(0)
  const maxIdx = Math.max(0, topItems.length - 1)

  useEffect(() => {
    if (topItems.length <= 1) return
    const t = setInterval(() => setIdx((v) => (v + 1) % topItems.length), 3500)
    return () => clearInterval(t)
  }, [topItems.length])

  const active = topItems[idx]

  return (
    <div className="page">
      <header className="homeHero">
        <div className="homeHeroLeft">
          <h1 className="homeTitle">Shop the best picks for everyone</h1>
          <p className="muted">
            Men • Women • Kids — add to cart, apply discounts, and see totals instantly.
          </p>
          <div className="homeCtas">
            <button className="btn primary" onClick={() => navigate('/products')}>
              Explore products
            </button>
            <Link className="btn ghost" to="/category/men">
              Browse men
            </Link>
          </div>
        </div>

        <div className="card carousel">
          <div className="carouselTop">
            <div>
              <div className="carouselLabel">Top items</div>
              <div className="muted">Highest rated picks</div>
            </div>
            <div className="carouselBtns">
              <button
                className="btn ghost"
                onClick={() => setIdx((v) => (v - 1 + topItems.length) % topItems.length)}
                disabled={topItems.length === 0}
              >
                Prev
              </button>
              <button
                className="btn ghost"
                onClick={() => setIdx((v) => (v + 1) % topItems.length)}
                disabled={topItems.length === 0}
              >
                Next
              </button>
            </div>
          </div>

          {active ? (
            <div className="carouselBody">
              <div className="carouselImgWrap">
                <img className="carouselImg" src={active.image} alt={active.title} />
              </div>
              <div className="carouselInfo">
                <div className="carouselTitle">{active.title}</div>
                <div className="muted">
                  {active.brand} • {active.category.toUpperCase()} •{' '}
                  <StarRating value={active.rating} size={12} />{' '}
                  {active.rating.toFixed(1)}
                </div>
                <div className="carouselPrice">
                  <span className="priceNow">
                    {moneyINR(discountedUnitPrice(active.price, active.discountPct))}
                  </span>
                  {active.discountPct > 0 ? (
                    <span className="priceWas">{moneyINR(active.price)}</span>
                  ) : null}
                </div>
                <div className="carouselActions">
                  <button
                    className="btn primary"
                    onClick={() => {
                      if (!isAuthed) {
                        navigate('/login', { state: { from: '/' } })
                        return
                      }
                      addToCart(active.id, { qty: 1, size: active.sizes?.[0] ?? null })
                    }}
                  >
                    {isAuthed ? 'Add to cart' : 'Login to add'}
                  </button>
                  <button
                    className="btn ghost"
                    onClick={() => navigate(`/product/${active.id}`)}
                  >
                    View product
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="carouselDots" aria-label="Carousel pagination">
            {topItems.map((p, i) => (
              <button
                key={p.id}
                className={`dot ${i === idx ? 'active' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`Go to ${p.title}`}
              />
            ))}
          </div>
        </div>
      </header>

      <section className="infoGrid">
        <div className="card infoCard" id="about">
          <h2 className="infoTitle">About Us</h2>
          <p className="muted">
            We curate quality picks for men, women, and kids—priced fairly, shipped fast,
            and wrapped with care. All discounts and totals are shown transparently before
            you pay.
          </p>
        </div>

        <div className="card infoCard" id="contact">
          <h2 className="infoTitle">Contact Us</h2>
          <p className="muted">Need help? Reach us anytime.</p>
          <ul className="infoList">
            <li>Email: support@novamart.demo</li>
            <li>Phone: +1 (800) 555-0199</li>
            <li>Chat: In-app during business hours</li>
          </ul>
        </div>

        <div className="card infoCard" id="faq">
          <h2 className="infoTitle">FAQ</h2>
          <ul className="infoList">
            <li>Returns: 30-day easy returns on unworn items.</li>
            <li>Shipping: Free over ₹999; tracked delivery.</li>
            <li>Payments: Major cards, UPI, and wallets supported.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}


