import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX, FiMail, FiPhone, FiDollarSign,
  FiMessageSquare, FiUser, FiCalendar,
  FiSave, FiCheck,
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import { useAdminSuccess } from '../../hooks/useAdminSuccess'

const STATUS_STYLES = {
  NEW: {
    bg: 'rgba(14,165,233,0.12)',
    border: 'rgba(14,165,233,0.25)',
    color: '#38bdf8',
  },
  'IN-PROGRESS': {
    bg: 'rgba(234,179,8,0.12)',
    border: 'rgba(234,179,8,0.25)',
    color: '#facc15',
  },
  CLOSED: {
    bg: 'rgba(52,211,153,0.12)',
    border: 'rgba(52,211,153,0.25)',
    color: '#34d399',
  },
}

function SuccessOverlay({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(3,7,18,0.75)',
            backdropFilter: 'blur(8px)',
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
              textAlign: 'center',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
              style={{
                width: '76px', height: '76px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#34d399,#0ea5e9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 8px 32px rgba(52,211,153,0.4)',
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

export default function ManageInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [selected, setSelected] = useState(null)
  const [notes, setNotes] = useState('')
  const [localStatus, setLocalStatus] = useState('') // New state to handle temporary status changes inside modal
  const [filter, setFilter] = useState('ALL')
  const [saving, setSaving] = useState(false) // Single loader state for the final submission

  const { success, successMsg, showSuccess } = useAdminSuccess()

  function fetchAll() {
    API.get('/inquiries')
      .then(function (r) { setInquiries(r.data.data || []) })
      .catch(function () { toast.error('Failed to load inquiries') })
  }

  useEffect(function () { fetchAll() }, [])

  function openDetail(inq) {
    setSelected(inq)
    setNotes(inq.notes || '')
    setLocalStatus(inq.status || 'NEW') // Set status locally when opening modal
  }

  // Combined function that saves everything, opens success modal, and takes you back to main list
  async function handleSaveChanges(id) {
    setSaving(true)
    try {
      // Execute updates concurrently for seamless network handling
      await Promise.all([
        API.patch('/inquiries/' + id + '/status', { status: localStatus }),
        API.patch('/inquiries/' + id + '/notes', { notes: notes })
      ])

      showSuccess('Inquiry updated successfully!', {
        onDone: function () {
          setSelected(null) // Closes form detail state view automatically
          fetchAll() // Refreshes grid details back on parent
        }
      })
    } catch {
      toast.error('Failed to update inquiry changes')
    } finally {
      setSaving(false)
    }
  }

  const filtered = filter === 'ALL'
    ? inquiries
    : inquiries.filter(function (i) { return i.status === filter })

  const counts = {
    ALL: inquiries.length,
    NEW: inquiries.filter(function (i) { return i.status === 'NEW' }).length,
    'IN-PROGRESS': inquiries.filter(function (i) { return i.status === 'IN-PROGRESS' }).length,
    CLOSED: inquiries.filter(function (i) { return i.status === 'CLOSED' }).length,
  }

  return (
    <div>
      <SuccessOverlay show={success} message={successMsg} />

      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontSize: '28px', fontWeight: 800, color: 'white',
          letterSpacing: '-0.5px', marginBottom: '6px',
        }}>
          Manage Inquiries
        </h1>
        <p style={{ fontSize: '14px', color: '#475569' }}>
          View and manage all contact form submissions
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '24px',
        padding: '6px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '14px', width: 'fit-content',
      }}>
        {['ALL', 'NEW', 'IN-PROGRESS', 'CLOSED'].map(function (f) {
          const active = filter === f
          return (
            <button
              key={f}
              onClick={function () { setFilter(f) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 18px', borderRadius: '10px',
                fontSize: '13px', fontWeight: 600,
                border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.18s ease',
                background: active
                  ? 'linear-gradient(135deg,#0ea5e9,#6366f1)'
                  : 'transparent',
                color: active ? 'white' : '#475569',
                boxShadow: active
                  ? '0 4px 12px rgba(14,165,233,0.3)'
                  : 'none',
              }}
            >
              {f}
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                justifyContent: 'center',
                minWidth: '20px', height: '20px',
                borderRadius: '99px', padding: '0 6px',
                background: active
                  ? 'rgba(255,255,255,0.2)'
                  : 'rgba(255,255,255,0.06)',
                fontSize: '11px', fontWeight: 700,
                color: active ? 'white' : '#334155',
              }}>
                {counts[f]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '80px 40px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.08)',
          borderRadius: '20px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <p style={{
            fontSize: '16px', fontWeight: 600,
            color: '#334155', marginBottom: '6px',
          }}>
            No inquiries found
          </p>
          <p style={{ fontSize: '14px', color: '#1e3a5f' }}>
            {filter === 'ALL'
              ? 'No contact form submissions yet'
              : 'No ' + filter + ' inquiries'}
          </p>
        </div>
      )}

      {/* Inquiry list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(function (inq, i) {
          const st = STATUS_STYLES[inq.status] || STATUS_STYLES.NEW
          return (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={function () { openDetail(inq) }}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '18px 22px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)'
                e.currentTarget.style.transform = 'translateX(4px)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'linear-gradient(135deg,rgba(14,165,233,0.2),rgba(99,102,241,0.2))',
                border: '1px solid rgba(14,165,233,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '17px', fontWeight: 800, color: '#38bdf8', flexShrink: 0,
              }}>
                {inq.name ? inq.name[0].toUpperCase() : '?'}
              </div>

              <div style={{ minWidth: '180px', flexShrink: 0 }}>
                <div style={{
                  fontSize: '15px', fontWeight: 700,
                  color: '#f1f5f9', marginBottom: '3px',
                }}>
                  {inq.name}
                </div>
                <div style={{ fontSize: '13px', color: '#475569' }}>
                  {inq.email}
                </div>
              </div>

              <div style={{
                flex: 1, minWidth: 0, fontSize: '13px', color: '#334155',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {inq.requirement || inq.message || 'No requirement specified'}
              </div>

              {inq.budget && (
                <div style={{
                  fontSize: '12px', color: '#475569', padding: '4px 10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '99px', flexShrink: 0,
                }}>
                  {inq.budget}
                </div>
              )}

              <div style={{ fontSize: '12px', color: '#334155', flexShrink: 0 }}>
                {new Date(inq.createdAt).toLocaleDateString('en-IN')}
              </div>

              <span style={{
                fontSize: '11px', fontWeight: 700, padding: '5px 14px',
                borderRadius: '99px', flexShrink: 0,
                background: st.bg, border: '1px solid ' + st.border,
                color: st.color,
              }}>
                {inq.status}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* ===== DETAIL MODAL ===== */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={function () { setSelected(null) }}
            style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(3,7,18,0.88)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0 }}
              onClick={function (e) { e.stopPropagation() }}
              style={{
                background: '#07101f',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '24px', width: '100%', maxWidth: '680px',
                maxHeight: '88vh', overflowY: 'auto',
              }}
            >
              {/* Modal header */}
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 32px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', fontWeight: 800, color: 'white', flexShrink: 0,
                  }}>
                    {selected.name ? selected.name[0].toUpperCase() : '?'}
                  </div>
                  <div>
                    <h2 style={{
                      fontSize: '18px', fontWeight: 800,
                      color: 'white', marginBottom: '4px',
                    }}>
                      {selected.name}
                    </h2>
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      gap: '6px', fontSize: '13px', color: '#475569',
                    }}>
                      <FiCalendar size={12} />
                      {new Date(selected.createdAt).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={function () { setSelected(null) }}
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

              {/* Body */}
              <div style={{ padding: '28px 32px' }}>

                {/* Info grid */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  gap: '12px', marginBottom: '24px',
                }}>
                  {[
                    { icon: FiMail, label: 'Email', val: selected.email, color: '#38bdf8' },
                    { icon: FiPhone, label: 'Phone', val: selected.phone || 'Not provided', color: '#818cf8' },
                    { icon: FiDollarSign, label: 'Budget', val: selected.budget || 'Not specified', color: '#34d399' },
                    { icon: FiUser, label: 'Requirement', val: selected.requirement || 'Not specified', color: '#fb923c' },
                  ].map(function (item) {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: '12px',
                          padding: '16px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: '14px',
                        }}
                      >
                        <div style={{
                          width: '36px', height: '36px', borderRadius: '10px',
                          background: item.color + '15',
                          border: '1px solid ' + item.color + '25',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', color: item.color, flexShrink: 0,
                        }}>
                          <Icon size={15} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{
                            fontSize: '11px', fontWeight: 600, color: '#334155',
                            letterSpacing: '1px', textTransform: 'uppercase',
                            marginBottom: '4px',
                          }}>
                            {item.label}
                          </div>
                          <div style={{
                            fontSize: '14px', color: '#e2e8f0',
                            fontWeight: 500, wordBreak: 'break-all',
                          }}>
                            {item.val}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Message */}
                {selected.message && (
                  <div style={{
                    padding: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '14px', marginBottom: '24px',
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      fontSize: '11px', fontWeight: 600, color: '#334155',
                      letterSpacing: '1px', textTransform: 'uppercase',
                      marginBottom: '10px',
                    }}>
                      <FiMessageSquare size={12} /> Message
                    </div>
                    <p style={{
                      fontSize: '14px', color: '#94a3b8',
                      lineHeight: 1.75, margin: 0,
                    }}>
                      {selected.message}
                    </p>
                  </div>
                )}

                {/* Status update */}
                <div style={{
                  padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px', marginBottom: '16px',
                }}>
                  <div style={{
                    fontSize: '11px', fontWeight: 600, color: '#334155',
                    letterSpacing: '1px', textTransform: 'uppercase',
                    marginBottom: '14px',
                  }}>
                    Select Status
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['NEW', 'IN-PROGRESS', 'CLOSED'].map(function (s) {
                      const st = STATUS_STYLES[s]
                      const active = localStatus === s // Compares with the un-saved temporary state
                      return (
                        <button
                          key={s}
                          onClick={function () { setLocalStatus(s) }} // Only changes local hook state, does not trigger API
                          disabled={saving}
                          style={{
                            flex: 1, padding: '10px',
                            borderRadius: '10px', border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px', fontWeight: 700,
                            transition: 'all 0.2s ease',
                            background: active ? st.bg : 'rgba(255,255,255,0.04)',
                            color: active ? st.color : '#475569',
                            borderStyle: 'solid',
                            borderWidth: '1px',
                            borderColor: active ? st.border : 'rgba(255,255,255,0.08)',
                          }}
                          onMouseEnter={function (e) {
                            if (!active) {
                              e.currentTarget.style.background = st.bg
                              e.currentTarget.style.color = st.color
                              e.currentTarget.style.borderColor = st.border
                            }
                          }}
                          onMouseLeave={function (e) {
                            if (!active) {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                              e.currentTarget.style.color = '#475569'
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                            }
                          }}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Notes */}
                <div style={{
                  padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                }}>
                  <div style={{
                    fontSize: '11px', fontWeight: 600, color: '#334155',
                    letterSpacing: '1px', textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}>
                    Admin Notes
                  </div>
                  <textarea
                    value={notes}
                    onChange={function (e) { setNotes(e.target.value) }}
                    rows={4}
                    placeholder="Add internal notes about this inquiry..."
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '10px', padding: '12px 16px',
                      color: '#f1f5f9', fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none', resize: 'none',
                      boxSizing: 'border-box', marginBottom: '16px',
                      transition: 'all 0.2s ease',
                    }}
                    onFocus={function (e) {
                      e.target.style.borderColor = 'rgba(14,165,233,0.45)'
                      e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.08)'
                    }}
                    onBlur={function (e) {
                      e.target.style.borderColor = 'rgba(255,255,255,0.09)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                  <button
                    onClick={function () { handleSaveChanges(selected.id) }}
                    disabled={saving}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '11px 22px',
                      background: saving
                        ? 'rgba(14,165,233,0.4)'
                        : 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                      border: 'none', borderRadius: '10px',
                      color: 'white', fontSize: '14px', fontWeight: 600,
                      cursor: saving ? 'not-allowed' : 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      boxShadow: '0 4px 16px rgba(14,165,233,0.25)',
                      transition: 'all 0.2s ease',
                      width: '100%',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={function (e) {
                      if (!saving) {
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(14,165,233,0.4)'
                      }
                    }}
                    onMouseLeave={function (e) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(14,165,233,0.25)'
                    }}
                  >
                    <FiSave size={15} />
                    {saving ? 'Saving changes...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}