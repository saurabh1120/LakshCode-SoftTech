import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import API from '../api/axios'

export default function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState('')

  useEffect(function () {
    API.get('/settings')
      .then(function (r) {
        const data = r.data.data
        if (data && data.whatsapp) {
          setWhatsapp(data.whatsapp)
        }
      })
      .catch(function () { })
  }, [])

  if (!whatsapp) return null

  // Clean the number — remove +, spaces, dashes
  const cleaned = whatsapp.replace(/[^0-9]/g, '')
  const waLink = 'https://wa.me/' + cleaned

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 200 }}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 999,
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg,#25d366,#128c7e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(37,211,102,0.35)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={function (e) {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(37,211,102,0.5)'
      }}
      onMouseLeave={function (e) {
        e.currentTarget.style.transform = 'scale(1) translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.35)'
      }}
    >
      <FaWhatsapp style={{ color: 'white', fontSize: '28px' }} />
    </motion.a>
  )
}