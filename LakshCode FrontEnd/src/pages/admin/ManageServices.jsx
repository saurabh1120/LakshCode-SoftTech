import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiLayers, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import { useAdminSuccess } from '../../hooks/useAdminSuccess'

const empty = { title: '', description: '', icon: 'FaCode', displayOrder: 0, active: true }

const iconOptions = [
  'FaGlobe', 'FaMobile', 'FaCloud', 'FaBriefcase',
  'FaPencilRuler', 'FaCode', 'FaServer', 'FaShieldAlt', 'FaRocket', 'FaDatabase',
]

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

const colorMap = [
  '#38bdf8', '#818cf8', '#34d399', '#fb923c',
  '#f472b6', '#a78bfa', '#facc15', '#60a5fa',
]

export default function ManageServices() {
  const [services, setServices] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  // const [success, setSuccess] = useState(false)
  // const [successMsg, setSuccessMsg] = useState('')
  const { success, successMsg, showSuccess } = useAdminSuccess()

  function fetchServices() {
    API.get('/services/all').then(function (r) { setServices(r.data.data) })
  }

  useEffect(function () { fetchServices() }, [])

  function openAdd() { setForm(empty); setEditId(null); setShowModal(true) }

  function openEdit(svc) {
    setForm({
      title: svc.title || '', description: svc.description || '',
      icon: svc.icon || 'FaCode', displayOrder: svc.displayOrder || 0,
      active: svc.active,
    })
    setEditId(svc.id)
    setShowModal(true)
  }

  function handleChange(e) {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(function (prev) { return Object.assign({}, prev, { [e.target.name]: val }) })
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

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (editId) {
        await API.put('/services/' + editId, form)
        showSuccess('Service updated!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchServices,
        })
      } else {
        await API.post('/services', form)
        showSuccess('Service created!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchServices,
        })
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this service?')) return
    try {
      await API.delete('/services/' + id)
      showSuccess('Service deleted!', {
        onDone: fetchServices,
      })
    } catch {
      toast.error('Delete failed')
    }
  }
  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     if (editId) {
  //       await API.put('/services/' + editId, form)
  //       setSuccessMsg('Service updated successfully!')
  //     } else {
  //       await API.post('/services', form)
  //       setSuccessMsg('Service created successfully!')
  //     }
  //     setSuccess(true)
  //     setTimeout(function () {
  //       setSuccess(false)
  //       setShowModal(false)
  //       fetchServices()
  //     }, 1400)
  //   } catch {
  //     toast.error('Something went wrong')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // async function handleDelete(id) {
  //   if (!window.confirm('Delete this service?')) return
  //   try {
  //     await API.delete('/services/' + id)
  //     setSuccessMsg('Service deleted!')
  //     setSuccess(true)
  //     setTimeout(function () { setSuccess(false); fetchServices() }, 1200)
  //   } catch {
  //     toast.error('Delete failed')
  //   }
  // }

  return (
    <div>
      {/* Success overlay */}
      <AnimatePresence>
        {success && (
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
                borderRadius: '28px',
                padding: '52px 64px',
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
                {successMsg}
              </h3>
              <p style={{ fontSize: '14px', color: '#475569' }}>
                Changes saved successfully
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '36px',
      }}>
        <div>
          <h1 style={{
            fontSize: '28px', fontWeight: 800, color: 'white',
            letterSpacing: '-0.5px', marginBottom: '6px',
          }}>
            Manage Services
          </h1>
          <p style={{ fontSize: '14px', color: '#475569' }}>
            Add and manage your service offerings
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
          <FiPlus size={17} /> Add Service
        </button>
      </div>

      {/* Empty state */}
      {services.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '80px 40px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.1)',
          borderRadius: '20px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            No services yet
          </p>
          <p style={{ fontSize: '14px', color: '#1e3a5f' }}>
            Click "Add Service" to add your first service
          </p>
        </div>
      )}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
        {services.map(function (svc, i) {
          const color = colorMap[i % colorMap.length]
          return (
            <motion.div
              key={svc.id}
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
                e.currentTarget.style.borderColor = color + '30'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '80px', height: '80px',
                background: 'radial-gradient(circle at top right,' + color + '12,transparent)',
                borderRadius: '0 20px 0 0', pointerEvents: 'none',
              }} />

              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: color + '18', border: '1px solid ' + color + '35',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 800, color: color, flexShrink: 0,
                  }}>
                    {svc.displayOrder}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '15px', fontWeight: 700,
                      color: '#f1f5f9', lineHeight: 1.3, marginBottom: '4px',
                    }}>
                      {svc.title}
                    </div>
                    <span style={{
                      display: 'inline-flex', padding: '2px 9px',
                      borderRadius: '99px', fontSize: '11px', fontWeight: 600,
                      background: svc.active ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)',
                      border: svc.active ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(239,68,68,0.25)',
                      color: svc.active ? '#34d399' : '#f87171',
                    }}>
                      {svc.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={function () { openEdit(svc) }}
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
                    onClick={function () { handleDelete(svc.id) }}
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

              <p style={{
                fontSize: '13px', color: '#475569',
                lineHeight: 1.65, marginBottom: '14px',
              }}>
                {svc.description || 'No description'}
              </p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '4px 10px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '99px', fontSize: '11px', color: '#334155',
              }}>
                <FiLayers size={11} /> {svc.icon}
              </div>
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
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
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
                    {editId ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#475569' }}>
                    {editId ? 'Update service details' : 'Fill in the service information'}
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
                  <FiX />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={S.label}>Service Title *</label>
                  <input
                    name="title" value={form.title} onChange={handleChange}
                    onFocus={focusInput} onBlur={blurInput} required
                    placeholder="e.g. Web Application Development"
                    style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Description</label>
                  <textarea
                    name="description" value={form.description}
                    onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                    rows={3} placeholder="Brief description of this service..."
                    style={{ ...S.input, resize: 'none' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={S.label}>Icon</label>
                    <select
                      name="icon" value={form.icon} onChange={handleChange}
                      style={{ ...S.input, background: '#070f1e', cursor: 'pointer' }}
                    >
                      {iconOptions.map(function (ic) {
                        return <option key={ic} value={ic}>{ic}</option>
                      })}
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>Display Order</label>
                    <input
                      name="displayOrder" type="number" value={form.displayOrder}
                      onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                      style={S.input}
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
                    type="checkbox" name="active" id="svc-active"
                    checked={form.active} onChange={handleChange}
                    style={{ width: '16px', height: '16px', accentColor: '#0ea5e9', cursor: 'pointer' }}
                  />
                  <label htmlFor="svc-active" style={{
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
                      background: loading ? 'rgba(14,165,233,0.4)' : 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                      border: 'none', borderRadius: '12px',
                      color: 'white', fontSize: '14px', fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      boxShadow: '0 4px 16px rgba(14,165,233,0.3)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {loading ? 'Saving...' : editId ? 'Update Service' : 'Create Service'}
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