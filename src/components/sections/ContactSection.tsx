import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success('Message sent! We will get back to you soon. 🌿', {
        style: { background: '#014421', color: '#fff', borderRadius: '12px' },
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-white dark:bg-dark-900 border-t border-gray-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge badge-green mb-4">📞 Get In Touch</span>
          <h2 className="section-title mb-4">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Have a question about our spices, bulk orders, or shipping? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, title: 'Visit Us', desc: 'Cardamom Hills, Idukki, Kerala - 685531, India' },
                { icon: Phone, title: 'Call Us', desc: '+91 98765 43210\n+91 98765 43211' },
                { icon: Mail, title: 'Email Us', desc: 'hello@hillfoldspices.com\nsupport@hillfold.com' },
                { icon: Clock, title: 'Working Hours', desc: 'Mon - Sat: 9:00 AM - 6:00 PM\nSunday: Closed' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-dark-700">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-400 shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-poppins font-semibold text-gray-900 dark:text-white mb-1.5">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line font-inter leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Embed dummy */}
            <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-dark-700 relative bg-gray-200 dark:bg-dark-800 flex items-center justify-center">
                 <div className="text-center p-6">
                    <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 font-inter font-medium">Google Maps Embed</p>
                    <p className="text-sm text-gray-500 mt-2">Idukki, Kerala</p>
                 </div>
                 {/*  Actual iframe would go here like:
                 <iframe src="https://www.google.com/maps/embed?pb=..." className="absolute inset-0 w-full h-full border-0" loading="lazy" />
                 */}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-800 p-8 sm:p-10 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-dark-700">
              <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-poppins">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-70 mt-4 h-14"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                       <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       Sending...
                    </span>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
