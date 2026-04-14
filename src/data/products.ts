export interface Product {
  id: string
  name: string
  localName: string
  description: string
  longDescription: string
  price: number
  originalPrice: number
  unit: string
  image: string
  rating: number
  reviews: number
  badge?: string
  benefits: string[]
  origin: string
  weight: string
  category: string
}

export const products: Product[] = [
  {
    id: 'pepper',
    name: 'Black Pepper',
    localName: 'Kurumulaku',
    description: 'The king of spices – bold, aromatic, and freshly harvested from the Western Ghats.',
    longDescription:
      'Our premium black pepper is sourced directly from small-scale hill farms in Kerala. Each peppercorn is hand-picked at peak ripeness, sun-dried naturally, and packed fresh to preserve essential oils. Known as the "King of Spices," black pepper adds depth to every dish and offers powerful antioxidant properties.',
    price: 299,
    originalPrice: 399,
    unit: '100g',
    image: '/images/pepper.png',
    rating: 4.9,
    reviews: 128,
    badge: 'Best Seller',
    benefits: ['Aids digestion', 'Rich in antioxidants', 'Anti-inflammatory', 'Boosts metabolism'],
    origin: 'Western Ghats, Kerala',
    weight: '100g',
    category: 'Spices',
  },
  {
    id: 'cardamom',
    name: 'Green Cardamom',
    localName: 'Elakka',
    description: 'Intensely aromatic pods bursting with sweet-spicy flavour – perfect for chai and desserts.',
    longDescription:
      'Grown at high elevations in the Cardamom Hills of Kerala, our green cardamom pods are harvested at just the right moment for maximum oil content. Each pod is plump, bright green, and filled with fragrant seeds delivering an unmistakably sweet-spicy flavour that elevates any dish.',
    price: 449,
    originalPrice: 599,
    unit: '50g',
    image: '/images/cardamom.png',
    rating: 4.8,
    reviews: 96,
    badge: 'Premium',
    benefits: ['Freshens breath', 'Aids digestion', 'Rich in essential oils', 'Antioxidant-rich'],
    origin: 'Cardamom Hills, Kerala',
    weight: '50g',
    category: 'Spices',
  },
  {
    id: 'turmeric',
    name: 'Golden Turmeric',
    localName: 'Manjal',
    description: "Pure, vibrant turmeric powder with high curcumin content – nature's golden healer.",
    longDescription:
      'Our turmeric is cold-processed from freshly harvested roots to preserve maximum curcumin content. With a rich golden colour and earthy, slightly bitter flavour, this turmeric is perfect for curries, golden milk, and daily wellness routines. High curcumin content certified.',
    price: 199,
    originalPrice: 249,
    unit: '200g',
    image: '/images/turmeric.png',
    rating: 4.9,
    reviews: 214,
    badge: 'Ayurvedic',
    benefits: ['Powerful anti-inflammatory', 'Rich in curcumin', 'Boosts immunity', 'Natural antioxidant'],
    origin: 'Erode, Tamil Nadu',
    weight: '200g',
    category: 'Spices',
  },
  {
    id: 'clove',
    name: 'Clove',
    localName: 'Grampoo',
    description: 'Handpicked whole cloves with an intense, warm aroma – perfect for biryanis and chai.',
    longDescription:
      'Our cloves are carefully harvested when flower buds are fully formed but still closed, ensuring maximum essential oil content. They carry a warm, sweet, and slightly peppery flavour, ideal for both savory and sweet preparations. A cornerstone of traditional Kerala cuisine.',
    price: 349,
    originalPrice: 449,
    unit: '100g',
    image: '/images/clove.png',
    rating: 4.7,
    reviews: 87,
    badge: 'Premium',
    benefits: ['Natural analgesic', 'Aids digestion', 'Antimicrobial', 'Rich in eugenol'],
    origin: 'Maluku Islands & Kerala',
    weight: '100g',
    category: 'Spices',
  },
  {
    id: 'nutmeg',
    name: 'Nutmeg',
    localName: 'Jaathikka',
    description: 'Warm, earthy whole nutmeg – a versatile spice for curries, sweets, and beverages.',
    longDescription:
      "Sourced from mature nutmeg trees in Kerala's lush spice plantations, our whole nutmegs are dried naturally over several weeks. Grate fresh for a burst of warm, nutty flavour. Encased in brilliant red mace, every nutmeg is a testament to pure, unadulterated quality.",
    price: 399,
    originalPrice: 499,
    unit: '100g',
    image: '/images/nutmeg.png',
    rating: 4.8,
    reviews: 65,
    badge: 'Exotic',
    benefits: ['Aids sleep', 'Improves digestion', 'Anti-inflammatory', 'Brain health'],
    origin: 'Kerala Spice Plantations',
    weight: '100g',
    category: 'Spices',
  },
]
