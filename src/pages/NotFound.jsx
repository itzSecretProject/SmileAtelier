import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(160deg, #f0f4ff 0%, #ffffff 60%)' }}>

      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(47,107,255,0.08) 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative">

        {/* Big 404 */}
        <div className="relative select-none mb-6">
          <span className="font-['Playfair_Display'] font-bold text-[10rem] lg:text-[14rem] leading-none"
            style={{ color: 'transparent', WebkitTextStroke: '2px rgba(47,107,255,0.15)' }}>
            404
          </span>
          {/* Tooth in the 0 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 80 90" className="w-16 h-20 lg:w-20 lg:h-24 drop-shadow-lg">
              <defs>
                <linearGradient id="t404" x1="0" y1="0" x2="0.6" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#c5d6f5" />
                </linearGradient>
              </defs>
              <path d="M40 8C24 8 12 18 12 30c0 8 3 15 6 22 2 6 4 14 7 20 1.5 5 3 4 4 0 1-4 2-10 7-10s6 6 7 10c1 4 2.5 5 4 0 3-6 5-14 7-20 3-7 6-14 6-22C60 18 56 8 40 8Z"
                fill="url(#t404)" stroke="#dbe7ff" strokeWidth="1.5" />
              <path d="M28 16c-6 3-10 9-9 18" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
            </svg>
          </motion.div>
        </div>

        <h1 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: 'var(--navy)' }}>
          Esta página no existe
        </h1>
        <p className="text-base mb-8 max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
          Parece que el enlace está roto o la dirección es incorrecta. Te llevamos de vuelta a la clínica.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm"
              style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)', boxShadow: '0 14px 30px -12px rgba(47,107,255,0.6)' }}>
              Volver al inicio
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link to="/login"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border"
              style={{ borderColor: 'rgba(11,26,58,0.15)', color: 'var(--navy)' }}>
              Iniciar sesión
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
