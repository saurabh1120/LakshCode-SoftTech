import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import logo from '../assets/logo.png'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // const [isMobile, setIsMobile] = useState(false)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)

  useEffect(function () {

    function onScroll() {
      setScrolled(window.scrollY > 40)
    }

    function onResize() {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) {
        setOpen(false)
      }
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    return function () {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Close menu when clicking outside
  useEffect(function () {
    if (!open) return
    function handleClick() {
      setOpen(false)
    }
    // Timeout prevents the click that opens the menu from immediately closing it
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick)
    }, 0)

    return function () {
      clearTimeout(timer)
      document.removeEventListener('click', handleClick)
    }
  }, [open])

  return (
    <>
      {/* ===== HEADER BAR ===== */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : '0 40px',
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(3,7,18,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
        }}
        onClick={function (e) { e.stopPropagation() }}
      >
        {/* Logo */}
        <Link to="/" style={{ flexShrink: 0, textDecoration: 'none' }}>
          <img
            src={logo}
            alt="LakshCode SoftTech"
            style={{
              height: isMobile ? '120px' : '130px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Link>

        {/* Desktop nav links */}
        {!isMobile && (
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
            }}
          >
            {links.map(function (link) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={function (e) {
                    e.currentTarget.style.color = '#f1f5f9'
                  }}
                  onMouseLeave={function (e) {
                    e.currentTarget.style.color = '#94a3b8'
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Desktop CTA button */}
          {!isMobile && (
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '10px 22px',
                background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '10px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 20px rgba(14,165,233,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(14,165,233,0.45)'
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,165,233,0.3)'
              }}
            >
              Book Free Consultation
            </a>
          )}

          {/* Mobile hamburger button */}
          {isMobile && (
            <button
              onClick={function (e) {
                e.stopPropagation()
                setOpen(function (prev) { return !prev })
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: open
                  ? 'rgba(14,165,233,0.15)'
                  : 'rgba(255,255,255,0.06)',
                border: open
                  ? '1px solid rgba(14,165,233,0.3)'
                  : '1px solid rgba(255,255,255,0.1)',
                color: open ? '#38bdf8' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'all 0.2s ease',
              }}
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          )}
        </div>
      </motion.header>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={function (e) { e.stopPropagation() }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              zIndex: 99,
              background: '#07101f',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ padding: '12px 20px 24px' }}>
              {/* Nav links */}
              {links.map(function (link, i) {
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={function () { setOpen(false) }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px 4px',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#94a3b8',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={function (e) {
                      e.currentTarget.style.color = '#38bdf8'
                    }}
                    onMouseLeave={function (e) {
                      e.currentTarget.style.color = '#94a3b8'
                    }}
                  >
                    {link.label}
                    <span style={{ fontSize: '18px', color: '#334155' }}>›</span>
                  </motion.a>
                )
              })}

              {/* CTA button */}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={function () { setOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '20px',
                  padding: '15px 24px',
                  background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '15px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
                  letterSpacing: '0.3px',
                }}
              >
                Book Free Consultation
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== BACKDROP ===== */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={function () { setOpen(false) }}
            style={{
              position: 'fixed',
              top: '72px',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 98,
              background: 'rgba(3,7,18,0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}