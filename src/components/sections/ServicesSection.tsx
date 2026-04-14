import { motion } from 'framer-motion'
import { ArrowRight, Blend, Cpu, Truck, Globe } from 'lucide-react'
import { services } from '../../data/services'

const iconMap: Record<string, React.ReactNode> = {
  blend: <Blend size={28} />,
  grind: <Cpu size={28} />,
  delivery: <Truck size={28} />,
  courier: <Globe size={28} />,
}

const gradients = [
  'from-primary-700 to-primary-500',
  'from-spice-amber to-spice-gold',
  'from-blue-600 to-blue-400',
  'from-purple-600 to-purple-400',
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-spice-cream dark:bg-dark-800 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary-100 dark:bg-primary-900/20 rounded-full -translate-y-40 translate-x-40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-spice-gold/10 rounded-full translate-y-40 -translate-x-40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge badge-green mb-4">⚙️ What We Offer</span>
          <h2 className="section-title mb-4">
            Services Built for{' '}
            <span className="text-gradient">Spice Lovers</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Beyond selling spices, we offer custom blending, grinding, and global delivery — tailored to your needs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-6 group"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {iconMap[service.iconKey]}
              </div>

              <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-lg mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 font-inter text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <button className={`inline-flex items-center gap-2 text-sm font-semibold font-poppins bg-gradient-to-r ${gradients[i]} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}>
                {service.cta}
                <ArrowRight size={14} className={`bg-gradient-to-r ${gradients[i]} text-transparent`} style={{ color: i === 1 ? '#C17D2B' : i === 2 ? '#2563eb' : i === 3 ? '#7c3aed' : '#014421' }} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-900/30"
        >
          <div>
            <h3 className="font-poppins font-bold text-white text-2xl md:text-3xl mb-2">
              Need a Custom Bulk Order?
            </h3>
            <p className="text-white/75 font-inter">
              Special pricing for restaurants, hotels & wholesale buyers. Let's talk!
            </p>
          </div>
          <button className="bg-white text-primary-700 font-poppins font-bold px-8 py-3.5 rounded-full hover:bg-spice-cream transition-all duration-300 flex items-center gap-2 whitespace-nowrap shadow-lg active:scale-95">
            Contact Us <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
