import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiExternalLink } from 'react-icons/fi'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import { useAdminSuccess } from '../../hooks/useAdminSuccess'
import { imgUrl } from '../../api/imageUrl'

const empty = {
  title: '', description: '', techStack: '',
  features: '', liveLink: '', displayOrder: 0, active: true,
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

export default function ManageProjects() {
  const [projects, setProjects] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { success, successMsg, showSuccess } = useAdminSuccess()

  function fetchProjects() {
    API.get('/projects/all').then(function (r) { setProjects(r.data.data) })
  }

  useEffect(function () { fetchProjects() }, [])

  function openAdd() {
    setForm(empty); setEditId(null); setImage(null); setShowModal(true)
  }

  function openEdit(p) {
    setForm({
      title: p.title || '', description: p.description || '',
      techStack: p.techStack || '', features: p.features || '',
      liveLink: p.liveLink || '', displayOrder: p.displayOrder || 0,
      active: p.active,
    })
    setEditId(p.id); setImage(null); setShowModal(true)
  }

  function handleChange(e) {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm(function (prev) { return Object.assign({}, prev, { [e.target.name]: val }) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const fd = new FormData()
      Object.keys(form).forEach(function (k) { fd.append(k, form[k]) })
      if (image) fd.append('image', image)

      if (editId) {
        await API.put('/projects/' + editId, fd)
        showSuccess('Project updated successfully!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchProjects,
        })
      } else {
        await API.post('/projects', fd)
        showSuccess('Project created successfully!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchProjects,
        })
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this project?')) return
    try {
      await API.delete('/projects/' + id)
      showSuccess('Project deleted!', { onDone: fetchProjects })
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div>
      <SuccessOverlay show={success} message={successMsg} />

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
            Manage Projects
          </h1>
          <p style={{ fontSize: '14px', color: '#475569' }}>Showcase your best work</p>
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
          <FiPlus size={17} /> Add Project
        </button>
      </div>

      {/* Empty */}
      {projects.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '80px 40px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.1)',
          borderRadius: '20px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            No projects yet
          </p>
          <p style={{ fontSize: '14px', color: '#1e3a5f' }}>
            Click "Add Project" to showcase your first project
          </p>
        </div>
      )}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
        {projects.map(function (p, i) {
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px', overflow: 'hidden',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                height: '160px',
                background: 'linear-gradient(135deg,rgba(14,165,233,0.12),rgba(99,102,241,0.12))',
                position: 'relative', overflow: 'hidden',
              }}>
                {p.imageUrl
                  ? <img src={imgUrl(p.imageUrl)} alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '52px', fontWeight: 900, color: 'rgba(56,189,248,0.15)',
                  }}>
                    {p.title ? p.title[0].toUpperCase() : '?'}
                  </div>
                }
                <span style={{
                  position: 'absolute', top: '10px', right: '10px',
                  fontSize: '11px', fontWeight: 700, padding: '3px 10px',
                  borderRadius: '99px',
                  background: p.active ? 'rgba(52,211,153,0.85)' : 'rgba(239,68,68,0.85)',
                  color: 'white',
                }}>
                  {p.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '15px', fontWeight: 700,
                  color: '#f1f5f9', marginBottom: '6px',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: '13px', color: '#475569',
                  lineHeight: 1.6, marginBottom: '12px',
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {p.description || 'No description'}
                </p>

                {p.techStack && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
                    {p.techStack.split(',').slice(0, 3).map(function (t) {
                      return (
                        <span key={t} style={{
                          padding: '3px 9px',
                          background: 'rgba(14,165,233,0.08)',
                          border: '1px solid rgba(14,165,233,0.15)',
                          color: '#7dd3fc', fontSize: '11px',
                          fontWeight: 500, borderRadius: '99px',
                        }}>
                          {t.trim()}
                        </span>
                      )
                    })}
                  </div>
                )}

                {p.liveLink && (
                  <a href={p.liveLink} target="_blank" rel="noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      fontSize: '12px', color: '#38bdf8',
                      marginBottom: '14px', textDecoration: 'none',
                    }}>
                    <FiExternalLink size={12} /> View Live
                  </a>
                )}

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={function () { openEdit(p) }}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '6px',
                      padding: '9px 12px', borderRadius: '10px',
                      background: 'rgba(14,165,233,0.08)',
                      border: '1px solid rgba(14,165,233,0.18)',
                      color: '#38bdf8', fontSize: '13px', fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={function (e) { e.currentTarget.style.background = 'rgba(14,165,233,0.16)' }}
                    onMouseLeave={function (e) { e.currentTarget.style.background = 'rgba(14,165,233,0.08)' }}
                  >
                    <FiEdit2 size={13} /> Edit
                  </button>
                  <button
                    onClick={function () { handleDelete(p.id) }}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: '6px',
                      padding: '9px 12px', borderRadius: '10px',
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.18)',
                      color: '#f87171', fontSize: '13px', fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={function (e) { e.currentTarget.style.background = 'rgba(239,68,68,0.16)' }}
                    onMouseLeave={function (e) { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
                  >
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
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
                width: '100%', maxWidth: '620px',
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
                    {editId ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#475569' }}>
                    {editId ? 'Update project details' : 'Fill in the project information'}
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

              <form onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={S.label}>Project Title *</label>
                  <input
                    name="title" value={form.title} onChange={handleChange}
                    onFocus={focusInput} onBlur={blurInput} required
                    placeholder="e.g. E-Commerce Platform" style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Description</label>
                  <textarea
                    name="description" value={form.description}
                    onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                    rows={3} placeholder="What this project does..."
                    style={{ ...S.input, resize: 'none' }}
                  />
                </div>
                <div>
                  <label style={S.label}>Tech Stack (comma separated)</label>
                  <input
                    name="techStack" value={form.techStack}
                    onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                    placeholder="React, Spring Boot, MySQL" style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Features (one per line)</label>
                  <textarea
                    name="features" value={form.features}
                    onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                    rows={4}
                    placeholder={'User authentication\nDashboard\nPayment integration'}
                    style={{ ...S.input, resize: 'none' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={S.label}>Live Link</label>
                    <input
                      name="liveLink" value={form.liveLink}
                      onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                      placeholder="https://yourproject.com" style={S.input}
                    />
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
                <div>
                  <label style={S.label}>Project Image</label>
                  <input
                    type="file" accept="image/*"
                    onChange={function (e) { setImage(e.target.files[0]) }}
                    style={{ ...S.input, color: '#64748b', cursor: 'pointer' }}
                  />
                  {image && (
                    <p style={{ fontSize: '12px', color: '#38bdf8', marginTop: '6px' }}>
                      Selected: {image.name}
                    </p>
                  )}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '12px',
                }}>
                  <input
                    type="checkbox" name="active" id="proj-active"
                    checked={form.active} onChange={handleChange}
                    style={{ width: '16px', height: '16px', accentColor: '#0ea5e9', cursor: 'pointer' }}
                  />
                  <label htmlFor="proj-active" style={{
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
                    {loading ? 'Saving...' : editId ? 'Update Project' : 'Create Project'}
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