export interface Service {
  id: string
  title: string
  iconKey: string
  description: string
  longDescription: string
  cta: string
  color: string
}

export const services: Service[] = [
  {
    id: 'custom-mixing',
    title: 'Custom Spice Mixing',
    iconKey: 'blend',
    description: 'Create your own unique spice blend tailored to your exact culinary needs and taste profile.',
    longDescription:
      'Work with our master blenders to craft a custom spice mixture that matches your taste profile perfectly. Ideal for restaurants, hotels, and passionate home cooks. Choose from our 50+ spice library and we blend it fresh to order.',
    cta: 'Create Your Blend',
    color: 'from-primary-700 to-primary-500',
  },
  {
    id: 'custom-grinding',
    title: 'Custom Grinding',
    iconKey: 'grind',
    description: 'Get your spices ground to your preferred coarseness – from fine powder to coarse crush.',
    longDescription:
      'Our traditional stone-grinding process preserves natural oils and flavours better than industrial machine grinding. Choose fine, medium, or coarse grinding for any spice. Orders fulfilled within 2 business days.',
    cta: 'Order Custom Grind',
    color: 'from-spice-amber to-spice-gold',
  },
  {
    id: 'fast-delivery',
    title: 'Fast Delivery',
    iconKey: 'delivery',
    description: 'Fresh spices delivered to your doorstep within 2–3 business days across India.',
    longDescription:
      'We use vacuum-sealed, moisture-proof packaging to ensure your spices arrive fresh. Real-time order tracking included. Free delivery on all orders above ₹500. Same-day dispatch for orders placed before 12 PM.',
    cta: 'Shop Now',
    color: 'from-blue-600 to-blue-400',
  },
  {
    id: 'courier',
    title: 'International Courier',
    iconKey: 'courier',
    description: 'Authentic Kerala spices shipped worldwide – bringing India to your global kitchen.',
    longDescription:
      'We ship to over 30 countries with full export compliance, proper labeling, and certification. Our international packages are inspected and certified to meet the import regulations of the destination country.',
    cta: 'International Order',
    color: 'from-purple-600 to-purple-400',
  },
]
