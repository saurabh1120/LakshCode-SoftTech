import { motion } from 'framer-motion'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

const highlights = ['Web & Mobile Apps', 'Cloud Solutions', 'API Development']
const stats = [
  { num: '50+', label: 'Projects Delivered' },
  { num: '30+', label: 'Happy Clients' },
  { num: '3+', label: 'Years of Experience' },
]

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.12) 0%, transparent 70%), #030712',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', width: '700px', height: '700px',
        borderRadius: '50%', top: '-200px', left: '-200px',
        background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '600px', height: '600px',
        borderRadius: '50%', bottom: '-100px', right: '-100px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 40px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* LEFT */}
        <div>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px 6px 8px',
              background: 'rgba(14,165,233,0.08)',
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: '99px',
              marginBottom: '28px',
            }}
          >
            <span style={{
              width: '20px', height: '20px',
              background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', color: 'white', fontWeight: 700,
            }}>✦</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#7dd3fc' }}>
              Premium Software Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-2px',
              color: '#f8fafc',
              marginBottom: '24px',
            }}
          >
            We Build
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Digital Products
            </span>
            <br />
            That Scale.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '17px',
              color: '#64748b',
              lineHeight: 1.75,
              marginBottom: '36px',
              maxWidth: '460px',
            }}
          >
            LakshCode SoftTech crafts modern web apps, mobile solutions
            and cloud infrastructure — built for startups and growing businesses.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: '10px', marginBottom: '36px', flexWrap: 'wrap' }}
          >
            {highlights.map(function (h) {
              return (
                <div
                  key={h}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '99px',
                    fontSize: '13px',
                    color: '#94a3b8',
                    fontWeight: 500,
                  }}
                >
                  <FiCheck style={{ color: '#38bdf8', fontSize: '12px' }} />
                  {h}
                </div>
              )
            })}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
          >
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                color: 'white',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(14,165,233,0.35)',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(14,165,233,0.5)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(14,165,233,0.35)'
              }}
            >
              Book Free Consultation
              <FiArrowRight />
            </a>

            <a
              href="#projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#e2e8f0',
                fontWeight: 600,
                fontSize: '15px',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              View Our Work
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              gap: '0',
              marginTop: '52px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {stats.map(function (s, i) {
              return (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    paddingRight: i < stats.length - 1 ? '32px' : 0,
                    marginRight: i < stats.length - 1 ? '32px' : 0,
                    borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 900,
                      letterSpacing: '-1px',
                      background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {s.num}
                  </div>
                  <div style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                    {s.label}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* RIGHT — mockup card */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{ position: 'relative' }}
        >
          {/* Glow behind */}
          <div style={{
            position: 'absolute',
            inset: '-30px',
            background: 'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(99,102,241,0.14))',
            borderRadius: '40px',
            filter: 'blur(40px)',
          }} />

          {/* Main card */}
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(145deg, #0d1526, #0a0f1e)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '28px',
              padding: '32px',
              boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Header bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '28px',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#28c840' }} />
              <div style={{
                flex: 1, height: '20px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '6px', marginLeft: '8px',
              }} />
            </div>

            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              {[
                { label: 'Revenue', val: '₹2.4L', change: '+24%', color: '#38bdf8' },
                { label: 'Projects', val: '12', change: '+3', color: '#818cf8' },
                { label: 'Inquiries', val: '8', change: 'New', color: '#34d399' },
                { label: 'Clients', val: '34', change: '+5', color: '#f472b6' },
              ].map(function (card, i) {
                return (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '16px',
                      padding: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
                        {card.label}
                      </span>
                      <span style={{
                        fontSize: '11px', fontWeight: 600,
                        color: card.color,
                        background: card.color + '18',
                        padding: '2px 8px', borderRadius: '99px',
                      }}>
                        {card.change}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '1.6rem', fontWeight: 800,
                      color: 'white', letterSpacing: '-0.5px',
                    }}>
                      {card.val}
                    </div>
                    <div style={{
                      marginTop: '12px', height: '3px',
                      background: 'rgba(255,255,255,0.06)', borderRadius: '99px',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: (40 + i * 16) + '%' }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                        style={{
                          height: '100%', borderRadius: '99px',
                          background: 'linear-gradient(90deg,' + card.color + ', ' + card.color + '88)',
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Chart */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '20px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', marginBottom: '16px',
              }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>
                  Project Deliveries
                </span>
                <span style={{
                  fontSize: '11px', color: '#38bdf8', fontWeight: 600,
                  background: 'rgba(14,165,233,0.1)',
                  padding: '3px 10px', borderRadius: '99px',
                }}>
                  This Month
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '70px' }}>
                {[35, 62, 44, 88, 55, 78, 66].map(function (h, i) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: h + '%' }}
                      transition={{ delay: 0.9 + i * 0.07, duration: 0.6, ease: 'easeOut' }}
                      style={{
                        flex: 1,
                        background: i === 3
                          ? 'linear-gradient(to top, #0ea5e9, #818cf8)'
                          : 'rgba(255,255,255,0.08)',
                        borderRadius: '6px 6px 0 0',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.0, type: 'spring' }}
            style={{
              position: 'absolute',
              top: '-18px', right: '-18px',
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 16px 40px rgba(14,165,233,0.4)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginBottom: '4px' }}>
              Client Satisfaction
            </div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: 'white' }}>98%</div>
          </motion.div>

          {/* Floating badge 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.1, type: 'spring' }}
            style={{
              position: 'absolute',
              bottom: '-18px', left: '-18px',
              background: '#0a0f1e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{
              width: '38px', height: '38px',
              background: 'rgba(52,211,153,0.15)',
              border: '1px solid rgba(52,211,153,0.3)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#34d399', fontSize: '18px',
            }}>✓</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>
                Project Delivered
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                On time, every time
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}