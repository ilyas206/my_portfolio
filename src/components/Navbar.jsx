import { useEffect, useState } from 'react'
import { User, Code, FolderOpen, GraduationCap, Mail, Home, FileText } from 'lucide-react'
import logo from '../assets/images/my_logo.png'
import resumePDF from '../assets/resume.pdf'

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
      { threshold: 0.4 }
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
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease',
        }}
        className="fixed top-0 left-0 w-full z-50 hidden md:flex items-center justify-between px-10"
      >
        <a href="#hero">
        <img src={logo} alt="Ilyas Logo" className="h-20 w-auto" />
        </a>

        <ul className="flex gap-8 py-4">
          {navLinks.map(({ label, href }) => {
            const isActive = active === href.replace('#', '')
            return (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'color 0.2s ease, border-color 0.2s ease',
                  }}
                  className="text-sm font-medium pb-1 hover:text-white"
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
        <a
            href={resumePDF}
            download="Ilyas_AIT_IDIR_Resume.pdf"
            style={{
                transition: 'all 0.2s ease',
            }}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border border-(--accent) text-(--accent) hover:bg-[#00d4ff] hover:text-black"
        >
        <FileText size={16}/>
        Resume
        </a>
      </nav>

      {/* ── MOBILE NAVBAR (bottom icons) ── */}
      <nav
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          transform: visible ? 'translateY(0)' : 'translateY(150%)',
          transition: 'transform 0.3s ease',
        }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex md:hidden justify-around items-center gap-6 px-8 py-3 rounded-2xl"
      >
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