import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartSidebar from '../components/cart/CartSidebar'
import OTPLoginModal from '../components/auth/OTPLoginModal'

import HeroSection from '../components/sections/HeroSection'
import ProductsSection from '../components/sections/ProductsSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import GallerySection from '../components/sections/GallerySection'
import BlogSection from '../components/sections/BlogSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-spice-cream dark:bg-dark-900 transition-colors duration-300">
      <Navbar />
      <CartSidebar />
      <OTPLoginModal />

      <main>
        <HeroSection />
        <ProductsSection />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <BlogSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
