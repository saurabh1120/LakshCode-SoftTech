import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import { toast } from 'react-toastify'
import API from '../../api/axios'
import { useAdminSuccess } from '../../hooks/useAdminSuccess'
import { imgUrl } from '../../api/imageUrl'

const empty = { title: '', content: '', excerpt: '', published: false }

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

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)
  const { success, successMsg, showSuccess } = useAdminSuccess()

  function fetchBlogs() {
    API.get('/blogs/all').then(function (r) { setBlogs(r.data.data) })
  }

  useEffect(function () { fetchBlogs() }, [])

  function openAdd() {
    setForm(empty); setEditId(null); setThumbnail(null); setShowModal(true)
  }

  function openEdit(b) {
    setForm({
      title: b.title || '', content: b.content || '',
      excerpt: b.excerpt || '', published: b.published,
    })
    setEditId(b.id); setThumbnail(null); setShowModal(true)
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
      fd.append('title', form.title)
      fd.append('content', form.content)
      fd.append('excerpt', form.excerpt)
      fd.append('published', form.published)
      if (thumbnail) fd.append('thumbnail', thumbnail)

      if (editId) {
        await API.put('/blogs/' + editId, fd)
        showSuccess('Blog updated successfully!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchBlogs,
        })
      } else {
        await API.post('/blogs', fd)
        showSuccess('Blog created successfully!', {
          closeModal: function () { setShowModal(false) },
          onDone: fetchBlogs,
        })
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggle(id) {
    try {
      await API.patch('/blogs/' + id + '/toggle')
      showSuccess('Publish status updated!', { onDone: fetchBlogs })
    } catch {
      toast.error('Toggle failed')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this blog?')) return
    try {
      await API.delete('/blogs/' + id)
      showSuccess('Blog deleted!', { onDone: fetchBlogs })
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
            Manage Blogs
          </h1>
          <p style={{ fontSize: '14px', color: '#475569' }}>Write and publish blog posts</p>
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
          <FiPlus size={17} /> Add Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 40px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px dashed rgba(255,255,255,0.1)',
          borderRadius: '20px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            No blog posts yet
          </p>
          <p style={{ fontSize: '14px', color: '#1e3a5f', marginBottom: '24px' }}>
            Share your knowledge — create your first blog post
          </p>
          <button
            onClick={openAdd}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px',
              background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
              color: 'white', fontWeight: 700, fontSize: '14px',
              borderRadius: '12px', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <FiPlus size={16} /> Create First Blog
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {blogs.map(function (b, i) {
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '18px',
                  padding: '18px 20px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '16px', transition: 'all 0.2s ease',
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div style={{
                  width: '80px', height: '60px', flexShrink: 0,
                  borderRadius: '12px', overflow: 'hidden',
                  background: 'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))',
                }}>
                  {b.thumbnailUrl && (
                    <img src={imgUrl(b.imageUrl)} alt={b.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontSize: '15px', fontWeight: 700, color: '#f1f5f9',
                    marginBottom: '4px',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {b.title}
                  </h3>
                  <p style={{
                    fontSize: '13px', color: '#475569',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', marginBottom: '8px',
                  }}>
                    {b.excerpt || 'No excerpt added'}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: 700, padding: '3px 10px',
                      borderRadius: '99px',
                      background: b.published ? 'rgba(52,211,153,0.12)' : 'rgba(234,179,8,0.12)',
                      border: b.published ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(234,179,8,0.25)',
                      color: b.published ? '#34d399' : '#facc15',
                    }}>
                      {b.published ? '● Published' : '○ Draft'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#334155' }}>
                      {new Date(b.createdAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={function () { handleToggle(b.id) }}
                    title={b.published ? 'Unpublish' : 'Publish'}
                    style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: b.published ? 'rgba(234,179,8,0.1)' : 'rgba(52,211,153,0.1)',
                      border: b.published ? '1px solid rgba(234,179,8,0.2)' : '1px solid rgba(52,211,153,0.2)',
                      color: b.published ? '#facc15' : '#34d399',
                      cursor: 'pointer', transition: 'all 0.18s ease',
                    }}
                    onMouseEnter={function (e) { e.currentTarget.style.transform = 'scale(1.08)' }}
                    onMouseLeave={function (e) { e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {b.published ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                  <button
                    onClick={function () { openEdit(b) }}
                    style={{
                      width: '38px', height: '38px', borderRadius: '10px',
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
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={function () { handleDelete(b.id) }}
                    style={{
                      width: '38px', height: '38px', borderRadius: '10px',
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
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

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
                    {editId ? 'Edit Blog Post' : 'Create New Blog'}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#475569' }}>
                    {editId ? 'Update blog content' : 'Write and publish a new article'}
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
                <div>
                  <label style={S.label}>Blog Title *</label>
                  <input
                    name="title" value={form.title} onChange={handleChange}
                    onFocus={focusInput} onBlur={blurInput} required
                    placeholder="e.g. How to Build REST APIs with Spring Boot"
                    style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Excerpt</label>
                  <input
                    name="excerpt" value={form.excerpt}
                    onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                    placeholder="Brief summary shown on blog listing..."
                    style={S.input}
                  />
                </div>
                <div>
                  <label style={S.label}>Content</label>
                  <textarea
                    name="content" value={form.content}
                    onChange={handleChange} onFocus={focusInput} onBlur={blurInput}
                    rows={8}
                    placeholder="Write your full blog content. HTML is supported..."
                    style={{ ...S.input, resize: 'vertical', minHeight: '160px' }}
                  />
                </div>
                <div>
                  <label style={S.label}>Thumbnail Image</label>
                  <input
                    type="file" accept="image/*"
                    onChange={function (e) { setThumbnail(e.target.files[0]) }}
                    style={{ ...S.input, color: '#64748b', cursor: 'pointer' }}
                  />
                  {thumbnail && (
                    <p style={{ fontSize: '12px', color: '#38bdf8', marginTop: '6px' }}>
                      Selected: {thumbnail.name}
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
                    type="checkbox" name="published" id="blog-pub"
                    checked={form.published} onChange={handleChange}
                    style={{ width: '16px', height: '16px', accentColor: '#0ea5e9', cursor: 'pointer' }}
                  />
                  <label htmlFor="blog-pub" style={{
                    fontSize: '14px', fontWeight: 500, color: '#94a3b8', cursor: 'pointer',
                  }}>
                    Publish immediately (visible on public site)
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
                    {loading ? 'Saving...' : editId ? 'Update Blog' : 'Create Blog'}
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