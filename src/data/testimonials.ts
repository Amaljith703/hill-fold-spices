export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  review: string
  avatar: string
  product: string
  date: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ananya Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    review:
      "The quality of Hill Fold's cardamom is absolutely exceptional. The aroma fills my entire kitchen the moment I open the package. I've tried many premium brands but nothing compares to this freshness!",
    avatar: 'AS',
    product: 'Green Cardamom',
    date: '2025-03-20',
  },
  {
    id: '2',
    name: 'Ravi Krishnamurthy',
    location: 'Bangalore, Karnataka',
    rating: 5,
    review:
      "Finally found a spice brand I can trust completely! The turmeric from Hill Fold has an incredible deep golden colour and powerful aroma. My grandmother says it reminds her of turmeric from 40 years ago.",
    avatar: 'RK',
    product: 'Golden Turmeric',
    date: '2025-03-15',
  },
  {
    id: '3',
    name: 'Priya Nambiar',
    location: 'Kochi, Kerala',
    rating: 5,
    review:
      "As a Keralite, I'm very particular about my spices. Hill Fold Spices has won my heart. The black pepper is so fresh and pungent – exactly like the ones we used to get from our own farm as children!",
    avatar: 'PN',
    product: 'Black Pepper',
    date: '2025-02-28',
  },
  {
    id: '4',
    name: 'Mohammed Ismail',
    location: 'Chennai, Tamil Nadu',
    rating: 4,
    review:
      'Ordered the custom spice blend for my restaurant and received exactly what I asked for. Quality is consistent, packaging is excellent, and delivery was on time. Will definitely be a regular customer.',
    avatar: 'MI',
    product: 'Custom Blend',
    date: '2025-02-10',
  },
  {
    id: '5',
    name: 'Sunita Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    review:
      'Discovered Hill Fold through Instagram and immediately ordered their clove and nutmeg. The cloves are so aromatic that even my neighbours asked about the smell when I opened the package! Fast shipping too.',
    avatar: 'SP',
    product: 'Clove & Nutmeg',
    date: '2025-01-25',
  },
  {
    id: '6',
    name: 'Dr. Arun Menon',
    location: 'Thiruvananthapuram, Kerala',
    rating: 5,
    review:
      "I recommend these spices to my Ayurvedic patients. The purity and potency are exceptional — you can tell these haven't been adulterated. Hill Fold maintains the highest standards I've seen in any commercial spice brand.",
    avatar: 'AM',
    product: 'Turmeric & Pepper',
    date: '2025-01-05',
  },
]
