import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  MenuIcon, XIcon, CalendarIcon,
  HomeIcon, ToothIcon, SparkleIcon, CameraIcon, StarIcon, PhoneIcon, GridDotsIcon,
} from './Icons'
import { useT } from '../i18n/i18n'
import LangToggle from './LangToggle'

const links = [
  { id: 'inicio', tkey: 'inicio', Icon: HomeIcon },
  { id: 'tratamientos', tkey: 'tratamientos', Icon: ToothIcon },
  { id: 'tecnologia', tkey: 'tecnologia', Icon: SparkleIcon },
  { id: 'resultados', tkey: 'galeria', Icon: CameraIcon },
  { id: 'testimonios', tkey: 'resenas', Icon: StarIcon },
  { id: 'contacto', tkey: 'contacto', Icon: PhoneIcon },
]

function DockItem({ link, mouseX, isActive }) {
  const ref = useRef(null)
  const { L } = useT()
  const { id, tkey, Icon } = link
  const label = L.nav[tkey]

  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - b.x - b.width / 2
  })
  const scaleSync = useTransform(distance, [-110, 0, 110], [1, 1.4, 1])
  const liftSync = useTransform(distance, [-110, 0, 110], [0, -8, 0])
  const scale = useSpring(scaleSync, { stiffness: 320, damping: 18, mass: 0.2 })
  const lift = useSpring(liftSync, { stiffness: 320, damping: 18, mass: 0.2 })

  return (
    <li className="relative">
      <a href={`#${id}`} className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl">
        {isActive && (
          <motion.span
            layoutId="dock-pill"
            className="absolute inset-0 rounded-2xl bg-[var(--blue-soft)]"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <motion.span
          ref={ref}
          style={{ scale, y: lift, transformOrigin: 'bottom center', color: isActive ? 'var(--blue)' : 'var(--navy)' }}
          className="relative z-10 block"
        >
          <Icon size={21} />
        </motion.span>
        <span
          className="relative z-10 text-[10.5px] font-semibold tracking-wide transition-colors duration-300"
          style={{ color: isActive ? 'var(--blue)' : 'var(--text-muted)' }}
        >
          {label}
        </span>
      </a>
    </li>
  )
}

export default function Navbar() {
  const { L } = useT()
  const [active, setActive] = useState('inicio')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mouseX = useMotionValue(Infinity)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Scroll-spy
  useEffect(() => {
    const ids = links.map((l) => l.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── Floating glass dock (desktop) ── */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex justify-center pointer-events-none"
        style={{ paddingTop: scrolled ? 14 : 22, transition: 'padding 0.5s var(--ease-out-expo)' }}
      >
        <div className="dock pointer-events-auto flex items-center gap-1.5 rounded-[26px] pl-2 pr-2.5 py-2">
          {/* Brand chip */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 rounded-[20px] pl-2 pr-4 py-2 mr-1 transition-colors"
            aria-label="SmileAtelier inicio"
          >
            <span
              className="w-11 h-11 rounded-[16px] flex items-center justify-center text-white shadow-[0_8px_18px_-6px_rgba(11,26,58,0.6)]"
              style={{ background: 'linear-gradient(155deg, #16284f 0%, #0b1a3a 100%)' }}
            >
              <ToothIcon size={22} />
            </span>
            <span
              className="font-['Playfair_Display'] text-[17px] font-600 tracking-tight leading-none"
              style={{ color: 'var(--navy)' }}
            >
              Smile<span className="text-[var(--blue)]">Atelier</span>
            </span>
          </a>

          <span className="w-px h-8 bg-[rgba(11,26,58,0.08)] mx-1" />

          {/* Icon nav con magnificación estilo Dock de macOS */}
          <ul className="flex items-end gap-0.5 pb-0.5" onMouseMove={(e) => mouseX.set(e.clientX)} onMouseLeave={() => mouseX.set(Infinity)}>
            {links.map((link) => (
              <DockItem key={link.id} link={link} mouseX={mouseX} isActive={active === link.id} />
            ))}
          </ul>

          <span className="w-px h-8 bg-[rgba(11,26,58,0.08)] mx-1" />

          {/* Selector de idioma */}
          <LangToggle />

          {/* Acceder */}
          <Link
            to="/login"
            className="px-3 py-3 rounded-[20px] text-sm font-semibold transition-colors hover:bg-[var(--blue-soft)]"
            style={{ color: 'var(--navy)' }}
          >
            {L.nav.acceder}
          </Link>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/reservar"
              className="flex items-center gap-2 px-5 py-3 rounded-[20px] text-sm font-semibold text-white shadow-[0_12px_26px_-10px_rgba(47,107,255,0.8)]"
              style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}
            >
              <CalendarIcon size={16} />
              {L.nav.reservar}
            </Link>
          </motion.div>

          {/* Chip de puntos (decorativo, como la referencia) */}
          <span className="ml-1 w-11 h-11 rounded-[16px] flex items-center justify-center text-[var(--blue)]"
            style={{ background: 'var(--blue-soft)' }}>
            <GridDotsIcon size={18} />
          </span>
        </div>
      </motion.nav>

      {/* ── Mobile top bar ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-3 pointer-events-none"
      >
        <div className="dock pointer-events-auto flex items-center justify-between rounded-[22px] pl-2.5 pr-2.5 py-2">
          <a href="#inicio" className="flex items-center gap-2.5">
            <span
              className="w-10 h-10 rounded-[14px] flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(155deg, #16284f 0%, #0b1a3a 100%)' }}
            >
              <ToothIcon size={20} />
            </span>
            <span className="font-['Playfair_Display'] text-[16px] font-600" style={{ color: 'var(--navy)' }}>
              Smile<span className="text-[var(--blue)]">Atelier</span>
            </span>
          </a>
          <button
            className="w-10 h-10 rounded-[14px] flex items-center justify-center text-[var(--navy)] bg-[var(--blue-soft)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-[rgba(11,26,58,0.25)] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed inset-x-4 top-[76px] z-50 glass rounded-3xl p-3 shadow-[var(--shadow-float)]"
            >
              <ul className="grid grid-cols-2 gap-2">
                {links.map(({ id, tkey, Icon }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 active:scale-[0.98] transition-transform"
                    >
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--blue)] bg-[var(--blue-soft)]">
                        <Icon size={18} />
                      </span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{L.nav[tkey]}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex justify-center"><LangToggle /></div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold"
                  style={{ background: 'var(--blue-soft)', color: 'var(--navy)' }}
                >
                  {L.nav.acceder}
                </Link>
                <Link
                  to="/reservar"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}
                >
                  <CalendarIcon size={16} />
                  {L.nav.reservar}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
