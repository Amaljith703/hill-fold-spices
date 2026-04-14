import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Eye, Star, X, Leaf, MapPin, CheckCircle, ChevronRight } from 'lucide-react'
import { products, type Product } from '../../data/products'
import { useCart } from '../../context/CartContext'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          size={12}
          className={s <= Math.round(rating) ? 'text-spice-gold fill-spice-gold' : 'text-gray-300 dark:text-gray-600'}
        />
      ))}
    </div>
  )
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-dark-900 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        {/* Image */}
        <div className="relative h-56 md:h-72">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
          >
            <X size={18} />
          </button>
          {product.badge && (
            <span className="absolute top-4 left-4 badge badge-gold">{product.badge}</span>
          )}
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-poppins font-bold text-2xl">{product.name}</h3>
            <p className="text-white/70 text-sm">{product.localName}</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={13} className="text-primary-600" />
              {product.origin}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 font-inter leading-relaxed mb-6">
            {product.longDescription}
          </p>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="font-poppins font-semibold text-gray-900 dark:text-white mb-3 text-sm">Health Benefits</h4>
            <div className="grid grid-cols-2 gap-2">
              {product.benefits.map(b => (
                <div key={b} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle size={14} className="text-primary-600 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Price + Add */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-poppins font-black text-3xl text-primary-700 dark:text-primary-400">
                  ₹{product.price}
                </span>
                <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                <span className="badge badge-green text-xs">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-inter mt-0.5">per {product.unit}</p>
            </div>
            <button
              onClick={() => {
                addItem({ id: product.id, name: product.name, price: product.price, image: product.image, unit: product.unit })
                onClose()
              }}
              className="btn-primary"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart()
  const [showModal, setShowModal] = useState(false)
  const discount = Math.round((1 - product.price / product.originalPrice) * 100)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="card group cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className="badge badge-gold text-xs">{product.badge}</span>
            )}
            <span className="badge bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-xs">{discount}% OFF</span>
          </div>

          {/* Quick View */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-xs font-semibold font-poppins px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-white shadow-md"
          >
            <Eye size={12} /> Quick View
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-base leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-0.5">{product.localName}</p>
            </div>
            <div className="flex items-center gap-1 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-full">
              <Star size={10} className="text-spice-gold fill-spice-gold" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
            </div>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-xs font-inter leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mb-4">
            <Leaf size={11} className="text-primary-500" />
            <span>{product.origin}</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-poppins font-black text-xl text-primary-700 dark:text-primary-400">
                  ₹{product.price}
                </span>
                <span className="text-gray-400 line-through text-xs">₹{product.originalPrice}</span>
              </div>
              <span className="text-gray-400 text-xs">/{product.unit}</span>
            </div>

            <button
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, unit: product.unit })}
              className="btn-primary text-sm px-4 py-2"
            >
              <ShoppingCart size={14} /> Add
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && <ProductModal product={product} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 md:py-28 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge badge-green mb-4">🌿 Our Collection</span>
          <h2 className="section-title mb-4">
            Premium <span className="text-gradient">Spices & Herbs</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Each spice is hand-selected, naturally processed, and delivered fresh.
            No fillers. No artificial flavours. Just pure, honest spices.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-inter mb-4">
            🚚 Free delivery on orders above ₹500 • 🔒 Secure payment • ✅ 100% natural
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-semibold cursor-pointer hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
            View all products <ChevronRight size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
