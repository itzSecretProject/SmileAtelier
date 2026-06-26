// Capa de persistencia simple sobre localStorage.
// En producción, estas funciones se sustituyen por llamadas a una API real
// sin necesidad de tocar la interfaz.

export const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* almacenamiento lleno o no disponible */
  }
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

export const todayISO = () => new Date().toISOString().slice(0, 10)

export const KEYS = {
  users: 'sa_users',
  reservations: 'sa_reservations',
  analytics: 'sa_analytics',
  consent: 'sa_cookie_consent',
  session: 'sa_session',
}
