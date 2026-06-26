import { useMemo, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import {
  ToothIcon, LogOutIcon, ChartIcon, CalendarIcon, ClockIcon, UsersIcon,
  LayoutIcon, SearchIcon, TrendUpIcon, CheckIcon, PlusIcon,
} from '../components/Icons'

const NAV = [
  { id: 'resumen',   label: 'Resumen',   Icon: LayoutIcon },
  { id: 'reservas',  label: 'Reservas',  Icon: CalendarIcon },
  { id: 'pacientes', label: 'Pacientes', Icon: UsersIcon },
  { id: 'trafico',   label: 'Tráfico',   Icon: ChartIcon },
]

export default function Admin() {
  const { analytics, reservations, users, cancelReservation, logout } = useApp()
  const navigate = useNavigate()
  const [section, setSection] = useState('resumen')
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlight, setHighlight] = useState(null)

  const logoutAndHome = () => { logout(); navigate('/') }

  const patients = users.filter((u) => u.role === 'patient')

  // ⌘K global shortcut
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const handleSearchSelect = (sec, id) => {
    setSection(sec)
    setHighlight(id)
    setTimeout(() => setHighlight(null), 2000)
  }

  // derived
  const daily = useMemo(
    () => Object.entries(analytics.daily || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-14),
    [analytics.daily]
  )
  const last7  = daily.slice(-7).reduce((s, [, v]) => s + v, 0)
  const prev7  = daily.slice(-14, -7).reduce((s, [, v]) => s + v, 0)
  const visitsDelta = prev7 ? Math.round(((last7 - prev7) / prev7) * 100) : 0

  const activeRes  = reservations.filter((r) => r.status === 'confirmada')
  const consent    = analytics.consent || { accepted: 0, rejected: 0, customized: 0 }
  const totalConsent = consent.accepted + consent.rejected + consent.customized || 1
  const acceptRate = Math.round((consent.accepted / totalConsent) * 100)

  const meta = {
    resumen:   { title: 'Resumen',   sub: 'Visión general en tiempo real.' },
    reservas:  { title: 'Reservas',  sub: 'Gestiona todas las citas.' },
    pacientes: { title: 'Pacientes', sub: 'Cuentas registradas y familiares.' },
    trafico:   { title: 'Tráfico',   sub: 'Analítica de visitas.' },
  }[section]

  return (
    <div className="min-h-screen flex" style={{ background: '#f0f4fa' }}>
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 sticky top-0 h-screen"
        style={{ background: 'linear-gradient(180deg, #0b1a3a 0%, #091528 100%)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
            style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}>
            <ToothIcon size={16} />
          </span>
          <div>
            <div className="font-['Playfair_Display'] text-[14px] font-semibold text-white leading-none">SmileAtelier</div>
            <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Panel admin</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          <div className="text-[10px] uppercase tracking-wider px-3 py-2 font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Principal
          </div>
          {NAV.map(({ id, label, Icon }) => {
            const on = section === id
            return (
              <button key={id} onClick={() => setSection(id)}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ color: on ? '#fff' : 'rgba(255,255,255,0.55)' }}>
                {on && (
                  <motion.span layoutId="admin-nav" className="absolute inset-0 rounded-xl"
                    style={{ background: 'linear-gradient(150deg, rgba(59,120,255,0.9) 0%, rgba(47,107,255,0.85) 100%)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <Icon size={16} className="relative z-10 shrink-0" />
                <span className="relative z-10">{label}</span>
                {id === 'reservas' && activeRes.length > 0 && (
                  <span className="relative z-10 ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: on ? 'rgba(255,255,255,0.2)' : 'rgba(59,120,255,0.25)', color: on ? '#fff' : '#7aa0ff' }}>
                    {activeRes.length}
                  </span>
                )}
              </button>
            )
          })}

          <div className="text-[10px] uppercase tracking-wider px-3 py-2 pt-4 font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Accesos
          </div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            <span className="text-base">↗</span>
            <span>Ver web pública</span>
          </Link>
        </nav>

        {/* User */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="rounded-xl p-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
              style={{ background: 'linear-gradient(150deg, #3b78ff, #2f6bff)' }}>A</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">Administrador</div>
              <div className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>admin@smileatelier.es</div>
            </div>
            <button onClick={logoutAndHome} className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Salir">
              <LogOutIcon size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b" style={{ background: 'rgba(240,244,250,0.95)', backdropFilter: 'blur(16px)', borderColor: 'rgba(11,26,58,0.08)' }}>
          <div className="px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div>
                <h1 className="text-base font-bold leading-none" style={{ color: 'var(--navy)' }}>{meta.title}</h1>
                <p className="text-xs mt-0.5 hidden sm:block" style={{ color: 'var(--text-muted)' }}>{meta.sub}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search trigger */}
              <button onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all hover:ring-1"
                style={{ background: 'white', color: 'var(--text-muted)', boxShadow: '0 1px 4px rgba(11,26,58,0.08)', minWidth: 180, ring: 'rgba(11,26,58,0.12)' }}>
                <SearchIcon size={15} />
                <span className="text-xs flex-1 text-left">Buscar…</span>
                <kbd className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                  style={{ background: '#f0f4fa', border: '1px solid rgba(11,26,58,0.1)', color: 'var(--text-muted)' }}>⌘K</kbd>
              </button>

              {/* Mobile logout */}
              <button onClick={logoutAndHome} className="lg:hidden p-2 rounded-xl"
                style={{ background: 'white', color: 'var(--navy)', boxShadow: '0 1px 4px rgba(11,26,58,0.08)' }}>
                <LogOutIcon size={17} />
              </button>
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="lg:hidden flex gap-1 px-3 pb-3 overflow-x-auto no-scrollbar">
            {NAV.map(({ id, label, Icon }) => (
              <button key={id} onClick={() => setSection(id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                style={section === id
                  ? { background: 'var(--blue)', color: '#fff' }
                  : { background: 'white', color: 'var(--navy)', boxShadow: '0 1px 3px rgba(11,26,58,0.08)' }}>
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={section}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}>
              {section === 'resumen' && (
                <Resumen {...{ analytics, daily, visitsDelta, activeRes, reservations, patients, consent, totalConsent, acceptRate }} />
              )}
              {section === 'reservas' && (
                <Reservas reservations={reservations} onCancel={cancelReservation} highlight={highlight} />
              )}
              {section === 'pacientes' && (
                <Pacientes patients={patients} reservations={reservations} highlight={highlight} />
              )}
              {section === 'trafico' && (
                <Trafico analytics={analytics} daily={daily} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* ── Search Modal ── */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        reservations={reservations}
        patients={patients}
        onSelect={handleSearchSelect}
      />
    </div>
  )
}

/* ───────────────────────── Search Modal ───────────────────────── */

function SearchModal({ isOpen, onClose, reservations, patients, onSelect }) {
  const [q, setQ] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) { setQ(''); setTimeout(() => inputRef.current?.focus(), 50) }
  }, [isOpen])

  const results = useMemo(() => {
    if (!q.trim()) return { patients: [], reservations: [] }
    const lq = q.toLowerCase()
    return {
      patients: patients.filter((u) =>
        `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(lq)
      ).slice(0, 5),
      reservations: reservations.filter((r) =>
        `${r.accountName} ${r.service} ${r.date} ${r.accountEmail}`.toLowerCase().includes(lq)
      ).slice(0, 5),
    }
  }, [q, patients, reservations])

  const total = results.patients.length + results.reservations.length

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          style={{ background: 'rgba(11,26,58,0.45)', backdropFilter: 'blur(6px)' }}
          onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="w-full max-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 24px 80px rgba(11,26,58,0.25), 0 0 0 1px rgba(11,26,58,0.06)' }}
            onClick={(e) => e.stopPropagation()}>

            {/* Input */}
            <div className="flex items-center gap-3 px-4 border-b" style={{ borderColor: 'rgba(11,26,58,0.08)' }}>
              <SearchIcon size={17} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar pacientes, reservas..."
                className="flex-1 py-4 text-sm outline-none bg-transparent placeholder:text-[var(--text-muted)]"
                style={{ color: 'var(--navy)' }}
                onKeyDown={(e) => e.key === 'Escape' && onClose()}
              />
              {q && (
                <button onClick={() => setQ('')} className="text-xs px-1.5 py-0.5 rounded"
                  style={{ color: 'var(--text-muted)', background: '#f4f7fc' }}>✕</button>
              )}
            </div>

            {/* Results */}
            <div className="overflow-y-auto" style={{ maxHeight: 360 }}>
              {!q.trim() && (
                <div className="py-10 text-center">
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: 'var(--blue-soft)' }}>
                    <SearchIcon size={18} style={{ color: 'var(--blue)' }} />
                  </div>
                  <div className="text-sm font-medium" style={{ color: 'var(--navy)' }}>Busca cualquier cosa</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Pacientes, reservas, tratamientos…</div>
                </div>
              )}

              {q.trim() && total === 0 && (
                <div className="py-10 text-center">
                  <div className="text-sm font-medium" style={{ color: 'var(--navy)' }}>Sin resultados</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>No se encontró "{q}"</div>
                </div>
              )}

              {results.patients.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>
                    Pacientes
                  </div>
                  {results.patients.map((u) => (
                    <button key={u.id}
                      onClick={() => { onSelect('pacientes', u.id); onClose() }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left"
                      style={{ color: 'var(--navy)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f4f7fc'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <span className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0"
                        style={{ background: 'linear-gradient(150deg, #3b78ff, #2f6bff)' }}>
                        {u.firstName[0]}{u.lastName[0]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{u.firstName} {u.lastName}</div>
                        <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0"
                        style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}>
                        {u.members.length} miembro{u.members.length !== 1 ? 's' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {results.reservations.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold" style={{ color: 'var(--text-muted)' }}>
                    Reservas
                  </div>
                  {results.reservations.map((r) => (
                    <button key={r.id}
                      onClick={() => { onSelect('reservas', r.id); onClose() }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left"
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f4f7fc'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'var(--blue-soft)' }}>
                        <CalendarIcon size={15} style={{ color: 'var(--blue)' }} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate" style={{ color: 'var(--navy)' }}>{r.service}</div>
                        <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{r.accountName} · {r.date} {r.time}</div>
                      </div>
                      <StatusBadge status={r.status} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t text-[10px]"
              style={{ borderColor: 'rgba(11,26,58,0.07)', color: 'var(--text-muted)', background: '#f8fafd' }}>
              <span className="flex items-center gap-1"><kbd className="px-1 rounded border" style={{ borderColor: 'rgba(11,26,58,0.12)' }}>↑↓</kbd> Navegar</span>
              <span className="flex items-center gap-1"><kbd className="px-1 rounded border" style={{ borderColor: 'rgba(11,26,58,0.12)' }}>↵</kbd> Seleccionar</span>
              <span className="flex items-center gap-1"><kbd className="px-1 rounded border" style={{ borderColor: 'rgba(11,26,58,0.12)' }}>ESC</kbd> Cerrar</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────────── Secciones ───────────────────────── */

function Resumen({ analytics, daily, visitsDelta, activeRes, reservations, patients, consent, totalConsent, acceptRate }) {
  const kpis = [
    { label: 'Visitas (14d)',    value: (analytics.totalVisits || 0).toLocaleString('es-ES'), delta: visitsDelta, Icon: ChartIcon,    color: '#2f6bff', bg: 'var(--blue-soft)' },
    { label: 'Reservas activas', value: activeRes.length,                                      delta: 8,          Icon: CalendarIcon, color: '#7c3aed', bg: 'rgba(124,58,237,0.1)' },
    { label: 'Pacientes',        value: patients.length,                                        delta: 12,         Icon: UsersIcon,    color: '#059669', bg: 'rgba(5,150,105,0.1)' },
    { label: 'Aceptan cookies',  value: acceptRate + '%',                                       delta: 3,          Icon: CheckIcon,    color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  ]

  const recentActivity = [...reservations]
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
    .slice(0, 6)

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={k.label} {...k} delay={i * 0.06} />)}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <Panel title="Visitas" subtitle="Últimos 14 días">
          <AreaChart data={daily.map(([d, v]) => ({ label: d.slice(8) + '/' + d.slice(5, 7), value: v }))} />
        </Panel>
        <Panel title="Dispositivos">
          <Donut data={deviceSegments(analytics.devices)} />
        </Panel>
      </div>

      {/* Lower row */}
      <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-5">
        <Panel title="Reservas recientes">
          <MiniTable rows={[...reservations].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 5)} />
        </Panel>
        <Panel title="Páginas más vistas">
          <Bars data={topPages(analytics.pages)} accent="#2f6bff" />
        </Panel>
        <Panel title="Consentimiento">
          <Bars data={[
            { label: 'Aceptan todo', value: consent.accepted, total: totalConsent, color: '#22c55e' },
            { label: 'Personalizan', value: consent.customized, total: totalConsent, color: '#f59e0b' },
            { label: 'Rechazan',     value: consent.rejected,   total: totalConsent, color: '#ef4444' },
          ]} />
        </Panel>
      </div>
    </div>
  )
}

function Reservas({ reservations, onCancel, highlight }) {
  const [filter, setFilter] = useState('todas')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    let rows = reservations
    if (filter === 'activas')   rows = rows.filter((r) => r.status === 'confirmada')
    if (filter === 'canceladas') rows = rows.filter((r) => r.status === 'cancelada')
    if (q.trim()) {
      const lq = q.toLowerCase()
      rows = rows.filter((r) =>
        `${r.accountName} ${r.service} ${r.date} ${r.accountEmail}`.toLowerCase().includes(lq)
      )
    }
    return rows
  }, [reservations, filter, q])

  return (
    <Panel
      title={`${filtered.length} reserva${filtered.length !== 1 ? 's' : ''}`}
      action={
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {/* Inline search */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm"
            style={{ background: '#f0f4fa', minWidth: 180 }}>
            <SearchIcon size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Filtrar reservas…"
              className="outline-none bg-transparent text-xs w-full"
              style={{ color: 'var(--navy)' }} />
            {q && <button onClick={() => setQ('')} className="text-[10px]" style={{ color: 'var(--text-muted)' }}>✕</button>}
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1 p-1 rounded-full" style={{ background: '#f0f4fa' }}>
            {[['todas', 'Todas'], ['activas', 'Confirmadas'], ['canceladas', 'Canceladas']].map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={filter === k
                  ? { background: '#fff', color: 'var(--navy)', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }
                  : { color: 'var(--text-muted)' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      }
    >
      {filtered.length === 0 ? (
        <EmptyState icon={<CalendarIcon size={24} />} text="No hay reservas que coincidan" />
      ) : (
        <FullTable rows={filtered} onCancel={onCancel} highlight={highlight} />
      )}
    </Panel>
  )
}

function Pacientes({ patients, reservations, highlight }) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    if (!q.trim()) return patients
    const lq = q.toLowerCase()
    return patients.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(lq)
    )
  }, [patients, q])

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white ring-1 ring-[rgba(11,26,58,0.06)]"
        style={{ boxShadow: 'var(--shadow-soft)' }}>
        <SearchIcon size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o email…"
          className="flex-1 outline-none text-sm bg-transparent"
          style={{ color: 'var(--navy)' }} />
        {q && <button onClick={() => setQ('')} className="text-xs px-2 py-0.5 rounded" style={{ background: '#f0f4fa', color: 'var(--text-muted)' }}>✕</button>}
        <span className="text-xs shrink-0" style={{ color: 'var(--text-muted)' }}>{filtered.length} / {patients.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center ring-1 ring-[rgba(11,26,58,0.06)]">
          <EmptyState icon={<UsersIcon size={24} />} text="No se encontraron pacientes" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((u) => {
            const count = reservations.filter((r) => r.userId === u.id).length
            const isHighlighted = highlight === u.id
            return (
              <motion.div key={u.id}
                animate={isHighlighted ? { scale: [1, 1.01, 1], boxShadow: ['var(--shadow-soft)', '0 0 0 3px rgba(59,120,255,0.3)', 'var(--shadow-soft)'] } : {}}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-2xl p-5 ring-1 ring-[rgba(11,26,58,0.06)] hover:ring-[rgba(47,107,255,0.2)] transition-all"
                style={{ boxShadow: 'var(--shadow-soft)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(150deg, #3b78ff, #2f6bff)' }}>
                    {u.firstName[0]}{u.lastName[0]}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold truncate" style={{ color: 'var(--navy)' }}>{u.firstName} {u.lastName}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{u.email}</div>
                  </div>
                </div>
                {u.members.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {u.members.map((m) => (
                      <span key={m.id} className="text-[11px] px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}>
                        {m.firstName} · {m.relation}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-sm pt-3 border-t"
                  style={{ borderColor: 'rgba(11,26,58,0.07)', color: 'var(--text-muted)' }}>
                  <span>{u.members.length} en cuenta</span>
                  <span className="font-semibold" style={{ color: 'var(--navy)' }}>{count} reservas</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Trafico({ analytics, daily }) {
  return (
    <div className="space-y-5">
      <Panel title="Visitas" subtitle="Últimos 14 días">
        <AreaChart data={daily.map(([d, v]) => ({ label: d.slice(8) + '/' + d.slice(5, 7), value: v }))} height={200} />
      </Panel>
      <div className="grid lg:grid-cols-3 gap-5">
        <Panel title="Dispositivos">
          <Donut data={deviceSegments(analytics.devices)} />
        </Panel>
        <Panel title="Páginas más vistas">
          <Bars data={topPages(analytics.pages)} accent="#2f6bff" />
        </Panel>
        <Panel title="Origen del tráfico">
          <Bars data={topPages(analytics.referrers)} accent="#7c3aed" />
        </Panel>
      </div>
      <Panel title="Consentimiento cookies">
        <Bars data={[
          { label: 'Aceptan todo',  value: analytics.consent?.accepted   || 0, color: '#22c55e' },
          { label: 'Personalizan',  value: analytics.consent?.customized || 0, color: '#f59e0b' },
          { label: 'Rechazan todo', value: analytics.consent?.rejected   || 0, color: '#ef4444' },
        ]} />
      </Panel>
    </div>
  )
}

/* ───────────────────────── UI helpers ───────────────────────── */

function Panel({ title, subtitle, action, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl p-5 ring-1 ring-[rgba(11,26,58,0.06)]"
      style={{ boxShadow: '0 2px 12px rgba(11,26,58,0.06)' }}>
      <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h3 className="font-bold" style={{ color: 'var(--navy)' }}>{title}</h3>
          {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </motion.section>
  )
}

function KpiCard({ label, value, delta, Icon, color, bg, delay }) {
  const up = delta >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}
      className="bg-white rounded-2xl p-5 ring-1 ring-[rgba(11,26,58,0.06)]"
      style={{ boxShadow: '0 2px 12px rgba(11,26,58,0.06)' }}>
      <div className="flex items-start justify-between mb-3">
        <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: bg, color }}>
          <Icon size={18} />
        </span>
        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full"
          style={up
            ? { background: 'rgba(34,197,94,0.1)', color: '#15803d' }
            : { background: 'rgba(239,68,68,0.1)', color: '#b91c1c' }}>
          <TrendUpIcon size={11} className={up ? '' : 'rotate-180'} />
          {up ? '+' : ''}{delta}%
        </span>
      </div>
      <div className="text-2xl font-bold font-['Playfair_Display']" style={{ color: 'var(--navy)' }}>{value}</div>
      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </motion.div>
  )
}

function EmptyState({ icon, text }) {
  return (
    <div className="py-8 text-center">
      <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
        style={{ background: '#f0f4fa', color: 'var(--text-muted)' }}>
        {icon}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{text}</div>
    </div>
  )
}

function AreaChart({ data, height = 150 }) {
  const [hi, setHi] = useState(null)
  const W = 520, H = height, pad = 10
  const max = Math.max(1, ...data.map((d) => d.value))
  const stepX = (W - pad * 2) / Math.max(1, data.length - 1)
  const pts = data.map((d, i) => [pad + i * stepX, H - pad - (d.value / max) * (H - pad * 2 - 16)])
  const line = pts.map((p) => p.join(',')).join(' ')
  const area = `${pad},${H - pad} ${line} ${W - pad},${H - pad}`
  const n = data.length

  return (
    <div className="relative" onMouseLeave={() => setHi(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full block" style={{ height }} preserveAspectRatio="none">
        <defs>
          <linearGradient id="aFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2f6bff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2f6bff" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#aFill)" />
        <polyline points={line} fill="none" stroke="#2f6bff" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {hi != null && (
          <line x1={pts[hi][0]} y1={pad} x2={pts[hi][0]} y2={H - pad}
            stroke="#2f6bff" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" vectorEffect="non-scaling-stroke" />
        )}
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]}
            r={hi === i ? 5 : 2.5}
            fill={hi === i ? '#2f6bff' : '#fff'}
            stroke="#2f6bff" strokeWidth="2" vectorEffect="non-scaling-stroke"
            style={{ transition: 'r 0.12s' }} />
        ))}
      </svg>

      <div className="absolute inset-0 flex">
        {data.map((_, i) => (
          <div key={i} className="flex-1 h-full cursor-crosshair" onMouseEnter={() => setHi(i)} />
        ))}
      </div>

      <AnimatePresence>
        {hi != null && (
          <motion.div
            key={hi}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute pointer-events-none z-10"
            style={{ left: `${(hi / Math.max(1, n - 1)) * 100}%`, top: 0, transform: 'translate(-50%, -110%)' }}>
            <div className="px-3 py-2 rounded-xl text-white text-xs whitespace-nowrap"
              style={{ background: 'var(--navy)', boxShadow: '0 8px 24px rgba(11,26,58,0.3)' }}>
              <div className="font-bold text-sm">{data[hi].value} visitas</div>
              <div className="opacity-60">{data[hi].label}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-2 text-[10px]" style={{ color: 'var(--text-muted)' }}>
        {data.filter((_, i) => i % 2 === 0).map((d) => <span key={d.label}>{d.label}</span>)}
      </div>
    </div>
  )
}

function Donut({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const R = 54, C = 2 * Math.PI * R
  const segments = data.reduce((acc, d) => {
    const len  = (d.value / total) * C
    const prev = acc.length ? acc[acc.length - 1].end : 0
    acc.push({ ...d, len, start: prev, end: prev + len })
    return acc
  }, [])
  const [hi, setHi] = useState(null)
  const active = hi != null ? segments[hi] : null

  return (
    <div className="flex items-center gap-5">
      <div className="relative w-32 h-32 shrink-0">
        <svg viewBox="0 0 140 140" className="w-32 h-32 -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="#eef2f9" strokeWidth="18" />
          {segments.map((d, i) => (
            <circle key={d.label} cx="70" cy="70" r={R} fill="none" stroke={d.color}
              strokeWidth={hi === i ? 23 : 18}
              strokeDasharray={`${d.len} ${C - d.len}`} strokeDashoffset={-d.start}
              strokeLinecap="round"
              onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
              style={{ transition: 'stroke-width 0.16s, opacity 0.16s', cursor: 'pointer',
                opacity: hi == null || hi === i ? 1 : 0.35 }} />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold font-['Playfair_Display']" style={{ color: 'var(--navy)' }}>
            {active ? Math.round((active.value / total) * 100) + '%' : total.toLocaleString('es-ES')}
          </span>
          <span className="text-[10px] capitalize" style={{ color: 'var(--text-muted)' }}>
            {active ? active.label : 'total'}
          </span>
        </div>
      </div>
      <div className="space-y-2.5 flex-1">
        {segments.map((d, i) => (
          <div key={d.label}
            className="flex items-center gap-2 text-sm rounded-lg px-2 py-1 transition-colors cursor-pointer"
            onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)}
            style={{ background: hi === i ? '#f4f7fc' : 'transparent' }}>
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="capitalize flex-1 text-xs" style={{ color: 'var(--text-muted)' }}>{d.label}</span>
            <span className="font-bold text-xs" style={{ color: 'var(--navy)' }}>
              {Math.round((d.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Bars({ data, accent }) {
  const max = Math.max(1, ...data.map((d) => d.value))
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.label} className="group">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="truncate transition-colors group-hover:font-medium" style={{ color: 'var(--text-muted)' }}>{d.label}</span>
            <span className="font-bold ml-2" style={{ color: 'var(--navy)' }}>{d.value}</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#eef2f9' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(d.value / (d.total || max)) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full group-hover:brightness-110 transition-all"
              style={{ background: d.color || accent }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }) {
  const cancelled = status === 'cancelada'
  return (
    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={cancelled
        ? { background: 'rgba(239,68,68,0.1)', color: '#b91c1c' }
        : { background: 'rgba(34,197,94,0.1)', color: '#15803d' }}>
      {cancelled ? 'Cancelada' : 'Confirmada'}
    </span>
  )
}

function MiniTable({ rows }) {
  return (
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-[#f8fafd]">
          <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-[11px] shrink-0"
            style={{ background: 'linear-gradient(150deg, #3b78ff, #2f6bff)' }}>
            {r.accountName.split(' ').map((s) => s[0]).slice(0, 2).join('')}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate" style={{ color: 'var(--navy)' }}>{r.service}</div>
            <div className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
              {r.accountName} · {r.attendees.length} pac.
            </div>
          </div>
          <div className="text-[11px] text-right shrink-0" style={{ color: 'var(--text-muted)' }}>
            {r.date}<br />{r.time}
          </div>
          <StatusBadge status={r.status} />
        </div>
      ))}
    </div>
  )
}

function FullTable({ rows, onCancel, highlight }) {
  const sorted = useMemo(
    () => [...rows].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')),
    [rows]
  )
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm" style={{ minWidth: 680 }}>
        <thead>
          <tr className="text-left border-b" style={{ borderColor: 'rgba(11,26,58,0.07)' }}>
            {['Cuenta', 'Pacientes', 'Tratamiento', 'Fecha', 'Estado', ''].map((h) => (
              <th key={h} className="py-2.5 px-3 text-[11px] uppercase tracking-wide font-semibold"
                style={{ color: 'var(--text-muted)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => {
            const isHl = highlight === r.id
            return (
              <motion.tr key={r.id}
                animate={isHl ? { background: ['rgba(59,120,255,0)', 'rgba(59,120,255,0.06)', 'rgba(59,120,255,0)'] } : {}}
                transition={{ duration: 1.2 }}
                className="border-b group hover:bg-[#f8fafd] transition-colors"
                style={{ borderColor: 'rgba(11,26,58,0.06)' }}>
                <td className="py-3 px-3">
                  <div className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>{r.accountName}</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{r.accountEmail}</div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1">
                    {r.attendees.map((a, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}>{a.name}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-3 text-sm" style={{ color: 'var(--navy)' }}>{r.service}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <CalendarIcon size={12} /> {r.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    <ClockIcon size={11} /> {r.time}
                  </div>
                </td>
                <td className="py-3 px-3"><StatusBadge status={r.status} /></td>
                <td className="py-3 px-3 text-right">
                  {r.status === 'confirmada' && (
                    <button onClick={() => onCancel(r.id)}
                      className="text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-lg"
                      style={{ background: 'rgba(239,68,68,0.08)', color: '#b91c1c' }}>
                      Cancelar
                    </button>
                  )}
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ───────────────────────── data utils ───────────────────────── */

function deviceSegments(devices = {}) {
  const colors = { desktop: '#2f6bff', mobile: '#7aa0ff', tablet: '#c7d7ff' }
  return Object.entries(devices).map(([k, v]) => ({ label: k, value: v, color: colors[k] || '#cbd5e1' }))
}

function topPages(obj = {}) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, value]) => ({ label, value }))
}
