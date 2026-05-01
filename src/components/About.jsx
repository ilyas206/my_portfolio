import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import resumePDF from '../assets/resume.pdf'
import profile from '../assets/images/profile.png'
import { Download, MapPin, GraduationCap, Briefcase } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useEffect(() => {
    gsap.fromTo('.about-left', 
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '#about', start: 'top 35%' }
      }
    )
    gsap.fromTo('.about-right',
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
        scrollTrigger: { trigger: '#about', start: 'top 35%' }
      }
    )
  }, [])

  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 md:px-20 py-24 bg-(--bg-primary)"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">

        {/* LEFT — Text */}
        <div className="about-left flex-1 flex flex-col gap-6">

          {/* Section label */}
          <span
            className="text-sm font-semibold uppercase tracking-widest text-(--accent)"
          >
            About Me
          </span>

          {/* Name */}
          <h2
            className="text-4xl md:text-5xl font-bold leading-tight text-(--text-primary)"
          >
            Who Am I
          </h2>

          {/* Bio */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-lg text-(--text-secondary)"
            >
            I'm {' '}
            <span className="font-semibold text-(--accent)">Ilyas AIT IDIR</span> {' '}
            a 3rd-year Computer Engineering student specializing in Full-Stack 
            Web Development . I build web applications that are{' '}
            <span className="font-semibold text-(--text-primary)">structured</span>,{' '}
            <span className="font-semibold text-(--text-primary)">scalable</span>, and{' '}
            <span className="font-semibold text-(--text-primary)">built to last</span>{' '}
            — <span className="font-semibold text-(--accent)">React</span> up front,{' '}
            <span className="font-semibold text-(--accent)">Laravel</span> behind the scenes,
            and{' '}
            <span className="font-semibold (--accent)">clean architecture</span>{' '}
            all the way through.
          </p>

          {/* Quick info */}
          <ul className="flex flex-col items-center md:items-start gap-3">
            {[
              { icon: MapPin,        text: 'Based in Casablanca , Morocco' },
              { icon: GraduationCap, text: 'Génie Informatique — 3rd Year' },
              { icon: Briefcase, text: 'Open to remote opportunities' },
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
            <a
                href={resumePDF}
                download="Ilyas_AIT_IDIR_Resume.pdf"
                className="group mt-2 flex items-center gap-2 w-fit px-6 py-3 rounded-md text-sm font-semibold border border-(--accent) text-(--accent) hover:bg-(--accent) hover:text-black transition-all duration-300 ease-in-out"
            >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    Download Resume
                </span>
                <Download
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </a>
          </div>
        </div>

        {/* RIGHT — Photo placeholder */}
        <div className="about-right shrink-0">
          <img src={profile} className="w-64 h-64 md:w-80 md:h-80 rounded-2xl object-cover border border-(--border)" />
        </div>

      </div>
    </section>
  )
}