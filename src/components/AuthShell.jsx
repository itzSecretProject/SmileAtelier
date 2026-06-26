import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ToothIcon, StarIcon, CheckIcon } from './Icons'
import { useT } from '../i18n/i18n'
import LangToggle from './LangToggle'

export default function AuthShell({ title, subtitle, children, footer }) {
  const { L } = useT()
  const perks = L.auth.perks
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Lado marca */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0b1a3a 0%, #16284f 55%, #1d3a78 100%)' }}>
        <div className="absolute -top-24 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(47,107,255,0.4) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

        <Link to="/" className="relative flex items-center gap-2.5 w-fit">
          <span className="w-10 h-10 rounded-[14px] flex items-center justify-center text-white"
            style={{ background: 'rgba(255,255,255,0.12)' }}>
            <ToothIcon size={20} />
          </span>
          <span className="font-['Playfair_Display'] text-lg font-600 text-white">SmileAtelier</span>
        </Link>

        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-8 max-w-md">
            {L.auth.tagline}
          </motion.h2>
          <ul className="space-y-3.5">
            {perks.map((p, i) => (
              <motion.li key={p}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-white/85 text-sm">
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(47,107,255,0.3)' }}>
                  <CheckIcon size={13} className="text-white" />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative glass rounded-2xl p-5 max-w-sm" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)' }}>
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => <StarIcon key={i} size={13} fill="#f5a623" className="text-[#f5a623]" />)}
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            {L.auth.testimonial}
          </p>
          <div className="text-xs text-white/50 mt-2">{L.auth.testimonialBy}</div>
        </div>
      </div>

      {/* Lado formulario */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 relative">
        <Link to="/" className="lg:hidden flex items-center gap-2.5 mb-10 w-fit">
          <span className="w-10 h-10 rounded-[14px] flex items-center justify-center text-white"
            style={{ background: 'linear-gradient(155deg, #16284f 0%, #0b1a3a 100%)' }}>
            <ToothIcon size={20} />
          </span>
          <span className="font-['Playfair_Display'] text-lg font-600" style={{ color: 'var(--navy)' }}>SmileAtelier</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: 'var(--navy)' }}>{title}</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
          {children}
          {footer && <div className="mt-7 text-sm text-center" style={{ color: 'var(--text-muted)' }}>{footer}</div>}
        </motion.div>

        <div className="absolute top-6 right-6 flex items-center gap-3">
          <LangToggle />
          <Link to="/" className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {L.auth.back}
          </Link>
        </div>
      </div>
    </div>
  )
}

// Campo de formulario reutilizable
export function Field({ icon, label, type = 'text', value, onChange, placeholder, autoComplete, rightSlot }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>{label}</span>
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>{icon}</span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full rounded-xl border bg-white py-3 pr-3 text-sm outline-none transition-all focus:border-[var(--blue)] focus:ring-4 focus:ring-[rgba(47,107,255,0.12)]"
          style={{ borderColor: 'rgba(11,26,58,0.14)', paddingLeft: icon ? '2.75rem' : '0.9rem' }}
        />
        {rightSlot && <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</span>}
      </div>
    </label>
  )
}
