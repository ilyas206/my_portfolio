import { useRef } from 'react'

export default function FillButton({buttonClass = '', href, children, fillColor = '#00d4ff', textColor = '#0a0a0a', borderColor = '#00d4ff', download, target, rel, paddingX = '9px', paddingY = '13px', onClick, disabled }) {
  const btnRef    = useRef(null)
  const fillRef   = useRef(null)

  const getPos = (e) => {
    const rect = btnRef.current.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const handleMouseEnter = (e) => {
    const { x, y } = getPos(e)
    const fill = fillRef.current
    fill.style.left      = `${x}px`
    fill.style.top       = `${y}px`
    fill.style.transform = 'translate(-50%, -50%) scale(0)'
    fill.style.transition = 'none'

    // Force reflow so transition applies
    void fill.offsetWidth

    fill.style.transition = 'transform 0.5s ease, opacity 0.5s ease'
    fill.style.transform  = 'translate(-50%, -50%) scale(4)'
    fill.style.opacity    = '1'

    btnRef.current.style.color = textColor
  }

  const handleMouseLeave = () => {
    const fill = fillRef.current
    fill.style.transition = 'transform 0.4s ease, opacity 0.4s ease'
    fill.style.opacity    = '0'
    fill.style.transform  = 'translate(-50%, -50%) scale(4)'

    btnRef.current.style.color = borderColor
  }

  if (!href) {
    return (
      <button
        type="submit"
        ref={btnRef}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${buttonClass} relative flex items-center justify-center rounded-lg text-sm font-semibold overflow-hidden cursor-pointer border transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        style={{ 
          borderColor: borderColor, 
          color: borderColor, 
          padding: paddingX + ' ' + paddingY
        }}
      >
        <div ref={fillRef} className="absolute rounded-full pointer-events-none"
          style={{width: '90px', height: '90px', backgroundColor: fillColor, opacity: 0, zIndex: 0 }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    )
  }

  return (
    <a
      ref={btnRef}
      href={href}
      download={download}
      target={target}
      rel={rel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={buttonClass +` group relative flex items-center justify-center gap-2 rounded-lg text-sm font-semibold overflow-hidden cursor-pointer border transition-colors duration-300`}
      style={{
        borderColor: borderColor,
        color: borderColor,

        padding: paddingX + ' ' + paddingY
      }}
    >
      {/* Fill blob */}
      <div
        ref={fillRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '90px',
          height: '90px',
          backgroundColor: fillColor,
          opacity: 0,
          zIndex: 0,
        }}
      />

      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
    </a>
  )
}