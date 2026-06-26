import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const sections = [
  {
    title: '1. Responsable del tratamiento',
    body: `SmileAtelier (en adelante, "la Clínica") es el responsable del tratamiento de los datos personales recogidos a través de este sitio web. Dirección: Calle Serrano 45, 28001 Madrid. Email: privacidad@smileatelier.es.`,
  },
  {
    title: '2. Datos que recopilamos',
    body: `Recopilamos datos que usted nos facilita voluntariamente al registrarse, realizar una reserva o ponerse en contacto con nosotros: nombre, apellidos, dirección de correo electrónico, número de teléfono y cualquier información adicional que usted proporcione. Asimismo, con su consentimiento, recopilamos datos de navegación mediante cookies analíticas.`,
  },
  {
    title: '3. Finalidad del tratamiento',
    body: `Los datos se utilizan para: (a) gestionar su cuenta de paciente y las reservas de citas; (b) comunicarle recordatorios de citas y novedades de la clínica; (c) mejorar nuestros servicios mediante análisis estadístico anónimo (solo con su consentimiento cookie).`,
  },
  {
    title: '4. Base jurídica',
    body: `El tratamiento de sus datos se basa en la ejecución de un contrato de prestación de servicios sanitarios (Art. 6.1.b RGPD), en el cumplimiento de obligaciones legales (Art. 6.1.c RGPD) y, para comunicaciones comerciales y cookies analíticas, en su consentimiento expreso (Art. 6.1.a RGPD).`,
  },
  {
    title: '5. Conservación de datos',
    body: `Conservamos sus datos mientras exista una relación con la clínica y, una vez finalizada, durante los plazos legales aplicables (mínimo 5 años para historiales clínicos según la legislación sanitaria española).`,
  },
  {
    title: '6. Cesión a terceros',
    body: `No cedemos sus datos a terceros salvo por obligación legal o a encargados del tratamiento necesarios para la prestación del servicio (p. ej., plataformas de correo electrónico), quienes están obligados contractualmente a mantener la confidencialidad.`,
  },
  {
    title: '7. Sus derechos',
    body: `Puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición enviando un email a privacidad@smileatelier.es con copia de su documento de identidad. Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
  },
  {
    title: '8. Cookies',
    body: `Utilizamos cookies estrictamente necesarias para el funcionamiento del sitio y, con su consentimiento, cookies analíticas y de marketing. Puede gestionar sus preferencias en el panel de cookies disponible en el pie de página.`,
  },
  {
    title: '9. Seguridad',
    body: `Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos frente a accesos no autorizados, pérdida o destrucción accidental, conforme al RGPD y la LOPDGDD.`,
  },
  {
    title: '10. Modificaciones',
    body: `Nos reservamos el derecho a actualizar esta política. Cualquier cambio sustancial le será notificado por email o mediante aviso destacado en el sitio web.`,
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--off-white)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(250,250,255,0.95)', backdropFilter: 'blur(16px)', borderColor: 'rgba(11,26,58,0.07)' }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <svg viewBox="0 0 32 32" className="w-7 h-7">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0.6" y2="1">
                  <stop offset="0%" stopColor="#3b78ff"/>
                  <stop offset="100%" stopColor="#2f6bff"/>
                </linearGradient>
              </defs>
              <path fill="url(#fg)" d="M16 2C9 2 4 7 4 12.5c0 3.5 1.2 6.5 3.2 9.2C8.8 24 9.5 27 10.5 30c.5 1.5 1.8 1.5 2.2 0 .4-1.5.8-4.5 3.3-4.5s2.9 3 3.3 4.5c.4 1.5 1.7 1.5 2.2 0 1-3 1.7-6 3.3-8.3C26.8 19 28 16 28 12.5 28 7 23 2 16 2z"/>
            </svg>
            <span className="font-['Playfair_Display'] text-base font-semibold" style={{ color: 'var(--navy)' }}>
              SmileAtelier
            </span>
          </Link>
          <Link to="/" className="text-sm font-medium" style={{ color: 'var(--blue)' }}>
            ← Volver al inicio
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>

          <div className="mb-10">
            <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--blue)' }}>
              Cumplimiento RGPD
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 font-['Playfair_Display']" style={{ color: 'var(--navy)' }}>
              Política de Privacidad
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Última actualización: junio de 2025 · SmileAtelier S.L. · CIF: B-00000000
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 ring-1 ring-[rgba(11,26,58,0.06)]"
                style={{ boxShadow: '0 2px 12px rgba(11,26,58,0.05)' }}>
                <h2 className="text-base font-bold mb-3" style={{ color: 'var(--navy)' }}>{s.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl" style={{ background: 'var(--blue-soft)' }}>
            <p className="text-sm" style={{ color: 'var(--blue)' }}>
              Para cualquier consulta sobre privacidad contacta con nosotros en{' '}
              <a href="mailto:privacidad@smileatelier.es" className="font-semibold underline">
                privacidad@smileatelier.es
              </a>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
