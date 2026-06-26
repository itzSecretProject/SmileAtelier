import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPinIcon, PhoneIcon, MailIcon } from './Icons'
import { useT } from '../i18n/i18n'
import LangToggle from './LangToggle'

function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export default function Footer() {
  const { L } = useT()
  return (
    <footer style={{ background: 'var(--navy)' }} className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.5 1 2.5 3 2.5 5.5c0 3.5 4.5 7.5 4.5 7.5s4.5-4 4.5-7.5C11.5 3 9.5 1 7 1z" fill="white" />
                </svg>
              </div>
              <span className="font-['Playfair_Display'] text-lg font-semibold text-white">SmileAtelier</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {L.footer.desc}
            </p>
            <div className="flex gap-3">
              {[InstagramIcon, FacebookIcon].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, background: 'rgba(255,255,255,0.15)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <Icon size={15} className="text-white opacity-70" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">{L.footer.colTreat}</h4>
            <ul className="space-y-3">
              {L.footer.treat.map(s => (
                <li key={s}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">{L.footer.colClinic}</h4>
            <ul className="space-y-3">
              {L.footer.clinic.map(s => (
                <li key={s}>
                  <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">{L.footer.colContact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon size={15} className="mt-0.5 shrink-0" style={{ color: 'rgba(59,130,246,0.8)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Calle Serrano 45, 28001 Madrid</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon size={15} className="shrink-0" style={{ color: 'rgba(59,130,246,0.8)' }} />
                <a href="tel:+34900000000" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  +34 900 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon size={15} className="shrink-0" style={{ color: 'rgba(59,130,246,0.8)' }} />
                <a href="mailto:hola@smileatelier.es" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  hola@smileatelier.es
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {L.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <LangToggle variant="dark" />
            {L.footer.legal.map((l, i) => (
              i === 0
                ? <Link key={l} to="/privacidad" className="text-xs transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</Link>
                : <a key={l} href="#" className="text-xs transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
