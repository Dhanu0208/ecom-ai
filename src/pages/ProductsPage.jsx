import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PRODUCTS, CATEGORIES } from '../data/products.js'
import { Filters } from '../components/Filters.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { discountedUnitPrice } from '../utils/pricing.js'

function titleCase(s) {
  return String(s || '')
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}

export function ProductsPage() {
  const { category } = useParams()
  const normalized = String(category || '').toLowerCase()
  const activeCategory = CATEGORIES.includes(normalized) ? normalized : 'men'

  const categoryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  )

  const brands = useMemo(() => {
    const set = new Set(categoryProducts.map((p) => p.brand))
    return Array.from(set).sort()
  }, [categoryProducts])

  const maxPriceLimit = useMemo(() => {
    const max = Math.max(0, ...categoryProducts.map((p) => p.price))
    return Math.ceil(max / 50) * 50
  }, [categoryProducts])

  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('all')
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit)
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)
  const [sort, setSort] = useState('featured')

  // keep slider synced if category changes
  useEffect(() => {
    setMaxPrice(maxPriceLimit)
  }, [maxPriceLimit])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = categoryProducts.filter((p) => {
      if (brand !== 'all' && p.brand !== brand) return false
      if (onlyDiscounted && !(p.discountPct > 0)) return false
      if (p.price > maxPrice) return false
      if (!q) return true
      const hay = `${p.title} ${p.brand} ${(p.tags || []).join(' ')}`.toLowerCase()
      return hay.includes(q)
    })

    if (sort === 'price-asc') {
      list = list
        .slice()
        .sort(
          (a, b) =>
            discountedUnitPrice(a.price, a.discountPct) -
            discountedUnitPrice(b.price, b.discountPct),
        )
    } else if (sort === 'price-desc') {
      list = list
        .slice()
        .sort(
          (a, b) =>
            discountedUnitPrice(b.price, b.discountPct) -
            discountedUnitPrice(a.price, a.discountPct),
        )
    } else if (sort === 'rating-desc') {
      list = list.slice().sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [query, brand, maxPrice, onlyDiscounted, sort, categoryProducts])

  return (
    <div className="page">
      <header className="pageHeader">
        <div>
          <h1 className="pageTitle">{titleCase(activeCategory)} Collection</h1>
          <p className="muted">
            {filtered.length} item{filtered.length === 1 ? '' : 's'} found
          </p>
        </div>
        <div className="heroCard">
          <div className="heroTitle">Extra 5% off</div>
          <div className="muted">On cart total ₹5000+ after item discounts</div>
        </div>
      </header>

      <div className="shopGrid">
        <Filters
          query={query}
          setQuery={setQuery}
          brand={brand}
          setBrand={setBrand}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onlyDiscounted={onlyDiscounted}
          setOnlyDiscounted={setOnlyDiscounted}
          sort={sort}
          setSort={setSort}
          brands={brands}
          maxPriceLimit={maxPriceLimit}
        />

        <section className="products">
          {filtered.length === 0 ? (
            <div className="card emptyState">
              <div className="emptyTitle">No products match your filters</div>
              <p className="muted">Try clearing search or increasing max price.</p>
            </div>
          ) : (
            <div className="productsGrid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}


