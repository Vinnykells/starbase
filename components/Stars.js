'use client'

import { useEffect, useRef } from 'react'

export default function Stars() {
  const starsRef = useRef(null)

  useEffect(() => {
    if (!starsRef.current) return
    const stars = []
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div')
      const size = Math.random() * 2.5 + 0.5
      star.className = 'star'
      star.style.cssText = `
        width: ${size}px; height: ${size}px;
        top: ${Math.random() * 100}%; left: ${Math.random() * 100}%;
        --duration: ${Math.random() * 4 + 2}s;
        --delay: ${Math.random() * 5}s;
        opacity: ${Math.random() * 0.8 + 0.2};
      `
      stars.push(star)
      starsRef.current.appendChild(star)
    }
    return () => stars.forEach((s) => s.remove())
  }, [])

  return <div ref={starsRef} className="stars" />
}
