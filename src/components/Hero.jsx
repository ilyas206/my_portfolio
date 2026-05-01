import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'
import PageReveal from './PageReveal'

const TITLE = 'Built right. By Σlyas'

export default function Hero() {
  const glowRef = useRef(null)
  const [revealDone, setRevealDone]   = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [typing, setTyping] = useState(false)

  // Hide content children + start glow on mount
  useEffect(() => {
    gsap.set('.hero-sub', { opacity: 0, y: 30 })

    gsap.to(glowRef.current, {
      opacity: 0.15,
      scale: 1.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  // After curtain finishes → start typewriter
  useEffect(() => {
    if (!revealDone) return

    setTyping(true)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayText(TITLE.slice(0, i))
      if (i === TITLE.length) {
        clearInterval(interval)
        setTyping(false)

        // After typing done → animate tagline + button
        gsap.to('.hero-sub', {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power2.out',
        })
      }
    }, 60) // typing speed in ms

    return () => clearInterval(interval)
  }, [revealDone])

  return (
    <>
      <PageReveal onComplete={() => setRevealDone(true)} />

      <section
        id="hero"
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-(--bg-primary)"
      >
        {/* Glow */}
        <div
          ref={glowRef}
          style={{
            background: 'radial-gradient(ellipse at center, #00d4ff 0%, transparent 70%)',
            opacity: 0.08,
          }}
          className="absolute w-220 h-220 rounded-full pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">

          {/* Typewriter Title */}
          <h1
            className="text-5xl md:text-8xl font-bold tracking-tight leading-tight min-h-[1.2em] text-(--text-primary)"
          >
            {displayText.split('By ').length > 1 ? (
              <>
                {displayText.split('By ')[0]}By{' '}
                <span style={{ color: 'var(--accent)' }}>
                  {displayText.split('By ')[1]?.slice(0, 1)}
                </span>
                {displayText.split('By ')[1]?.slice(1)}
              </>
            ) : (
              displayText
            )}

            {/* Blinking cursor */}
            <span
              className={typing ? 'opacity-100 text-(--accent) transition duration-500 ease-in' : 'animate-pulse text-(--border) transition duration-500 ease-in'}
            >
              |
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="hero-sub text-md md:text-xl max-w-xl font-light leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Building clean, scalable web applications —
            from pixel-perfect interfaces to solid backend systems.
          </p>

          {/* CTA Button */}
          <a
            href="#projects"
            className="hero-sub group mt-2 px-8 py-3 rounded-md text-sm font-semibold flex items-center gap-2  border border-(--accent) text-(--accent) hover:bg-(--accent) hover:text-black transition-all duration-300 ease-in-out"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              View My Work
            </span>
            <ArrowRight
              size={16}
              className="transition-all duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* Bottom fade */}
        <div
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
          }}
          className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        />
      </section>
    </>
  )
}