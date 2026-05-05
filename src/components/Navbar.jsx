import { useEffect, useState } from 'react'
import { User, Code, FolderOpen, GraduationCap, Mail, Home } from 'lucide-react'
import logo from '../assets/images/my_logo.png'

const navLinks = [
  { label: 'Home',      href: '#hero',      icon: Home },
  { label: 'About',      href: '#about',      icon: User },
  { label: 'Skills',     href: '#skills',     icon: Code },
  { label: 'Projects',   href: '#projects',   icon: FolderOpen },
  { label: 'Education', href: '#education', icon: GraduationCap },
  { label: 'Contact',    href: '#contact',    icon: Mail },
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [active, setActive]   = useState('')

  // Show navbar only after scrolling past Hero
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById('hero')?.offsetHeight || 0
      setVisible(window.scrollY > heroHeight - 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight active section based on scroll position
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── DESKTOP NAVBAR (top) ── */}
      <nav
        style={{
          backgroundColor: 'transparent',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
        }}
        className="fixed top-0 left-0 w-full z-50 hidden md:flex items-center justify-between px-10"
      >
        <a href="#hero">
          <img src={logo} alt="Ilyas Logo" className="h-23 w-auto" />
        </a>

        <div className="overflow-hidden bg-(--bg-secondary)/10 backdrop-blur-md border border-(--border) fixed top-3 right-3 z-50 flex justify-around items-center gap-6 px-6  rounded-4xl">
          <span
            className="pointer-events-none absolute"
            style={{
              inset: 0,
              borderRadius: 'inherit',
              background: 'transparent',
              border: '1.5px solid transparent',
              backgroundImage: `conic-gradient(from var(--angle, 0deg), transparent 0%, transparent 70%, #00d4ff 85%, #ffffff 90%, #00d4ff 95%, transparent 100%)`,
              backgroundOrigin: 'border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'destination-out',
              maskComposite: 'exclude',
              animation: 'travel-border 7s linear infinite',
            }}
          />
          <ul className="flex gap-8 py-4">
            {navLinks.map(({ label, href }) => {
              const isActive = active === href.replace('#', '')
              return (
                <li key={label}>
                  <a
                    href={href}
                    className="relative text-sm font-medium pb-1"
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.querySelector('.underline-bar').style.width = '100%'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.querySelector('.underline-bar').style.width = '0%'
                        e.currentTarget.style.color = 'var(--text-secondary)'
                      }
                    }}
                  >
                    {label}
                    <span
                      className="underline-bar absolute bottom-0 left-0 h-0.5 rounded-full"
                      style={{
                        backgroundColor: 'var(--accent)',
                        width: isActive ? '100%' : '0%',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* ── MOBILE NAVBAR (bottom icons) ── */}
      <nav
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(150%)',
          transition: 'transform 0.3s ease',
        }}
        className="bg-(--bg-secondary)/10 backdrop-blur-md border border-(--border) fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex md:hidden justify-around items-center gap-6 px-8 py-3 rounded-2xl"
      >
        <span
          className="pointer-events-none absolute"
          style={{
            inset: 0,
            borderRadius: 'inherit',
            background: 'transparent',
            border: '1.5px solid transparent',
            backgroundImage: `conic-gradient(from var(--angle, 0deg), transparent 0%, transparent 70%, #00d4ff 85%, #ffffff 90%, #00d4ff 95%, transparent 100%)`,
            backgroundOrigin: 'border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
            animation: 'travel-border 7s linear infinite',
          }}
        />
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive = active === href.replace('#', '')
          return (
            <a
              key={label}
              href={href}
              style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
              className="flex flex-col items-center"
            >
              <Icon size={20} />
            </a>
          )
        })}
      </nav>
    </>
  )
}