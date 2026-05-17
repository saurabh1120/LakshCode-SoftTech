import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import { useAdminSuccess } from '../../hooks/useAdminSuccess'

const empty = {
  clientName: '', company: '', message: '',
  rating: 5, avatarUrl: '', active: true,
}

const S = {
  input: {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)', borderRadius: '10px',
    padding: '12px 16px', color: '#f1f5f9', fontSize: '14px',
    fontFamily: 'Inter, sans-serif', outline: 'none',
    boxSizing: 'border-box', transition: 'all 0.2s ease',
  },
  label: {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#475569', marginBottom: '8px',
    letterSpacing: '0.5px', textTransform: 'uppercase',
  },
}

const avatarColors = [
  'linear-gradient(135deg,#0ea5e9,#6366f1)',
  'linear-gradient(135deg,#34d399,#0ea5e9)',
  'linear-gradient(135deg,#f472b6,#818cf8)',
  'linear-gradient(135deg,#fb923c,#f472b6)',
  'linear-gradient(135deg,#818cf8,#34d399)',
]

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
            <p style={{ fontSize: '14px', color: '#475569' }}>Changes saved successfully</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
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

export default function ManageTestimonials() {
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const { success, successMsg, showSuccess } = useAdminSuccess()

  function fetchAll() {
    API.get('/testimonials/all').then(function (r) { setList(r.data.data) })
  }

  useEffect(function () { fetchAll() }, [])

  function openAdd() { setForm(empty); setEditId(null); setShowModal(true) }

  function openEdit(t) {
    setForm({
      clientName: t.clientName || '', company: t.company || '',
      message: t.message || '', rating: t.rating || 5,
      avatarUrl: t.avatarUrl || '', active: t.active,
    })
    setEditId(t.id); setShowModal(true)
  }

  function handleChange(e) {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(function (prev) { return Object.assign({}, prev, { [e.target.name]: val }) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = Object.assign({}, form, { rating: Number(form.rating) })
      if (editId) {
        await API.put('/testimonials/' + editId, payload)
        showSuccess('Testimonial updated!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchAll,
        })
      } else {
        await API.post('/testimonials', payload)
        showSuccess('Testimonial added!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchAll,
        })
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this testimonial?')) return
    try {
      await API.delete('/testimonials/' + id)
      showSuccess('Testimonial deleted!', { onDone: fetchAll })
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div>
      <SuccessOverlay show={success} message={successMsg} />

      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '36px',
      }}>
        <div>
          <h1 style={{
            fontSize: '28px', fontWeight: 800, color: 'white',
            letterSpacing: '-0.5px', marginBottom: '6px',
          }}>
            Manage Testimonials
          </h1>
          <p style={{ fontSize: '14px', color: '#475569' }}>
            Manage client reviews and ratings
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 22px',
            background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
            color: 'white', fontWeight: 700, fontSize: '14px',
            borderRadius: '12px', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 10px 28px rgba(14,165,233,0.45)'
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(14,165,233,0.3)'
          }}
        >
          <FiPlus size={17} /> Add Testimonial
        </button>
      </div>

      {list.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '80px 40px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.1)',
          borderRadius: '20px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            No testimonials yet
          </p>
          <p style={{ fontSize: '14px', color: '#1e3a5f' }}>
            Add your first client review to build trust
          </p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
        {list.map(function (t, i) {
          const avatarBg = avatarColors[i % avatarColors.length]
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px', padding: '24px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                position: 'absolute', top: '16px', right: '20px',
                fontSize: '60px', fontWeight: 900, lineHeight: 1,
                color: 'rgba(14,165,233,0.07)', fontFamily: 'Georgia, serif',
              }}>
                "
              </div>

              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {t.avatarUrl ? (
                    <img src={t.avatarUrl} alt={t.clientName}
                      style={{
                        width: '44px', height: '44px', borderRadius: '12px',
                        objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)',
                      }} />
                  ) : (
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: avatarBg, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', fontWeight: 800, color: 'white',
                    }}>
                      {t.clientName ? t.clientName[0].toUpperCase() : '?'}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', marginBottom: '2px' }}>
                      {t.clientName}
                    </div>
                    <div style={{ fontSize: '12px', color: '#475569' }}>
                      {t.company || 'Independent'}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={function () { openEdit(t) }}
                    style={{
                      width: '32px', height: '32px', borderRadius: '9px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(14,165,233,0.08)',
                      border: '1px solid rgba(14,165,233,0.18)',
                      color: '#38bdf8', cursor: 'pointer', transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={function (e) {
                      e.currentTarget.style.background = 'rgba(14,165,233,0.18)'
                      e.currentTarget.style.transform = 'scale(1.08)'
                    }}
                    onMouseLeave={function (e) {
                      e.currentTarget.style.background = 'rgba(14,165,233,0.08)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <FiEdit2 size={13} />
                  </button>
                  <button
                    onClick={function () { handleDelete(t.id) }}
                    style={{
                      width: '32px', height: '32px', borderRadius: '9px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.18)',
                      color: '#f87171', cursor: 'pointer', transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={function (e) {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.18)'
                      e.currentTarget.style.transform = 'scale(1.08)'
                    }}
                    onMouseLeave={function (e) {
                      e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
                      e.currentTarget.style.transform = 'scale(1)'
                    }}
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '3px', marginBottom: '12px' }}>
                {[1, 2, 3, 4, 5].map(function (star) {
                  return star <= (t.rating || 5)
                    ? <FaStar key={star} style={{ color: '#fbbf24', fontSize: '14px' }} />
                    : <FaRegStar key={star} style={{ color: '#334155', fontSize: '14px' }} />
                })}
              </div>

              <p style={{
                fontSize: '13px', color: '#64748b', lineHeight: 1.7,
                fontStyle: 'italic', display: '-webkit-box',
                WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                overflow: 'hidden', marginBottom: '14px',
              }}>
                "{t.message}"
              </p>

              <span style={{
                display: 'inline-flex', padding: '3px 10px',
                borderRadius: '99px', fontSize: '11px', fontWeight: 600,
                background: t.active ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)',
                border: t.active ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(239,68,68,0.25)',
                color: t.active ? '#34d399' : '#f87171',
              }}>
                {t.active ? 'Active' : 'Inactive'}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '24px',
            }}
            onClick={function () { setShowModal(false) }}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0 }}
              onClick={function (e) { e.stopPropagation() }}
              style={{
                background: '#07101f',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '24px', padding: '36px',
                width: '100%', maxWidth: '520px',
                maxHeight: '90vh', overflowY: 'auto',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '28px',
              }}>
                <div>
                  <h2 style={{
                    fontSize: '20px', fontWeight: 800, color: 'white',
                    letterSpacing: '-0.5px', marginBottom: '4px',
                  }}>
                    {editId ? 'Edit Testimonial' : 'Add Testimonial'}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#475569' }}>
                    {editId ? 'Update client review' : 'Add a new client review'}
                  </p>
                </div>
                <button
                  onClick={function () { setShowModal(false) }}
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#94a3b8', cursor: 'pointer',
                  }}
                >
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={S.label}>Client Name *</label>
                    <input
                      name="clientName" value={form.clientName}
                      onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                      required placeholder="John Smith" style={S.input}
                    />
                  </div>
                  <div>
                    <label style={S.label}>Company</label>
                    <input
                      name="company" value={form.company}
                      onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                      placeholder="Acme Corp" style={S.input}
                    />
                  </div>
                </div>
                <div>
                  <label style={S.label}>Review Message *</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                    required rows={4}
                    placeholder="What did the client say about your work?"
                    style={{ ...S.input, resize: 'none' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={S.label}>Rating</label>
                    <select
                      name="rating" value={form.rating} onChange={handleChange}
                      style={{ ...S.input, background: '#070f1e', cursor: 'pointer' }}
                    >
                      {[5, 4, 3, 2, 1].map(function (n) {
                        return (
                          <option key={n} value={n}>
                            {'★'.repeat(n) + '☆'.repeat(5 - n)} ({n}/5)
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>Avatar URL (optional)</label>
                    <input
                      name="avatarUrl" value={form.avatarUrl}
                      onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                      placeholder="https://photo.url" style={S.input}
                    />
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                }}>
                  <input
                    type="checkbox" name="active" id="test-active"
                    checked={form.active} onChange={handleChange}
                    style={{ width: '16px', height: '16px', accentColor: '#0ea5e9', cursor: 'pointer' }}
                  />
                  <label htmlFor="test-active" style={{
                    fontSize: '14px', fontWeight: 500, color: '#94a3b8', cursor: 'pointer',
                  }}>
                    Show on public website (Active)
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                  <button
                    type="button" onClick={function () { setShowModal(false) }}
                    style={{
                      flex: 1, padding: '13px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', color: '#94a3b8',
                      fontSize: '14px', fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" disabled={loading}
                    style={{
                      flex: 1, padding: '13px',
                      background: loading
                        ? 'rgba(14,165,233,0.4)'
                        : 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                      border: 'none', borderRadius: '12px',
                      color: 'white', fontSize: '14px', fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      boxShadow: '0 4px 16px rgba(14,165,233,0.3)',
                    }}
                  >
                    {loading ? 'Saving...' : editId ? 'Update' : 'Add Testimonial'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}