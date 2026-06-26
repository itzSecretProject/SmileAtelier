/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { load, save, uid, todayISO, KEYS } from '../lib/storage'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

// Credenciales de administrador — cambiar antes del despliegue definitivo.
const ADMIN = { user: 'admin', pass: '123' }

// Limpia datos de versiones anteriores (datos de demo, etc.) al actualizar.
const STORAGE_VERSION = 'prod-1'
if (localStorage.getItem('sa_version') !== STORAGE_VERSION) {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k))
  localStorage.setItem('sa_version', STORAGE_VERSION)
}

const EMPTY_ANALYTICS = {
  totalVisits: 0,
  daily: {},
  pages: {},
  devices: {},
  consent: { accepted: 0, rejected: 0, customized: 0 },
  referrers: {},
}

export function AppProvider({ children }) {
  const [users,        setUsers]        = useState(() => load(KEYS.users,        []))
  const [reservations, setReservations] = useState(() => load(KEYS.reservations, []))
  const [analytics,    setAnalytics]    = useState(() => load(KEYS.analytics,    EMPTY_ANALYTICS))
  const [consent,      setConsent]      = useState(() => load(KEYS.consent,      null))
  const [session,      setSession]      = useState(() => load(KEYS.session,      null))

  // Persistencia
  useEffect(() => save(KEYS.users,        users),        [users])
  useEffect(() => save(KEYS.reservations, reservations), [reservations])
  useEffect(() => save(KEYS.analytics,    analytics),    [analytics])
  useEffect(() => { if (consent) save(KEYS.consent, consent) }, [consent])
  useEffect(() => {
    session ? save(KEYS.session, session) : localStorage.removeItem(KEYS.session)
  }, [session])

  const currentUser = useMemo(() => {
    if (!session) return null
    if (session.role === 'admin') return { id: 'admin', role: 'admin', firstName: 'Administrador', lastName: '' }
    return users.find((u) => u.id === session.userId) || null
  }, [session, users])

  // ── Analítica ──
  const recordVisit = (path) => {
    if (!consent?.analytics) return
    const day    = todayISO()
    const device = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
    setAnalytics((a) => ({
      ...a,
      totalVisits: (a.totalVisits || 0) + 1,
      daily:       { ...a.daily,   [day]:    (a.daily?.[day]    || 0) + 1 },
      pages:       { ...a.pages,   [path]:   (a.pages?.[path]   || 0) + 1 },
      devices:     { ...a.devices, [device]: (a.devices?.[device] || 0) + 1 },
    }))
  }

  const saveConsent = (prefs) => {
    const value = { necessary: true, analytics: !!prefs.analytics, marketing: !!prefs.marketing, ts: Date.now() }
    setConsent(value)
    const kind = prefs.analytics && prefs.marketing ? 'accepted'
      : (!prefs.analytics && !prefs.marketing) ? 'rejected'
      : 'customized'
    setAnalytics((a) => ({ ...a, consent: { ...a.consent, [kind]: (a.consent?.[kind] || 0) + 1 } }))
  }

  // ── Auth ──
  const register = ({ firstName, lastName, email, password }) => {
    firstName = firstName?.trim()
    lastName  = lastName?.trim()
    email     = email?.trim().toLowerCase()
    if (!firstName || !lastName)
      return { ok: false, error: 'Indica tu nombre y apellido.' }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return { ok: false, error: 'Introduce un email válido.' }
    if (!password || password.length < 6)
      return { ok: false, error: 'La contraseña debe tener al menos 6 caracteres.' }
    if (users.some((u) => u.email === email))
      return { ok: false, error: 'Ya existe una cuenta con ese email.' }

    const id      = uid()
    const newUser = {
      id, firstName, lastName, email, password, role: 'patient',
      createdAt: new Date().toISOString(),
      members: [{ id: uid(), firstName, lastName, relation: 'Titular', self: true }],
    }
    setUsers((prev) => [...prev, newUser])
    setSession({ role: 'patient', userId: id })
    return { ok: true }
  }

  const login = (identifier, password) => {
    const id = identifier?.trim()
    if (id?.toLowerCase() === ADMIN.user && password === ADMIN.pass) {
      setSession({ role: 'admin' })
      return { ok: true, role: 'admin' }
    }
    const user = users.find((u) => u.email === id?.toLowerCase() && u.password === password)
    if (!user) return { ok: false, error: 'Email o contraseña incorrectos.' }
    setSession({ role: 'patient', userId: user.id })
    return { ok: true, role: 'patient' }
  }

  const logout = () => setSession(null)

  const emailExists  = (email) => users.some((u) => u.email === email?.trim().toLowerCase())

  const resetPassword = (email, newPassword) => {
    email = email?.trim().toLowerCase()
    if (!users.some((u) => u.email === email))
      return { ok: false, error: 'No hay ninguna cuenta con ese email.' }
    if (!newPassword || newPassword.length < 6)
      return { ok: false, error: 'La nueva contraseña debe tener al menos 6 caracteres.' }
    setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, password: newPassword } : u)))
    return { ok: true }
  }

  // ── Familia ──
  const addMember = ({ firstName, lastName, relation }) => {
    if (!currentUser || currentUser.role === 'admin') return { ok: false }
    if (!firstName?.trim() || !lastName?.trim()) return { ok: false, error: 'Indica nombre y apellido.' }
    const member = { id: uid(), firstName: firstName.trim(), lastName: lastName.trim(), relation: relation || 'Familiar' }
    setUsers((prev) => prev.map((u) => u.id === currentUser.id ? { ...u, members: [...u.members, member] } : u))
    return { ok: true }
  }

  const removeMember = (memberId) => {
    setUsers((prev) => prev.map((u) => {
      if (u.id !== currentUser?.id) return u
      if (u.members.find((m) => m.id === memberId)?.self) return u
      return { ...u, members: u.members.filter((m) => m.id !== memberId) }
    }))
  }

  // ── Reservas ──
  const createReservation = ({ memberIds, service, date, time }) => {
    if (!currentUser || currentUser.role === 'admin') return { ok: false }
    if (!memberIds?.length)  return { ok: false, error: 'Selecciona al menos un paciente.' }
    if (!service)            return { ok: false, error: 'Selecciona un tratamiento.' }
    if (!date)               return { ok: false, error: 'Elige una fecha.' }
    if (!time)               return { ok: false, error: 'Elige una hora.' }

    const attendees = currentUser.members
      .filter((m) => memberIds.includes(m.id))
      .map((m) => ({ name: `${m.firstName} ${m.lastName}`, relation: m.relation }))

    const res = {
      id: uid(),
      userId:      currentUser.id,
      accountName: `${currentUser.firstName} ${currentUser.lastName}`,
      accountEmail: currentUser.email,
      attendees, service, date, time,
      status:    'confirmada',
      createdAt: new Date().toISOString(),
    }
    setReservations((prev) => [res, ...prev])
    return { ok: true }
  }

  const cancelReservation = (id) => {
    setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: 'cancelada' } : r))
  }

  const myReservations = useMemo(
    () => currentUser?.role === 'patient'
      ? reservations.filter((r) => r.userId === currentUser.id)
      : [],
    [reservations, currentUser]
  )

  const value = {
    currentUser, users, reservations, myReservations, analytics, consent,
    recordVisit, saveConsent,
    register, login, logout, emailExists, resetPassword,
    addMember, removeMember, createReservation, cancelReservation,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function usePageview(pathname) {
  const { recordVisit } = useApp()
  const last = useRef(null)
  useEffect(() => {
    if (last.current === pathname) return
    last.current = pathname
    recordVisit(pathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}
