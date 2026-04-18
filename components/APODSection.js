'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export default function APODSection({ photos }) {
  const [selected, setSelected] = useState(null)
  const images = photos?.filter((p) => p.media_type === 'image') || []

  return (
    <section id="apod" className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-blue/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex items-center gap-3 justify-center mb-4">
            <span className="inline-flex items-center gap-2 space-card rounded-full px-4 py-2 text-sm text-cosmic-blue border border-cosmic-blue/20">
              🌠 NASA Gallery
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 tracking-tight">
            <span className="text-white">Astronomy Picture </span>
            <span className="cosmic-text">of the Day</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-lg text-space-gray text-center max-w-2xl mx-auto mb-16">
            Every day NASA releases a stunning image of our universe.
            Each one handpicked by professional astronomers with a full explanation.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((photo, index) => (
            <AnimatedSection key={photo.date} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelected(photo)}
                className="space-card rounded-3xl overflow-hidden cursor-pointer group border border-cosmic-blue/10 hover:border-cosmic-blue/30 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 bg-space-black/80 backdrop-blur rounded-full px-3 py-1">
                    <span className="text-xs text-cosmic-blue font-mono">{photo.date}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/10 backdrop-blur border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                      View Details →
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-2 line-clamp-1 group-hover:text-cosmic-blue transition-colors duration-200">
                    {photo.title}
                  </h3>
                  <p className="text-space-gray text-sm line-clamp-2 leading-relaxed">{photo.explanation}</p>
                  {photo.copyright && <p className="text-space-gray text-xs mt-3">© {photo.copyright}</p>}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
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
              className="space-card rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cosmic-blue/20"
            >
              <div className="relative">
                <img src={selected.hdurl || selected.url} alt={selected.title} className="w-full aspect-video object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 transition-all"
                >✕</button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-space-black/80 backdrop-blur rounded-full px-3 py-1 text-xs text-cosmic-blue font-mono">{selected.date}</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-white text-2xl font-bold mb-4">{selected.title}</h2>
                <p className="text-space-gray leading-relaxed">{selected.explanation}</p>
                {selected.copyright && <p className="text-space-gray text-sm mt-4">© {selected.copyright}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
