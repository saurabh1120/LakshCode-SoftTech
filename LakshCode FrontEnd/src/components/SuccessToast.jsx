import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'

export default function SuccessOverlay({ show, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(3,7,18,0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              background: '#07101f',
              border: '1px solid rgba(52,211,153,0.3)',
              borderRadius: '24px',
              padding: '48px 56px',
              textAlign: 'center',
              boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
              style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#34d399,#0ea5e9)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', margin: '0 auto 20px',
                boxShadow: '0 8px 32px rgba(52,211,153,0.4)',
              }}
            >
              <FiCheck style={{ color: 'white', fontSize: '32px', strokeWidth: 3 }} />
            </motion.div>
            <h3 style={{
              fontSize: '20px', fontWeight: 800,
              color: 'white', marginBottom: '8px',
            }}>
              {message || 'Saved Successfully!'}
            </h3>
            <p style={{ fontSize: '14px', color: '#475569' }}>
              Changes have been applied
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}