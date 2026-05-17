import { motion } from 'framer-motion'
import { FiZap, FiLayers, FiMessageCircle, FiHeart } from 'react-icons/fi'

const cards = [
  { icon: FiZap, title: 'Fast Delivery', desc: 'Agile sprints and clear milestones. We ship on time without cutting corners — quality at speed.', color: '#fbbf24' },
  { icon: FiLayers, title: 'Scalable Architecture', desc: 'Systems designed for growth. From MVP to enterprise scale — built right from day one.', color: '#38bdf8' },
  { icon: FiMessageCircle, title: 'Transparent Communication', desc: 'No surprises. Daily updates, weekly demos, full visibility into every stage of your project.', color: '#34d399' },
  { icon: FiHeart, title: 'Startup Friendly', desc: 'We understand lean budgets and tight timelines. Flexible models that grow as you do.', color: '#f472b6' },
]

export default function WhyUs() {
  return (
    <section style={{ padding: '120px 0', background: '#030712', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', bottom: '-200px', right: '-200px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

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
            background: 'rgba(52,211,153,0.08)',
            border: '1px solid rgba(52,211,153,0.2)',
            borderRadius: '99px', fontSize: '12px',
            fontWeight: 700, color: '#34d399',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>
            Why Us
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900, letterSpacing: '-1.5px',
            color: '#f8fafc', lineHeight: 1.1,
          }}>
            Why Choose{' '}
            <span style={{
              background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              LakshCode
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {cards.map(function (c, i) {
            const Icon = c.icon
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '36px',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '24px',
                  transition: 'all 0.3s ease',
                  alignItems: 'flex-start',
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = c.color + '30'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', flexShrink: 0,
                  background: c.color + '15',
                  border: '1px solid ' + c.color + '30',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: c.color, fontSize: '24px',
                }}>
                  <Icon />
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px', fontWeight: 700, color: '#f1f5f9',
                    marginBottom: '10px',
                  }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75 }}>
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}