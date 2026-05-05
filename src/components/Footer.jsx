import gsap from 'gsap'
import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0)

  const phrases = [
    { text: 'Dream big',       color: '#00d4ff' },
    { text: 'Code smart',      color: '#374bff' },
    { text: 'Innovate always', color: '#7434ff' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % phrases.length)
    }, 1000)
    return () => clearInterval(interval)
    }, [phrases.length])

    useEffect(() => {
        gsap.fromTo('.footer-content',
            { opacity: 0, y: 30 },
            {
            opacity: 1, y: 0, 
            scrollTrigger: { trigger: 'footer', start: 'top 90%', end: 'top 85%', scrub: true }
            }
        )
    }, [])

  return (
    <footer
      className="w-full px-6 md:px-20 pt-10 pb-20 md:pb-10"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="footer-content max-w-6xl mx-auto w-full flex flex-col gap-12">

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2">
          {/* Social icons */}
          <ul className="flex items-center gap-10">
                <li className='text-(--text-secondary) hover:text-[#25D366] transition duration-200 ease-in text-sm cursor-pointer'>
                    <a href="https://wa.me/212772919738" rel='noopener noreferrer' target='_blank' className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                        </svg>
                        <span>Whatsapp</span>
                    </a>
                </li>
                <li className='text-(--text-secondary) hover:text-[#6e5494] transition duration-200 ease-in text-sm cursor-pointer'>
                    <a href="https://github.com/ilyas206" rel='noopener noreferrer' target='_blank' className='flex items-center gap-1'>
                        <i className={`devicon-github-original text-md md:text-md`}/>
                        <span>GitHub</span>
                    </a>
                </li>
                <li className='text-(--text-secondary) hover:text-[#0A66C2] transition duration-200 ease-in text-sm cursor-pointer'>
                    <a href="https://linkedin.com/in/ilyas-ait-idir-5a8536336/" rel='noopener noreferrer' target='_blank' className='flex items-center gap-1'>
                        <i className={`devicon-linkedin-plain text-md md:text-sm`}/>
                        <span>LinkedIn</span>
                    </a>
                </li>
          </ul>

          <p className="text-sm flex items-center gap-1">
            {phrases.map((phrase, i) => (
                <span key={phrase.text}>
                <span
                    style={{
                    color: i === activeIndex ? phrase.color : 'var(--text-secondary)',
                    transition: 'color 0.4s ease',
                    }}
                >
                    {phrase.text}
                </span>
                {i < phrases.length - 1 && (
                    <span style={{ color: 'var(--text-primary)' }}>{' · '}</span>
                )}
                </span>
            ))}
          </p>

          <p className="text-xs text-(--text-secondary)">
            © {new Date().getFullYear()} <span className="text-(--accent)">Ilyas AIT IDIR</span>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}