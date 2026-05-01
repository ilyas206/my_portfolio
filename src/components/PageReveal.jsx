import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PageReveal({ onComplete }) {
  const barsRef = useRef([])
  const NUM_BARS = 7

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      },
    })

    // All bars slide down and out staggered
    tl.to(barsRef.current, {
      scaleY: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power4.inOut',
      transformOrigin: 'bottom center',
      delay: 0.2,
    })
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-100 flex pointer-events-none"
      style={{ display: 'flex' }}
    >
      {Array.from({ length: NUM_BARS }).map((_, i) => (
        <div
          key={i}
          ref={el => (barsRef.current[i] = el)}
          style={{ backgroundColor: 'var(--accent)' }}
          className="h-full flex-1"
        />
      ))}
    </div>
  )
}