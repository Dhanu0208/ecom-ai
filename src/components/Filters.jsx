export function Filters({
  query,
  setQuery,
  brand,
  setBrand,
  maxPrice,
  setMaxPrice,
  onlyDiscounted,
  setOnlyDiscounted,
  sort,
  setSort,
  brands,
  maxPriceLimit,
}) {
  return (
    <aside className="card filters">
      <div className="filtersHeader">
        <div className="filtersTitle">Filters</div>
        <button
          className="btn ghost"
          onClick={() => {
            setQuery('')
            setBrand('all')
            setOnlyDiscounted(false)
            setMaxPrice(maxPriceLimit)
            setSort('featured')
          }}
        >
          Reset
        </button>
      </div>

      <label className="field">
        <span className="fieldLabel">Search</span>
        <input
          className="input"
          placeholder="Try: jeans, hoodie, sneakers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <div className="filtersGrid2">
        <label className="field">
          <span className="fieldLabel">Brand</span>
          <select
            className="select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="all">All</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="fieldLabel">Sort</span>
          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Rating: High → Low</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span className="fieldLabel">Max price: ₹{maxPrice}</span>
        <input
          className="range"
          type="range"
          min="0"
          max={maxPriceLimit}
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </label>

      <label className="check">
        <input
          type="checkbox"
          checked={onlyDiscounted}
          onChange={(e) => setOnlyDiscounted(e.target.checked)}
        />
        <span>Only discounted items</span>
      </label>
    </aside>
  )
}


