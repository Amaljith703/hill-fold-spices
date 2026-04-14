export interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  image: string
  category: string
  categoryColor: string
}

export const blogs: Blog[] = [
  {
    id: 'turmeric-benefits',
    title: 'The Golden Power of Turmeric: Health Benefits You Need to Know',
    excerpt:
      "Turmeric has been used for over 4,000 years in Ayurvedic medicine. Discover why this golden spice deserves a place in your daily diet.",
    content: `Turmeric (Curcuma longa) contains curcumin — a bioactive compound with powerful anti-inflammatory and antioxidant properties. Scientific studies have confirmed what Ayurvedic practitioners have known for millennia.

Key Health Benefits:

Anti-inflammatory: Curcumin suppresses many molecules known to play a role in inflammation, making it as effective as some anti-inflammatory drugs — without the side effects.

Antioxidant Powerhouse: Turmeric neutralises free radicals and boosts the body's own antioxidant enzymes, slowing cellular aging.

Brain Health: May increase brain-derived neurotrophic factor (BDNF), linked to improved memory and a lower risk of brain diseases.

Heart Health: Improves endothelial function, reducing the risk of heart disease.

How to Use:
Add a teaspoon of turmeric to warm milk with a pinch of black pepper — which enhances curcumin absorption by 2000% — for a classic golden milk. Use in curries, soups, rice dishes, and smoothies for a daily health boost.`,
    author: 'Dr. Priya Nair',
    date: '2025-03-15',
    readTime: '5 min read',
    image: '/images/turmeric.png',
    category: 'Health & Wellness',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  },
  {
    id: 'spice-processing',
    title: 'From Farm to Table: How Our Spices Are Processed',
    excerpt:
      'Ever wondered how raw spices go from a hill farm in Kerala to your kitchen shelf? We take you behind the scenes of our artisan spice processing.',
    content: `At Hill Fold Spices, we believe that quality starts from the ground up. Our processing methods are designed to preserve every bit of flavour, aroma, and nutritional value in each spice.

Our Processing Journey:

1. Harvest: Spices are hand-picked at peak ripeness by our partner farmers.
2. Sorting: Each batch is manually sorted to remove any damaged or substandard spices.
3. Natural Drying: Sun-dried over 3–7 days, depending on the spice.
4. Cleaning: Cleaned using traditional winnowing methods to remove impurities.
5. Packaging: Vacuum-sealed in food-grade, resealable packaging.

Unlike commercially processed spices that may use artificial additives or irradiation to extend shelf life, our process is 100% natural and chemical-free. We never compromise on quality, even when it means slower processing times.`,
    author: 'Rajan Thomas',
    date: '2025-02-28',
    readTime: '7 min read',
    image: '/images/clove.png',
    category: 'Behind the Scenes',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  {
    id: 'organic-farming',
    title: "Organic Farming Tips from Kerala's Spice Gardens",
    excerpt:
      "Learn the traditional farming practices that have made Kerala's spices world-famous for centuries — and how we carry them forward today.",
    content: `The Western Ghats of Kerala have been producing some of the world's finest spices for over 3,000 years. The unique combination of high altitude, heavy rainfall, and rich soil creates ideal conditions — conditions that our partner farmers carefully maintain.

Key Organic Practices:

Intercropping: Growing multiple spice plants together creates a balanced ecosystem, reducing the need for pesticides.

Natural Fertilization: Using compost and green manure instead of synthetic fertilizers preserves soil health for future generations.

Water Conservation: Drip irrigation and rainwater harvesting reduce water wastage significantly.

Natural Pest Control: Using neem oil and introducing beneficial insects keeps pests in check without chemicals.

Shade Growing: Many spices thrive under the canopy of larger trees, mimicking their natural rainforest habitat.

Our partner farmers follow certified organic practices verified by independent auditors. By choosing Hill Fold Spices, you directly support sustainable farming communities.`,
    author: 'Meena Krishnan',
    date: '2025-01-20',
    readTime: '6 min read',
    image: '/images/pepper.png',
    category: 'Farming',
    categoryColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  {
    id: 'cardamom-guide',
    title: "The Complete Guide to Cardamom: Nature's Fragrant Treasure",
    excerpt:
      'Green, black, white — cardamom is more diverse than you think. This comprehensive guide covers everything you need to know about the Queen of Spices.',
    content: `Cardamom is one of the world's most prized spices, celebrated as the "Queen of Spices" for its regal aroma and versatile flavour. Green cardamom from Kerala's Cardamom Hills is considered the finest variety in the world.

Types of Cardamom:
- Green Cardamom: The most common variety, with a sweet, floral, slightly spicy flavour. Used in sweet and savory dishes.
- Black Cardamom: Smoky, earthy, and intense. Used in hearty savory preparations, especially rice dishes.
- White Cardamom: Bleached green cardamom with a milder flavour, popular in Scandinavian baking.

Culinary Uses:
- Chai and coffee (the most iconic use in India)
- Biryani and rice dishes
- Sweets, halwa, and desserts
- Baked goods, including cardamom rolls

Health Benefits:
- Freshens breath naturally and fights oral bacteria
- Aids digestive problems including bloating and gas
- May lower blood pressure due to diuretic effect
- Rich in antioxidants and anti-inflammatory compounds`,
    author: 'Chef Suresh Menon',
    date: '2024-12-10',
    readTime: '8 min read',
    image: '/images/cardamom.png',
    category: 'Spice Guides',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  },
]
