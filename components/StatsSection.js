'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '60+',    label: 'Years of space exploration', icon: '🚀' },
  { value: '1,000+', label: 'Mars rover photos daily',    icon: '🔴' },
  { value: '2,000+', label: 'Near Earth objects tracked', icon: '☄️' },
  { value: '365',    label: 'NASA images per year',       icon: '🌠' },
]

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-20 px-6 border-y border-cosmic-blue/10">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 0 40px rgba(79, 142, 247, 0.1)', borderColor: 'rgba(79, 142, 247, 0.3)' }}
              className="space-card rounded-3xl p-6 text-center transition-all duration-300 cursor-default"
            >
              <p className="text-3xl mb-3">{stat.icon}</p>
              <p className="text-3xl md:text-4xl font-bold cosmic-text mb-2">{stat.value}</p>
              <p className="text-space-gray text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
