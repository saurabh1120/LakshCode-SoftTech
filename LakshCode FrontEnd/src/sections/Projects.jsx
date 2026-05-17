import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import API from '../api/axios'
import { imgUrl } from '../api/imageUrl'

const PROJECTS_PER_PAGE = 3

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(function () {
    API.get('/projects')
      .then(function (r) { setProjects(r.data.data); setLoading(false) })
      .catch(function () { setLoading(false) })
  }, [])

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const currentProjects = projects.slice(
    page * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE
  )

  function goNext() {
    if (page < totalPages - 1) {
      setDirection(1)
      setPage(function (p) { return p + 1 })
    }
  }

  function goPrev() {
    if (page > 0) {
      setDirection(-1)
      setPage(function (p) { return p - 1 })
    }
  }

  function goToPage(i) {
    setDirection(i > page ? 1 : -1)
    setPage(i)
  }

  const slideVariants = {
    enter: function (dir) {
      return { x: dir > 0 ? 80 : -80, opacity: 0 }
    },
    center: { x: 0, opacity: 1 },
    exit: function (dir) {
      return { x: dir > 0 ? -80 : 80, opacity: 0 }
    },
  }

  return (
    <section
      id="projects"
      style={{
        padding: '120px 0',
        background: '#030712',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '900px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(14,165,233,0.05) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '1200px',
        margin: '0 auto', padding: '0 40px',
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
            background: 'rgba(14,165,233,0.08)',
            border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: '99px', fontSize: '12px',
            fontWeight: 700, color: '#38bdf8',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Our Work
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: '#f8fafc', lineHeight: 1.1, marginBottom: '16px',
          }}>
            Featured{' '}
            <span style={{
              background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Projects
            </span>
          </h2>
          <p style={{
            fontSize: '17px', color: '#475569',
            maxWidth: '480px', margin: '0 auto', lineHeight: 1.75,
          }}>
            A selection of our recent work delivered for clients across industries.
          </p>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px',
          }}>
            {[...Array(3)].map(function (_, i) {
              return (
                <div key={i} style={{
                  height: '340px', borderRadius: '24px',
                  background: 'rgba(255,255,255,0.03)',
                }} />
              )
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && projects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#334155' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
            <p style={{ fontSize: '16px', fontWeight: 600 }}>Projects coming soon...</p>
          </div>
        )}

        {/* Projects grid with animation */}
        {!loading && projects.length > 0 && (
          <>
            {/* Grid area — fixed min height to avoid layout shift */}
            <div style={{ position: 'relative', minHeight: '380px' }}>
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
                  {currentProjects.map(function (p, i) {
                    return (
                      <div
                        key={p.id}
                        onClick={function () { setSelected(p) }}
                        style={{
                          background: 'rgba(255,255,255,0.025)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          borderRadius: '24px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.35s ease',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        onMouseEnter={function (e) {
                          e.currentTarget.style.transform = 'translateY(-8px)'
                          e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'
                          e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4)'
                        }}
                        onMouseLeave={function (e) {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        {/* Image */}
                        <div style={{
                          height: '200px',
                          background: 'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))',
                          position: 'relative', overflow: 'hidden', flexShrink: 0,
                        }}>
                          {p.imageUrl ? (
                            <img
                              // src={'http://localhost:8080' + p.imageUrl}
                              src={imgUrl(p.imageUrl)}
                              alt={p.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{
                              width: '100%', height: '100%',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: '64px', fontWeight: 900,
                              color: 'rgba(56,189,248,0.15)',
                            }}>
                              {p.title ? p.title[0].toUpperCase() : '?'}
                            </div>
                          )}

                          {/* Page badge */}
                          <div style={{
                            position: 'absolute', bottom: '12px', left: '12px',
                            padding: '4px 10px',
                            background: 'rgba(3,7,18,0.75)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: '99px',
                            fontSize: '11px', color: '#94a3b8', fontWeight: 500,
                          }}>
                            {page * PROJECTS_PER_PAGE + i + 1} / {projects.length}
                          </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{
                            fontSize: '17px', fontWeight: 700,
                            color: '#f1f5f9', marginBottom: '10px', lineHeight: 1.3,
                          }}>
                            {p.title}
                          </h3>
                          <p style={{
                            fontSize: '13px', color: '#475569',
                            lineHeight: 1.65, marginBottom: '16px', flex: 1,
                            display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical', overflow: 'hidden',
                          }}>
                            {p.description}
                          </p>

                          {p.techStack && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                              {p.techStack.split(',').slice(0, 4).map(function (t) {
                                return (
                                  <span key={t} style={{
                                    padding: '3px 10px',
                                    background: 'rgba(14,165,233,0.08)',
                                    border: '1px solid rgba(14,165,233,0.18)',
                                    color: '#7dd3fc', fontSize: '11px',
                                    fontWeight: 500, borderRadius: '99px',
                                  }}>
                                    {t.trim()}
                                  </span>
                                )
                              })}
                            </div>
                          )}

                          <div style={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', marginTop: 'auto',
                          }}>
                            <span style={{
                              fontSize: '13px', color: '#38bdf8', fontWeight: 600,
                            }}>
                              View Details →
                            </span>
                            {p.liveLink && (
                              <a
                                href={p.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={function (e) { e.stopPropagation() }}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '4px',
                                  fontSize: '12px', color: '#475569',
                                  textDecoration: 'none',
                                  transition: 'color 0.2s',
                                }}
                                onMouseEnter={function (e) { e.currentTarget.style.color = '#38bdf8' }}
                                onMouseLeave={function (e) { e.currentTarget.style.color = '#475569' }}
                              >
                                <FiExternalLink size={13} /> Live
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Fill empty slots on last page */}
                  {currentProjects.length < PROJECTS_PER_PAGE && (
                    [...Array(PROJECTS_PER_PAGE - currentProjects.length)].map(function (_, i) {
                      return <div key={'empty-' + i} />
                    })
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '16px',
                marginTop: '48px',
              }}>

                {/* Prev */}
                <button
                  onClick={goPrev}
                  disabled={page === 0}
                  style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: page === 0
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: page === 0 ? '#1e3a5f' : '#94a3b8',
                    cursor: page === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '20px', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={function (e) {
                    if (page !== 0) {
                      e.currentTarget.style.background = 'rgba(14,165,233,0.15)'
                      e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'
                      e.currentTarget.style.color = '#38bdf8'
                    }
                  }}
                  onMouseLeave={function (e) {
                    if (page !== 0) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.color = '#94a3b8'
                    }
                  }}
                >
                  <FiChevronLeft />
                </button>

                {/* Page info + dots */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                  {/* Project range text */}
                  <span style={{
                    fontSize: '13px', color: '#334155', fontWeight: 500,
                  }}>
                    {page * PROJECTS_PER_PAGE + 1}–{Math.min(
                      (page + 1) * PROJECTS_PER_PAGE,
                      projects.length
                    )} of {projects.length} projects
                  </span>

                  {/* Dot indicators */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {[...Array(totalPages)].map(function (_, i) {
                      return (
                        <button
                          key={i}
                          onClick={function () { goToPage(i) }}
                          style={{
                            width: i === page ? '28px' : '8px',
                            height: '8px',
                            borderRadius: '99px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            background: i === page
                              ? 'linear-gradient(135deg,#0ea5e9,#6366f1)'
                              : 'rgba(255,255,255,0.15)',
                          }}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Next */}
                <button
                  onClick={goNext}
                  disabled={page === totalPages - 1}
                  style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: page === totalPages - 1
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: page === totalPages - 1 ? '#1e3a5f' : '#94a3b8',
                    cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '20px', transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={function (e) {
                    if (page !== totalPages - 1) {
                      e.currentTarget.style.background = 'rgba(14,165,233,0.15)'
                      e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'
                      e.currentTarget.style.color = '#38bdf8'
                    }
                  }}
                  onMouseLeave={function (e) {
                    if (page !== totalPages - 1) {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                      e.currentTarget.style.color = '#94a3b8'
                    }
                  }}
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ===== PROJECT DETAIL MODAL ===== */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={function () { setSelected(null) }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(3,7,18,0.92)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', padding: '24px',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={function (e) { e.stopPropagation() }}
              style={{
                background: '#0a1628',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '28px',
                width: '100%', maxWidth: '680px',
                maxHeight: '88vh',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Image */}
              {selected.imageUrl && (
                <div style={{ height: '260px', flexShrink: 0, overflow: 'hidden' }}>
                  <img
                    // src={'http://localhost:8080' + selected.imageUrl}
                    src={imgUrl(selected.imageUrl)}
                    alt={selected.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Content */}
              <div style={{ padding: '36px', overflowY: 'auto', flex: 1 }}>
                <div style={{
                  display: 'flex', alignItems: 'flex-start',
                  justifyContent: 'space-between', gap: '16px', marginBottom: '16px',
                }}>
                  <h3 style={{
                    fontSize: '24px', fontWeight: 800,
                    color: 'white', letterSpacing: '-0.5px',
                  }}>
                    {selected.title}
                  </h3>
                  <button
                    onClick={function () { setSelected(null) }}
                    style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#94a3b8',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', cursor: 'pointer',
                      flexShrink: 0, fontSize: '18px',
                    }}
                  >
                    <FiX />
                  </button>
                </div>

                <p style={{
                  fontSize: '15px', color: '#64748b',
                  lineHeight: 1.75, marginBottom: '24px',
                }}>
                  {selected.description}
                </p>

                {selected.features && (
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{
                      fontSize: '12px', fontWeight: 700, color: '#475569',
                      marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase',
                    }}>
                      Features
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {selected.features.split('\n').filter(Boolean).map(function (f, i) {
                        return (
                          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span style={{
                              width: '20px', height: '20px', borderRadius: '50%',
                              background: 'rgba(52,211,153,0.15)',
                              border: '1px solid rgba(52,211,153,0.3)',
                              color: '#34d399', fontSize: '11px', fontWeight: 700,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0, marginTop: '1px',
                            }}>
                              ✓
                            </span>
                            <span style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                              {f}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {selected.techStack && (
                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{
                      fontSize: '12px', fontWeight: 700, color: '#475569',
                      marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase',
                    }}>
                      Tech Stack
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selected.techStack.split(',').map(function (t) {
                        return (
                          <span key={t} style={{
                            padding: '6px 14px',
                            background: 'rgba(14,165,233,0.08)',
                            border: '1px solid rgba(14,165,233,0.2)',
                            color: '#7dd3fc', fontSize: '13px',
                            fontWeight: 500, borderRadius: '99px',
                          }}>
                            {t.trim()}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Modal navigation */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}>
                  {selected.liveLink ? (
                    <a
                      href={selected.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '12px 22px',
                        background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                        color: 'white', fontWeight: 700, fontSize: '14px',
                        borderRadius: '12px', textDecoration: 'none',
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
                      <FiExternalLink /> View Live Project
                    </a>
                  ) : (
                    <div />
                  )}

                  {/* Prev / Next inside modal */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={function () {
                        const idx = projects.findIndex(function (p) { return p.id === selected.id })
                        if (idx > 0) setSelected(projects[idx - 1])
                      }}
                      disabled={projects.findIndex(function (p) { return p.id === selected.id }) === 0}
                      style={{
                        width: '38px', height: '38px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#94a3b8', cursor: 'pointer', fontSize: '18px',
                        transition: 'all 0.2s ease',
                        opacity: projects.findIndex(function (p) { return p.id === selected.id }) === 0 ? 0.3 : 1,
                      }}
                      onMouseEnter={function (e) {
                        e.currentTarget.style.background = 'rgba(14,165,233,0.1)'
                        e.currentTarget.style.color = '#38bdf8'
                      }}
                      onMouseLeave={function (e) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.color = '#94a3b8'
                      }}
                    >
                      <FiChevronLeft />
                    </button>
                    <button
                      onClick={function () {
                        const idx = projects.findIndex(function (p) { return p.id === selected.id })
                        if (idx < projects.length - 1) setSelected(projects[idx + 1])
                      }}
                      disabled={projects.findIndex(function (p) { return p.id === selected.id }) === projects.length - 1}
                      style={{
                        width: '38px', height: '38px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#94a3b8', cursor: 'pointer', fontSize: '18px',
                        transition: 'all 0.2s ease',
                        opacity: projects.findIndex(function (p) { return p.id === selected.id }) === projects.length - 1 ? 0.3 : 1,
                      }}
                      onMouseEnter={function (e) {
                        e.currentTarget.style.background = 'rgba(14,165,233,0.1)'
                        e.currentTarget.style.color = '#38bdf8'
                      }}
                      onMouseLeave={function (e) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.color = '#94a3b8'
                      }}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}