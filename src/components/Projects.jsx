import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Monitor } from 'lucide-react'
import { projectsData } from '../data/projects'
import FillButton from './FillButton'

gsap.registerPlugin(ScrollTrigger)

function NoProjects(){
  return (
    <div
      className="relative rounded-2xl overflow-hidden border p-8"
      style={{
        backgroundColor: 'var(--bg-card)',
        color : 'var(--accent)'
      }}
    >
      <h3
        className="text-xl font-light text-center text-(--text-primary)"
      >
        Projects coming soon !
      </h3>
    </div>
  )
}

function ProjectCard({ title, description, tech, accentColor, siteUrl, repoUrl, screenshot }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: `${accentColor}30`,
        boxShadow: `0 0 0 0 ${accentColor}00`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accentColor}80`
        e.currentTarget.style.boxShadow   = `0 0 32px ${accentColor}18`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${accentColor}30`
        e.currentTarget.style.boxShadow   = `0 0 0 0 ${accentColor}00`
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 w-full h-0.5"
        style={{ backgroundColor: accentColor }}
      />

      <div className="flex flex-col md:flex-row gap-0">

        {/* LEFT — Content */}
        <div className="flex-1 flex flex-col gap-5 p-8">

          {/* Title */}
          <h3
            className="text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </p>

          {/* Tech stack */}
          <div className=" w-4/5 mx-auto md:w-full flex flex-col items-center md:items-start gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              Tech Stack Used
            </span>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {tech.map(t => (
                <span
                  key={t}
                  className="flex grow items-center justify-center gap-2 text-xs px-3 py-1 rounded-full border font-medium"
                  style={{
                    borderColor: `${accentColor}50`,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                  }}
                >
                    <i className={`${t.icon} text-sm md:text-xl text-[${accentColor}]`} />
                    <span>{t.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 justify-center md:justify-start mt-auto pt-2">
            <FillButton buttonClass='group' href={siteUrl} target="_blank" rel="noopener noreferrer" paddingX='8px' paddingY='13px' fillColor={accentColor} textColor="#0a0a0a" borderColor={accentColor}>
                <span className="flex items-center gap-2 overflow-hidden">
                  <span className="transition-transform duration-300 group-hover:translate-x-17">
                    <ExternalLink size={14} />
                  </span>
                  <span className="transition-transform duration-300 group-hover:-translate-x-5.5">
                    Visit Site
                  </span>
                </span>
            </FillButton>
            <FillButton buttonClass='group' href={repoUrl} target="_blank" rel="noopener noreferrer" paddingX='8px' paddingY='13px' fillColor={accentColor} textColor="#0a0a0a" borderColor={accentColor}>
                <span className="flex items-center gap-2 overflow-hidden">
                  <i className="transition-transform duration-300 group-hover:translate-x-23 devicon-github-original" />
                  <span className="transition-transform duration-300 group-hover:-translate-x-5">
                    GitHub Repo 
                  </span>
                </span>
            </FillButton>
          </div>
        </div>

        {/* RIGHT — Screenshot */}
        <div
          className="md:w-85 shrink-0 flex items-center justify-center p-6"
          style={{ backgroundColor: `${accentColor}08` }}
        >
          {screenshot ? (
            <img
              src={screenshot}
              alt={`${title} screenshot`}
              className="rounded-xl w-full object-cover shadow-lg"
              style={{ border: `1px solid ${accentColor}30` }}
            />
          ) : (
            <div
              className="w-full h-48 md:h-full min-h-45 rounded-xl flex flex-col items-center justify-center gap-3"
              style={{
                border: `1px dashed ${accentColor}40`,
                backgroundColor: `${accentColor}06`,
              }}
            >
              <Monitor size={32} style={{ color: accentColor, opacity: 0.5 }} />
              <span
                className="text-xs"
                style={{ color: accentColor, opacity: 0.5 }}
              >
                Screenshot coming soon
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default function Projects() {
  useEffect(() => {
    gsap.fromTo('.projects-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: '#projects', start: 'top 65%', end: 'top 50%', scrub: true }
      }
    )

    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 90%',
                scrub: true,
            }
            }
        )
    })
  }, [])

  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24 bg-(--bg-primary)"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">

        {/* Header */}
        <div className="projects-header flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-(--accent)">
            What I've Built
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary)">
            Projects
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {
            projectsData.length > 0 ?
            <>
              {projectsData.map(project => (
              <div key={project.title} className="project-card">
                <ProjectCard {...project} />
              </div>
            ))}
            </> :
            <>
              <NoProjects />
            </>
          }
        </div>

      </div>
    </section>
  )
}