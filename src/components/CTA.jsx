import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CalendarIcon, PhoneIcon, CheckIcon, SparkleIcon, StarIcon } from './Icons'
import { useT } from '../i18n/i18n'

const ease = [0.16, 1, 0.3, 1]

export default function CTA() {
  const { L } = useT()
  const features = [L.cta.f1, L.cta.f2, L.cta.f3]

  return (
    <section
      id="contacto"
      className="relative overflow-hidden scroll-mt-28"
      style={{ background: 'var(--navy)' }}>

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,120,255,0.25) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80"
          style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(124,58,237,0.12) 0%, transparent 60%)' }} />
        <div className="absolute top-1/2 right-0 w-80 h-80 -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(59,120,255,0.1) 0%, transparent 60%)' }} />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="relative max-w-4xl mx-auto px-6 py-32 lg:py-44 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-10"
          style={{ background: 'rgba(59,120,255,0.14)', color: '#7aa0ff', border: '1px solid rgba(59,120,255,0.22)' }}>
          <SparkleIcon size={13} />
          {L.cta.eyebrow}
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.1, ease }}
          className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight text-white mb-7">
          {L.cta.title}
        </motion.h2>

        {/* Desc */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.22, ease }}
          className="text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-12"
          style={{ color: 'rgba(255,255,255,0.5)' }}>
          {L.cta.desc}
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3, ease }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {features.map((f, i) => (
            <span key={f} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
              {i === 1 ? <StarIcon size={12} style={{ color: '#f5a623' }} fill="#f5a623" /> : <CheckIcon size={12} style={{ color: '#7aa0ff' }} />}
              {f}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.38, ease }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/reservar"
              className="flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-white text-sm"
              style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)', boxShadow: '0 18px 44px -12px rgba(47,107,255,0.65)' }}>
              <CalendarIcon size={17} />
              {L.cta.book}
            </Link>
          </motion.div>
          <motion.a
            href="tel:+34900000000"
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.09)' }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-9 py-4 rounded-full font-semibold text-sm transition-all"
            style={{ border: '1.5px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}>
            <PhoneIcon size={17} />
            {L.cta.call}
          </motion.a>
        </motion.div>

        {/* Subtle note */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-12 text-xs"
          style={{ color: 'rgba(255,255,255,0.25)' }}>
          Sin compromiso · Respuesta en menos de 24h · +15.000 pacientes satisfechos
        </motion.p>
      </div>
    </section>
  )
}
