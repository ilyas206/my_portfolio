import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import resumePDF from '../assets/resume.pdf'
import profile from '../assets/images/profile.png'
import { Download, MapPin, GraduationCap, Briefcase } from 'lucide-react'
import FillButton from './FillButton'

const QUOTE = '"Good enough never ships. Great does."'

const cyanScale = [
  '#00646f', '#00484b', '#002c27',
  '#00b8db', '#009cb7', '#008093',
  '#66e7ff', '#33dfff', '#00d4ff',
  '#e6fbff', '#ccf7ff', '#99efff',
]

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useEffect(() => {
    gsap.fromTo('.about-header', 
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: '#about', start: 'top 65%', end: 'top 50%', scrub: true }
      }
    )
    gsap.fromTo('.about-content', 
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '#about', start: 'top 65%', end: '80% 85%', scrub: true }
      }
    )
    gsap.fromTo('.about-photo',
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '#about', start: 'top 65%', end: '80% 85%', scrub: true }
      }
    )
  }, [])

  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 md:px-20 py-24 bg-(--bg-primary)"
    >
      <div className="w-full flex flex-col items-center gap-16">

        {/* Header */}
        <div className="about-header flex flex-col gap-2 max-w-6xl mx-auto w-full mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-(--accent)">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary)">
            Who Am I
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* LEFT - Content */}
          <div className='about-content flex flex-col gap-8 w-full md:w-3/5'>
            {/* Bio */}
            <p className="text-base md:text-lg text-center md:text-start leading-relaxed max-w-lg text-(--text-secondary)">
              I'm{' '}
              <span className="font-semibold text-(--accent)">Ilyas AIT IDIR</span>
              {' '}— a 3rd-year Computer Engineering student with a sharp focus on
              full-stack web development. I don't just connect a frontend to a backend —
              I build{' '}
              <span className="font-semibold text-(--text-primary)">structured</span>,{' '}
              <span className="font-semibold text-(--text-primary)">maintainable</span>{' '}
              systems where every layer is intentional.{' '}
              <span className="font-semibold text-(--accent)">React</span> for interfaces that feel right,{' '}
              <span className="font-semibold text-(--accent)">Laravel</span> for backends that scale,
              and <span className="font-semibold text-(--text-primary)">clean architecture</span>{' '}
              as a non-negotiable standard — not an afterthought.
            </p>

            {/* Quick info */}
            <ul className="flex flex-col items-center md:items-start gap-3">
              {[
                { icon: MapPin,        text: 'Based in Casablanca , Morocco' },
                { icon: GraduationCap, text: 'Génie Informatique — 3rd Year' },
                { icon: Briefcase, text: 'Available for remote & on-site roles' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon size={16} className='text-(--accent)' />
                  <span className="text-sm text-(--text-secondary)">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Resume Button */}
            <div className='flex justify-center md:justify-start'>
              <FillButton buttonClass='group' href={resumePDF} download="Ilyas_AIT_IDIR_Resume.pdf" fillColor="var(--accent)" textColor="#0a0a0a" borderColor="var(--accent)" paddingX="10px" paddingY="15px">
                <span className="flex items-center gap-2 overflow-hidden">
                  <span className="transition-transform duration-300 group-hover:translate-x-32">
                    <Download size={16}/> 
                  </span>
                  <span className="transition-transform duration-300 group-hover:-translate-x-6">
                      Download Resume
                  </span>
                </span>
              </FillButton>
            </div>
          </div>

          {/* RIGHT — Photo */}
          <div className="about-photo flex flex-col items-center gap-5 w-full md:w-2/5 shrink-0">
            <img src={profile} className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover border border-(--border)" />
            <RainbowQuote/>
          </div>
        </div>

      </div>
    </section>
  )
}

function RainbowQuote() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Scroll animation
    gsap.fromTo('.quote-char',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%',
          end: 'top 80%',
          scrub: true,
        }
      }
    )
  }, [])

  const handleMouseMove = (e) => {
    const chars = containerRef.current.querySelectorAll('.quote-char')
    const cursorX = e.clientX

    chars.forEach((char) => {
      const rect   = char.getBoundingClientRect()
      const charCX = rect.left + rect.width / 2
      const dist   = Math.abs(cursorX - charCX)
      const maxDist = 120

      if (dist < maxDist) {
        const ratio      = 1 - dist / maxDist
        const colorIndex = Math.floor(ratio * (cyanScale.length - 1))
        const color      = cyanScale[colorIndex]

        gsap.to(char, {
          color,
          scale: 1 + ratio * 0.3,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      } else {
        gsap.to(char, {
          color: 'var(--accent)',
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    })
  }

  const handleMouseLeave = () => {
    const chars = containerRef.current.querySelectorAll('.quote-char')
    gsap.to(chars, {
      color: 'var(--text-secondary)',
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.02,
    })
  }

  return (
    <blockquote
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="quote w-full md:w-2/3 lg:w-2/5 text-lg md:text-2xl font-semibold text-center italic cursor-default select-none flex flex-wrap justify-center"
      style={{ gap: '0px' }}
    >
      {QUOTE.split('').map((char, i) => (
        <span
          key={i}
          className="quote-char inline-block"
          style={{
            color: 'var(--text-secondary)',
            transition: 'none',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </blockquote>
  )
}