import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import API from '../api/axios'

const BLOGS_PER_PAGE = 3

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    API.get('/blogs')
      .then((r) => {
        setBlogs(r.data.data || [])
        setLoading(false)
      })
      .catch(() => { setLoading(false) })
  }, [])

  const totalPages = Math.ceil(blogs.length / BLOGS_PER_PAGE)
  const currentBlogs = blogs.slice(
    page * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE + BLOGS_PER_PAGE
  )

  const goNext = () => {
    if (page < totalPages - 1) {
      setDirection(1)
      setPage((p) => p + 1)
    }
  }

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1)
      setPage((p) => p - 1)
    }
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  if (!loading && blogs.length === 0) return null

  return (
    <section
      id="blog"
      style={{
        padding: '120px 0',
        background: '#030712',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', bottom: '-200px', left: '50%',
        transform: 'translateX(-50%)',
        width: '800px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(99,102,241,0.05) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 40px',
        boxSizing: 'border-box',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', marginBottom: '20px',
            background: 'rgba(52,211,153,0.08)',
            border: '1px solid rgba(52,211,153,0.2)',
            borderRadius: '99px', fontSize: '12px',
            fontWeight: 700, color: '#34d399',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Blog
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: '#f8fafc', lineHeight: 1.1, marginBottom: '16px',
          }}>
            Latest{' '}
            <span style={{
              background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Insights
            </span>
          </h2>
          <p style={{
            fontSize: '17px', color: '#475569',
            maxWidth: '480px', margin: '0 auto', lineHeight: 1.75,
          }}>
            Thoughts, tutorials and insights from the LakshCode team.
          </p>
        </motion.div>

        {/* Skeleton loading */}
        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '24px',
            width: '100%',
          }}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.03)',
                  height: '340px',
                  animation: 'pulse 2s infinite',
                }}
              />
            ))}
          </div>
        )}

        {/* Blog grid with animation */}
        {!loading && blogs.length > 0 && (
          <>
            <div style={{ position: 'relative', minHeight: '400px' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '24px',
                    width: '100%',
                  }}
                >
                  {currentBlogs.map((b) => (
                    <motion.div
                      key={b.id}
                      onClick={() => { navigate('/blog/' + b.id) }}
                      style={{
                        background: 'rgba(255,255,255,0.025)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.35s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)'
                        e.currentTarget.style.borderColor = 'rgba(52,211,153,0.3)'
                        e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        height: '200px',
                        background: 'linear-gradient(135deg,rgba(52,211,153,0.12),rgba(14,165,233,0.12))',
                        position: 'relative',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}>
                        {b.thumbnailUrl ? (
                          <img
                            src={'http://localhost:8080' + b.thumbnailUrl}
                            alt={b.title}
                            style={{
                              width: '100%', height: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%', height: '100%',
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '40px', fontWeight: 900,
                            color: 'rgba(52,211,153,0.2)',
                          }}>
                            {b.title ? b.title[0].toUpperCase() : 'B'}
                          </div>
                        )}

                        <div style={{
                          position: 'absolute', bottom: '12px', left: '12px',
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '5px 12px',
                          background: 'rgba(3,7,18,0.75)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '99px',
                          fontSize: '11px', color: '#94a3b8', fontWeight: 500,
                        }}>
                          <FiCalendar size={11} />
                          {new Date(b.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '24px 26px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <h3 style={{
                          fontSize: '17px', fontWeight: 700,
                          color: '#f1f5f9', marginBottom: '10px',
                          lineHeight: 1.35, display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {b.title}
                        </h3>
                        <p style={{
                          fontSize: '14px', color: '#475569',
                          lineHeight: 1.7, marginBottom: '20px',
                          flex: 1, display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {b.excerpt || 'Click to read the full article...'}
                        </p>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          fontSize: '14px', fontWeight: 600, color: '#34d399',
                          paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}>
                          Read More <FiArrowRight size={15} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Fill empty slots */}
                  {currentBlogs.length < BLOGS_PER_PAGE && (
                    [...Array(BLOGS_PER_PAGE - currentBlogs.length)].map((_, i) => (
                      <div key={'empty-' + i} />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '16px', marginTop: '48px',
              }}>
                <button
                  onClick={goPrev}
                  disabled={page === 0}
                  style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: page === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: page === 0 ? '#1e3a5f' : '#94a3b8',
                    cursor: page === 0 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FiChevronLeft size={20} />
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                      style={{
                        width: i === page ? '28px' : '8px', height: '8px',
                        borderRadius: '99px', border: 'none', cursor: 'pointer',
                        background: i === page ? 'linear-gradient(135deg,#34d399,#0ea5e9)' : 'rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  disabled={page === totalPages - 1}
                  style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: page === totalPages - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: page === totalPages - 1 ? '#1e3a5f' : '#94a3b8',
                    cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
