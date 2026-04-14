import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, User, ArrowRight, X, BookOpen } from 'lucide-react'
import { blogs } from '../../data/blogs'

function BlogModal({ blog, onClose }: { blog: (typeof blogs)[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-dark-900 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        <div className="relative h-48">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className={`badge text-xs mb-2 ${blog.categoryColor}`}>{blog.category}</span>
            <h2 className="text-white font-poppins font-bold text-lg leading-tight">{blog.title}</h2>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-inter mb-6 pb-4 border-b border-gray-100 dark:border-dark-700">
            <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {blog.readTime}</span>
            <span>{new Date(blog.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-inter text-sm leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function BlogSection() {
  const [selected, setSelected] = useState<(typeof blogs)[0] | null>(null)

  return (
    <section id="blog" className="py-20 md:py-28 bg-white dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="badge badge-green mb-4">✍️ Spice Knowledge</span>
          <h2 className="section-title mb-4">
            Stories from the <span className="text-gradient">Spice World</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Recipes, techniques, health insights, and stories from the farms. Everything you need to become a spice connoisseur.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="card group cursor-pointer"
              onClick={() => setSelected(blog)}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 badge text-xs ${blog.categoryColor}`}>
                  {blog.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 font-inter mb-3">
                  <span className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</span>
                  <span>{new Date(blog.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                </div>

                <h3 className="font-poppins font-bold text-gray-900 dark:text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-xs font-inter leading-relaxed mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                      <User size={10} className="text-primary-700 dark:text-primary-400" />
                    </div>
                    <span className="font-inter">{blog.author.split(' ')[0]}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-semibold group-hover:gap-2 transition-all font-poppins">
                    Read More <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="btn-outline inline-flex items-center gap-2">
            <BookOpen size={16} /> View All Articles
          </button>
        </motion.div>
      </div>

      {/* Blog Modal */}
      <AnimatePresence>
        {selected && <BlogModal blog={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
