import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useT } from '../i18n/i18n'
import AuthShell, { Field } from '../components/AuthShell'
import { UserIcon, LockIcon, EyeIcon } from '../components/Icons'

export default function Login() {
  const { login } = useApp()
  const { L } = useT()
  const t = L.auth.login
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const res = login(identifier, password)
    if (!res.ok) { setError(res.error); return }
    navigate(res.role === 'admin' ? '/admin' : '/reservar')
  }

  return (
    <AuthShell
      title={t.title}
      subtitle={t.subtitle}
      footer={<>{t.noAccount} <Link to="/register" className="font-semibold text-[var(--blue)]">{t.create}</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <div className="text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c' }}>
            {error}
          </div>
        )}
        <Field
          icon={<UserIcon size={18} />}
          label={t.email}
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="tu@email.com"
          autoComplete="username"
        />
        <Field
          icon={<LockIcon size={18} />}
          label={t.password}
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          rightSlot={
            <button type="button" onClick={() => setShow((s) => !s)} style={{ color: 'var(--text-muted)' }}>
              <EyeIcon size={18} off={show} />
            </button>
          }
        />

        <div className="flex justify-end">
          <Link to="/recuperar" className="text-sm font-medium text-[var(--blue)]">{t.forgot}</Link>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl font-semibold text-white text-sm shadow-[0_14px_30px_-12px_rgba(47,107,255,0.7)]"
          style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}
        >
          {t.submit}
        </button>
      </form>

    </AuthShell>
  )
}
