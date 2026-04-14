import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Clock, CheckCircle, Truck, PackageCheck, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartSidebar from '../components/cart/CartSidebar'

const statusConfig = {
  Processing: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  Shipped: { icon: Truck, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  Delivered: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' }
}

export default function OrderHistoryPage() {
  const { orders, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen bg-spice-cream dark:bg-dark-900 pt-24 pb-12 transition-colors duration-300">
      <Navbar />
      <CartSidebar />

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center text-primary-700 dark:text-primary-400">
            <Package size={24} />
          </div>
          <div>
            <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">My Orders</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Track and view your past purchases</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="card p-12 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center mb-6">
              <PackageCheck size={40} className="text-gray-400" />
            </div>
            <h2 className="font-poppins font-bold text-xl text-gray-900 dark:text-white mb-2">No orders found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
              You haven't placed any orders yet. Discover our premium spices and add some flavor to your kitchen!
            </p>
            <button onClick={() => navigate('/')} className="btn-primary">
               Shop Now <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => {
              const StatusIcon = statusConfig[order.status].icon
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={order.id} 
                  className="card overflow-hidden"
                >
                  <div className="bg-gray-50 dark:bg-dark-800/50 p-5 md:p-6 border-b border-gray-100 dark:border-dark-700 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                       <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Order placed</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Total</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">₹{order.total.toLocaleString()}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Order ID</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</p>
                       </div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                       <StatusIcon size={16} /> {order.status}
                    </div>
                  </div>

                  <div className="p-5 md:p-6 divide-y divide-gray-100 dark:divide-dark-700">
                    {order.items.map((item, idx) => (
                      <div key={idx} className={`flex items-center justify-between gap-4 ${idx > 0 ? 'pt-4' : 'pb-4'} ${idx === order.items.length - 1 ? 'border-b-0 pb-0' : ''}`}>
                         <div>
                            <p className="font-poppins font-medium text-gray-900 dark:text-white">{item.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} × {item.unit}</p>
                         </div>
                         <p className="font-semibold text-gray-900 dark:text-white text-right">
                           ₹{(item.price * item.quantity).toLocaleString()}
                         </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
