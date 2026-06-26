import { motion } from 'framer-motion'
import { CalendarIcon, ArrowRightIcon } from './Icons'
import { useT } from '../i18n/i18n'

export default function Offer() {
  const { L } = useT()
  const perks = L.offer.perks
  return (
    <section className="py-20 lg:py-28" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-0 rounded-[36px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0b1a3a 0%, #16284f 55%, #1d3a78 100%)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Glow decorativo */}
          <div
            className="absolute -top-24 -right-16 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(47,107,255,0.45) 0%, transparent 70%)' }}
          />

          {/* Texto */}
          <div className="relative z-10 p-9 lg:p-14">
            <div className="eyebrow mb-5" style={{ color: 'rgba(123,160,255,0.95)' }}>
              {L.offer.eyebrow}
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold leading-[1.08] text-white mb-5">
              {L.offer.title}
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {L.offer.desc1}<strong className="text-white">{L.offer.desc2}</strong>{L.offer.desc3}
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-3 mb-9">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(47,107,255,0.25)' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7aa0ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm text-[var(--navy)] bg-white shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)]"
            >
              <CalendarIcon size={16} />
              {L.offer.cta}
              <ArrowRightIcon size={15} />
            </motion.a>
          </div>

          {/* Tarjeta del 30% */}
          <div className="relative z-10 flex items-center justify-center p-9 lg:p-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass rounded-[28px] w-full max-w-sm p-8 text-center"
              style={{ boxShadow: 'var(--shadow-float)' }}
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-7xl lg:text-8xl font-bold font-['Playfair_Display'] text-gradient leading-none">
                  30
                </span>
                <span className="text-3xl font-bold text-[var(--blue)]">%</span>
              </div>
              <div className="eyebrow mt-2" style={{ color: 'var(--text-muted)' }}>
                {L.offer.cardLabel}
              </div>

              {/* Smiley */}
              <div className="my-7 flex justify-center">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" stroke="var(--blue)" strokeWidth="3" opacity="0.25" />
                  <circle cx="36" cy="42" r="4.5" fill="var(--navy)" />
                  <circle cx="64" cy="42" r="4.5" fill="var(--navy)" />
                  <path d="M30 58c5 9 14 14 20 14s15-5 20-14" stroke="var(--blue)" strokeWidth="5" strokeLinecap="round" />
                  <path d="M30 58c5 4 14 6 20 6s15-2 20-6" fill="white" stroke="var(--navy)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {L.offer.cardNote}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
