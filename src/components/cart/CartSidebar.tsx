import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-dark-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-dark-700">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-primary-700 dark:text-primary-400" size={22} />
                <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-white">
                  Your Cart
                </h2>
                {totalItems > 0 && (
                  <span className="badge bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300">
                    {totalItems} item{totalItems !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 transition-all text-gray-500 dark:text-gray-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-dark-800 flex items-center justify-center">
                    <ShoppingBag size={32} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-gray-700 dark:text-gray-300 text-lg">
                      Your cart is empty
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                      Add some premium spices to get started!
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="btn-primary mt-2"
                  >
                    Browse Products
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      className="flex gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-dark-700"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-dark-700">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-poppins font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.unit}</p>
                        <p className="font-bold text-primary-700 dark:text-primary-400 mt-1">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:text-primary-700 dark:hover:text-primary-400 transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-semibold text-gray-900 dark:text-white text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-gray-200 dark:bg-dark-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:text-primary-700 dark:hover:text-primary-400 transition-all"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto w-7 h-7 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-dark-700 space-y-4 bg-white dark:bg-dark-900">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Delivery</span>
                    <span className={totalPrice >= 500 ? 'text-green-500 font-medium' : ''}>
                      {totalPrice >= 500 ? 'FREE' : '₹50'}
                    </span>
                  </div>
                  <div className="h-px bg-gray-100 dark:bg-dark-700" />
                  <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white font-poppins">
                    <span>Total</span>
                    <span>₹{(totalPrice + (totalPrice >= 500 ? 0 : 50)).toLocaleString()}</span>
                  </div>
                </div>
                {totalPrice < 500 && (
                  <p className="text-xs text-center text-spice-amber">
                    Add ₹{500 - totalPrice} more for FREE delivery! 🎉
                  </p>
                )}
                <button onClick={handleCheckout} className="btn-primary w-full justify-center">
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-red-400 hover:text-red-600 py-1 transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
