import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillsData } from '../data/skills'

gsap.registerPlugin(ScrollTrigger)

const track = [...skillsData, ...skillsData]

function SkillCard({ name, icon }) {
  const cardRef      = useRef(null)
  const spotlightRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotlightRef.current.style.left    = `${x}px`
    spotlightRef.current.style.top     = `${y}px`
    spotlightRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    spotlightRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="skill-card relative flex flex-col items-center justify-center gap-3 rounded-xl border border-(--border) bg-(--bg-card) transition-colors duration-300 overflow-hidden cursor-default"
      style={{ minWidth: '170px', height: '160px', padding: '20px 16px' }}
    >
      {/* Per-card spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '140px',
          height: '140px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          zIndex: 0,
        }}
      />

      {/* Icon */}
      <div className="relative z-10">
        <i
        className={`${icon} text-5xl`}
        style={{ filter: 'grayscale(100%) brightness(0.85)', color: 'var(--text-secondary)' }}
        />
      </div>

      {/* Name */}
      <span
        className="relative z-10 text-sm text-center text-(--text-secondary)"
        style={{ lineHeight: '1.3' }}
      >
        {name}
      </span>
    </div>
  )
}

export default function Skills() {
  const carouselRef = useRef(null)
  const tweenRef    = useRef(null)

  useEffect(() => {
    gsap.fromTo('.skills-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: '#skills', start: 'top 65%', end: 'top 50%', scrub: true}
      }
    )

    gsap.utils.toArray('.skill-card').forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'center 70%', scrub: true }
        }
      )
    })

  }, [])

  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    const totalWidth = el.scrollWidth / 2

    tweenRef.current = gsap.to(el, {
      x: `-=${totalWidth}`,
      duration: 40,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
      },
    })

    return () => tweenRef.current?.kill()
  }, [])

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center py-24 bg-(--bg-primary) overflow-hidden"
    >
      {/* Header */}
      <div className="skills-header flex flex-col gap-2 px-6 md:px-8 max-w-6xl mx-auto w-full mb-12">
        <span className="text-sm font-semibold uppercase tracking-widest text-(--accent)">
          What I Work With
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary)">
          Skills & Tools
        </h2>
      </div>

      {/* Carousel - DESKTOP */}
      <div className="relative w-full overflow-hidden mt-10 hidden md:block"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 h-full w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
        />

        {/* Track */}
        <div
          ref={carouselRef}
          className="flex w-max"
          style={{ gap: '12px', paddingInline: '40px' }}
        >
          {track.map(({ name, icon }, i) => (
            <SkillCard key={`${name}-${i}`} name={name} icon={icon} />
          ))}
        </div>
      </div>

      {/* List - Mobile */}
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mx-auto w-9/10 overflow-hidden md:hidden">
          {
            skillsData?.map(({ name, icon }, i) => {
              return <SkillCard key={`${name}-${i}`} name={name} icon={icon} />
            })
          }
      </div>
    </section>
  )
}