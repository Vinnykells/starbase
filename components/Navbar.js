'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Picture of the Day', href: '#apod' },
  { label: 'Mars', href: '#mars' },
  { label: 'Asteroids', href: '#asteroids' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-space-black/90 backdrop-blur-2xl border-b border-cosmic-blue/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ opacity: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-blue to-cosmic-purple rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">S</span>
              </div>
              <div className="absolute inset-0 bg-cosmic-blue/30 rounded-xl blur-md -z-10" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Star<span className="cosmic-text">base</span>
            </span>
          </motion.div>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <motion.button
                  onClick={() => handleClick(link.href)}
                  className="text-sm text-space-gray hover:text-white transition-colors duration-200 relative"
                  whileHover="hover"
                >
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cosmic-blue to-cosmic-purple"
                    variants={{ rest: { width: 0 }, hover: { width: '100%' } }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="https://api.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm bg-gradient-to-r from-cosmic-blue to-cosmic-purple text-white font-medium px-5 py-2.5 rounded-full"
            >
              🚀 Powered by NASA
            </motion.a>
          </div>

          <button className="md:hidden flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-white" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-space-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleClick(link.href)}
                className="text-3xl font-light text-white hover:text-cosmic-blue transition-colors duration-200"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
