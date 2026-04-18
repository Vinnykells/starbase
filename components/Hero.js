'use client'

import { motion } from 'framer-motion'

export default function Hero({ apod }) {
  const scrollToAPOD = () => document.querySelector('#apod')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {apod?.url && apod?.media_type === 'image' && (
        <div className="absolute inset-0 z-0">
          <img src={apod.url} alt={apod.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/70 to-space-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-space-black/80 to-transparent" />
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cosmic-blue/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cosmic-purple/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 space-card rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cosmic-green animate-pulse" />
          <span className="text-sm text-space-gray">
            Live data from <span className="text-cosmic-blue">NASA Open APIs</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
        >
          <span className="text-white block mb-2">Explore the</span>
          <span className="cosmic-text block">Universe. 🚀</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-space-gray max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Your personal mission control for space exploration.
          Real photos from Mars, live asteroid tracking, and NASA imagery updated every single day.
        </motion.p>

        {apod?.title && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="text-sm text-cosmic-blue mb-10 font-mono"
          >
            📡 Today: {apod.title}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={scrollToAPOD}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cosmic-blue to-cosmic-purple text-white font-semibold px-8 py-4 rounded-full text-sm w-full sm:w-auto"
            style={{ boxShadow: '0 0 30px rgba(79, 142, 247, 0.3)' }}
          >
            🌌 Start Exploring
          </motion.button>
          <motion.a
            href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-all duration-200 w-full sm:w-auto"
          >
            NASA API →
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: '🌍', label: 'Real NASA Data' },
            { icon: '🔴', label: 'Mars Rover Photos' },
            { icon: '☄️', label: 'Live Asteroid Tracker' },
            { icon: '🌠', label: 'Daily Space Images' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <span className="text-xs text-space-gray">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-space-gray tracking-widest uppercase font-mono">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-cosmic-blue to-transparent"
        />
      </motion.div>
    </section>
  )
}
