import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import API from '../api/axios'
import {
  FiGlobe, FiSmartphone, FiCloud, FiBriefcase,
  FiPenTool, FiCode, FiServer, FiShield, FiZap, FiDatabase,
} from 'react-icons/fi'

const iconMap = {
  FaGlobe: FiGlobe, FaMobile: FiSmartphone, FaCloud: FiCloud,
  FaBriefcase: FiBriefcase, FaPencilRuler: FiPenTool, FaCode: FiCode,
  FaServer: FiServer, FaShieldAlt: FiShield, FaRocket: FiZap, FaDatabase: FiDatabase,
}

const iconColors = [
  { bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.2)', color: '#38bdf8' },
  { bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', color: '#818cf8' },
  { bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)', color: '#34d399' },
  { bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.2)', color: '#fb923c' },
  { bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.2)', color: '#f472b6' },
  { bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)', color: '#a78bfa' },
]

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(function() {
    API.get('/services')
      .then(function(r) { setServices(r.data.data); setLoading(false) })
      .catch(function() { setLoading(false) })
  }, [])

  return (
    <section
      id="services"
      style={{
        padding: '120px 0',
        background: 'linear-gradient(180deg, #030712 0%, #060d1f 50%, #030712 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Bg glow */}
      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

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
            background: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '99px', fontSize: '12px',
            fontWeight: 700, color: '#818cf8',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            What We Do
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: '#f8fafc', marginBottom: '18px', lineHeight: 1.1,
          }}>
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Services
            </span>
          </h2>
          <p style={{ fontSize: '17px', color: '#475569', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
            End-to-end software solutions built with modern technology
            and genuine engineering quality.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {loading
            ? [...Array(6)].map(function(_, i) {
              return (
                <div key={i} style={{
                  height: '240px', borderRadius: '24px',
                  background: 'rgba(255,255,255,0.03)', animation: 'pulse 2s infinite',
                }} />
              )
            })
            : services.map(function(svc, i) {
              const Icon = iconMap[svc.icon] || FiCode
              const clr = iconColors[i % iconColors.length]
              return (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '24px',
                    padding: '36px 32px',
                    cursor: 'default',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.borderColor = clr.border
                    e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
                    e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,0.3)'
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: clr.bg, border: '1px solid ' + clr.border,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: clr.color, fontSize: '24px', marginBottom: '24px',
                  }}>
                    <Icon />
                  </div>

                  <h3 style={{
                    fontSize: '17px', fontWeight: 700, color: '#f1f5f9',
                    marginBottom: '12px', lineHeight: 1.3,
                  }}>
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75 }}>
                    {svc.description}
                  </p>

                  {/* Corner accent */}
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: '80px', height: '80px',
                    background: 'radial-gradient(circle at bottom right,' + clr.bg + ', transparent)',
                    borderRadius: '24px 0',
                  }} />
                </motion.div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}