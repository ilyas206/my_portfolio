import { useRef } from 'react'

export default function useTilt(strength = 15) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const card = ref.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -strength
    const rotateY = ((x - centerX) / centerX) * strength

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    const card = ref.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    card.style.borderColor = 'var(--border)'
    card.style.boxShadow = '0 0 0 rgba(0,212,255,0.1)'
  }

  return { ref, handleMouseMove, handleMouseLeave }
}