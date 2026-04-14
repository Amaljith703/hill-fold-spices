import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Leaf, Star, Truck } from 'lucide-react'

const floatingBadges = [
  { icon: Star, text: '4.9★ Rating', color: 'bg-spice-gold/90', delay: 0 },
  { icon: Leaf, text: '100% Organic', color: 'bg-primary-700/90', delay: 0.4 },
  { icon: Truck, text: 'Fast Delivery', color: 'bg-primary-600/90', delay: 0.8 },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function HeroSection() {
  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-hero" />

      {/* Animated bokeh circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Floating spice dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-spice-gold/40"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [-15, 15], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-32 md:py-40 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-1 text-center lg:text-left"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-6">
            <Leaf size={14} className="text-green-300" />
            <span className="text-white/90 text-sm font-poppins font-medium">
              100% Natural • No Additives • Farm Direct
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-poppins font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6"
          >
            Pure Spices from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-spice-gold to-yellow-300">
              Nature
            </span>{' '}
            to Your Kitchen
          </motion.h1>

          <motion.p
            variants={item}
            className="text-white/75 text-lg md:text-xl font-inter leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Sourced from the lush hills of Kerala's Western Ghats. Every batch is hand-picked,
            naturally dried, and packed fresh — with no preservatives, ever.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToProducts}
              className="btn-gold text-base px-8 py-4 shadow-2xl shadow-spice-amber/30"
            >
              Shop Now <ArrowRight size={18} />
            </button>
            <button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/25 inline-flex items-center gap-2"
            >
              Explore Our Story
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="flex gap-8 justify-center lg:justify-start mt-10">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '5★', label: 'Average Rating' },
              { value: '100%', label: 'Natural & Pure' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-poppins font-black text-2xl text-spice-gold">{stat.value}</p>
                <p className="text-white/60 text-xs font-inter mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right – Floating Product Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="flex-1 flex items-center justify-center relative"
        >
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-72 h-72 md:w-96 md:h-96"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-600/40 to-primary-900/20 backdrop-blur-sm border border-white/20" />
            <img
              src="/images/cardamom.png"
              alt="Premium Cardamom"
              className="w-full h-full object-cover rounded-full"
            />
            {/* Glow */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_80px_rgba(34,139,34,0.4)]" />
          </motion.div>

          {/* Floating Badges */}
          {floatingBadges.map(({ icon: Icon, text, color, delay }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + delay, type: 'spring', stiffness: 200 }}
              className={`absolute ${i === 0 ? '-top-4 -left-4 md:top-4 md:-left-8' : i === 1 ? '-bottom-4 -left-4 md:-bottom-2 md:-left-6' : '-top-4 -right-4 md:top-8 md:-right-8'} ${color} backdrop-blur-sm text-white text-xs font-poppins font-semibold px-3 py-2 rounded-full flex items-center gap-1.5 shadow-lg`}
            >
              <Icon size={12} /> {text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToProducts}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
      >
        <span className="text-xs font-inter tracking-widest uppercase">Discover</span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  )
}
