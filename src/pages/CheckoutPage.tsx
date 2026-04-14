import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, MapPin, CreditCard, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user, addOrder, openLogin, isLoggedIn, isGuest } = useAuth()
  const navigate = useNavigate()
  
  const [step, setStep] = useState<1 | 2 | 3>(1) // 1: Delivery, 2: Payment, 3: Success
  const [address, setAddress] = useState(user?.address || '')
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if cart is empty and not on success step
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      navigate('/')
    }
    // Require login or guest
    if (!isLoggedIn && !isGuest && step === 1) {
      toast('Please login to continue', { icon: '🔐' })
      navigate('/')
      setTimeout(() => openLogin(), 500)
    }
  }, [items.length, step, isLoggedIn, isGuest, navigate, openLogin])

  const deliveryFee = totalPrice >= 500 ? 0 : 50
  const grandTotal = totalPrice + deliveryFee

  const handlePayment = () => {
    if (!address.trim()) {
      toast.error('Please enter delivery address')
      return
    }
    setStep(2)
    // Simulate payment gateway loading
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
    }, 1500)
  }

  const completeOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      // Create order record
      const newOrder = {
        id: `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`,
        date: new Date().toISOString().split('T')[0],
        items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price, unit: i.unit })),
        total: grandTotal,
        status: 'Processing' as const,
        address
      }
      addOrder(newOrder)
      clearCart()
      setStep(3)
      setIsProcessing(false)
      window.scrollTo(0, 0)
    }, 2000)
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-spice-cream dark:bg-dark-900 flex flex-col pt-20">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-lg w-full p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-poppins font-bold text-3xl text-gray-900 dark:text-white mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 font-inter">
              Thank you for shopping with Hill Fold Spices. Your order is being processed and will be shipped soon.
            </p>
            <button onClick={() => navigate('/')} className="btn-primary w-full justify-center">
              Continue Shopping
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-spice-cream dark:bg-dark-900 pt-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary-700 dark:hover:text-primary-400 font-medium mb-8 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card p-6 md:p-8"
                >
                  <h2 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <MapPin className="text-primary-600" /> Delivery Details
                  </h2>

                  <div className="mb-6">
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Delivery Address</label>
                     <textarea
                       rows={4}
                       value={address}
                       onChange={(e) => setAddress(e.target.value)}
                       className="input-field resize-none"
                       placeholder="Enter your complete address with PIN code..."
                     />
                  </div>

                  <button 
                    onClick={handlePayment} 
                    disabled={!address.trim()}
                    className="btn-primary w-full justify-center"
                  >
                    Proceed to Payment
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="card p-6 md:p-8"
                >
                  <button onClick={() => setStep(1)} className="text-sm text-gray-500 mb-4 flex items-center gap-1 hover:text-primary-600">
                    <ArrowLeft size={14} /> Back to Address
                  </button>

                  <h2 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <CreditCard className="text-primary-600" /> Payment (Mock)
                  </h2>

                  {isProcessing ? (
                     <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-dark-700 rounded-xl">
                        <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 font-medium">Connecting to Payment Gateway...</p>
                     </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Mock Razorpay UI */}
                      <div className="border border-gray-200 dark:border-dark-700 rounded-xl p-6 bg-gray-50 dark:bg-dark-800/50">
                         <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200 dark:border-dark-700">
                            <div>
                               <p className="text-sm text-gray-500">Pay Hill Fold Spices</p>
                               <p className="font-bold text-xl dark:text-white">₹{grandTotal.toLocaleString()}</p>
                            </div>
                            <div className="w-10 h-10 bg-primary-700 rounded flex items-center justify-center text-white font-bold text-xs">HF</div>
                         </div>
                         <button 
                           onClick={completeOrder}
                           className="w-full bg-[#3399cc] hover:bg-[#2b82ad] text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
                         >
                           Pay Securely
                         </button>
                         <p className="text-center text-xs text-gray-400 mt-4 font-inter">
                           This is a mock payment for demo purposes. No real transaction will occur.
                         </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[400px]">
            <div className="card p-6 sticky top-24">
              <h3 className="font-poppins font-bold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ShoppingBag size={18} /> Order Summary
              </h3>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide border-b border-gray-100 dark:border-dark-700 pb-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover bg-gray-100" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity} x {item.unit}</p>
                    </div>
                    <p className="text-sm font-semibold dark:text-white">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-500 font-medium' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 dark:border-dark-700 pt-4 flex justify-between font-poppins font-bold text-xl text-gray-900 dark:text-white">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
