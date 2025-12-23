import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { discountedUnitPrice, moneyINR } from '../utils/pricing.js'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { StarRating } from './StarRating.jsx'

export function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isAuthed } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [size, setSize] = useState(product.sizes?.[0] ?? null)

  const unit = useMemo(
    () => discountedUnitPrice(product.price, product.discountPct),
    [product.price, product.discountPct],
  )

  return (
    <article className="card productCard">
      <Link to={`/product/${product.id}`} className="productThumb">
        <img className="productImg" src={product.image} alt={product.title} />
      </Link>

      <div className="productBody">
        <div className="productTop">
          <div>
            <Link to={`/product/${product.id}`} className="productTitle linkTitle">
              {product.title}
            </Link>
            <div className="muted productMeta">
              {product.brand} • <StarRating value={product.rating} size={12} />{' '}
              <span className="muted">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          {product.discountPct > 0 ? (
            <span className="chip">-{product.discountPct}%</span>
          ) : null}
        </div>

        <div className="productPriceRow">
          <div className="priceNow">{moneyINR(unit)}</div>
          {product.discountPct > 0 ? (
            <div className="priceWas">{moneyINR(product.price)}</div>
          ) : null}
        </div>

        <div className="productActions">
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
            className="btn primary"
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
        </div>
      </div>
    </article>
  )
}


