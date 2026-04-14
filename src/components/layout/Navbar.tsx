import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X, Sun, Moon, User, LogOut, Package, ChevronDown } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { totalItems, toggleCart } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const { isLoggedIn, isGuest, user, openLogin, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMobileOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/10 py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary-600 ring-offset-2 ring-offset-transparent group-hover:ring-primary-400 transition-all duration-300">
                  <img
                    src="/images/logo.png"
                    alt="Hill Fold Spices"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const t = e.currentTarget
                      t.style.display = 'none'
                      t.parentElement!.innerHTML =
                        '<div class="w-full h-full bg-primary-700 flex items-center justify-center text-white font-bold text-sm font-poppins">HF</div>'
                    }}
                  />
                </div>
                <div className={`transition-colors duration-300 ${scrolled ? '' : 'text-white'}`}>
                  <p className="font-poppins font-bold text-base leading-tight text-primary-700 dark:text-primary-400">
                    HILL FOLD
                  </p>
                  <p className="font-poppins text-xs font-medium text-spice-amber tracking-widest uppercase">
                    Spices
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`nav-link text-sm font-medium transition-all duration-200 ${
                    scrolled
                      ? 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className={`p-2 rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Cart */}
              <button
                id="cart-btn"
                onClick={toggleCart}
                aria-label="Open cart"
                className={`relative p-2 rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-spice-amber text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-badge"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Auth */}
              <div className="hidden md:block relative">
                {isLoggedIn ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(o => !o)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                        scrolled
                          ? 'bg-primary-50 dark:bg-dark-700 text-primary-700 dark:text-primary-400'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-sm font-medium font-poppins">{user?.name?.split(' ')[0]}</span>
                      <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-gray-100 dark:border-dark-700 overflow-hidden"
                        >
                          <button
                            onClick={() => { navigate('/profile'); setUserMenuOpen(false) }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700"
                          >
                            <User size={16} /> My Profile
                          </button>
                          <button
                            onClick={() => { navigate('/orders'); setUserMenuOpen(false) }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700"
                          >
                            <Package size={16} /> My Orders
                          </button>
                          <hr className="border-gray-100 dark:border-dark-700" />
                          <button
                            onClick={() => { logout(); setUserMenuOpen(false) }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    id="login-btn"
                    onClick={openLogin}
                    className={`px-4 py-2 rounded-full text-sm font-semibold font-poppins transition-all duration-300 ${
                      scrolled
                        ? 'bg-primary-700 text-white hover:bg-primary-600 shadow-md'
                        : 'bg-white text-primary-700 hover:bg-primary-50'
                    }`}
                  >
                    {isGuest ? '👤 Guest' : 'Login'}
                  </button>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className={`lg:hidden p-2 rounded-full transition-all ${
                  scrolled
                    ? 'bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
                    : 'bg-white/20 text-white'
                }`}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white dark:bg-dark-900 flex flex-col pt-20 px-6 pb-10 overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col gap-1 mt-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-4 px-4 rounded-xl text-lg font-medium font-poppins text-gray-800 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-dark-800 hover:text-primary-700 dark:hover:text-primary-400 transition-all border-b border-gray-100 dark:border-dark-800"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <button onClick={() => { navigate('/profile'); setMobileOpen(false) }} className="btn-outline w-full justify-center">
                    <User size={16} /> My Profile
                  </button>
                  <button onClick={() => { navigate('/orders'); setMobileOpen(false) }} className="btn-outline w-full justify-center">
                    <Package size={16} /> My Orders
                  </button>
                  <button onClick={() => { logout(); setMobileOpen(false) }} className="text-red-500 text-sm font-medium py-2">
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={() => { openLogin(); setMobileOpen(false) }} className="btn-primary w-full justify-center">
                  Login / Sign Up
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
