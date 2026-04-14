import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, Leaf, Settings, Heart, ChevronRight, X } from 'lucide-react'

const tabs = [
  {
    id: 'cultivation',
    label: 'Cultivation',
    icon: Sprout,
    color: 'from-green-500 to-green-700',
    title: 'How We Cultivate Our Spices',
    content: `Our spices are cultivated in the lush Western Ghats of Kerala, at elevations ranging from 600m to 1,800m above sea level. This unique geography creates the perfect microclimate for growing spices of extraordinary quality.

The high humidity, moderate temperatures, and rich laterite soil of the region combine to create growing conditions that cannot be replicated elsewhere. Our partner farmers have cultivated these hills for generations, passing down knowledge that modern agronomy is only beginning to understand.

Cardamom grows best under the shade of tall forest trees, mimicking its natural rainforest habitat. Pepper climbs native support trees in a traditional intercropping system. Turmeric thrives in the well-drained alluvial soils of the foothills. Each spice is grown where it belongs — not forced into artificial conditions.

We work directly with over 45 small-scale farmers across 3 districts in Kerala, ensuring that the practices used align with both our quality standards and our commitment to environmental sustainability.`,
    image: '/images/pepper.png',
  },
  {
    id: 'farming',
    label: 'Farming Practices',
    icon: Leaf,
    color: 'from-emerald-500 to-emerald-700',
    title: 'Sustainable Organic Farming',
    content: `Every farming partner in the Hill Fold network follows certified organic practices, verified by independent third-party auditors. We strictly prohibit the use of synthetic pesticides, herbicides, or artificial growth hormones.

Instead, our farmers use:
• Compost and vermicompost as natural soil enrichers
• Neem oil and plant-based extracts for pest management
• Cover cropping to prevent soil erosion and retain moisture
• Drip irrigation systems to conserve water
• Traditional intercropping to create balanced ecosystems

Many of our farmers have converted from conventional to organic farming with our support — including financial assistance during the 3-year transition period required for organic certification.

Beyond environmental benefits, organic farming produces spices with higher concentrations of essential oils and active compounds — which means better flavour and greater health benefits for you.`,
    image: '/images/cardamom.png',
  },
  {
    id: 'processing',
    label: 'Processing',
    icon: Settings,
    color: 'from-amber-500 to-amber-700',
    title: 'Artisan Spice Processing',
    content: `Our processing philosophy is simple: do as little as possible, preserve as much as nature gives us. Every step is designed to protect the essential oils, volatile compounds, and active ingredients that make spices valuable.

Post-harvest, spices are transported to our processing facility within 24 hours. Here's what happens:

1. Manual Sorting: Experienced workers remove any damaged, immature, or foreign material
2. Natural Cleaning: Spices are cleaned using traditional winnowing and water washing methods
3. Sun Drying: Spread on clean drying mats under direct sunlight for 3–7 days, depending on moisture content
4. Stone Grinding: For powdered products, we use traditional granite stone grinders that run at low temperatures, preserving volatile oils
5. Quality Testing: Every batch is tested for moisture content, colour, and essential oil percentage
6. Vacuum Packing: Immediately sealed in food-grade, airtight packets to lock in freshness

We never use artificial preservatives, colours, or anti-caking agents. What you receive is exactly what nature produced.`,
    image: '/images/turmeric.png',
  },
  {
    id: 'health',
    label: 'Health Benefits',
    icon: Heart,
    color: 'from-red-500 to-rose-700',
    title: 'The Power of Natural Spices',
    content: `Spices have been at the core of Ayurvedic medicine for over 5,000 years — and modern science is continually validating what traditional healers always knew.

Black Pepper contains piperine, which enhances the bioavailability of nutrients and has powerful antioxidant properties. It also aids digestion by stimulating hydrochloric acid in the stomach.

Turmeric's active compound, curcumin, is one of the most researched natural anti-inflammatory agents in the world. It has shown promise in studies related to heart disease, cancer prevention, and Alzheimer's disease.

Cardamom contains cineole and limonene, natural compounds with antimicrobial properties. It has traditionally been used to improve digestion, freshen breath, and lower blood pressure.

Cloves are among the richest sources of antioxidants of any spice, with an ORAC score higher than blueberries. Eugenol, the primary compound in cloves, is a natural analgesic used in dentistry.

Nutmeg contains myristicin and elemicin, which may have neuroprotective properties and have been used in traditional medicine to improve sleep quality and cognitive function.

By choosing Hill Fold Spices, you're not just adding flavour — you're adding centuries of healing wisdom to every meal.`,
    image: '/images/nutmeg.png',
  },
]

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const [readMoreOpen, setReadMoreOpen] = useState(false)
  const active = tabs.find(t => t.id === activeTab)!

  return (
    <section id="about" className="py-20 md:py-28 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge badge-green mb-4">📖 Our Story</span>
          <h2 className="section-title mb-4">
            From Seed to{' '}
            <span className="text-gradient">Your Spice Rack</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We believe you deserve to know exactly where your spices come from and how they are grown. Transparency is at the heart of everything we do.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-poppins transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary-700 text-white shadow-lg shadow-primary-700/30'
                    : 'bg-gray-100 dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-dark-700 hover:text-primary-700 dark:hover:text-primary-400'
                }`}
              >
                <Icon size={15} /> {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Text */}
            <div className="glass-card p-8 order-2 lg:order-1">
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${active.color} text-white text-xs font-poppins font-semibold px-3 py-1.5 rounded-full mb-4`}>
                <active.icon size={13} /> {active.label}
              </div>
              <h3 className="font-poppins font-bold text-2xl text-gray-900 dark:text-white mb-4">
                {active.title}
              </h3>
              <div className="text-gray-600 dark:text-gray-400 font-inter text-sm leading-relaxed whitespace-pre-line line-clamp-6">
                {active.content}
              </div>
              <button
                onClick={() => setReadMoreOpen(true)}
                className="mt-4 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                Read Full Article <ChevronRight size={16} />
              </button>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <motion.div
                key={active.image}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-3xl overflow-hidden aspect-video lg:aspect-square shadow-2xl"
              >
                <img
                  src={active.image}
                  alt={active.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 to-transparent rounded-3xl" />
              </motion.div>

              {/* Floating fact */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 glass-card p-4 max-w-[180px] shadow-xl"
              >
                <p className="font-poppins font-black text-3xl text-primary-700 dark:text-primary-400">45+</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-inter mt-0.5">Partner Farmers across Kerala</p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Read More Modal */}
        <AnimatePresence>
          {readMoreOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={() => setReadMoreOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                onClick={e => e.stopPropagation()}
                className="bg-white dark:bg-dark-900 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl p-8 max-h-[85vh] overflow-y-auto scrollbar-hide shadow-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-poppins font-bold text-xl text-gray-900 dark:text-white">{active.title}</h3>
                  <button onClick={() => setReadMoreOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-500 transition-all">
                    <X size={18} />
                  </button>
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-inter text-sm leading-relaxed whitespace-pre-line">
                  {active.content}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
