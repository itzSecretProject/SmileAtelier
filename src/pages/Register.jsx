import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useT } from '../i18n/i18n'
import AuthShell, { Field } from '../components/AuthShell'
import { UserIcon, MailIcon, LockIcon, EyeIcon } from '../components/Icons'

export default function Register() {
  const { register } = useApp()
  const { L } = useT()
  const t = L.auth.register
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const res = register(form)
    if (!res.ok) { setError(res.error); return }
    navigate('/reservar')
  }

  return (
    <AuthShell
      title={t.title}
      subtitle={t.subtitle}
      footer={<>{t.have} <Link to="/login" className="font-semibold text-[var(--blue)]">{t.login}</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c' }}>
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field icon={<UserIcon size={18} />} label={t.first} value={form.firstName} onChange={set('firstName')} placeholder="María" autoComplete="given-name" />
          <Field label={t.last} value={form.lastName} onChange={set('lastName')} placeholder="García" autoComplete="family-name" />
        </div>
        <Field icon={<MailIcon size={17} />} label={t.email} type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com" autoComplete="email" />
        <Field
          icon={<LockIcon size={18} />}
          label={t.password}
          type={show ? 'text' : 'password'}
          value={form.password}
          onChange={set('password')}
          placeholder={t.passwordPh}
          autoComplete="new-password"
          rightSlot={
            <button type="button" onClick={() => setShow((s) => !s)} style={{ color: 'var(--text-muted)' }}>
              <EyeIcon size={18} off={show} />
            </button>
          }
        />

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl font-semibold text-white text-sm shadow-[0_14px_30px_-12px_rgba(47,107,255,0.7)]"
          style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}
        >
          {t.submit}
        </button>

        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t.terms}
        </p>
      </form>
    </AuthShell>
  )
}
