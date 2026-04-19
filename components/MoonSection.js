'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const categories = [
  { id: 'apollo',    label: 'Apollo Missions', emoji: '🚀' },
  { id: 'surface',   label: 'Lunar Surface',   emoji: '🌑' },
  { id: 'earthrise', label: 'Earth & Moon',    emoji: '🌍' },
]

export default function MoonSection({ photos: initialPhotos }) {
  const [selected, setSelected]       = useState(null)
  const [activeCategory, setActiveCategory] = useState('apollo')
  const [photos, setPhotos]           = useState(initialPhotos || [])
  const [loading, setLoading]         = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/moon?category=${activeCategory}`)
      .then((r) => r.json())
      .then((data) => setPhotos(data))
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false))
  }, [activeCategory])

  return (
    <section id="moon" className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-white/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 space-card rounded-full px-4 py-2 text-sm text-white/70 border border-white/10">
              🌕 Lunar Exploration
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 tracking-tight">
            <span className="text-white">Photos from </span>
            <span style={{ background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              the Moon.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-lg text-space-gray text-center max-w-2xl mx-auto mb-12">
            Historic and modern NASA photography of Earth's only natural satellite —
            from the Apollo landings to orbital imagery.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'border-white/30 bg-white/10 text-white'
                    : 'border-space-border bg-space-card text-space-gray hover:border-white/20'
                }`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className="text-sm font-medium">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-space-gray animate-pulse">Loading photos...</p>
          </div>
        ) : photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.slice(0, 9).map((photo, index) => (
              <AnimatedSection key={photo.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  onClick={() => setSelected(photo)}
                  className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer group border border-space-border hover:border-white/20 transition-all duration-300"
                >
                  <img
                    src={photo.img_src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium line-clamp-2">{photo.title}</p>
                    <p className="text-space-gray text-xs">{photo.date}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-card rounded-3xl border border-space-border">
            <p className="text-4xl mb-4">🌕</p>
            <p className="text-white text-xl font-medium mb-2">No photos available</p>
            <p className="text-space-gray">Try selecting a different category</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="space-card rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            >
              <div className="relative">
                <img src={selected.img_src} alt={selected.title} className="w-full aspect-video object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-all"
                >✕</button>
                {selected.date && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-space-black/80 backdrop-blur rounded-full px-3 py-1 text-xs text-white/60 font-mono">{selected.date}</span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h2 className="text-white text-2xl font-bold mb-4">{selected.title}</h2>
                {selected.description && (
                  <p className="text-space-gray leading-relaxed line-clamp-4">{selected.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
