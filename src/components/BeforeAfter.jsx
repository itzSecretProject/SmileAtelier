import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, SparkleIcon } from './Icons'
import { beforeAfterImages } from '../assets/images'
import { useT } from '../i18n/i18n'

// Misma sonrisa en ambos lados: el "antes" se ve apagado/amarillento y el
// "después" blanco y luminoso. Una transformación real, no dos personas.
const SMILE_IMG = beforeAfterImages.despues

const BEFORE_FILTER = 'sepia(0.55) saturate(1.1) brightness(0.9) contrast(0.9) hue-rotate(-8deg)'
const AFTER_FILTER = 'brightness(1.07) saturate(1.04) contrast(1.05)'

export default function BeforeAfter() {
  const { L } = useT()
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e) => {
    setIsDragging(true)
    updatePosition(e.clientX)
  }

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const onMouseUp = () => setIsDragging(false)

  const onTouchMove = useCallback(
    (e) => {
      updatePosition(e.touches[0].clientX)
    },
    [updatePosition]
  )

  // El recorte del lado "antes" usa el mismo encuadre para que la cara coincida.
  const beforeImgWidth = position > 0 ? `${10000 / position}%` : '100%'

  return (
    <section id="resultados" className="py-24 lg:py-32 scroll-mt-28" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full"
          >
            <div
              ref={containerRef}
              className="relative rounded-[28px] overflow-hidden select-none bg-[#e8e4df] ring-1 ring-[rgba(11,26,58,0.06)]"
              style={{
                aspectRatio: '4/3',
                cursor: isDragging ? 'col-resize' : 'ew-resize',
                boxShadow: 'var(--shadow-card)',
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
              onTouchMove={onTouchMove}
            >
              {/* Después — misma sonrisa, dientes blancos y luminosos */}
              <img
                src={SMILE_IMG}
                alt="Después del tratamiento — sonrisa blanca y luminosa"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'center 22%', filter: AFTER_FILTER }}
                draggable={false}
              />

              {/* Antes — misma foto, dientes apagados / amarillentos */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${position}%` }}
              >
                <img
                  src={SMILE_IMG}
                  alt="Antes del tratamiento — dientes apagados"
                  className="absolute top-0 left-0 h-full object-cover"
                  style={{
                    width: beforeImgWidth,
                    maxWidth: 'none',
                    objectPosition: 'center 22%',
                    filter: BEFORE_FILTER,
                  }}
                  draggable={false}
                />
                {/* Tinte cálido extra para reforzar el "antes" */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(168,134,60,0.10)' }} />
              </div>

              {/* Etiquetas */}
              <div
                className="absolute left-4 bottom-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white z-10"
                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              >
                {L.ba.antes}
              </div>
              <div
                className="absolute right-4 bottom-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white z-10 flex items-center gap-1.5"
                style={{ background: 'rgba(47,107,255,0.85)', backdropFilter: 'blur(8px)' }}
              >
                <SparkleIcon size={12} />
                {L.ba.despues}
              </div>

              {/* Línea divisoria */}
              <div
                className="absolute inset-y-0 w-0.5 z-20"
                style={{ left: `${position}%`, background: 'white', boxShadow: '0 0 12px rgba(0,0,0,0.35)' }}
              />

              {/* Tirador */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center z-30"
                style={{ left: `${position}%`, boxShadow: '0 6px 26px rgba(0,0,0,0.28)', cursor: 'col-resize' }}
                whileHover={{ scale: 1.12 }}
                animate={{ scale: isDragging ? 1.12 : 1 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M8 9l-4 3 4 3M16 9l4 3-4 3" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
              {L.ba.caption}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 max-w-md"
          >
            <div className="eyebrow mb-5" style={{ color: 'var(--blue)' }}>
              {L.ba.eyebrow}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: 'var(--navy)' }}>
              {L.ba.title}
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
              {L.ba.desc}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold group transition-all duration-300"
              style={{ color: 'var(--blue)' }}
            >
              {L.ba.link}
              <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { n: '500+', label: L.ba.s1 },
                { n: '100%', label: L.ba.s2 },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-3xl font-bold font-['Playfair_Display'] mb-1" style={{ color: 'var(--navy)' }}>
                    {s.n}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
