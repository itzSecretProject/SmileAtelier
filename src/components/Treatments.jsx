import { motion } from 'framer-motion'
import { ArrowRightIcon } from './Icons'
import { treatmentImages } from '../assets/images'
import { useT } from '../i18n/i18n'

const treatments = [
  {
    img: treatmentImages.ortodoncia,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12s1 2 4 2 4-2 4-2" />
      </svg>
    ),
  },
  {
    img: treatmentImages.implantes,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v10M8 6l4-4 4 4M5 15c0 3.31 3.13 6 7 6s7-2.69 7-6" />
      </svg>
    ),
  },
  {
    img: treatmentImages.carillas,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c-1 0-2.5 1-2.5 3.5 0 1.5.5 2.5 1 3.5.5 1 1 2 1 4.5s-.5 4-1.5 4S9 17.5 9 16c0-1 .5-2 1-3" />
        <path d="M12 3c1 0 2.5 1 2.5 3.5 0 1.5-.5 2.5-1 3.5-.5 1-1 2-1 4.5s.5 4 1.5 4 1.5-1 1.5-2.5c0-1-.5-2-1-3" />
      </svg>
    ),
  },
  {
    img: treatmentImages.blanqueamiento,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Treatments() {
  const { L } = useT()
  return (
    <section id="tratamientos" className="py-24 lg:py-32 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'var(--blue)' }}
            >
              {L.treat.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-bold leading-tight max-w-sm"
              style={{ color: 'var(--navy)' }}
            >
              {L.treat.title}
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:max-w-xs"
          >
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              {L.treat.desc}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-semibold group transition-all duration-300"
              style={{ color: 'var(--blue)' }}
            >
              {L.treat.link}
              <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {treatments.map((t, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-3xl overflow-hidden cursor-pointer ring-1 ring-[rgba(11,26,58,0.05)]"
              style={{ boxShadow: 'var(--shadow-soft)' }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={t.img}
                  alt={L.treat.items[idx].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Icon circle */}
                <div
                  className="absolute bottom-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  {t.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="font-semibold mb-2 text-base leading-tight"
                  style={{ color: 'var(--navy)' }}
                >
                  {L.treat.items[idx].title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                  {L.treat.items[idx].desc}
                </p>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--navy)]"
                  style={{ border: '1.5px solid rgba(15,30,60,0.15)' }}
                >
                  <ArrowRightIcon
                    size={14}
                    className="transition-colors duration-300 group-hover:text-white text-[var(--navy)]"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
