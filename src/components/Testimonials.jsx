import { motion } from 'framer-motion'
import { StarIcon } from './Icons'
import { useT } from '../i18n/i18n'

const avatars = [
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&q=80&auto=format&fit=crop&face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&q=80&auto=format&fit=crop&face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&q=80&auto=format&fit=crop&face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&q=80&auto=format&fit=crop&face',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&q=80&auto=format&fit=crop&face',
  'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=80&h=80&q=80&auto=format&fit=crop&face',
]

const extraTestis = [
  { name: 'Sofía Ruiz',    role: 'Ortodoncia',         text: 'En 8 meses conseguí la sonrisa que siempre quise. El equipo es increíblemente atento y profesional.',   stars: 5, avatar: avatars[3] },
  { name: 'Andrés López',  role: 'Implantes',           text: 'Años con el mismo problema y aquí lo solucioné en una sola sesión. Absolutamente recomendable.',         stars: 5, avatar: avatars[4] },
  { name: 'Elena Moreno',  role: 'Blanqueamiento',      text: 'Resultado inmediato y sin molestias. Mi dentista de por vida sin ninguna duda.',                          stars: 5, avatar: avatars[5] },
  { name: 'Pedro Herrera', role: 'Carillas',            text: 'El antes y después es de película. Tecnología de primer nivel y trato humano excepcional.',               stars: 5, avatar: avatars[0] },
  { name: 'Natalia Vega',  role: 'Revisión anual',      text: 'Acudo desde hace tres años. Siempre me siento escuchada y el resultado es perfecto cada vez.',            stars: 5, avatar: avatars[1] },
  { name: 'Miguel Torres', role: 'Ortodoncia adultos',  text: 'Nunca pensé que ponerse ortodoncia de adulto pudiera ser tan sencillo. Gracias por todo.',                stars: 5, avatar: avatars[2] },
  { name: 'Irene Blanco',  role: 'Estética dental',     text: 'Vine muy nerviosa y me fui encantada. El equipo te hace sentir en confianza desde el primer momento.',    stars: 5, avatar: avatars[3] },
  { name: 'Javier Rueda',  role: 'Implante unitario',   text: 'Precio justo, resultado impecable. No busques más, este es el sitio.',                                    stars: 5, avatar: avatars[4] },
]

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <StarIcon key={i} size={13} fill="#f5a623" style={{ color: '#f5a623' }} />
      ))}
    </div>
  )
}

function TestiCard({ item }) {
  return (
    <div className="shrink-0 w-[300px] rounded-2xl p-6 mr-4 bg-white"
      style={{ boxShadow: '0 2px 16px rgba(11,26,58,0.07)', border: '1px solid rgba(11,26,58,0.05)' }}>
      <Stars n={item.stars} />
      <p className="text-sm leading-relaxed mt-3 mb-5" style={{ color: 'var(--text-muted)' }}>
        "{item.text}"
      </p>
      <div className="flex items-center gap-3">
        <img src={item.avatar} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <div className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{item.name}</div>
          <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{item.role}</div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse }) {
  const all = [...items, ...items]
  return (
    <div className="overflow-hidden"
      style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
      <div className="flex w-max"
        style={{ animation: `${reverse ? 'marqueeRev' : 'marquee'} 40s linear infinite` }}>
        {all.map((item, i) => <TestiCard key={i} item={item} />)}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { L } = useT()

  const row1 = extraTestis.slice(0, 5)
  const row2 = extraTestis.slice(3)

  return (
    <section id="testimonios" className="py-24 lg:py-32 scroll-mt-28 overflow-hidden" style={{ background: '#f6f9ff' }}>
      <style>{`
        @keyframes marquee    { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes marqueeRev { from { transform: translateX(-50%) } to { transform: translateX(0)    } }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header + featured card */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-12 mb-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'var(--blue)' }}>
              {L.testi.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: 'var(--navy)' }}>
              {L.testi.title}
            </motion.h2>

            {/* Rating summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold font-['Playfair_Display']" style={{ color: 'var(--navy)' }}>4.9</span>
                <div>
                  <Stars n={5} />
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>+180 reseñas</div>
                </div>
              </div>
              <div className="flex -space-x-2">
                {avatars.slice(0, 5).map((a, i) => (
                  <img key={i} src={a} alt="" className="w-8 h-8 rounded-full object-cover ring-2 ring-[#f6f9ff]" />
                ))}
                <div className="w-8 h-8 rounded-full ring-2 ring-[#f6f9ff] flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: 'var(--blue)' }}>+175</div>
              </div>
            </motion.div>
          </div>

          {/* Featured quote card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:max-w-sm bg-white rounded-3xl p-7 relative"
            style={{ boxShadow: '0 20px 60px rgba(11,26,58,0.1)', border: '1px solid rgba(11,26,58,0.05)' }}>
            <div className="absolute top-5 right-6 font-['Playfair_Display'] text-7xl leading-none select-none"
              style={{ color: 'rgba(47,107,255,0.08)' }}>"</div>
            <Stars n={5} />
            <p className="text-base leading-relaxed mt-4 mb-6 relative z-10 font-medium"
              style={{ color: 'var(--navy)' }}>
              "{L.testi.items[0].text}"
            </p>
            <div className="flex items-center gap-3">
              <img src={avatars[0]} alt="María García" className="w-11 h-11 rounded-full object-cover ring-2 ring-[rgba(47,107,255,0.2)]" />
              <div>
                <div className="text-sm font-bold" style={{ color: 'var(--navy)' }}>María García</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{L.testi.items[0].role}</div>
              </div>
              <span className="ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#15803d' }}>
                Verificado
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite marquee rows */}
      <div className="space-y-4">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  )
}
