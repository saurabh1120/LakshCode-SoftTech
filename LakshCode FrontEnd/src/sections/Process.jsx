import { motion } from 'framer-motion'
import {
  FiMessageSquare, FiPenTool, FiCode,
  FiCheckCircle, FiUploadCloud, FiHeadphones,
} from 'react-icons/fi'

const steps = [
  { icon: FiMessageSquare, title: 'Requirement Discussion', desc: 'Understanding your vision, goals, and technical requirements in depth.' },
  { icon: FiPenTool, title: 'UI/UX Design', desc: 'Wireframes, prototypes and premium interface design before coding begins.' },
  { icon: FiCode, title: 'Development', desc: 'Agile sprints, clean code and regular demos throughout the build.' },
  { icon: FiCheckCircle, title: 'Testing & QA', desc: 'Rigorous testing across devices, browsers and edge cases.' },
  { icon: FiUploadCloud, title: 'Deployment', desc: 'Smooth cloud launch with CI/CD pipelines and zero downtime.' },
  { icon: FiHeadphones, title: 'Support', desc: 'Post-launch monitoring, maintenance and ongoing feature updates.' },
]

export default function Process() {
  return (
    <section id="process" style={{ padding: '120px 0', background: '#030712' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
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
            How We Work
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: '#f8fafc', lineHeight: 1.1,
          }}>
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Process
            </span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {steps.map(function(s, i) {
            const Icon = s.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '36px 32px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '24px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(14,165,233,0.25)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Step number */}
                <div style={{
                  position: 'absolute', top: '20px', right: '20px',
                  fontSize: '48px', fontWeight: 900, lineHeight: 1,
                  color: 'rgba(255,255,255,0.03)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'rgba(14,165,233,0.1)',
                  border: '1px solid rgba(14,165,233,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#38bdf8', fontSize: '24px',
                  marginBottom: '24px', position: 'relative', zIndex: 1,
                }}>
                  <Icon />
                </div>

                {/* Step badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center',
                  gap: '6px', marginBottom: '12px',
                  fontSize: '11px', fontWeight: 700,
                  color: '#38bdf8', letterSpacing: '1px',
                }}>
                  <span style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: 'white', fontWeight: 800,
                  }}>
                    {i + 1}
                  </span>
                  STEP {i + 1}
                </div>

                <h3 style={{
                  fontSize: '17px', fontWeight: 700, color: '#f1f5f9',
                  marginBottom: '10px',
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75 }}>
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}