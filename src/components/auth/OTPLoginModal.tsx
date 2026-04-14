import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, ArrowRight, Shield, RefreshCw } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function OTPLoginModal() {
  const { showLoginModal, closeLogin, otpStep, loginMethod, setLoginMethod, sendOtp, verifyOtp, continueAsGuest } = useAuth()
  const [contact, setContact] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isResending, setIsResending] = useState(false)

  const handleSend = () => {
    if (!contact.trim()) return
    sendOtp(contact.trim())
  }

  const handleOtpChange = (val: string, idx: number) => {
    if (!/^\d?$/.test(val)) return
    const updated = [...otp]
    updated[idx] = val
    setOtp(updated)
    if (val && idx < 5) {
      const next = document.getElementById(`otp-${idx + 1}`)
      next?.focus()
    }
  }

  const handleOtpKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      const prev = document.getElementById(`otp-${idx - 1}`)
      prev?.focus()
    }
  }

  const handleVerify = () => {
    verifyOtp(otp.join(''))
    setOtp(['', '', '', '', '', ''])
    setContact('')
  }

  const handleResend = async () => {
    setIsResending(true)
    setOtp(['', '', '', '', '', ''])
    sendOtp(contact)
    setTimeout(() => setIsResending(false), 2000)
  }

  const handleClose = () => {
    closeLogin()
    setContact('')
    setOtp(['', '', '', '', '', ''])
  }

  return (
    <AnimatePresence>
      {showLoginModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-dark-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Decorative Header */}
              <div className="bg-gradient-to-r from-primary-700 to-primary-500 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-6 -translate-x-6" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                >
                  <X size={18} />
                </button>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/images/logo.png" alt="Hill Fold Spices" className="w-10 h-10 rounded-full object-cover" />
                    <span className="text-white/80 font-poppins text-sm font-medium">Hill Fold Spices</span>
                  </div>
                  <h2 className="text-white font-poppins font-bold text-2xl">
                    {otpStep === 'input' ? 'Welcome Back! 🌿' : 'Verify OTP 🔐'}
                  </h2>
                  <p className="text-white/75 text-sm mt-1 font-inter">
                    {otpStep === 'input'
                      ? 'Login to access your account & order history'
                      : `OTP sent to ${contact}. Check your inbox!`}
                  </p>
                </div>
              </div>

              <div className="p-8">
                {otpStep === 'input' ? (
                  <motion.div key="input" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    {/* Method Toggle */}
                    <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-dark-700 mb-6">
                      {(['email', 'mobile'] as const).map(m => (
                        <button
                          key={m}
                          onClick={() => { setLoginMethod(m); setContact('') }}
                          className={`flex-1 py-2.5 text-sm font-semibold font-poppins flex items-center justify-center gap-2 transition-all ${
                            loginMethod === m
                              ? 'bg-primary-700 text-white'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-800'
                          }`}
                        >
                          {m === 'email' ? <Mail size={15} /> : <Phone size={15} />}
                          {m === 'email' ? 'Email' : 'Mobile'}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">
                          {loginMethod === 'email' ? 'Email Address' : 'Mobile Number'}
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            {loginMethod === 'email' ? <Mail size={16} /> : <Phone size={16} />}
                          </span>
                          <input
                            id="contact-input"
                            type={loginMethod === 'email' ? 'email' : 'tel'}
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder={loginMethod === 'email' ? 'you@example.com' : '+91 98765 43210'}
                            className="input-field pl-10"
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleSend}
                        disabled={!contact.trim()}
                        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send OTP <ArrowRight size={16} />
                      </button>

                      <div className="relative flex items-center">
                        <div className="flex-1 border-t border-gray-200 dark:border-dark-700" />
                        <span className="px-3 text-xs text-gray-400 font-inter">or</span>
                        <div className="flex-1 border-t border-gray-200 dark:border-dark-700" />
                      </div>

                      <button
                        onClick={continueAsGuest}
                        className="btn-outline w-full justify-center"
                      >
                        Continue as Guest
                      </button>
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6 font-inter">
                      By continuing, you agree to our{' '}
                      <span className="text-primary-600 cursor-pointer hover:underline">Terms of Service</span>{' '}
                      and{' '}
                      <span className="text-primary-600 cursor-pointer hover:underline">Privacy Policy</span>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-2 mb-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <Shield size={16} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      <p className="text-xs text-green-700 dark:text-green-300 font-inter">
                        <strong>Demo mode:</strong> The OTP was shown in a toast notification. Enter any 6 digits.
                      </p>
                    </div>

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 font-poppins">
                      Enter 6-digit OTP
                    </label>

                    {/* OTP Input Boxes */}
                    <div className="flex gap-3 justify-center mb-6">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={e => handleOtpChange(e.target.value, idx)}
                          onKeyDown={e => handleOtpKeyDown(e, idx)}
                          className="w-12 h-14 text-center text-xl font-bold font-poppins rounded-xl border-2 border-gray-200 dark:border-dark-600 bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleVerify}
                      disabled={otp.join('').length !== 6}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    >
                      Verify & Login
                    </button>

                    <div className="flex items-center justify-between text-sm">
                      <button
                        onClick={() => { setOtp(['', '', '', '', '', '']); closeLogin(); setTimeout(() => { setLoginMethod(loginMethod) }, 100) }}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        ← Change Contact
                      </button>
                      <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400 hover:text-primary-700 font-medium disabled:opacity-50 transition-colors"
                      >
                        <RefreshCw size={14} className={isResending ? 'animate-spin' : ''} />
                        Resend OTP
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
