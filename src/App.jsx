import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp, usePageview } from './context/AppContext'
import { I18nProvider } from './i18n/i18n'
import CookieBanner from './components/CookieBanner'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

// Transición entre páginas. La Home usa solo opacidad (sin transform) para no
// romper el posicionamiento `fixed` del dock; el resto desliza suavemente.
function PageTransition({ children, plain }) {
  return (
    <motion.div
      initial={plain ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={plain ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={plain ? { opacity: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function RequireAuth({ children, role }) {
  const { currentUser } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  if (role && currentUser.role !== role) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/reservar'} replace />
  }
  return children
}

function AppRoutes() {
  const location = useLocation()
  usePageview(location.pathname)

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition plain><Home /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="/recuperar" element={<PageTransition><Forgot /></PageTransition>} />
          <Route path="/reservar" element={<RequireAuth role="patient"><PageTransition><Dashboard /></PageTransition></RequireAuth>} />
          <Route path="/admin" element={<RequireAuth role="admin"><PageTransition><Admin /></PageTransition></RequireAuth>} />
          <Route path="/privacidad" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <CookieBanner />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </I18nProvider>
  )
}
