import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import API from '../../api/axios'
import logo from '../../assets/logo.png'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post('/auth/login', form)
      const token = res.data.data.token
      if (token) {
        localStorage.setItem('lakshcode_token', token)
        login(token)
        toast.success('Welcome back!')
        navigate('/admin')
      } else {
        toast.error('No token received')
      }
    } catch {
      toast.error('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    borderRadius: '12px',
    padding: '14px 18px 14px 48px',
    color: '#f1f5f9',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'all 0.25s ease',
    boxSizing: 'border-box',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.1) 0%, transparent 70%), #030712',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Glow */}
        <div style={{
          position: 'absolute', inset: '-20px',
          background: 'linear-gradient(135deg,rgba(14,165,233,0.12),rgba(99,102,241,0.08))',
          borderRadius: '36px', filter: 'blur(30px)',
          pointerEvents: 'none',
        }} />

        {/* Card */}
        <div style={{
          position: 'relative',
          background: '#07101f',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '28px',
          padding: '44px 40px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
        }}>

          {/* Logo + title */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <img
              src={logo}
              alt="LakshCode"
              style={{
                height: '135px', objectFit: 'contain',
                display: 'block', margin: '0 auto 20px',
              }}
            />
            <h1 style={{
              fontSize: '22px', fontWeight: 800,
              color: 'white', letterSpacing: '-0.5px', marginBottom: '6px',
            }}>
              Admin Panel
            </h1>
            <p style={{ fontSize: '14px', color: '#475569' }}>
              Sign in to manage your website
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >

            {/* Username */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '16px', top: '50%',
                transform: 'translateY(-50%)',
                color: '#334155', fontSize: '16px', pointerEvents: 'none',
                zIndex: 1,
              }}>
                <FiUser />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={function (e) {
                  setForm(function (p) {
                    return Object.assign({}, p, { username: e.target.value })
                  })
                }}
                required
                style={inputStyle}
                onFocus={function (e) {
                  e.target.style.borderColor = 'rgba(14,165,233,0.5)'
                  e.target.style.background = 'rgba(14,165,233,0.04)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)'
                }}
                onBlur={function (e) {
                  e.target.style.borderColor = 'rgba(255,255,255,0.09)'
                  e.target.style.background = 'rgba(255,255,255,0.04)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '16px', top: '50%',
                transform: 'translateY(-50%)',
                color: '#334155', fontSize: '16px', pointerEvents: 'none',
                zIndex: 1,
              }}>
                <FiLock />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={function (e) {
                  setForm(function (p) {
                    return Object.assign({}, p, { password: e.target.value })
                  })
                }}
                required
                style={inputStyle}
                onFocus={function (e) {
                  e.target.style.borderColor = 'rgba(14,165,233,0.5)'
                  e.target.style.background = 'rgba(14,165,233,0.04)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)'
                }}
                onBlur={function (e) {
                  e.target.style.borderColor = 'rgba(255,255,255,0.09)'
                  e.target.style.background = 'rgba(255,255,255,0.04)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '10px',
                padding: '15px',
                background: loading
                  ? 'rgba(14,165,233,0.5)'
                  : 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                color: 'white', fontWeight: 700, fontSize: '15px',
                borderRadius: '12px', border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 8px 24px rgba(14,165,233,0.3)',
                transition: 'all 0.25s ease',
                marginTop: '4px',
              }}
              onMouseEnter={function (e) {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(14,165,233,0.45)'
                }
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(14,165,233,0.3)'
              }}
            >
              {loading ? (
                'Signing in...'
              ) : (
                <>
                  Sign In <FiArrowRight />
                </>
              )}
            </button>

          </form>

          {/* Footer note */}
          <div style={{
            textAlign: 'center', marginTop: '28px',
            padding: '16px 0 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            <p style={{ fontSize: '12px', color: '#1e3a5f' }}>
              LakshCode SoftTech — Admin Access Only
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}