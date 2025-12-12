// data/mockData.js
export const products = [
  {
    id: '1',
    name: 'Wireless Headphone X1',
    price: 299000,
    rating: 4.6,
    image: 'https://via.placeholder.com/300x200.png?text=Headphone',
    aiScore: 0.92,
    cluster: 'Tech Enthusiast',
  },
  {
    id: '2',
    name: 'Casual Sneakers Lite',
    price: 199000,
    rating: 4.3,
    image: 'https://via.placeholder.com/300x200.png?text=Sneakers',
    aiScore: 0.87,
    cluster: 'Lifestyle Shopper',
  },
  {
    id: '3',
    name: 'Budget Smartphone A3',
    price: 1599000,
    rating: 4.5,
    image: 'https://via.placeholder.com/300x200.png?text=Smartphone',
    aiScore: 0.89,
    cluster: 'Budget Shopper',
  },
  {
    id: '4',
    name: 'Smartwatch Pro',
    price: 549000,
    rating: 4.4,
    image: 'https://via.placeholder.com/300x200.png?text=Smartwatch',
    aiScore: 0.95,
    cluster: 'Tech Enthusiast',
  },
];

export const clusters = [
  {
    id: 'A',
    name: 'Tech Enthusiast',
    description: 'Sering membeli produk elektronik, gadget, dan aksesoris teknologi.',
    behaviors: [
      'Sering cari produk elektronik',
      'Tertarik promo gadget',
      'Rating tinggi untuk produk teknologi',
    ],
  },
  {
    id: 'B',
    name: 'Budget Shopper',
    description: 'Sensitif terhadap harga, mencari diskon dan promo.',
    behaviors: [
      'Sortir produk berdasarkan harga',
      'Sering menambah ke wishlist',
      'Responsif ke flash sale',
    ],
  },
  {
    id: 'C',
    name: 'Lifestyle Shopper',
    description: 'Fokus pada fashion, aksesoris, dan gaya hidup.',
    behaviors: [
      'Sering browsing fashion',
      'Follow brand favorit',
      'Sering lihat review produk lifestyle',
    ],
  },
];

export const featureImportance = [
  { feature: 'Purchase History', importance: 34 },
  { feature: 'Search Frequency', importance: 22 },
  { feature: 'Category Preference', importance: 18 },
  { feature: 'Click Behavior', importance: 15 },
  { feature: 'Rating Behavior', importance: 11 },
];

export const modelMetrics = {
  rmse: 0.85,
  mae: 0.63,
  precisionAtK: 0.87,
};
