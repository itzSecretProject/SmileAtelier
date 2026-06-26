import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useT } from '../i18n/i18n'
import { CookieIcon } from './Icons'

function Toggle({ checked, disabled, onChange }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 ${
        checked ? 'bg-[var(--blue)]' : 'bg-[rgba(11,26,58,0.18)]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-pressed={checked}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  )
}

export default function CookieBanner() {
  const { consent, saveConsent } = useApp()
  const { L } = useT()
  const [showConfig, setShowConfig] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false })

  if (consent) return null // ya decidió

  const acceptAll = () => saveConsent({ analytics: true, marketing: true })
  const rejectAll = () => saveConsent({ analytics: false, marketing: false })
  const savePrefs = () => saveConsent(prefs)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 inset-x-0 z-[9998] p-3 sm:p-5 flex justify-center pointer-events-none"
      >
        <div className="glass pointer-events-auto w-full max-w-2xl rounded-3xl p-5 sm:p-6 shadow-[var(--shadow-float)]">
          <div className="flex items-start gap-4">
            <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-[var(--blue)] bg-[var(--blue-soft)] shrink-0">
              <CookieIcon size={22} />
            </span>
            <div className="flex-1">
              <h3 className="text-base font-bold" style={{ color: 'var(--navy)' }}>
                {L.cookie.title}
              </h3>
              <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--text-muted)' }}>
                {L.cookie.desc}
              </p>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {showConfig && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-2.5">
                  {[
                    { key: 'necessary', title: L.cookie.necessary, desc: L.cookie.necessaryD, locked: true, value: true },
                    { key: 'analytics', title: L.cookie.analytics, desc: L.cookie.analyticsD, value: prefs.analytics },
                    { key: 'marketing', title: L.cookie.marketing, desc: L.cookie.marketingD, value: prefs.marketing },
                  ].map((c) => (
                    <div key={c.key} className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/60">
                      <div className="flex-1">
                        <div className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{c.title}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{c.desc}</div>
                      </div>
                      <Toggle
                        checked={c.value}
                        disabled={c.locked}
                        onChange={(v) => setPrefs((p) => ({ ...p, [c.key]: v }))}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
            {!showConfig ? (
              <button
                onClick={() => setShowConfig(true)}
                className="px-5 py-3 rounded-full text-sm font-semibold transition-colors order-3 sm:order-1"
                style={{ color: 'var(--navy)', background: 'rgba(11,26,58,0.06)' }}
              >
                {L.cookie.configure}
              </button>
            ) : (
              <button
                onClick={savePrefs}
                className="px-5 py-3 rounded-full text-sm font-semibold transition-colors order-3 sm:order-1"
                style={{ color: 'var(--navy)', background: 'rgba(11,26,58,0.06)' }}
              >
                {L.cookie.save}
              </button>
            )}
            <button
              onClick={rejectAll}
              className="px-5 py-3 rounded-full text-sm font-semibold border order-2 sm:flex-1"
              style={{ borderColor: 'rgba(11,26,58,0.15)', color: 'var(--navy)' }}
            >
              {L.cookie.reject}
            </button>
            <button
              onClick={acceptAll}
              className="px-5 py-3 rounded-full text-sm font-semibold text-white order-1 sm:order-3 sm:flex-1"
              style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}
            >
              {L.cookie.accept}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
