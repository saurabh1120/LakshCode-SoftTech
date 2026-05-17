import { motion } from 'framer-motion'
import { FaJava, FaReact, FaAws, FaDocker, FaGithub, FaDatabase } from 'react-icons/fa'
import { SiSpringboot, SiMysql } from 'react-icons/si'

const techs = [
  { icon: FaJava, name: 'Java', color: '#f97316' },
  { icon: SiSpringboot, name: 'Spring Boot', color: '#4ade80' },
  { icon: FaReact, name: 'React', color: '#38bdf8' },
  { icon: SiMysql, name: 'MySQL', color: '#60a5fa' },
  { icon: FaDatabase, name: 'PostgreSQL', color: '#a78bfa' },
  { icon: FaAws, name: 'AWS', color: '#fbbf24' },
  { icon: FaDocker, name: 'Docker', color: '#38bdf8' },
  { icon: FaGithub, name: 'GitHub', color: '#e2e8f0' },
]

export default function TechStack() {
  return (
    <section style={{
      padding: '100px 0',
      background: 'linear-gradient(180deg, #030712 0%, #060d1f 50%, #030712 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p style={{
            fontSize: '13px', fontWeight: 700, color: '#475569',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            Our Tech Stack
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
            fontWeight: 900, letterSpacing: '-1px',
            color: '#f8fafc', lineHeight: 1.1,
          }}>
            Technologies We{' '}
            <span style={{
              background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Master
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {techs.map(function(t, i) {
            const Icon = t.icon
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: '12px',
                  padding: '28px 24px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                  minWidth: '110px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={function(e) {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)'
                  e.currentTarget.style.borderColor = t.color + '40'
                  e.currentTarget.style.background = t.color + '08'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={function(e) {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon style={{ fontSize: '40px', color: t.color }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                  {t.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}