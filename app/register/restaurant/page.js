'use client'
import { useState } from 'react'
import Link from 'next/link'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[6-9]\d{9}$/

function validate(form) {
  const e = {}
  if (!form.name.trim()) e.name = 'Required'
  if (!EMAIL_RE.test(form.email)) e.email = 'Invalid email'
  if (form.password.length < 8) e.password = 'Min. 8 characters'
  if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
  if (!form.restaurantName.trim()) e.restaurantName = 'Required'
  if (form.phone && !PHONE_RE.test(form.phone)) e.phone = 'Invalid number'
  return e
}

export default function RegisterRestaurantPage() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    phone: '', restaurantName: '', address: '',
  })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [status, setStatus] = useState(null)
  const [serverError, setServerError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/auth/register/restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          phone: form.phone.trim() || undefined,
          restaurantName: form.restaurantName.trim(),
          address: form.address.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || 'Registration failed'); setStatus('error'); return }
      setStatus('success')
    } catch {
      setServerError('Network error. Try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-bg flex items-start justify-center px-6 py-8 font-body">
        <div className="w-full max-w-[400px] bg-surface border border-border-subtle rounded-card-lg px-9 py-12">
          <span className="inline-block bg-brand text-black text-[11px] font-extrabold tracking-[0.18em] uppercase px-[10px] py-1 rounded-tag mb-[10px]">Done</span>
          <h2 className="font-display text-[32px] tracking-[2px] text-text mb-6 leading-none">Account Created</h2>
          <Link href="/login" className="inline-block px-8 py-3 bg-brand text-black font-extrabold rounded-input text-[13px] tracking-[0.1em] uppercase font-ui no-underline hover:bg-brand-hover transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex items-start justify-center px-6 py-8 font-body">
      <div className="w-full max-w-[520px] bg-surface border border-border-subtle rounded-card-lg px-8 py-8">
        <div className="mb-8">
          <h1 className="font-display text-[48px] text-text tracking-[2px] leading-none">Restaurant</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col sm:flex-row gap-4">
            <Field label="Full Name" error={errors.name}>
              <Input name="name" value={form.name} onChange={handleChange}
                placeholder="Your name" hasError={!!errors.name} maxLength={100} />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <Input name="phone" type="tel" value={form.phone} onChange={handleChange}
                placeholder="10-digit number" hasError={!!errors.phone} maxLength={10} />
            </Field>
          </div>

          <Field label="Email" error={errors.email}>
            <Input name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="you@email.com" hasError={!!errors.email} maxLength={150} />
          </Field>

          <Field label="Restaurant Name" error={errors.restaurantName}>
            <Input name="restaurantName" value={form.restaurantName} onChange={handleChange}
              placeholder="e.g. Dilli Bites" hasError={!!errors.restaurantName} maxLength={150} />
          </Field>

          <Field label="Address" error={errors.address}>
            <textarea name="address" value={form.address} onChange={handleChange}
              placeholder="Restaurant address" rows={2} maxLength={300}
              className="w-full px-3 py-2 bg-[#0F0F0F] border border-border rounded-input text-text text-sm font-body box-border resize-y focus:outline-none focus:border-brand transition-colors" />
          </Field>

          <div className="flex flex-col sm:flex-row gap-4">
            <Field label="Password" error={errors.password}>
              <div className="relative">
                <Input name="password" type={showPw ? 'text' : 'password'}
                  value={form.password} onChange={handleChange}
                  placeholder="Min. 8 chars" hasError={!!errors.password}
                  maxLength={128} className="pr-[44px]" />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-text-muted cursor-pointer text-[11px] font-semibold tracking-[0.06em] font-body">
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              {form.password && <StrengthBar password={form.password} />}
            </Field>
            <Field label="Confirm Password" error={errors.confirmPassword}>
              <Input name="confirmPassword" type={showPw ? 'text' : 'password'}
                value={form.confirmPassword} onChange={handleChange}
                placeholder="Re-enter" hasError={!!errors.confirmPassword} maxLength={128} />
            </Field>
          </div>

          {serverError && (
            <p className="bg-error-bg border border-error-border rounded-input text-error-text text-[13px] font-body px-[14px] py-2 mb-4">
              {serverError}
            </p>
          )}

          <button type="submit" disabled={status === 'loading'}
            className="w-full py-[13px] bg-brand text-black font-extrabold text-[13px] tracking-[0.12em] uppercase border-none rounded-input cursor-pointer font-ui mt-1 transition-colors hover:bg-brand-hover disabled:opacity-60 disabled:cursor-not-allowed">
            {status === 'loading' ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Input({ hasError = false, className = '', ...props }) {
  return (
    <input
      className={[
        'w-full px-3 py-2 bg-[#0F0F0F] border rounded-input text-text text-sm font-body box-border',
        'focus:outline-none focus:border-brand transition-colors',
        hasError ? 'border-error-field' : 'border-border',
        className,
      ].join(' ')}
      {...props}
    />
  )
}

function Field({ label, error, children }) {
  return (
    <div className="mb-[18px] flex-1 min-w-0">
      <label className="block text-text-label text-[11px] font-semibold tracking-[0.08em] uppercase mb-1">{label}</label>
      {children}
      {error && <p className="text-error-field text-[11px] mt-1">{error}</p>}
    </div>
  )
}

function StrengthBar({ password }) {
  let n = 0
  if (password.length >= 8) n++
  if (/[A-Z]/.test(password)) n++
  if (/[0-9]/.test(password)) n++
  if (/[^A-Za-z0-9]/.test(password)) n++
  const colors = ['', '#E53E3E', '#DD6B20', '#D69E2E', '#38A169']
  return (
    <div className="flex gap-[3px] mt-[6px]">
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{ background: i <= n ? colors[n] : '#2A2A2A' }}
          className="h-[3px] flex-1 rounded-tag transition-[background] duration-300" />
      ))}
    </div>
  )
}
