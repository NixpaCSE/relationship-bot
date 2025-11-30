import { useEffect, useRef } from 'react'
import './HeartParticles.css'

const HeartParticles = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create heart particles
    const hearts = []
    const heartCount = 15 // Number of hearts

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div')
      heart.className = 'heart-particle'
      heart.innerHTML = '❤️'
      
      // Random starting X position across full width (0% to 100%)
      const startX = Math.random() * 100
      heart.style.setProperty('--start-x', `${startX}%`)
      
      // Random horizontal drift (-30px to +30px)
      const driftX = (Math.random() - 0.5) * 60
      heart.style.setProperty('--drift-x', `${driftX}px`)
      
      // Random animation duration (slower = more floaty)
      const duration = 15 + Math.random() * 20 // 15-35 seconds
      heart.style.animationDuration = `${duration}s`
      
      // Random delay
      heart.style.animationDelay = `${Math.random() * 5}s`
      
      // Random size
      const size = 0.5 + Math.random() * 0.5 // 0.5x to 1x
      heart.style.setProperty('--scale', size)
      
      // Random opacity
      heart.style.opacity = 0.3 + Math.random() * 0.4 // 0.3 to 0.7
      
      container.appendChild(heart)
      hearts.push(heart)
    }

    // Cleanup
    return () => {
      hearts.forEach(heart => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart)
        }
      })
    }
  }, [])

  return <div ref={containerRef} className="heart-particles-container" />
}

export default HeartParticles

