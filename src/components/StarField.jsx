import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = document.body.scrollHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Generate stars
    const STAR_COUNT = 250
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      radius:  Math.random() * 1.2 + 0.2,
      opacity: Math.random(),
      speed:   Math.random() * 0.004 + 0.002, // twinkle speed
      phase:   Math.random() * Math.PI * 2,    // random start phase
    }))

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        // Twinkle — opacity oscillates via sine wave
        const twinkle = Math.sin(time * star.speed + star.phase) * 0.4 + 0.6

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * star.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}