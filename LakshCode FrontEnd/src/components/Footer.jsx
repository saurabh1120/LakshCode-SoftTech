import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi'
import API from '../api/axios'
import logo from '../assets/logo.png'

export default function Footer() {
  const [settings, setSettings] = useState({})

  useEffect(function () {
    API.get('/settings')
      .then(function (r) { setSettings(r.data.data || {}) })
      .catch(function () { })
  }, [])

  const socials = [
    { href: settings.githubUrl, icon: FiGithub, label: 'GitHub' },
    { href: settings.linkedinUrl, icon: FiLinkedin, label: 'LinkedIn' },
    { href: settings.instagramUrl, icon: FiInstagram, label: 'Instagram' },
    { href: settings.twitterUrl, icon: FiTwitter, label: 'Twitter' },
    { href: settings.facebookUrl, icon: FiFacebook, label: 'Facebook' },
  ].filter(function (s) { return s.href })

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer style={{
      background: '#020812',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px 40px' }}>

        {/* Top section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2.5fr 1fr 1fr',
          gap: '60px',
          marginBottom: '64px',
        }}>

          {/* Brand */}
          <div>
            <img src={logo} alt="LakshCode" style={{ height: '135px', objectFit: 'contain', marginBottom: '20px' }} />
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.75, maxWidth: '340px', marginBottom: '32px' }}>
              {settings.footerTagline || 'Building Digital Futures — Premium Software Solutions that Scale with your Business.'}
            </p>

            {socials.length > 0 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {socials.map(function (s) {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#94a3b8', transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={function (e) {
                        e.currentTarget.style.color = '#38bdf8'
                        e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'
                        e.currentTarget.style.background = 'rgba(14,165,233,0.08)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={function (e) {
                        e.currentTarget.style.color = '#94a3b8'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {links.map(function (l) {
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{ fontSize: '14px', color: '#94a3b8', transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={function (e) { e.currentTarget.style.color = '#38bdf8' }}
                    onMouseLeave={function (e) { e.currentTarget.style.color = '#94a3b8' }}
                  >
                    {l.label}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                settings.email || 'contact@lakshcode.com',
                settings.phone || '+91-XXXXXXXXXX',
                settings.address || 'Raipur, Chhattisgarh',
              ].map(function (item, i) {
                return (
                  <span key={i} style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.5 }}>
                    {item}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '32px' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '13px', color: '#64748b' }}>
            © {new Date().getFullYear()} LakshCode SoftTech. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#64748b' }}>
              Made with ♥ in Raipur
            </span>
            <Link
              to="/admin"
              style={{ fontSize: '12px', color: '#475569', transition: 'color 0.2s', textDecoration: 'none' }}
              onMouseEnter={function (e) { e.currentTarget.style.color = '#38bdf8' }}
              onMouseLeave={function (e) { e.currentTarget.style.color = '#475569' }}
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}