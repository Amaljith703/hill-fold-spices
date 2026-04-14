import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'

const galleryItems = [
  { id: 1, src: '/images/hero.png', alt: 'Spice Farm Landscape', category: 'Farm', span: 'col-span-2 row-span-2' },
  { id: 2, src: '/images/pepper.png', alt: 'Black Pepper Harvest', category: 'Harvest', span: '' },
  { id: 3, src: '/images/cardamom.png', alt: 'Cardamom Pods', category: 'Spices', span: '' },
  { id: 4, src: '/images/turmeric.png', alt: 'Golden Turmeric', category: 'Processing', span: '' },
  { id: 5, src: '/images/clove.png', alt: 'Clove Collection', category: 'Spices', span: '' },
  { id: 6, src: '/images/nutmeg.png', alt: 'Nutmeg Harvest', category: 'Harvest', span: 'col-span-2' },
]

const categories = ['All', 'Farm', 'Harvest', 'Spices', 'Processing']

export default function GallerySection() {
  const [selected, setSelected] = useState<(typeof galleryItems)[0] | null>(null)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter(g => g.category === filter)

  return (
    <section id="gallery" className="py-20 md:py-28 bg-spice-cream dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="badge badge-green mb-4">🖼️ Gallery</span>
          <h2 className="section-title mb-4">
            From Our <span className="text-gradient">Spice Gardens</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A glimpse into the lush farms, careful harvests, and artisan processes that bring Hill Fold Spices to your kitchen.
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold font-poppins transition-all duration-300 ${
                filter === cat
                  ? 'bg-primary-700 text-white shadow-md shadow-primary-700/30'
                  : 'bg-white dark:bg-dark-900 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-dark-700 hover:text-primary-700 dark:hover:text-primary-400 border border-gray-100 dark:border-dark-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px]">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span}`}
              onClick={() => setSelected(item)}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <ZoomIn className="text-white mb-2" size={28} />
                <p className="text-white text-sm font-poppins font-semibold">{item.alt}</p>
                <span className="badge bg-white/20 text-white/90 text-xs mt-1">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
              onClick={() => setSelected(null)}
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={e => e.stopPropagation()}
              className="max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={selected.src}
                alt={selected.alt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="bg-dark-900 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-poppins font-semibold">{selected.alt}</p>
                  <p className="text-gray-400 text-sm font-inter">{selected.category}</p>
                </div>
                <span className="badge badge-green">{selected.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
