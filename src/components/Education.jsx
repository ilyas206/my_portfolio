import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Calendar, GraduationCap, CheckCircle } from 'lucide-react'
import { educationData } from '../data/education'
import useTilt from '../hooks/useTilt'

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  useEffect(() => {
    gsap.fromTo('.education-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: '#education', start: 'top 65%', end: 'top 50%', scrub: true }
      }
    )

    gsap.fromTo('.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1, 
        transformOrigin: 'top center',
        scrollTrigger: { trigger: '#education', start: 'top 25%', scrub: true }
      }
    )

    gsap.utils.toArray('.edu-card-left').forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0,
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'center 70%', scrub: true }
        }
      )
    })

    gsap.utils.toArray('.edu-card-right').forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'center 70%', scrub: true }
        }
      )
    })

    gsap.utils.toArray('.centered-dots').forEach(dot => {
      gsap.fromTo(dot,
        { opacity: 0 },
        {
          opacity: 1, 
          scrollTrigger: { trigger: dot, start: 'top 75%', end: 'center 65%', scrub: true }
        }
      )
    })

    gsap.utils.toArray('.left-dots').forEach(dot => {
      gsap.fromTo(dot,
        { opacity: 0 },
        {
          opacity: 1, 
          scrollTrigger: { trigger: dot, start: 'top 88%', end: 'bottom 65%', scrub: true }
        }
      )
    })

  }, [])

  return (
    <section
      id="education"
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24 bg-(--bg-primary)"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">

        {/* Header */}
        <div className="education-header flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-(--accent)">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary)">
            Education
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative">

          {/* Center vertical line — desktop only */}
          <div
            className="timeline-line hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-full rounded-full"
            style={{ backgroundColor: 'var(--accent)', opacity: 0.25 }}
          />

          {/* Mobile vertical line */}
          <div
            className="timeline-line md:hidden absolute left-0 top-0 w-0.5 h-full rounded-full ml-4"
            style={{ backgroundColor: 'var(--accent)', opacity: 0.25 }}
          />

          <div className="flex flex-col gap-12">
            {educationData.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={i} className="relative flex items-start">

                  {/* ── DESKTOP LAYOUT ── */}
                  <div className="hidden md:flex w-full items-start gap-0">

                    {/* Left side */}
                    <div className="w-1/2 pr-12 flex justify-end">
                      {isLeft ? (
                        <EduCard item={item} side="left" />
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="centered-dots relative flex flex-col items-center shrink-0" style={{ zIndex: 10 }}>
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--accent-hover) opacity-75"></span>
                        <span class="relative inline-flex w-5 h-5 rounded-full bg-(--accent)"></span>
                    </div>

                    {/* Right side */}
                    <div className="w-1/2 pl-12 flex justify-start">
                      {!isLeft ? (
                        <EduCard item={item} side="right" />
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>

                  {/* ── MOBILE LAYOUT ── */}
                  <div className="flex md:hidden w-full gap-6 ml-4">
                    {/* Dot */}
                    <div className="left-dots relative w-4 h-4 -ml-1.75 flex items-center justify-center shrink-0" style={{ zIndex: 10 }}>
                      <div
                        className='absolute inset-0 animate-ping rounded-full bg-(--accent-hover) opacity-75'
                      />
                      <div
                        className="relative w-4 h-4 rounded-full bg-(--accent)"
                        style={{
                          boxShadow: '0 0 10px rgba(0,212,255,0.4)',
                        }}
                      />
                    </div>

                    {/* Card */}
                    <div className="flex-1">
                      <EduCard item={item} side="right" />
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function EduCard({ item, side }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(12)
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${side === 'left' ? 'edu-card-left' : 'edu-card-right'} rounded-2xl border p-6 flex flex-col gap-4 border-(--border) bg-(--bg-card) w-full`}
      style={{
        transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,212,255,0.1)'
      }}
    >
      {/* Glossy shine layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
          transformStyle: 'preserve-3d',
          transform: 'translateZ(1px)',
        }}
      />
      {/* Top row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} style={{ color: 'var(--accent)' }} />
            <h3 className="text-base font-bold text-(--text-primary) leading-snug">
              {item.degree}
            </h3>
          </div>
          <p className="text-sm font-medium text-(--accent) ml-6">
            {item.field}
          </p>
        </div>
        <span
          className="self-start text-xs font-semibold px-3 py-1 rounded-full shrink-0"
          style={{
            backgroundColor: 'rgba(0,212,255,0.1)',
            color: 'var(--accent)',
            border: '1px solid rgba(0,212,255,0.3)',
          }}
        >
          {item.status}
        </span>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <MapPin size={12} style={{ color: 'var(--accent)' }} />
          <span className="text-xs text-(--text-secondary)">
            {item.institution} — {item.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} style={{ color: 'var(--accent)' }} />
          <span className="text-xs text-(--text-secondary)">{item.period}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm font-light leading-relaxed text-(--text-secondary)">
        {item.description}
      </p>

      {/* Highlights */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {item.highlights.map(h => (
          <li key={h} className="flex items-center gap-2">
            <CheckCircle size={12} style={{ color: 'var(--accent)' }} />
            <span className="text-xs text-(--text-secondary)">{h}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}