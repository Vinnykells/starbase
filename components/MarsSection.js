'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const rovers = [
  { id: 'curiosity',    name: 'Curiosity',    status: 'Active',   launched: '2011', emoji: '🤖' },
  { id: 'perseverance', name: 'Perseverance', status: 'Active',   launched: '2020', emoji: '🔬' },
  { id: 'opportunity',  name: 'Opportunity',  status: 'Complete', launched: '2003', emoji: '🏁' },
]

export default function MarsSection({ photos }) {
  const [selected, setSelected] = useState(null)
  const [activeRover, setActiveRover] = useState('curiosity')
  const displayPhotos = photos?.slice(0, 9) || []

  return (
    <section id="mars" className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-orange/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-cosmic-orange/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 space-card rounded-full px-4 py-2 text-sm text-cosmic-orange border border-cosmic-orange/20">
              🔴 Mars Exploration
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 tracking-tight">
            <span className="text-white">Photos from </span>
            <span style={{ background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              the Red Planet.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-lg text-space-gray text-center max-w-2xl mx-auto mb-12">
            Real photographs taken by NASA rovers currently on the surface of Mars.
            Updated daily as the rovers explore and transmit data back to Earth.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {rovers.map((rover) => (
              <motion.button
                key={rover.id}
                onClick={() => setActiveRover(rover.id)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-200 ${
                  activeRover === rover.id
                    ? 'border-cosmic-orange/50 bg-cosmic-orange/10 text-white'
                    : 'border-space-border bg-space-card text-space-gray hover:border-cosmic-orange/30'
                }`}
              >
                <span className="text-xl">{rover.emoji}</span>
                <div className="text-left">
                  <p className="text-sm font-medium">{rover.name}</p>
                  <p className="text-xs opacity-60">{rover.status} · {rover.launched}</p>
                </div>
                {rover.status === 'Active' && <span className="w-2 h-2 rounded-full bg-cosmic-green animate-pulse" />}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {displayPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayPhotos.map((photo, index) => (
              <AnimatedSection key={photo.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  onClick={() => setSelected(photo)}
                  className="relative rounded-2xl overflow-hidden aspect-square cursor-pointer group border border-space-border hover:border-cosmic-orange/30 transition-all duration-300"
                >
                  <img
                    src={photo.img_src}
                    alt={`Mars - ${photo.camera.full_name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium">{photo.camera.full_name}</p>
                    <p className="text-space-gray text-xs">Sol {photo.sol}</p>
                  </div>
                  <div className="absolute top-2 left-2 bg-space-black/70 backdrop-blur rounded-lg px-2 py-1">
                    <span className="text-xs text-cosmic-orange font-mono">{photo.camera.name}</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-card rounded-3xl border border-space-border">
            <p className="text-4xl mb-4">🔴</p>
            <p className="text-white text-xl font-medium mb-2">No photos available for this rover</p>
            <p className="text-space-gray">Try selecting a different rover</p>
          </div>
        )}

        <AnimatedSection delay={0.4} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Distance from Earth', value: '225M km',  icon: '📏' },
              { label: 'Surface Temperature', value: '-63°C avg', icon: '🌡️' },
              { label: 'Day Length',           value: '24h 37m',  icon: '⏰' },
              { label: 'Active Rovers',        value: '2',        icon: '🤖' },
            ].map((fact) => (
              <div key={fact.label} className="space-card rounded-2xl p-5 border border-space-border text-center">
                <p className="text-2xl mb-2">{fact.icon}</p>
                <p className="text-white font-bold text-lg mb-1">{fact.value}</p>
                <p className="text-space-gray text-xs">{fact.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="space-card rounded-3xl overflow-hidden max-w-2xl w-full border border-cosmic-orange/20"
            >
              <div className="relative">
                <img src={selected.img_src} alt="Mars surface" className="w-full object-cover" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white"
                >✕</button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Rover',      value: selected.rover.name },
                    { label: 'Camera',     value: selected.camera.full_name },
                    { label: 'Sol',        value: selected.sol },
                    { label: 'Earth Date', value: selected.earth_date },
                    { label: 'Status',     value: selected.rover.status },
                    { label: 'Mission',    value: `${selected.rover.total_photos?.toLocaleString()} photos` },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-space-gray text-xs uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-white text-sm font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
