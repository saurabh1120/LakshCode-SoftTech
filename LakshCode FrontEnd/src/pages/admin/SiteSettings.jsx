import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import {
  FiSave, FiUpload, FiGlobe,
  FiMail, FiCheck,
} from 'react-icons/fi'
import API from '../../api/axios'

const empty = {
  companyName: '', email: '', phone: '', whatsapp: '',
  address: '', facebookUrl: '', instagramUrl: '', linkedinUrl: '',
  githubUrl: '', twitterUrl: '', footerTagline: '',
  seoTitle: '', seoDescription: '', seoKeywords: '',
  primaryColor: '#0ea5e9',
}

const S = {
  section: {
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '20px', padding: '32px', marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '15px', fontWeight: 700, color: '#f1f5f9',
    marginBottom: '24px', paddingBottom: '16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex', alignItems: 'center', gap: '8px',
  },
  label: {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#475569', marginBottom: '8px',
    letterSpacing: '0.5px', textTransform: 'uppercase',
  },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
    padding: '12px 16px', color: '#f1f5f9', fontSize: '14px',
    fontFamily: 'Inter, sans-serif', outline: 'none',
    transition: 'all 0.2s ease', boxSizing: 'border-box',
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
}

function SuccessOverlay({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(3,7,18,0.75)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{
              background: '#07101f',
              border: '1px solid rgba(52,211,153,0.3)',
              borderRadius: '28px', padding: '52px 64px',
              textAlign: 'center', boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
              style={{
                width: '76px', height: '76px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#34d399,#0ea5e9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', boxShadow: '0 8px 32px rgba(52,211,153,0.4)',
              }}
            >
              <FiCheck style={{ color: 'white', fontSize: '34px', strokeWidth: 3 }} />
            </motion.div>
            <h3 style={{
              fontSize: '20px', fontWeight: 800, color: 'white',
              marginBottom: '8px', letterSpacing: '-0.5px',
            }}>
              {message}
            </h3>
            <p style={{ fontSize: '14px', color: '#475569' }}>
              Changes saved successfully
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function SiteSettings() {
  const [form, setForm] = useState(empty)
  const [logo, setLogo] = useState(null)
  const [saving, setSaving] = useState(false)
  const [logoSaving, setLogoSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(function () {
    API.get('/settings').then(function (r) {
      const d = r.data.data
      if (d) {
        setForm({
          companyName: d.companyName || '',
          email: d.email || '',
          phone: d.phone || '',
          whatsapp: d.whatsapp || '',
          address: d.address || '',
          facebookUrl: d.facebookUrl || '',
          instagramUrl: d.instagramUrl || '',
          linkedinUrl: d.linkedinUrl || '',
          githubUrl: d.githubUrl || '',
          twitterUrl: d.twitterUrl || '',
          footerTagline: d.footerTagline || '',
          seoTitle: d.seoTitle || '',
          seoDescription: d.seoDescription || '',
          seoKeywords: d.seoKeywords || '',
          primaryColor: d.primaryColor || '#0ea5e9',
        })
      }
      setLoaded(true)
    }).catch(function () { setLoaded(true) })
  }, [])

  function set(field, value) {
    setForm(function (prev) {
      return Object.assign({}, prev, { [field]: value })
    })
  }

  function focusInput(e) {
    e.target.style.borderColor = 'rgba(14,165,233,0.45)'
    e.target.style.background = 'rgba(14,165,233,0.04)'
    e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)'
  }

  function blurInput(e) {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
    e.target.style.background = 'rgba(255,255,255,0.04)'
    e.target.style.boxShadow = 'none'
  }

  function inp(field, placeholder, type) {
    return (
      <input
        value={form[field]}
        onChange={function (e) { set(field, e.target.value) }}
        placeholder={placeholder || ''}
        type={type || 'text'}
        style={S.input}
        onFocus={focusInput}
        onBlur={blurInput}
      />
    )
  }

  // async function handleSave(e) {
  //   e.preventDefault()
  //   setSaving(true)
  //   try {
  //     await API.put('/settings', form)
  //     setSuccessMsg('Settings saved successfully!')
  //     setSuccess(true)
  //     setTimeout(function () { setSuccess(false) }, 1600)
  //   } catch {
  //     toast.error('Failed to save settings')
  //   } finally {
  //     setSaving(false)
  //   }
  // }
  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await API.put('/settings', form)
      setSuccessMsg('Settings saved successfully!')
      setSuccess(true)
      setTimeout(function () {
        setSuccess(false)
        // Re-fetch settings to confirm saved data
        API.get('/settings').then(function (r) {
          const d = r.data.data
          if (d) {
            setForm({
              companyName: d.companyName || '',
              email: d.email || '',
              phone: d.phone || '',
              whatsapp: d.whatsapp || '',
              address: d.address || '',
              facebookUrl: d.facebookUrl || '',
              instagramUrl: d.instagramUrl || '',
              linkedinUrl: d.linkedinUrl || '',
              githubUrl: d.githubUrl || '',
              twitterUrl: d.twitterUrl || '',
              footerTagline: d.footerTagline || '',
              seoTitle: d.seoTitle || '',
              seoDescription: d.seoDescription || '',
              seoKeywords: d.seoKeywords || '',
              primaryColor: d.primaryColor || '#0ea5e9',
            })
          }
        })
      }, 1600)
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogoUpload() {
    if (!logo) { toast.warning('Select a logo file first'); return }
    setLogoSaving(true)
    try {
      const fd = new FormData()
      fd.append('logo', logo)
      await API.post('/settings/logo', fd)
      setSuccessMsg('Logo uploaded successfully!')
      setSuccess(true)
      setLogo(null)
      setTimeout(function () { setSuccess(false) }, 1600)
    } catch {
      toast.error('Logo upload failed')
    } finally {
      setLogoSaving(false)
    }
  }

  if (!loaded) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', height: '60vh',
      }}>
        <div style={{ color: '#475569', fontSize: '14px' }}>
          Loading settings...
        </div>
      </div>
    )
  }



  return (
    <div style={{ maxWidth: '860px' }}>
      <SuccessOverlay show={success} message={successMsg} />

      {/* Page header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontSize: '28px', fontWeight: 800, color: 'white',
          letterSpacing: '-0.5px', marginBottom: '6px',
        }}>
          Site Settings
        </h1>
        <p style={{ fontSize: '14px', color: '#475569' }}>
          Manage your website content and configuration
        </p>
      </div>

      <form onSubmit={handleSave}>

        {/* Logo Upload */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={S.section}
        >
          <div style={S.sectionTitle}>
            <FiGlobe size={16} style={{ color: '#38bdf8' }} />
            Logo Upload
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="file" accept="image/*"
              onChange={function (e) { setLogo(e.target.files[0]) }}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px', padding: '10px 16px',
                color: '#64748b', fontSize: '13px',
                fontFamily: 'Inter, sans-serif', outline: 'none',
              }}
            />
            <button
              type="button" onClick={handleLogoUpload}
              disabled={!logo || logoSaving}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '11px 20px',
                background: logo
                  ? 'linear-gradient(135deg,#0ea5e9,#6366f1)'
                  : 'rgba(255,255,255,0.06)',
                color: logo ? 'white' : '#475569',
                fontWeight: 600, fontSize: '14px', borderRadius: '10px',
                border: 'none', cursor: logo ? 'pointer' : 'not-allowed',
                fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <FiUpload size={15} />
              {logoSaving ? 'Uploading...' : 'Upload Logo'}
            </button>
          </div>
          {logo && (
            <p style={{ fontSize: '12px', color: '#38bdf8', marginTop: '8px' }}>
              Selected: {logo.name}
            </p>
          )}
        </motion.div>

        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          style={S.section}
        >
          <div style={S.sectionTitle}>
            <FiMail size={16} style={{ color: '#818cf8' }} />
            Company Info
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Company Name</label>
                {inp('companyName', 'LakshCode SoftTech')}
              </div>
              <div>
                <label style={S.label}>Email</label>
                {inp('email', 'contact@lakshcode.com', 'email')}
              </div>
            </div>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Phone</label>
                {inp('phone', '+91-XXXXXXXXXX')}
              </div>
              <div>
                <label style={S.label}>WhatsApp Number</label>
                {inp('whatsapp', '+91-XXXXXXXXXX')}
              </div>
            </div>
            <div>
              <label style={S.label}>Address</label>
              <textarea
                value={form.address}
                onChange={function (e) { set('address', e.target.value) }}
                placeholder="Raipur, Chhattisgarh, India"
                rows={2}
                style={{ ...S.input, resize: 'none' }}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          style={S.section}
        >
          <div style={S.sectionTitle}>
            <FiGlobe size={16} style={{ color: '#34d399' }} />
            Social Media Links
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>Facebook</label>
                {inp('facebookUrl', 'https://facebook.com/...')}
              </div>
              <div>
                <label style={S.label}>Instagram</label>
                {inp('instagramUrl', 'https://instagram.com/...')}
              </div>
            </div>
            <div style={S.grid2}>
              <div>
                <label style={S.label}>LinkedIn</label>
                {inp('linkedinUrl', 'https://linkedin.com/...')}
              </div>
              <div>
                <label style={S.label}>GitHub</label>
                {inp('githubUrl', 'https://github.com/...')}
              </div>
            </div>
            <div style={{ maxWidth: '50%' }}>
              <label style={S.label}>Twitter / X</label>
              {inp('twitterUrl', 'https://twitter.com/...')}
            </div>
          </div>
        </motion.div>

        {/* Footer & Theme */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.21 }}
          style={S.section}
        >
          <div style={S.sectionTitle}>
            <FiGlobe size={16} style={{ color: '#fb923c' }} />
            Footer Setting
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={S.label}>Footer Tagline</label>
              <textarea
                value={form.footerTagline}
                onChange={function (e) { set('footerTagline', e.target.value) }}
                placeholder="Building Digital Futures..."
                rows={2}
                style={{ ...S.input, resize: 'none' }}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
            <div>
              {/* <label style={S.label}>Primary Color</label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="color" value={form.primaryColor}
                  onChange={function (e) { set('primaryColor', e.target.value) }}
                  style={{
                    width: '52px', height: '44px', borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent', cursor: 'pointer', padding: '4px',
                  }}
                />
                <input
                  value={form.primaryColor}
                  onChange={function (e) { set('primaryColor', e.target.value) }}
                  placeholder="#0ea5e9"
                  style={{ ...S.input, maxWidth: '180px' }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: form.primaryColor,
                  border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0,
                }} />
              </div> */}
            </div>
          </div>
        </motion.div>

        {/* SEO */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          style={S.section}
        >
          <div style={S.sectionTitle}>
            <FiGlobe size={16} style={{ color: '#f472b6' }} />
            SEO Settings
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={S.label}>SEO Title</label>
              {inp('seoTitle', 'LakshCode SoftTech | Software Solutions')}
            </div>
            <div>
              <label style={S.label}>SEO Description</label>
              <textarea
                value={form.seoDescription}
                onChange={function (e) { set('seoDescription', e.target.value) }}
                placeholder="Meta description for search engines..."
                rows={2}
                style={{ ...S.input, resize: 'none' }}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
            <div>
              <label style={S.label}>SEO Keywords</label>
              {inp('seoKeywords', 'software development, web app, mobile app...')}
            </div>
          </div>
        </motion.div>

        {/* Save button */}
        <button
          type="submit"
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '14px 32px',
            background: saving
              ? 'rgba(14,165,233,0.4)'
              : 'linear-gradient(135deg,#0ea5e9,#6366f1)',
            color: 'white', fontWeight: 700, fontSize: '15px',
            borderRadius: '12px', border: 'none',
            cursor: saving ? 'not-allowed' : 'pointer',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 8px 24px rgba(14,165,233,0.3)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={function (e) {
            if (!saving) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(14,165,233,0.45)'
            }
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(14,165,233,0.3)'
          }}
        >
          <FiSave size={18} />
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>

      </form>
    </div>
  )
}