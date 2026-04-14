import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Send, Leaf } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '#home' },
    { label: 'Products', href: '#products' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Blog', href: '#blog' },
  ],
  'Our Spices': [
    { label: 'Black Pepper', href: '#products' },
    { label: 'Green Cardamom', href: '#products' },
    { label: 'Golden Turmeric', href: '#products' },
    { label: 'Clove (Grampoo)', href: '#products' },
    { label: 'Nutmeg (Jaathikka)', href: '#products' },
  ],
  'Support': [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQs', href: '#contact' },
    { label: 'Shipping Policy', href: '#contact' },
    { label: 'Return Policy', href: '#contact' },
    { label: 'Privacy Policy', href: '#contact' },
  ],
}

const socials = [
  { href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
  { href: '#', label: 'YouTube', color: 'hover:text-red-400' },
]

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    toast.success('Subscribed! Welcome to the Hill Fold family 🌿', {
      style: { background: '#014421', color: '#fff', borderRadius: '12px' },
    })
    setEmail('')
  }

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark-900 text-gray-300 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary-700 via-spice-gold to-primary-500" />

      {/* Green leaf pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-primary-500" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-primary-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-600/50">
                <img
                  src="/images/logo.png"
                  alt="Hill Fold Spices"
                  className="w-full h-full object-cover"
                  onError={e => {
                    const t = e.currentTarget
                    t.style.display = 'none';
                    t.parentElement!.innerHTML = '<div class="w-full h-full bg-primary-700 flex items-center justify-center text-white font-bold font-poppins">HF</div>'
                  }}
                />
              </div>
              <div>
                <p className="font-poppins font-bold text-white text-lg leading-tight">HILL FOLD</p>
                <p className="font-poppins text-xs text-spice-gold tracking-widest uppercase">Spices</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-inter mb-6 max-w-xs">
              Pure spices sourced directly from the Western Ghats. From nature to your kitchen — we preserve the art of authentic spice farming.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`px-3 py-1.5 rounded-full bg-dark-800 border border-dark-700 flex items-center justify-center text-gray-400 ${color} border-transparent hover:border-current transition-all duration-300 text-xs font-semibold`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-poppins font-semibold text-white mb-4 text-sm">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-gray-400 hover:text-primary-400 text-sm font-inter transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-primary-500">›</span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-primary-900/50 to-dark-800 rounded-2xl p-6 mb-10 border border-dark-700">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-primary-700/40 flex items-center justify-center">
                <Leaf size={18} className="text-primary-400" />
              </div>
              <div>
                <h4 className="font-poppins font-semibold text-white text-sm">Subscribe for Spice Tips & Offers</h4>
                <p className="text-gray-400 text-xs font-inter">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                placeholder="Enter your email"
                className="flex-1 md:w-56 px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-600 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all font-inter"
              />
              <button
                onClick={handleSubscribe}
                className="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl transition-all font-semibold flex items-center gap-2 text-sm active:scale-95"
              >
                <Send size={14} /> Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Contact Row */}
        <div className="flex flex-wrap gap-6 mb-10 text-sm text-gray-400">
          <a href="mailto:hello@hillfoldspices.com" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <Mail size={15} className="text-primary-500" /> hello@hillfoldspices.com
          </a>
          <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <Phone size={15} className="text-primary-500" /> +91 98765 43210
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="text-primary-500" /> Cardamom Hills, Idukki, Kerala – 685531
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-inter">
          <p>© {new Date().getFullYear()} Hill Fold Spices. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Fresh spices. Honest sourcing. No compromise.</span>
          </div>
          <p>Made with ❤️ in Kerala, India</p>
        </div>
      </div>
    </footer>
  )
}
