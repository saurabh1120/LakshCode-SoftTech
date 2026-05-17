import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  FiGrid, FiLayers, FiBriefcase, FiFileText,
  FiStar, FiMail, FiSettings, FiLogOut
} from 'react-icons/fi'
import logo from '../assets/logo.png'

const navLinks = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard', exact: true },
  { to: '/admin/services', icon: FiLayers, label: 'Services' },
  { to: '/admin/projects', icon: FiBriefcase, label: 'Projects' },
  { to: '/admin/blogs', icon: FiFileText, label: 'Blogs' },
  { to: '/admin/testimonials', icon: FiStar, label: 'Testimonials' },
  { to: '/admin/inquiries', icon: FiMail, label: 'Inquiries' },
  { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#030712',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
    }}>

      {/* ===== FIXED SIDEBAR ===== */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '240px',
        background: '#07101f',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>

        {/* Logo */}
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <img
            src={logo}
            alt="LakshCode"
            style={{
              height: '135px',
              objectFit: 'contain',
              display: 'block',
              maxWidth: '100%',
            }}
          />
          <div style={{
            marginTop: '8px',
            fontSize: '10px',
            color: '#1e3a5f',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}>
            Admin Panel
          </div>
        </div>

        {/* Nav links */}
        <nav style={{
          flex: 1,
          padding: '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          overflowY: 'auto',
        }}>
          {navLinks.map(function (link) {
            const Icon = link.icon
            const isActive = link.exact
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to)

            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#38bdf8' : '#475569',
                  background: isActive
                    ? 'rgba(14,165,233,0.1)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(14,165,233,0.18)'
                    : '1px solid transparent',
                  transition: 'all 0.18s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={function (e) {
                  if (!isActive) {
                    e.currentTarget.style.color = '#94a3b8'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }
                }}
                onMouseLeave={function (e) {
                  if (!isActive) {
                    e.currentTarget.style.color = '#475569'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {link.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Logout */}
        <div style={{
          padding: '12px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#ef4444',
              background: 'transparent',
              border: '1px solid transparent',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.18s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={function (e) {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.18)'
            }}
            onMouseLeave={function (e) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            <FiLogOut size={16} style={{ flexShrink: 0 }} />
            Logout
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT — offset by sidebar width ===== */}
      <div style={{
        marginLeft: '240px',
        flex: 1,
        minHeight: '100vh',
        padding: '40px 48px',
        boxSizing: 'border-box',
        minWidth: 0,
        overflowX: 'hidden',
      }}>
        <Outlet />
      </div>
    </div>
  )
}