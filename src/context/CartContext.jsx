import { createContext, useContext, useMemo, useReducer } from 'react'
import { discountedUnitPrice } from '../utils/pricing.js'

/**
 * Cart item structure:
 * { productId, qty, size }
 */

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { productId, qty = 1, size = null } = action.payload
      const key = `${productId}__${size ?? 'NA'}`
      const existing = state.itemsByKey[key]
      const nextQty = (existing?.qty || 0) + qty
      return {
        ...state,
        itemsByKey: {
          ...state.itemsByKey,
          [key]: { productId, size, qty: Math.max(1, nextQty) },
        },
      }
    }
    case 'SET_QTY': {
      const { key, qty } = action.payload
      const item = state.itemsByKey[key]
      if (!item) return state
      const nextQty = Math.max(1, Number(qty) || 1)
      return {
        ...state,
        itemsByKey: { ...state.itemsByKey, [key]: { ...item, qty: nextQty } },
      }
    }
    case 'REMOVE': {
      const { key } = action.payload
      if (!state.itemsByKey[key]) return state
      const next = { ...state.itemsByKey }
      delete next[key]
      return { ...state, itemsByKey: next }
    }
    case 'CLEAR':
      return { itemsByKey: {} }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { itemsByKey: {} })

  const api = useMemo(() => {
    const items = Object.entries(state.itemsByKey).map(([key, item]) => ({
      key,
      ...item,
    }))

    const totalQty = items.reduce((acc, it) => acc + it.qty, 0)

    return {
      items,
      totalQty,
      addToCart: (productId, opts = {}) =>
        dispatch({ type: 'ADD', payload: { productId, ...opts } }),
      setQty: (key, qty) => dispatch({ type: 'SET_QTY', payload: { key, qty } }),
      remove: (key) => dispatch({ type: 'REMOVE', payload: { key } }),
      clear: () => dispatch({ type: 'CLEAR' }),

      /**
       * Calculates totals against a product map.
       * @param {Map<string, {price:number, discountPct:number}>} productMap
       */
      totals: (productMap) => {
        const subtotal = items.reduce((acc, it) => {
          const p = productMap.get(it.productId)
          if (!p) return acc
          return acc + Number(p.price) * it.qty
        }, 0)

        const discountedTotal = items.reduce((acc, it) => {
          const p = productMap.get(it.productId)
          if (!p) return acc
          const unit = discountedUnitPrice(p.price, p.discountPct)
          return acc + unit * it.qty
        }, 0)

        const discountSaved = Math.max(0, subtotal - discountedTotal)

        // Example extra cart-level discount: 5% off if discountedTotal >= 5000
        const cartLevelPct = discountedTotal >= 5000 ? 5 : 0
        const cartLevelDiscount = Math.round((discountedTotal * cartLevelPct) / 100)
        const total = Math.max(0, discountedTotal - cartLevelDiscount)

        return {
          subtotal,
          discountSaved,
          cartLevelPct,
          cartLevelDiscount,
          total,
        }
      },
    }
  }, [state.itemsByKey])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


