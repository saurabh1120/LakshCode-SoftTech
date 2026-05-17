import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import API from '../api/axios'
// import { imgUrl } from '../api/imageUrl'

export default function Testimonials() {
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    API.get('/testimonials')
      .then((r) => { setList(r.data.data || []) })
      .catch(() => { /* Silently handle fetch error */ })
  }, [])

  if (list.length === 0) return null

  const PER_PAGE = 3
  const totalPages = Math.ceil(list.length / PER_PAGE)
  const current = list.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const prev = () => {
    setDirection(-1)
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1))
  }

  const next = () => {
    setDirection(1)
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1))
  }

  const avatarGradients = [
    'linear-gradient(135deg,#0ea5e9,#6366f1)',
    'linear-gradient(135deg,#34d399,#0ea5e9)',
    'linear-gradient(135deg,#f472b6,#818cf8)',
    'linear-gradient(135deg,#fb923c,#f472b6)',
    'linear-gradient(135deg,#818cf8,#34d399)',
    'linear-gradient(135deg,#fbbf24,#fb923c)',
  ]

  const variants = {
    enter: (dir) => {
      return { x: dir > 0 ? 80 : -80, opacity: 0 }
    },
    center: { x: 0, opacity: 1 },
    exit: (dir) => {
      return { x: dir > 0 ? -80 : 80, opacity: 0 }
    },
  }

  return (
    <section
      style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg,#030712 0%,#060d1f 50%,#030712 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '800px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%)',
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
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', marginBottom: '20px',
            background: 'rgba(251,146,60,0.08)',
            border: '1px solid rgba(251,146,60,0.2)',
            borderRadius: '99px', fontSize: '12px',
            fontWeight: 700, color: '#fb923c',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Testimonials
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: '#f8fafc', lineHeight: 1.1,
          }}>
            What Clients <span style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Say</span>
          </h2>
        </motion.div>

        {/* Cards area */}
        <div style={{ position: 'relative', minHeight: '380px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                width: '100%',
              }}
            >
              {current.map((t, i) => {
                const gradBg = avatarGradients[(page * PER_PAGE + i) % avatarGradients.length]
                return (
                  <div
                    key={t.id}
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '24px',
                      padding: '32px 28px',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      boxSizing: 'border-box',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{ position: 'absolute', top: '16px', right: '24px', fontSize: '80px', fontWeight: 900, color: 'rgba(14,165,233,0.07)', fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                      {[1, 2, 3, 4, 5].map((star) => {
                        return (
                          <FaStar
                            key={star}
                            style={{ color: star <= (t.rating || 5) ? '#fbbf24' : '#334155', fontSize: '16px' }}
                          />
                        )
                      })}
                    </div>

                    <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.75, fontStyle: 'italic', flex: 1, marginBottom: '28px', position: 'relative', zIndex: 1 }}>
                      "{t.message}"
                    </p>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' }} />

                    {/* Client Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {t.avatarUrl ? (
                        <img src={t.avatarUrl} alt={t.clientName} style={{ width: '48px', height: '48px', borderRadius: '14px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: gradBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: 'white' }}>
                          {t.clientName ? t.clientName[0].toUpperCase() : '?'}
                        </div>
                      )}
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', marginBottom: '3px' }}>{t.clientName}</div>
                        {t.company && <div style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>{t.company}</div>}
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Layout Helper: ensures alignment on pages with fewer than 3 cards */}
              {current.length < PER_PAGE && [...Array(PER_PAGE - current.length)].map((_, idx) => (
                <div key={`spacer-${idx}`} style={{ visibility: 'hidden' }} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '48px' }}>
            <button onClick={prev} style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiChevronLeft size={20} />
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {[...Array(totalPages)].map((_, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
                    style={{ width: i === page ? '28px' : '8px', height: '8px', borderRadius: '99px', border: 'none', background: i === page ? 'linear-gradient(135deg,#0ea5e9,#6366f1)' : 'rgba(255,255,255,0.15)', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  />
                )
              })}
            </div>

            <button onClick={next} style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiChevronRight size={20} />
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#1e3a5f' }}>
          {list.length} trusted client review{list.length !== 1 ? 's' : ''}
        </div>
      </div>
    </section>
  )
}
