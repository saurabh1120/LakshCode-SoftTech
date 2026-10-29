import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { FiMail, FiPhone, FiMapPin, FiCheck, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const budgets = [
  'Under ₹50,000', '₹50K – ₹1L',
  '₹1L – ₹3L', '₹3L+',
]

const iS = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '12px', padding: '14px 18px',
  color: 'white', fontSize: '16px',
  fontFamily: 'Inter, sans-serif',
  outline: 'none', transition: 'all 0.25s ease',
  boxSizing: 'border-box',
}

const errStyle = {
  color: '#f87171', fontSize: '12px',
  marginTop: '5px', display: 'block',
}

function focusInput(e) {
  e.target.style.borderColor = 'rgba(14,165,233,0.5)'
  e.target.style.background = 'rgba(14,165,233,0.04)'
  e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)'
}

function blurInput(e) {
  e.target.style.borderColor = 'rgba(255,255,255,0.09)'
  e.target.style.background = 'rgba(255,255,255,0.04)'
  e.target.style.boxShadow = 'none'
}

export default function Contact() {
  const [settings, setSettings] = useState({})
  const [showModal, setShowModal] = useState(false)
  // const navigate = useNavigate()

  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(function () {
    API.get('/settings')
      .then(function (r) { setSettings(r.data.data || {}) })
      .catch(function () { /* Handle silently */ })
  }, [])

  async function onSubmit(data) {
    try {
      await API.post('/inquiries/submit', data)
      reset()
      setShowModal(true)
    } catch {
      alert("Inquiry submission failed. Please try again.")
    }
  }

  function handleModalClose() {
    setShowModal(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="contact"
      style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg,#030712 0%,#060d1f 50%,#030712 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        select option { background: #0a1628; color: white; }
      `}</style>

      {/* ===== SUCCESS MODAL ===== */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(3,7,18,0.85)',
              backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              onClick={function (e) { e.stopPropagation() }}
              style={{
                background: 'linear-gradient(145deg,#0a1628,#07101f)',
                border: '1px solid rgba(52,211,153,0.25)',
                borderRadius: '28px',
                padding: '48px 40px',
                width: '100%',
                maxWidth: '480px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(52,211,153,0.1)',
              }}
            >
              <button
                onClick={handleModalClose}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#475569', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <FiX size={16} />
              </button>

              <div style={{
                width: '88px', height: '88px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#34d399,#0ea5e9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 28px',
                boxShadow: '0 12px 48px rgba(52,211,153,0.45)',
              }}>
                <FiCheck style={{ color: 'white', fontSize: '40px', strokeWidth: 2.5 }} />
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'white', marginBottom: '12px' }}>
                Inquiry Submitted! 🎉
              </h2>

              <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.75, marginBottom: '28px' }}>
                Thank you for reaching out to <span style={{ color: '#38bdf8', fontWeight: 600 }}>LakshCode SoftTech</span>. Our team will contact you within <span style={{ color: '#34d399', fontWeight: 700 }}>2 business hours</span>.
              </p>

              <button
                onClick={handleModalClose}
                style={{
                  width: '100%', padding: '15px 24px',
                  background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                  color: 'white', fontWeight: 700, fontSize: '15px',
                  borderRadius: '12px', border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(14,165,233,0.35)', transition: 'all 0.25s ease'
                }}
              >
                Back to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(14,165,233,0.05) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 40px', boxSizing: 'border-box' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', marginBottom: '20px',
            background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: '99px', fontSize: '12px', fontWeight: 700, color: '#38bdf8', letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Contact
          </div>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, color: '#f8fafc', marginBottom: '16px', lineHeight: 1.1 }}>
            Let's <span style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Build Together</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#475569', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
            Book a free consultation and let's discuss how we can bring your idea to life.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '48px', alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Get in Touch</h3>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '32px' }}>We typically respond within 2 hours.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a href={`mailto:${settings.email || ''}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', cursor: 'pointer' }}>
                  <FiMail style={{ color: '#38bdf8' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600, textTransform: 'uppercase' }}>Email Us</div>
                    <div style={{ color: '#e2e8f0', fontSize: '14px' }}>{settings.email || 'support.lakshcode@gmail.com'}</div>
                  </div>
                </div>
              </a>

              <a href={`tel:${settings.phone || ''}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', cursor: 'pointer' }}>
                  <FiPhone style={{ color: '#818cf8' }} />
                  <div>
                    <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600, textTransform: 'uppercase' }}>Call Us</div>
                    <div style={{ color: '#e2e8f0', fontSize: '14px' }}>{settings.phone || '+91-7974485587'}</div>
                  </div>
                </div>
              </a>

              {settings.whatsapp && (
                <a href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', cursor: 'pointer' }}>
                    <FaWhatsapp style={{ color: '#25d366' }} />
                    <div>
                      <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600, textTransform: 'uppercase' }}>WhatsApp</div>
                      <div style={{ color: '#e2e8f0', fontSize: '14px' }}>{settings.whatsapp}</div>
                    </div>
                  </div>
                </a>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px' }}>
                <FiMapPin style={{ color: '#34d399' }} />
                <div>
                  <div style={{ fontSize: '11px', color: '#334155', fontWeight: 600, textTransform: 'uppercase' }}>Location</div>
                  <div style={{ color: '#e2e8f0', fontSize: '14px' }}>{settings.address || 'Raipur, Chhattisgarh, India'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - FORM */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '28px', padding: '44px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '28px' }}>Send us a message</h4>
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <input {...register('name', { required: 'Required', pattern: { value: /^[A-Za-z\s]+$/, message: 'Letters only' } })} placeholder="Full Name *" style={iS} onFocus={focusInput} onBlur={blurInput} />
                    {errors.name && <span style={errStyle}>{errors.name.message}</span>}
                  </div>
                  <div>
                    <input {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} placeholder="Email *" style={iS} onFocus={focusInput} onBlur={blurInput} />
                    {errors.email && <span style={errStyle}>{errors.email.message}</span>}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <input {...register('phone', { required: 'Required' })} placeholder="Phone Number *" style={iS} onFocus={focusInput} onBlur={blurInput} />
                    {errors.phone && <span style={errStyle}>{errors.phone.message}</span>}
                  </div>
                  <div>
                    <select {...register('budget', { required: 'Required' })} style={{ ...iS, color: '#64748b' }} onFocus={focusInput} onBlur={blurInput}>
                      <option value="">Select Budget *</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {errors.budget && <span style={errStyle}>{errors.budget.message}</span>}
                  </div>
                </div>

                <div>
                  <input {...register('requirement', { required: 'Required' })} placeholder="What do you need? *" style={iS} onFocus={focusInput} onBlur={blurInput} />
                  {errors.requirement && <span style={errStyle}>{errors.requirement.message}</span>}
                </div>

                <div>
                  <textarea {...register('message', { required: 'Required', minLength: { value: 20, message: 'Min 20 characters' } })} placeholder="Project Details... *" rows={5} style={{ ...iS, resize: 'none' }} onFocus={focusInput} onBlur={blurInput} />
                  {errors.message && <span style={errStyle}>{errors.message.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '16px 24px', borderRadius: '12px', border: 'none', color: 'white', fontWeight: 700,
                    background: isSubmitting ? 'rgba(14,165,233,0.5)' : 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 8px 32px rgba(14,165,233,0.3)', transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
