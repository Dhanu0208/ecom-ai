import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { PRODUCTS } from '../data/products.js'
import { discountedUnitPrice, moneyINR } from '../utils/pricing.js'

export function CartPage() {
  const navigate = useNavigate()
  const { items, setQty, remove, clear, totals } = useCart()
  const { isAuthed } = useAuth()

  const productMap = useMemo(() => {
    const m = new Map()
    for (const p of PRODUCTS) m.set(p.id, p)
    return m
  }, [])

  const t = totals(productMap)

  const enriched = items
    .map((it) => {
      const p = productMap.get(it.productId)
      if (!p) return null
      const unit = discountedUnitPrice(p.price, p.discountPct)
      return {
        ...it,
        product: p,
        unit,
        lineTotal: unit * it.qty,
      }
    })
    .filter(Boolean)

  return (
    <div className="page">
      <header className="pageHeader">
        <div>
          <h1 className="pageTitle">Your Cart</h1>
          <p className="muted">
            {enriched.length} item type{enriched.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="headerActions">
          <button className="btn ghost" onClick={() => navigate(-1)}>
            Continue shopping
          </button>
          {enriched.length > 0 ? (
            <button className="btn danger" onClick={clear}>
              Clear cart
            </button>
          ) : null}
        </div>
      </header>

      {enriched.length === 0 ? (
        <div className="card emptyState">
          <div className="emptyTitle">Your cart is empty</div>
          <p className="muted">Add some items from the collections.</p>
          <Link className="btn primary" to="/category/men">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="cartGrid">
          <section className="card cartItems">
            <div className="cartItemsHeader">
              <div className="muted">Product</div>
              <div className="muted right">Qty</div>
              <div className="muted right">Total</div>
            </div>

            <div className="cartList">
              {enriched.map((it) => (
                <div key={it.key} className="cartRow">
                  <div className="cartLeft">
                    <div className="cartThumb">
                      <img
                        className="cartImg"
                        src={it.product.image}
                        alt={it.product.title}
                      />
                    </div>
                    <div className="cartInfo">
                      <div className="cartTitle">{it.product.title}</div>
                      <div className="muted">
                        {it.product.brand}
                        {it.size ? ` • Size ${it.size}` : ''}
                      </div>
                      <div className="cartUnit">
                        <span className="priceNow small">
                          {moneyINR(it.unit)}
                        </span>
                        {it.product.discountPct > 0 ? (
                          <span className="priceWas small">
                            {moneyINR(it.product.price)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="cartQty">
                    <button
                      className="btn ghost"
                      onClick={() => setQty(it.key, Math.max(1, it.qty - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      className="qtyInput"
                      inputMode="numeric"
                      value={it.qty}
                      onChange={(e) => setQty(it.key, e.target.value)}
                    />
                    <button
                      className="btn ghost"
                      onClick={() => setQty(it.key, it.qty + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="cartRight">
                    <div className="right priceNow">{moneyINR(it.lineTotal)}</div>
                    <button className="btn link" onClick={() => remove(it.key)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="card cartSummary">
            <div className="summaryTitle">Price details</div>

            <div className="summaryRow">
              <span className="muted">Subtotal</span>
              <span>{moneyINR(t.subtotal)}</span>
            </div>
            <div className="summaryRow">
              <span className="muted">Item discounts</span>
              <span className="good">− {moneyINR(t.discountSaved)}</span>
            </div>

            {t.cartLevelPct > 0 ? (
              <div className="summaryRow">
                <span className="muted">Cart discount ({t.cartLevelPct}%)</span>
                <span className="good">− {moneyINR(t.cartLevelDiscount)}</span>
              </div>
            ) : (
              <div className="hint muted">
                Add more items to unlock extra 5% off at ₹5000+
              </div>
            )}

            <div className="summaryDivider" />

            <div className="summaryRow total">
              <span>Total</span>
              <span>{moneyINR(t.total)}</span>
            </div>

            <button
              className="btn primary wide"
              onClick={() => {
                if (!isAuthed) {
                  navigate('/login', { state: { from: '/cart' } })
                  return
                }
                alert('Demo only')
              }}
            >
              Checkout (demo)
            </button>
            {!isAuthed ? (
              <div className="hint muted">
                Please <Link to="/login">login</Link> to checkout.
              </div>
            ) : null}
          </aside>
        </div>
      )}
    </div>
  )
}


