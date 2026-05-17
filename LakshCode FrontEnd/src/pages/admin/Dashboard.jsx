import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiLayers, FiBriefcase, FiFileText, FiMail, FiTrendingUp } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

const statCards = [
  { key: 'totalServices', label: 'Total Services', icon: FiLayers, color: '#38bdf8', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.2)' },
  { key: 'totalProjects', label: 'Total Projects', icon: FiBriefcase, color: '#818cf8', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' },
  { key: 'totalBlogs', label: 'Total Blogs', icon: FiFileText, color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  { key: 'totalInquiries', label: 'Total Inquiries', icon: FiMail, color: '#fb923c', bg: 'rgba(251,146,60,0.1)', border: 'rgba(251,146,60,0.2)' },
  { key: 'newInquiries', label: 'New Inquiries', icon: FiTrendingUp, color: '#f472b6', bg: 'rgba(244,114,182,0.1)', border: 'rgba(244,114,182,0.2)' },
]

const quickLinks = [
  { title: 'Manage Services', desc: 'Add, edit or remove services shown on public site.', to: '/admin/services', color: '#38bdf8' },
  { title: 'Manage Projects', desc: 'Upload projects with images, tech stack and live links.', to: '/admin/projects', color: '#818cf8' },
  { title: 'Manage Blogs', desc: 'Write and publish blog posts with thumbnails.', to: '/admin/blogs', color: '#34d399' },
  { title: 'Manage Testimonials', desc: 'Add client reviews and star ratings.', to: '/admin/testimonials', color: '#fb923c' },
  { title: 'Inquiries', desc: 'View and manage all contact form submissions.', to: '/admin/inquiries', color: '#f472b6' },
  { title: 'Site Settings', desc: 'Update contact info, social links and SEO data.', to: '/admin/settings', color: '#a78bfa' },
]

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0, totalProjects: 0,
    totalBlogs: 0, totalInquiries: 0, newInquiries: 0,
  })
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(function () {
    API.get('/dashboard/stats')
      .then(function (r) { setStats(r.data.data); setLoading(false) })
      .catch(function () { setLoading(false) })
  }, [])

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontSize: '28px', fontWeight: 800,
          color: 'white', letterSpacing: '-0.5px', marginBottom: '6px',
        }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#475569' }}>
          Welcome back to LakshCode Admin Panel
        </p>
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {statCards.map(function (card, i) {
          const Icon = card.icon
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '24px 20px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.borderColor = card.border
                e.currentTarget.style.background = card.bg.replace('0.1', '0.05')
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              <div style={{
                width: '44px', height: '44px',
                borderRadius: '12px',
                background: card.bg,
                border: '1px solid ' + card.border,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: card.color, fontSize: '20px',
                marginBottom: '16px',
              }}>
                <Icon />
              </div>
              {loading ? (
                <div style={{ height: '36px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '8px' }} />
              ) : (
                <div style={{
                  fontSize: '2rem', fontWeight: 800,
                  color: 'white', letterSpacing: '-1px',
                  lineHeight: 1, marginBottom: '8px',
                }}>
                  {stats[card.key]}
                </div>
              )}
              <div style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                {card.label}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick guide */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '24px',
        padding: '32px',
      }}>
        <h2 style={{
          fontSize: '16px', fontWeight: 700, color: 'white',
          marginBottom: '24px', letterSpacing: '-0.3px',
        }}>
          Quick Navigation
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px',
        }}>
          {quickLinks.map(function (item, i) {
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                onClick={function () { navigate(item.to) }}
                style={{
                  padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={function (e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.055)'
                  e.currentTarget.style.borderColor = item.color + '30'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={function (e) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: '14px', fontWeight: 700,
                  color: item.color, marginBottom: '6px',
                }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}