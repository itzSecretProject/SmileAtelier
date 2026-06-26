import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useT } from '../i18n/i18n'
import { todayISO } from '../lib/storage'
import {
  ToothIcon, LogOutIcon, PlusIcon, TrashIcon, CalendarIcon, ClockIcon,
  CheckIcon, UserIcon, SparkleIcon, UsersIcon,
} from '../components/Icons'

const TIMES = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '16:00', '16:30', '17:00', '17:30', '18:00']
const ease = [0.16, 1, 0.3, 1]

export default function Dashboard() {
  const { currentUser, myReservations, addMember, removeMember, createReservation, cancelReservation, logout } = useApp()
  const { L } = useT()
  const t = L.dash
  const SERVICES = t.services
  const RELATIONS = t.relations
  const navigate = useNavigate()

  const [selected, setSelected] = useState([])
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [showMember, setShowMember] = useState(false)
  const [member, setMember] = useState({ firstName: '', lastName: '', relation: RELATIONS[0] })

  const members  = currentUser?.members || []
  const upcoming = myReservations.filter((r) => r.status === 'confirmada')
  const history  = myReservations.filter((r) => r.status === 'cancelada')
  const next     = [...upcoming].sort((a, b) => a.date.localeCompare(b.date))[0]

  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const doReserve = (e) => {
    e.preventDefault()
    const res = createReservation({ memberIds: selected, service, date, time })
    if (!res.ok) { setFeedback({ type: 'error', msg: res.error }); return }
    setFeedback({ type: 'success', msg: t.success })
    setTimeout(() => setFeedback(null), 4000)
    setSelected([]); setService(''); setDate(''); setTime('')
  }

  const doAddMember = (e) => {
    e.preventDefault()
    const res = addMember(member)
    if (!res.ok) return
    setMember({ firstName: '', lastName: '', relation: RELATIONS[0] })
    setShowMember(false)
  }

  const logoutAndHome = () => { logout(); navigate('/') }

  return (
    <div className="min-h-screen" style={{ background: '#f0f4fa' }}>
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: 'rgba(240,244,250,0.92)', backdropFilter: 'blur(16px)', borderColor: 'rgba(11,26,58,0.07)' }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(155deg, #3b78ff 0%, #2f6bff 100%)' }}>
              <ToothIcon size={16} />
            </span>
            <span className="font-['Playfair_Display'] text-[15px] font-600" style={{ color: 'var(--navy)' }}>
              Smile<span style={{ color: 'var(--blue)' }}>Atelier</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style={{ background: 'linear-gradient(150deg, #3b78ff, #2f6bff)' }}>
                {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--navy)' }}>
                {currentUser?.firstName}
              </span>
            </div>
            <button onClick={logoutAndHome}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'white', color: 'var(--navy)', boxShadow: '0 1px 4px rgba(11,26,58,0.08)' }}>
              <LogOutIcon size={15} />
              <span className="hidden sm:block">{t.logout}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-10">
        {/* ── Welcome banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative rounded-3xl overflow-hidden mb-8 p-8 lg:p-10"
          style={{ background: 'linear-gradient(135deg, #0b1a3a 0%, #1d3a78 100%)' }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80"
              style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(59,120,255,0.3) 0%, transparent 60%)' }} />
            <div className="absolute bottom-0 left-0 w-60 h-60"
              style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(124,58,237,0.15) 0%, transparent 60%)' }} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.hi},</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-white font-['Playfair_Display']">
                {currentUser?.firstName} {currentUser?.lastName}
              </h1>
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.subtitle}</p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-4">
              <div className="rounded-2xl px-5 py-4 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-2xl font-bold text-white font-['Playfair_Display']">{upcoming.length}</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.upcoming}</div>
              </div>
              <div className="rounded-2xl px-5 py-4 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-2xl font-bold text-white font-['Playfair_Display']">{members.length}</div>
                <div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.family}</div>
              </div>
            </div>
          </div>

          {/* Next appointment */}
          {next && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10 mt-6 flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', maxWidth: 420 }}>
              <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(59,120,255,0.3)' }}>
                <CalendarIcon size={16} style={{ color: '#7aa0ff' }} />
              </span>
              <div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Próxima cita</div>
                <div className="text-sm font-semibold text-white">{next.service} · {formatDate(next.date, t.locale)} {next.time}</div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* ── Reservation + Family row ── */}
        <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-5 items-start mb-8">
          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease }}
            onSubmit={doReserve}
            className="bg-white rounded-3xl p-6 lg:p-8 ring-1 ring-[rgba(11,26,58,0.06)]"
            style={{ boxShadow: '0 2px 16px rgba(11,26,58,0.06)' }}>
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--navy)' }}>
              <SparkleIcon size={18} style={{ color: 'var(--blue)' }} />
              {t.newRes}
            </h2>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-4">
                  <div className="text-sm rounded-xl px-4 py-3"
                    style={feedback.type === 'success'
                      ? { background: 'rgba(34,197,94,0.08)', color: '#15803d', border: '1px solid rgba(34,197,94,0.2)' }
                      : { background: 'rgba(220,38,38,0.08)', color: '#b91c1c', border: '1px solid rgba(220,38,38,0.15)' }}>
                    {feedback.msg}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Para quién */}
            <div className="mb-5">
              <span className="block text-xs font-bold mb-2.5 uppercase tracking-wide" style={{ color: 'var(--navy)' }}>{t.forWho}</span>
              <div className="flex flex-wrap gap-2">
                {members.map((m) => {
                  const on = selected.includes(m.id)
                  return (
                    <button type="button" key={m.id} onClick={() => toggle(m.id)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium border transition-all"
                      style={on
                        ? { background: 'var(--blue)', borderColor: 'var(--blue)', color: '#fff', boxShadow: '0 4px 14px rgba(47,107,255,0.35)' }
                        : { background: '#fff', borderColor: 'rgba(11,26,58,0.14)', color: 'var(--navy)' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: on ? 'rgba(255,255,255,0.25)' : 'var(--blue-soft)' }}>
                        {on
                          ? <CheckIcon size={12} style={{ color: '#fff' }} />
                          : <UserIcon size={12} style={{ color: 'var(--blue)' }} />}
                      </span>
                      {m.firstName}
                      <span className="opacity-60 text-xs">· {m.relation}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tratamiento */}
            <div className="mb-4">
              <span className="block text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--navy)' }}>{t.treatment}</span>
              <select value={service} onChange={(e) => setService(e.target.value)}
                className="w-full rounded-xl border bg-white px-3.5 py-3 text-sm outline-none transition-all"
                style={{ borderColor: 'rgba(11,26,58,0.14)', color: service ? 'var(--navy)' : 'var(--text-muted)' }}>
                <option value="">{t.pickTreatment}</option>
                {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Fecha + hora */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--navy)' }}>
                  <CalendarIcon size={12} /> {t.date}
                </span>
                <input type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border bg-white px-3.5 py-3 text-sm outline-none"
                  style={{ borderColor: 'rgba(11,26,58,0.14)', colorScheme: 'light' }} />
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-xs font-bold mb-2 uppercase tracking-wide" style={{ color: 'var(--navy)' }}>
                  <ClockIcon size={12} /> {t.time}
                </span>
                <select value={time} onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-xl border bg-white px-3.5 py-3 text-sm outline-none"
                  style={{ borderColor: 'rgba(11,26,58,0.14)', color: time ? 'var(--navy)' : 'var(--text-muted)' }}>
                  <option value="">--:--</option>
                  {TIMES.map((tm) => <option key={tm} value={tm}>{tm}</option>)}
                </select>
              </div>
            </div>

            <button type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)', boxShadow: '0 14px 30px -12px rgba(47,107,255,0.6)' }}>
              {t.confirm}
            </button>
          </motion.form>

          {/* Familia */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease }}
            className="bg-white rounded-3xl p-6 lg:p-7 ring-1 ring-[rgba(11,26,58,0.06)]"
            style={{ boxShadow: '0 2px 16px rgba(11,26,58,0.06)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--navy)' }}>
                <UsersIcon size={18} style={{ color: 'var(--blue)' }} />
                {t.family}
              </h2>
              <button onClick={() => setShowMember((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                style={{ background: showMember ? 'var(--blue)' : 'var(--blue-soft)', color: showMember ? '#fff' : 'var(--blue)' }}>
                <PlusIcon size={14} /> {t.add}
              </button>
            </div>

            <AnimatePresence>
              {showMember && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={doAddMember} className="overflow-hidden">
                  <div className="pb-4">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input placeholder={t.first} value={member.firstName}
                        onChange={(e) => setMember((m) => ({ ...m, firstName: e.target.value }))}
                        className="rounded-xl border px-3 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'rgba(11,26,58,0.14)', color: 'var(--navy)' }} />
                      <input placeholder={t.last} value={member.lastName}
                        onChange={(e) => setMember((m) => ({ ...m, lastName: e.target.value }))}
                        className="rounded-xl border px-3 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'rgba(11,26,58,0.14)', color: 'var(--navy)' }} />
                    </div>
                    <div className="flex gap-2">
                      <select value={member.relation}
                        onChange={(e) => setMember((m) => ({ ...m, relation: e.target.value }))}
                        className="flex-1 rounded-xl border px-3 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'rgba(11,26,58,0.14)', color: 'var(--navy)' }}>
                        {RELATIONS.map((r) => <option key={r}>{r}</option>)}
                      </select>
                      <button type="submit" className="px-4 rounded-xl text-sm font-semibold text-white"
                        style={{ background: 'var(--navy)' }}>{t.saveMember}</button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {members.length === 0 ? (
              <div className="py-6 text-center">
                <div className="w-10 h-10 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: 'var(--blue-soft)' }}>
                  <UsersIcon size={18} style={{ color: 'var(--blue)' }} />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Añade familiares a tu cuenta</p>
              </div>
            ) : (
              <ul className="space-y-2">
                {members.map((m) => (
                  <li key={m.id} className="flex items-center gap-3 p-3 rounded-2xl transition-colors hover:bg-[#f4f7fc]"
                    style={{ background: '#f8fafd' }}>
                    <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-xs"
                      style={{ background: 'linear-gradient(150deg, #3b78ff, #2f6bff)' }}>
                      {m.firstName[0]}{m.lastName[0]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate" style={{ color: 'var(--navy)' }}>{m.firstName} {m.lastName}</div>
                      <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{m.relation}</div>
                    </div>
                    {!m.self && (
                      <button onClick={() => removeMember(m.id)}
                        className="p-1.5 rounded-lg opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100"
                        style={{ color: '#b91c1c' }} aria-label="Eliminar">
                        <TrashIcon size={14} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t.familyNote}
            </p>
          </motion.div>
        </div>

        {/* ── Próximas citas ── */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--navy)' }}>
            <CalendarIcon size={20} style={{ color: 'var(--blue)' }} />
            {t.upcoming}
          </h2>
          {upcoming.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center ring-1 ring-[rgba(11,26,58,0.05)]"
              style={{ boxShadow: '0 2px 16px rgba(11,26,58,0.05)' }}>
              <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: 'var(--blue-soft)' }}>
                <CalendarIcon size={28} style={{ color: 'var(--blue)' }} />
              </div>
              <p className="text-base font-semibold mb-1" style={{ color: 'var(--navy)' }}>{t.empty}</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Crea una reserva con el formulario de arriba</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {upcoming.map((r) => (
                <ReservationCard key={r.id} r={r} t={t} onCancel={() => cancelReservation(r.id)} />
              ))}
            </div>
          )}
        </section>

        {/* ── Historial canceladas ── */}
        {history.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--navy)', opacity: 0.7 }}>{t.cancelled}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {history.map((r) => <ReservationCard key={r.id} r={r} t={t} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function ReservationCard({ r, onCancel, t }) {
  const cancelled = r.status === 'cancelada'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl p-5 ring-1 ring-[rgba(11,26,58,0.06)] transition-all hover:ring-[rgba(47,107,255,0.15)]"
      style={{ boxShadow: '0 2px 16px rgba(11,26,58,0.06)', opacity: cancelled ? 0.65 : 1 }}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: cancelled ? '#f4f7fc' : 'var(--blue-soft)' }}>
            <ToothIcon size={18} style={{ color: cancelled ? 'var(--text-muted)' : 'var(--blue)' }} />
          </span>
          <div>
            <div className="text-sm font-bold" style={{ color: 'var(--navy)' }}>{r.service}</div>
            <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              <CalendarIcon size={11} />
              {formatDate(r.date, t.locale)}
              <ClockIcon size={11} />
              {r.time}
            </div>
          </div>
        </div>
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
          style={cancelled
            ? { background: 'rgba(220,38,38,0.08)', color: '#b91c1c' }
            : { background: 'rgba(34,197,94,0.1)', color: '#15803d' }}>
          {cancelled ? t.cancelledTag : t.confirmed}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {r.attendees.map((a, i) => (
          <span key={i} className="text-[11px] px-2.5 py-1 rounded-full"
            style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}>
            {a.name}
          </span>
        ))}
      </div>

      {!cancelled && onCancel && (
        <button onClick={onCancel}
          className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
          style={{ background: 'rgba(220,38,38,0.06)', color: '#b91c1c' }}>
          {t.cancel}
        </button>
      )}
    </motion.div>
  )
}

function formatDate(iso, locale = 'es-ES') {
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'long' })
  } catch { return iso }
}
