import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Send, LoaderCircle, Undo2, Frown, PartyPopper, MailPlus } from 'lucide-react'
import FillButton from './FillButton'
import Tooltip from './Tooltip'

gsap.registerPlugin(ScrollTrigger)

const FORMSPREE_URL = 'https://formspree.io/f/mvzlzkbn'

export default function Contact() {
  const [formData, setFormData]   = useState({ name: '', subject: '', email: '', message: '' })
  const [status, setStatus]       = useState('idle') // idle | sending | success | error
  const formRef                   = useRef(null)

  useEffect(() => {
    gsap.fromTo('.contact-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: '#contact', start: 'top 65%', end: 'top 50%', scrub: true }
      }
    )
    gsap.fromTo('.contact-form',
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0, 
        scrollTrigger: { trigger: '#contact', start: 'top 50%', end: 'top 10%', scrub: true }
      }
    )
    gsap.fromTo('.contact-info',
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        scrollTrigger: { trigger: '#contact', start: 'top 50%', end: 'top 10%', scrub: true }
      }
    )
  }, [])

  useEffect(() => {
    gsap.fromTo('.contact-feedback',
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        scrollTrigger: { trigger: '#contact', start: 'top 50%', end: 'top 10%', scrub: true }
      }
    )
  }, [status])

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', subject: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // const inputClass = `
  //   w-full px-4 py-3 rounded-lg text-sm outline-none
  //   border transition-all duration-200
  //   bg-(--bg-secondary) text-(--text-primary)
  //   border-(--border) placeholder:text-(--text-secondary)
  //   focus:border-(--accent)
  // `

  const inputClass = `
    w-full px-4 py-3 text-sm outline-none
    bg-transparent border-b-2 border-(--border)
    text-(--text-primary) placeholder:text-(--text-secondary)
    focus:border-(--accent)
    transition-colors duration-300
  `

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-24 bg-(--bg-primary)"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12">

        {/* Header */}
        <div className="contact-header flex flex-col gap-2">
          <span className="text-sm font-semibold uppercase tracking-widest text-(--accent)">
            Let's Build Something
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-(--text-primary)">
            Contact Me
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {
            (status === 'idle' || status === 'sending') &&
            <>
                {/* LEFT — Form */}
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form flex flex-col gap-5 w-full md:w-2/3"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-(--accent)">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Mr / Mrs ..."
                    required
                    className={inputClass}
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-(--accent)">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's blewing in your mind ?"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-(--accent)">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Where do i reach you ?"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-(--accent)">
                    Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, timeline — the more detail, the better I can help."
                    required
                    rows={6}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end md:justify-start gap-4">
                  <FillButton
                    fillColor="var(--accent)"
                    textColor="#0a0a0a" 
                    borderColor="var(--accent)"
                    buttonClass='group'
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' 
                      ? <span className="flex items-center gap-2 overflow-hidden">
                          <LoaderCircle size={14} className='animate-spin'/>
                          <span>
                            Sending...
                          </span>
                        </span>
                      : <span className="flex items-center gap-2 overflow-hidden">
                          <span className="transition-transform duration-300 group-hover:translate-x-15">
                            <Send size={14} /> 
                          </span>
                          <span className="transition-transform duration-300 group-hover:-translate-x-5">
                            Send it !
                          </span>
                        </span>
                    }
                  </FillButton>
                </div>
              </form>
            </>
          }

          {/* Feedback */}

          {
            status === 'success' &&
            <div className='contact-feedback flex flex-col items-center justify-center h-56 gap-5 text-(--text-success) w-full md:w-2/3'>
              <PartyPopper size={50} />
              <h2 className='font-bold text-2xl text-center'>Sent ! We'll respond to you shortly</h2>
              <FillButton
                fillColor="var(--text-success)"
                textColor="#0a0a0a" 
                borderColor="var(--text-success)"
                paddingY='20px'
                buttonClass='group'
                onClick={() => setStatus('idle')}
              >
                <span className="flex items-center gap-2 overflow-hidden">
                  <span className="transition-transform duration-300 group-hover:translate-x-31">
                    <MailPlus size={15} />
                  </span>
                  <span className="transition-transform duration-300 group-hover:-translate-x-6">Send a new email</span>
                </span>
              </FillButton>
            </div>
          }

          {
            status === 'error' &&
            <div className='contact-feedback flex flex-col items-center justify-center h-56 gap-5 text-(--text-error) w-full md:w-2/3'>
              <Frown size={50} />
              <h2 className='font-bold text-2xl text-center'>Ooops ! Something went wrong. Try again.</h2>
              <FillButton
                fillColor="var(--text-error)"
                textColor="#0a0a0a" 
                borderColor="var(--text-error)"
                paddingY='20px'
                buttonClass='group'
                onClick={() => setStatus('idle')}
              >
                <span className="flex items-center gap-2 overflow-hidden">
                  <span className="transition-transform duration-300 group-hover:translate-x-26">
                    <Undo2 size={15} />
                  </span>
                  <span className="transition-transform duration-300 group-hover:-translate-x-5">Return to form</span>
                </span>
              </FillButton>
            </div>
          }

          {/* RIGHT — Contact Info */}
          <div className="contact-info text-center flex flex-col items-center md:mt-5 px-2 gap-10 w-full md:w-1/3">

            <p className="text-sm leading-relaxed text-(--text-secondary)">
              Whether it's a{' '}
              <span className="text-(--text-primary) font-semibold">remote position</span>,{' '}
              an <span className="text-(--text-primary) font-semibold">on-site role</span>,{' '}
              or a <span className="text-(--text-primary) font-semibold">freelance project</span>{' '}
              — I'm actively looking for my next opportunity and I bring full commitment to everything I take on.
              <br /><br />
              If you're building something serious and need a developer who cares about{' '}
              <span className="text-(--accent) font-semibold">quality</span>,{' '}
              <span className="text-(--accent) font-semibold">architecture</span>, and{' '}
              <span className="text-(--accent) font-semibold">results</span>{' '}
              — let's talk.
            </p>

            <Tooltip/>

          </div>
        </div>
      </div>
    </section>
  )
}