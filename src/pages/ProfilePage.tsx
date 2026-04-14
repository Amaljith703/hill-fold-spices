import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User as UserIcon, Mail, Phone, Calendar, MapPin, Save, Gift } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import CartSidebar from '../components/cart/CartSidebar'

export default function ProfilePage() {
  const { user, updateProfile, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    dob: user?.dob || '',
    address: user?.address || ''
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
  }

  // Check if today is birthday
  const today = new Date().toISOString().split('T')[0].substring(5) // MM-DD
  const userDob = formData.dob ? formData.dob.substring(5) : ''
  const isBirthday = userDob === today && userDob !== ''

  if (!user) return null

  return (
    <div className="min-h-screen bg-spice-cream dark:bg-dark-900 pt-24 pb-12 transition-colors duration-300">
      <Navbar />
      <CartSidebar />
      
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        
        {/* Birthday Banner */}
        {isBirthday && (
          <div className="bg-gradient-to-r from-spice-amber to-spice-gold rounded-2xl p-6 mb-8 text-white shadow-xl shadow-spice-amber/20 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0">
                   <Gift size={24} />
                </div>
                <div>
                   <h3 className="font-poppins font-bold text-xl">Happy Birthday, {formData.name.split(' ')[0]}! 🎉</h3>
                   <p className="font-inter text-sm text-white/90">Here's a special gift from us to celebrate your day.</p>
                </div>
             </div>
             <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30 text-center shrink-0">
                <p className="text-xs uppercase tracking-wider mb-1 font-semibold">Use Code</p>
                <p className="font-poppins font-black text-xl tracking-widest">HFSBDAY25</p>
             </div>
          </div>
        )}

        <div className="card p-8 md:p-10">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-dark-700">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold font-poppins text-3xl shadow-lg">
               {formData.name.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white">My Profile</h1>
              <p className="text-gray-500 dark:text-gray-400 font-inter text-sm">Manage your personal information and delivery address</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><UserIcon size={16} /></span>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field pl-10" placeholder="John Doe" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={16} /></span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field pl-10" placeholder="john@example.com" />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Phone size={16} /></span>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="input-field pl-10" placeholder="+91 98765 43210" />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Date of Birth</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Calendar size={16} /></span>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input-field pl-10 text-gray-900 dark:text-white" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins flex items-center justify-between">
                <span>Default Delivery Address</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400"><MapPin size={16} /></span>
                <textarea 
                  name="address" 
                  rows={3} 
                  value={formData.address} 
                  onChange={handleChange} 
                  className="input-field pl-10 py-3.5 resize-none" 
                  placeholder="Enter your complete address..."
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-dark-700">
              <button type="submit" className="btn-primary w-full md:w-auto">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
