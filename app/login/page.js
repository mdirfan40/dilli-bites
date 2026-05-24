'use client'

import { useState } from 'react'
import FormButton from '@/app/components/FormButton'
import FormInput from '@/app/components/FormInput'
import { color } from '@/lib/tokens'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email'
  if (!form.password) errors.password = 'Password is required'
  return errors
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [user, setUser] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) { setErrors(nextErrors); return }
    setStatus('loading')
    setServerError('')
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      })
      const data = await response.json()
      if (!response.ok) { setServerError(data.error || 'Unable to sign in'); setStatus('error'); return }
      setUser(data.user)
      setStatus('success')
    } catch {
      setServerError('Network error. Try again.')
      setStatus('error')
    }
  }

  // Complex gradients that can't be Tailwind utilities
  const pageBg = {
    background: `radial-gradient(circle at top left, ${color.brandFaint} 0%, transparent 28%), linear-gradient(180deg, ${color.bg} 0%, ${color.surface} 100%)`,
  }
  const heroBg = {
    background: `linear-gradient(145deg, ${color.surfaceAlt} 0%, ${color.surface} 52%, ${color.bg} 100%)`,
    boxShadow: `0 28px 80px rgba(0,0,0,0.35), 0 0 0 1px ${color.brandFaint} inset`,
  }
  const cardShadow = {
    boxShadow: `0 24px 60px rgba(0,0,0,0.32), 0 0 0 1px ${color.brandFaint} inset`,
  }

  if (status === 'success' && user) {
    return (
      <div style={pageBg} className="min-h-screen">
        <div className="min-h-screen grid lg:grid-cols-[1.15fr_0.85fr] gap-7 p-5 lg:p-7">
          <HeroPanel style={heroBg} title="Back on the line.">
            <p className="max-w-[520px] mt-[18px] font-body text-base leading-[1.7] text-text-secondary">
              Welcome back, {user.name}. Your account is ready for the next screen.
            </p>
            <div className="grid grid-cols-2 gap-[14px] mt-9">
              <StatCard value="Live" label="Access confirmed" />
              <StatCard value="Fast" label="Straight to work" />
            </div>
          </HeroPanel>
          <div className="flex items-center justify-center py-7 lg:py-0">
            <div style={cardShadow} className="w-full max-w-[430px] p-9 rounded-card-lg bg-surface border-2 border-border-subtle">
              <h2 className="mb-6 font-display text-[56px] leading-none tracking-[0.08em] text-text">LOGIN</h2>
              <p className="text-text-secondary font-body text-base leading-[1.7]">Access granted successfully.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={pageBg} className="min-h-screen">
      <div className="min-h-screen grid lg:grid-cols-[1.15fr_0.85fr] gap-7 p-5 lg:p-7">
        <HeroPanel style={heroBg} title="Delivery speed, house colors.">
          <p className="max-w-[520px] mt-[18px] font-body text-base leading-[1.7] text-text-secondary">
            The layout takes cues from food-delivery products, but the palette, typography, and surface treatment stay inside the Dilli Bites system.
          </p>
          <div className="grid grid-cols-3 gap-[14px] mt-9">
            <StatCard value="Fast" label="Quick access" />
            <StatCard value="Clean" label="Minimal fields" />
            <StatCard value="Shift" label="Ready to move" />
          </div>
        </HeroPanel>

        <div className="flex items-center justify-center py-7 lg:py-0">
          <form onSubmit={handleSubmit} noValidate style={cardShadow} className="w-full max-w-[430px] p-9 rounded-card-lg bg-surface border-2 border-border-subtle">
            <h2 className="mb-6 font-display text-[56px] leading-none tracking-[0.08em] text-text">LOGIN</h2>

            <Field label="Email" error={errors.email}>
              <FormInput name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="Enter email" hasError={Boolean(errors.email)} maxLength={150} />
            </Field>

            <Field label="Password" error={errors.password}>
              <FormInput name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="Enter password" hasError={Boolean(errors.password)} maxLength={128} />
            </Field>

            {serverError && (
              <p className="mb-4 px-3 py-2 rounded-input bg-error-bg border border-error-border text-error-text text-[13px] font-body">
                {serverError}
              </p>
            )}

            <FormButton type="submit" disabled={status === 'loading'} className="mt-2">
              {status === 'loading' ? 'Logging in...' : 'LOGIN'}
            </FormButton>
          </form>
        </div>
      </div>
    </div>
  )
}

function HeroPanel({ style, title, children }) {
  return (
    <section
      style={style}
      className="rounded-pill p-8 lg:p-10 flex flex-col justify-between border-2 border-border-subtle lg:min-h-[calc(100vh-56px)]"
    >
      <div className="self-start px-[14px] py-[10px] rounded-tag bg-brand text-bg font-ui text-[11px] font-extrabold tracking-[0.18em] uppercase">
        DILLI BITES
      </div>
      <div>
        <h1 className="max-w-[560px] font-display text-[clamp(40px,6vw,110px)] leading-[0.92] tracking-[0.02em] uppercase text-text">
          {title}
        </h1>
        {children}
      </div>
    </section>
  )
}

function StatCard({ value, label }) {
  return (
    <div className="p-[18px] rounded-card bg-surface border border-border flex flex-col gap-2">
      <span className="font-display text-[32px] leading-none tracking-[0.04em] text-brand uppercase">{value}</span>
      <span className="font-body text-[13px] leading-[1.5] text-text-secondary">{label}</span>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className="mb-[18px]">
      <label className="block mb-1 text-text-label font-body text-[11px] font-bold tracking-[0.12em] uppercase">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-error-field text-[11px]">{error}</p>}
    </div>
  )
}
