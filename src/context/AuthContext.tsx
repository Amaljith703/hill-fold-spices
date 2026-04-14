import { createContext, useContext, useState, type ReactNode, useRef } from 'react'
import toast from 'react-hot-toast'

export interface User {
  name: string
  email: string
  mobile: string
  address: string
  dob: string
}

export interface Order {
  id: string
  date: string
  items: Array<{ name: string; quantity: number; price: number; unit: string }>
  total: number
  status: 'Processing' | 'Shipped' | 'Delivered'
  address: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isGuest: boolean
  orders: Order[]
  otpStep: 'input' | 'verify'
  loginMethod: 'email' | 'mobile'
  showLoginModal: boolean
  openLogin: () => void
  closeLogin: () => void
  setLoginMethod: (m: 'email' | 'mobile') => void
  sendOtp: (contact: string) => void
  verifyOtp: (otp: string) => void
  logout: () => void
  updateProfile: (data: User) => void
  addOrder: (order: Order) => void
  continueAsGuest: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isGuest, setIsGuest] = useState(false)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-2025-001',
      date: '2025-03-10',
      items: [{ name: 'Black Pepper', quantity: 2, price: 299, unit: '100g' }],
      total: 598,
      status: 'Delivered',
      address: '123 MG Road, Kochi, Kerala - 682001',
    },
    {
      id: 'ORD-2025-002',
      date: '2025-03-28',
      items: [
        { name: 'Green Cardamom', quantity: 1, price: 449, unit: '50g' },
        { name: 'Golden Turmeric', quantity: 2, price: 199, unit: '200g' },
      ],
      total: 847,
      status: 'Shipped',
      address: '123 MG Road, Kochi, Kerala - 682001',
    },
  ])
  const [otpStep, setOtpStep] = useState<'input' | 'verify'>('input')
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const pendingContact = useRef('')
  const pendingOtp = useRef('')

  const openLogin = () => {
    setShowLoginModal(true)
    setOtpStep('input')
  }
  const closeLogin = () => {
    setShowLoginModal(false)
    setOtpStep('input')
  }

  const sendOtp = (contact: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    pendingOtp.current = otp
    pendingContact.current = contact
    setOtpStep('verify')
    toast.success(`OTP sent! Demo OTP: ${otp}`, {
      duration: 10000,
      icon: '📱',
      style: { background: '#014421', color: '#fff', borderRadius: '12px' },
    })
  }

  const verifyOtp = (otp: string) => {
    if (otp.length === 6) {
      const isEmail = loginMethod === 'email'
      setUser({
        name: 'Valued Customer',
        email: isEmail ? pendingContact.current : '',
        mobile: !isEmail ? pendingContact.current : '',
        address: '',
        dob: '',
      })
      setIsGuest(false)
      closeLogin()
      toast.success('Welcome to Hill Fold Spices! 🌿', {
        style: { background: '#014421', color: '#fff', borderRadius: '12px' },
      })
    } else {
      toast.error('Please enter a valid 6-digit OTP')
    }
  }

  const logout = () => {
    setUser(null)
    setIsGuest(false)
    toast('Logged out. See you soon! 👋', { icon: '🌿' })
  }

  const updateProfile = (data: User) => {
    setUser(data)
    toast.success('Profile updated!', {
      style: { background: '#014421', color: '#fff', borderRadius: '12px' },
    })
  }

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev])
  }

  const continueAsGuest = () => {
    setIsGuest(true)
    closeLogin()
    toast('Browsing as Guest 👤', { icon: '🌿' })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isGuest,
        orders,
        otpStep,
        loginMethod,
        showLoginModal,
        openLogin,
        closeLogin,
        setLoginMethod,
        sendOtp,
        verifyOtp,
        logout,
        updateProfile,
        addOrder,
        continueAsGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
