import { motion } from 'framer-motion'
import { ArrowRightIcon } from './Icons'
import { useT } from '../i18n/i18n'

const techImages = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&q=80&auto=format&fit=crop',
]

export default function Technology() {
  const { L } = useT()
  const techs = L.tech.items.map((t, i) => ({ ...t, img: techImages[i] }))
  return (
    <section id="tecnologia" className="py-24 lg:py-32 relative overflow-hidden scroll-mt-28 rounded-t-[40px] lg:rounded-t-[64px]" style={{ background: 'var(--navy)' }}>
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(37,99,235,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 20% 100%, rgba(59,130,246,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'rgba(59,130,246,0.8)' }}
            >
              {L.tech.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-bold leading-tight max-w-sm text-white"
            >
              {L.tech.title}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:max-w-xs"
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {L.tech.desc}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold group transition-all duration-300"
              style={{ color: 'rgba(59,130,246,0.9)' }}
            >
              {L.tech.link}
              <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              className="group rounded-2xl overflow-hidden relative cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={tech.img}
                  alt={tech.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale brightness-75"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{ background: 'rgba(15,30,60,0.4)' }}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-white mb-2 text-sm leading-tight">
                  {tech.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {tech.desc}
                </p>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, transparent 100%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
