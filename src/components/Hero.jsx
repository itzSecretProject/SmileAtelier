import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { CalendarIcon, PlayIcon, SparkleIcon, StarIcon } from './Icons'
import { useT } from '../i18n/i18n'

const ease = [0.16, 1, 0.3, 1]

function GlossyTooth() {
  return (
    <svg viewBox="0 0 280 320" className="w-full h-full drop-shadow-[0_40px_60px_rgba(11,26,58,0.22)]">
      <defs>
        <linearGradient id="enamel" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#eaf1ff" />
          <stop offset="100%" stopColor="#c5d6f5" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#dbe7ff" />
          <stop offset="100%" stopColor="#dbe7ff" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <ellipse cx="140" cy="150" rx="130" ry="140" fill="url(#glow)" />

      {/* Tooth body */}
      <path
        d="M140 36c-26-24-66-30-92-12C18 44 16 86 26 122c8 30 14 54 20 82 5 23 9 50 26 50 19 0 21-28 25-52 3-19 8-37 23-37s20 18 23 37c4 24 6 52 25 52 17 0 21-27 26-50 6-28 12-52 20-82 10-36 8-78-22-98-26-18-66-12-92 12Z"
        fill="url(#enamel)"
        stroke="#ffffff"
        strokeWidth="2"
      />
      {/* Inner highlight */}
      <path
        d="M104 64c-18 6-30 24-28 50 1 16 6 28 9 40"
        fill="none"
        stroke="#ffffff"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.85"
        filter="url(#soft)"
      />
      {/* Glossy sweep */}
      <path
        d="M150 52c30-14 64-8 80 16-10-6-26-8-42-2-22 8-34 26-38 50-3 18 0 36 4 54-12-4-20-18-22-40-3-30 0-62 18-78Z"
        fill="url(#shine)"
        opacity="0.5"
      />
      {/* Sparkle */}
      <g fill="#2f6bff">
        <path d="M196 96c1.6 9 5.4 12.8 14.4 14.4-9 1.6-12.8 5.4-14.4 14.4-1.6-9-5.4-12.8-14.4-14.4 9-1.6 12.8-5.4 14.4-14.4Z" opacity="0.9" />
      </g>
    </svg>
  )
}

export default function Hero() {
  const { L } = useT()
  const stats = L.hero.stats.map((s) => ({ value: s.v, label: s.l, star: s.star }))
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const toothY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden pt-32 lg:pt-40"
    >
      {/* Backdrop layers */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 32%, rgba(47,107,255,0.10) 0%, transparent 70%)' }}
      />

      {/* Giant faded wordmark */}
      <motion.div
        style={{ y: wordmarkY }}
        className="absolute left-1/2 -translate-x-1/2 top-[42%] lg:top-[38%] pointer-events-none select-none w-full text-center"
      >
        <span
          className="font-['Playfair_Display'] font-bold tracking-tight whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 22vw, 20rem)',
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(47,107,255,0.10)',
          }}
        >
          SmileAtelier
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 w-full flex-1">
        {/* Center tooth */}
        <motion.div
          style={{ y: toothY }}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="absolute left-1/2 -translate-x-1/2 top-2 lg:top-0 w-[260px] h-[300px] lg:w-[360px] lg:h-[420px] z-10"
        >
          {/* Orbit rings */}
          <div className="absolute inset-[-8%] rounded-full border border-dashed border-[rgba(47,107,255,0.25)] animate-spin-slow" />
          <div className="absolute inset-[6%] rounded-full border border-[rgba(47,107,255,0.12)]" />
          <div className="animate-float w-full h-full">
            <GlossyTooth />
          </div>

          {/* Orbiting badge: rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease }}
            className="absolute -left-10 lg:-left-16 top-10 glass rounded-2xl px-3.5 py-2.5 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={11} fill="#f5a623" className="text-[#f5a623]" />
                ))}
              </div>
            </div>
            <div className="text-[11px] mt-0.5 font-medium" style={{ color: 'var(--text-muted)' }}>
              {L.hero.reviews}
            </div>
          </motion.div>

          {/* Orbiting badge: implants */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3, ease }}
            className="absolute -right-8 lg:-right-14 bottom-16 glass rounded-2xl px-4 py-3 shadow-[var(--shadow-card)]"
          >
            <div className="text-2xl font-bold font-['Playfair_Display']" style={{ color: 'var(--navy)' }}>
              170+
            </div>
            <div className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
              {L.hero.implants}
            </div>
          </motion.div>
        </motion.div>

        {/* Headline split (left / right) over the tooth */}
        <motion.div style={{ y: textY }} className="relative z-20 grid lg:grid-cols-2 gap-y-2 items-center pt-2 lg:pt-10">
          {/* Left headline */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 glass"
              style={{ color: 'var(--blue)' }}
            >
              <SparkleIcon size={13} />
              {L.hero.badge}
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 110 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.3, ease }}
                className="text-5xl lg:text-7xl xl:text-[5.4rem] font-bold leading-[0.98] tracking-tight"
                style={{ color: 'var(--navy)' }}
              >
                {L.hero.t1}
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 110 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.42, ease }}
                className="text-5xl lg:text-7xl xl:text-[5.4rem] font-bold italic leading-[0.98] tracking-tight text-gradient"
              >
                {L.hero.t2}
              </motion.h1>
            </div>
          </div>

          {/* Right block */}
          <div className="text-center lg:text-right lg:self-end lg:pb-6 mt-8 lg:mt-32">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: 90 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.5, ease }}
                className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-[0.98] tracking-tight"
                style={{ color: 'var(--navy)' }}
              >
                {L.hero.t3}
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="text-base lg:text-lg leading-relaxed mt-5 max-w-sm mx-auto lg:ml-auto lg:mr-0"
              style={{ color: 'var(--text-muted)' }}
            >
              {L.hero.desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease }}
              className="flex flex-wrap items-center justify-center lg:justify-end gap-3 mt-8"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/reservar"
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-white text-sm shadow-[0_14px_30px_-12px_rgba(47,107,255,0.7)]"
                  style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}
                >
                  <CalendarIcon size={16} />
                  {L.hero.book}
                </Link>
              </motion.div>
              <motion.a
                href="#tecnologia"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 pl-2 pr-5 py-2 rounded-full glass font-semibold text-sm group"
                style={{ color: 'var(--navy)' }}
              >
                <span className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--navy)' }}>
                  <PlayIcon size={11} className="ml-0.5" />
                </span>
                {L.hero.clinic}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Stats glass bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease }}
        className="relative z-20 max-w-5xl mx-auto px-6 w-full mt-12 lg:mt-20 mb-10"
      >
        <div className="glass rounded-[28px] shadow-[var(--shadow-soft)] grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[rgba(11,26,58,0.07)] overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08, duration: 0.5, ease }}
              className="px-5 py-6 text-center"
            >
              <div className="flex items-center justify-center gap-1 text-2xl lg:text-3xl font-bold font-['Playfair_Display']" style={{ color: 'var(--navy)' }}>
                {s.value}
                {s.star && <StarIcon size={16} fill="#f5a623" className="text-[#f5a623]" />}
              </div>
              <div className="text-xs lg:text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#tratamientos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium tracking-widest uppercase"
        style={{ color: 'var(--text-muted)' }}
      >
        {L.hero.scroll}
        <span className="w-6 h-9 rounded-full border-2 border-[rgba(11,26,58,0.2)] flex justify-center pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-[var(--blue)]"
          />
        </span>
      </motion.a>
    </section>
  )
}
