export const CATEGORIES = /** @type {const} */ (['men', 'women', 'kids'])

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {'men'|'women'|'kids'} category
 * @property {string} title
 * @property {string} brand
 * @property {number} price
 * @property {number} discountPct  // 0..100
 * @property {number} rating       // 0..5
 * @property {('S'|'M'|'L'|'XL'|'2-4Y'|'5-7Y'|'8-10Y'|'11-13Y')[]} sizes
 * @property {string[]} tags
 * @property {string} image        // demo image URL
 */

/** @type {Product[]} */
export const PRODUCTS = [
  // MEN
  {
    id: 'men-tee-001',
    category: 'men',
    title: 'Essential Cotton Tee',
    brand: 'Northline',
    price: 799,
    discountPct: 10,
    rating: 4.5,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['tshirt', 'cotton', 'daily'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'men-jeans-002',
    category: 'men',
    title: 'Slim Fit Denim Jeans',
    brand: 'BlueForge',
    price: 2199,
    discountPct: 15,
    rating: 4.2,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['jeans', 'denim', 'slim'],
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'men-hoodie-003',
    category: 'men',
    title: 'Fleece Hoodie',
    brand: 'Haven',
    price: 1899,
    discountPct: 20,
    rating: 4.7,
    sizes: ['M', 'L', 'XL'],
    tags: ['hoodie', 'winter', 'fleece'],
    image:
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'men-shoes-004',
    category: 'men',
    title: 'Everyday Sneakers',
    brand: 'Stride',
    price: 2799,
    discountPct: 5,
    rating: 4.1,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['shoes', 'sneakers', 'casual'],
    image:
      'https://images.unsplash.com/photo-1528701800489-20be9cbb8f43?auto=format&fit=crop&w=1200&q=80',
  },

  // WOMEN
  {
    id: 'women-dress-101',
    category: 'women',
    title: 'Floral Midi Dress',
    brand: 'Bloom',
    price: 2499,
    discountPct: 25,
    rating: 4.6,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['dress', 'floral', 'party'],
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'women-top-102',
    category: 'women',
    title: 'Ribbed Knit Top',
    brand: 'SilkRoad',
    price: 1099,
    discountPct: 10,
    rating: 4.3,
    sizes: ['S', 'M', 'L'],
    tags: ['top', 'knit', 'daily'],
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80&sat=-40&hue=10',
  },
  {
    id: 'women-jeans-103',
    category: 'women',
    title: 'High-Rise Straight Jeans',
    brand: 'BlueForge',
    price: 2399,
    discountPct: 15,
    rating: 4.4,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['jeans', 'straight', 'denim'],
    image:
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'women-bag-104',
    category: 'women',
    title: 'Mini Crossbody Bag',
    brand: 'Cove',
    price: 1599,
    discountPct: 30,
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL'],
    tags: ['bag', 'accessories', 'daily'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80&sat=-35',
  },

  // KIDS
  {
    id: 'kids-tee-201',
    category: 'kids',
    title: 'Graphic Tee (Pack of 2)',
    brand: 'TinyWave',
    price: 699,
    discountPct: 10,
    rating: 4.5,
    sizes: ['2-4Y', '5-7Y', '8-10Y', '11-13Y'],
    tags: ['kids', 'tshirt', 'cotton'],
    image:
      'https://images.unsplash.com/photo-1518609958373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kids-shorts-202',
    category: 'kids',
    title: 'Playtime Shorts',
    brand: 'TinyWave',
    price: 499,
    discountPct: 5,
    rating: 4.1,
    sizes: ['2-4Y', '5-7Y', '8-10Y'],
    tags: ['kids', 'shorts', 'summer'],
    image:
      'https://images.unsplash.com/photo-1529957711665-01c1b5f29d6b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kids-jacket-203',
    category: 'kids',
    title: 'Lightweight Jacket',
    brand: 'CozyCub',
    price: 1299,
    discountPct: 20,
    rating: 4.7,
    sizes: ['5-7Y', '8-10Y', '11-13Y'],
    tags: ['kids', 'jacket', 'outerwear'],
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80&sat=-60',
  },
  {
    id: 'kids-shoes-204',
    category: 'kids',
    title: 'Comfort Sneakers',
    brand: 'Stride',
    price: 1499,
    discountPct: 15,
    rating: 4.3,
    sizes: ['2-4Y', '5-7Y', '8-10Y', '11-13Y'],
    tags: ['kids', 'shoes', 'sneakers'],
    image:
      'https://images.unsplash.com/photo-1526178613552-2b45c6c302f7?auto=format&fit=crop&w=1200&q=80',
  },
]


