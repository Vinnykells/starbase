'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

function getThreatLevel(asteroid) {
  const distance = parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers)
  const isHazardous = asteroid.is_potentially_hazardous_asteroid
  if (isHazardous && distance < 1000000) return { level: 'High',   color: 'text-red-400 border-red-500/30 bg-red-500/10' }
  if (isHazardous)                        return { level: 'Medium', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' }
  return                                         { level: 'Low',    color: 'text-green-400 border-green-500/30 bg-green-500/10' }
}

function formatDistance(km) {
  const d = parseFloat(km)
  return d > 1000000 ? `${(d / 1000000).toFixed(2)}M km` : `${Math.round(d).toLocaleString()} km`
}

function formatSize(min, max) {
  const avgM = ((min + max) / 2) * 1000
  return avgM > 1000 ? `~${(avgM / 1000).toFixed(1)} km` : `~${Math.round(avgM)} m`
}

export default function AsteroidSection({ asteroids }) {
  return (
    <section id="asteroids" className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cosmic-purple/30 to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-cosmic-purple/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex items-center justify-center mb-4">
            <span className="inline-flex items-center gap-2 space-card rounded-full px-4 py-2 text-sm text-cosmic-purple border border-cosmic-purple/20">
              ☄️ Live Asteroid Tracker
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 tracking-tight">
            <span className="text-white">Near Earth </span>
            <span style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Objects. Today.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-lg text-space-gray text-center max-w-2xl mx-auto mb-6">
            Real-time data from NASA tracking asteroids passing near Earth today.
            Distances, sizes and threat assessments updated continuously.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="flex items-center justify-center gap-2 mb-16">
            <span className="w-2 h-2 rounded-full bg-cosmic-green animate-pulse" />
            <span className="text-cosmic-green text-sm font-mono">{asteroids?.length || 0} objects tracked today</span>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {asteroids?.map((asteroid, index) => {
            const threat = getThreatLevel(asteroid)
            const approach = asteroid.close_approach_data[0]
            const { estimated_diameter_min: diamMin, estimated_diameter_max: diamMax } = asteroid.estimated_diameter.kilometers

            return (
              <AnimatedSection key={asteroid.id} delay={index * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.01, borderColor: 'rgba(139, 92, 246, 0.3)', boxShadow: '0 0 30px rgba(139, 92, 246, 0.08)' }}
                  className="space-card rounded-2xl p-6 border border-space-border transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{threat.level === 'High' ? '☄️' : threat.level === 'Medium' ? '🪨' : '💫'}</div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-white font-semibold">{asteroid.name.replace(/[()]/g, '')}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${threat.color}`}>{threat.level} Risk</span>
                          {asteroid.is_potentially_hazardous_asteroid && (
                            <span className="text-xs px-2 py-0.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-medium">⚠️ PHO</span>
                          )}
                        </div>
                        <p className="text-space-gray text-sm font-mono">ID: {asteroid.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      {[
                        { label: 'Distance',       value: formatDistance(approach.miss_distance.kilometers) },
                        { label: 'Size',           value: formatSize(diamMin, diamMax) },
                        { label: 'Velocity',       value: `${parseFloat(approach.relative_velocity.kilometers_per_hour).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} km/h` },
                        { label: 'Close Approach', value: approach.close_approach_date },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <p className="text-space-gray text-xs uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-white font-semibold text-sm">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="h-1 bg-space-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, (1 - parseFloat(approach.miss_distance.astronomical) / 0.5) * 100)}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${
                          threat.level === 'High' ? 'bg-gradient-to-r from-red-500 to-red-400'
                          : threat.level === 'Medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                          : 'bg-gradient-to-r from-cosmic-blue to-cosmic-purple'
                        }`}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-space-gray">Earth</span>
                      <span className="text-xs text-space-gray">Deep Space</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection delay={0.4} className="mt-12">
          <div className="space-card rounded-2xl p-6 border border-space-border">
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-widest">Risk Level Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { level: 'Low Risk',    color: 'text-green-400 border-green-500/30 bg-green-500/10',     desc: 'Non-hazardous asteroid passing at safe distance. No threat to Earth.' },
                { level: 'Medium Risk', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10', desc: 'Potentially hazardous but passing at a considerable distance.' },
                { level: 'High Risk',   color: 'text-red-400 border-red-500/30 bg-red-500/10',           desc: 'Potentially hazardous asteroid with close approach distance.' },
              ].map((item) => (
                <div key={item.level} className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium flex-shrink-0 ${item.color}`}>{item.level}</span>
                  <p className="text-space-gray text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-space-gray text-xs mt-4 border-t border-space-border pt-4">
              ⚠️ PHO = Potentially Hazardous Object as classified by NASA JPL. All data is sourced directly from NASA Near Earth Object Web Service.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
