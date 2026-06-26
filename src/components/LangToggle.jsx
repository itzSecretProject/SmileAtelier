import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '../i18n/i18n'

const LANGS = [
  { code: 'es', label: 'Español',  flag: '🇪🇸' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export default function LangToggle({ variant = 'light' }) {
  const { lang, setLang } = useT()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const dark = variant === 'dark'

  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all select-none"
        style={{
          background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(11,26,58,0.06)',
          color: dark ? 'rgba(255,255,255,0.8)' : 'var(--navy)',
        }}>
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="uppercase">{current.code}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.5, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 py-1.5 rounded-2xl overflow-hidden z-50 min-w-[140px]"
            style={{ background: '#fff', boxShadow: '0 8px 30px rgba(11,26,58,0.15), 0 0 0 1px rgba(11,26,58,0.06)', top: '100%' }}>
            {LANGS.map((l) => {
              const on = l.code === lang
              return (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm font-medium transition-colors text-left"
                  style={{
                    background: on ? 'var(--blue-soft)' : 'transparent',
                    color: on ? 'var(--blue)' : 'var(--navy)',
                  }}>
                  <span className="text-base">{l.flag}</span>
                  <span>{l.label}</span>
                  {on && (
                    <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
