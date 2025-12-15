/**
 * GradientMesh Component
 * Animated gradient background that follows mouse position
 */

'use client'

import { useState, useEffect } from 'react'

export default function GradientMesh() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div
        className="gradient-mesh"
        style={{
          background: `
            radial-gradient(at ${mousePosition.x}px ${mousePosition.y}px, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
            radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
            radial-gradient(at 100% 100%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)
          `
        }}
      />

      <style jsx>{`
        .gradient-mesh {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          transition: background 0.3s ease;
        }
      `}</style>
    </>
  )
}
