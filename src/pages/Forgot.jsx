import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useT } from '../i18n/i18n'
import AuthShell, { Field } from '../components/AuthShell'
import { MailIcon, LockIcon, EyeIcon, CheckIcon } from '../components/Icons'

export default function Forgot() {
  const { emailExists, resetPassword } = useApp()
  const { L } = useT()
  const t = L.auth.forgot
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: email, 2: nueva contraseña, 3: hecho
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  const checkEmail = (e) => {
    e.preventDefault()
    setError('')
    if (!emailExists(email)) { setError('No hay ninguna cuenta con ese email.'); return }
    setStep(2)
  }

  const submitNew = (e) => {
    e.preventDefault()
    const res = resetPassword(email, password)
    if (!res.ok) { setError(res.error); return }
    setStep(3)
  }

  return (
    <AuthShell
      title={step === 3 ? t.t3 : t.t1}
      subtitle={step === 1 ? t.s1 : step === 2 ? t.s2 : t.s3}
      footer={step !== 3 && <>{t.remembered} <Link to="/login" className="font-semibold text-[var(--blue)]">{t.login}</Link></>}
    >
      {error && (
        <div className="text-sm rounded-xl px-4 py-3 mb-4" style={{ background: 'rgba(220,38,38,0.08)', color: '#b91c1c' }}>
          {error}
        </div>
      )}

      {step === 1 && (
        <form onSubmit={checkEmail} className="space-y-4">
          <Field icon={<MailIcon size={17} />} label={t.email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" autoComplete="email" />
          <button type="submit" className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}>
            {t.continue}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={submitNew} className="space-y-4">
          <Field
            icon={<LockIcon size={18} />}
            label={t.newPass}
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.passwordPh}
            autoComplete="new-password"
            rightSlot={<button type="button" onClick={() => setShow((s) => !s)} style={{ color: 'var(--text-muted)' }}><EyeIcon size={18} off={show} /></button>}
          />
          <button type="submit" className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}>
            {t.save}
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 text-white" style={{ background: 'linear-gradient(150deg, #3b78ff 0%, #2f6bff 100%)' }}>
            <CheckIcon size={28} />
          </div>
          <button onClick={() => navigate('/login')} className="w-full py-3.5 rounded-xl font-semibold text-white text-sm" style={{ background: 'var(--navy)' }}>
            {t.go}
          </button>
        </div>
      )}
    </AuthShell>
  )
}
