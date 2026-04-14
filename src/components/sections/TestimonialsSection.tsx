import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = testimonials.length - 1
      if (nextIndex >= testimonials.length) nextIndex = 0
      return nextIndex
    })
  }

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        paginate(1)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isHovered, currentIndex])

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-spice-cream dark:bg-dark-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-spice-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge badge-green mb-4">💬 Customer Reviews</span>
          <h2 className="section-title mb-4">
            Loved by <span className="text-gradient">Spice Enthusiasts</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Don't just take our word for it. Hear what our customers have to say about the Hill Fold Spices experience.
          </p>
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-[280px] md:h-[220px] overflow-hidden flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1)
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1)
                  }
                }}
                className="absolute w-full px-4"
              >
                <div className="glass-card p-8 md:p-10 text-center relative max-w-3xl mx-auto shadow-2xl">
                  <Quote className="absolute top-4 left-4 text-spice-gold/20" size={48} />
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < testimonials[currentIndex].rating ? 'text-spice-gold fill-spice-gold' : 'text-gray-300 dark:text-gray-600'}
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 font-inter text-lg md:text-xl leading-relaxed italic mb-8">
                    "{testimonials[currentIndex].review}"
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold font-poppins text-lg shadow-md">
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-poppins font-bold text-gray-900 dark:text-white">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-inter">
                        {testimonials[currentIndex].location} • Bought <span className="font-semibold text-primary-600 dark:text-primary-400">{testimonials[currentIndex].product}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-dark-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-600 hover:text-primary-700 dark:hover:text-primary-400 transition-all z-10 hidden md:flex"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-dark-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-600 hover:text-primary-700 dark:hover:text-primary-400 transition-all z-10 hidden md:flex"
            onClick={() => paginate(1)}
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1)
                  setCurrentIndex(idx)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-primary-600 w-6'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
