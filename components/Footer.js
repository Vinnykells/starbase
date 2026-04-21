'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

export default function Footer() {
  return (
    <footer className="border-t border-cosmic-blue/10 px-6 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-blue to-cosmic-purple rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-sm">S</span>
                </div>
                <div className="absolute inset-0 bg-cosmic-blue/30 rounded-xl blur-md -z-10" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Star<span className="cosmic-text">base</span>
              </span>
            </div>

            <div className="flex items-center gap-8">
              {[
                { label: 'Picture of the Day', href: '#apod' },
                { label: 'Mars', href: '#mars' },
                { label: 'Moon', href: '#moon' },
                { label: 'Asteroids', href: '#asteroids' },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-sm text-space-gray hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <motion.a
              href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 space-card border border-cosmic-blue/20 rounded-full px-4 py-2 text-sm text-cosmic-blue hover:border-cosmic-blue/40 transition-all duration-200"
            >
              🚀 Powered by NASA APIs
            </motion.a>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-cosmic-blue/20 to-transparent mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-space-gray text-sm">
              © {new Date().getFullYear()} Starbase. Built with Next.js, Tailwind CSS & NASA Open APIs.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cosmic-green animate-pulse" />
                <span className="text-space-gray text-sm">NASA APIs operational</span>
              </div>
              <p className="text-space-gray text-sm">
                Data courtesy of{' '}
                <a href="https://nasa.gov" target="_blank" rel="noopener noreferrer" className="text-cosmic-blue hover:text-white transition-colors duration-200">
                  NASA.gov
                </a>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  )
}
