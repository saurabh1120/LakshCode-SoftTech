import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi'
import API from '../../api/axios'
import { imgUrl } from '../../api/imageUrl'

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [prevId, setPrevId] = useState(id) // Track ID to reset state
  const navigate = useNavigate()

  // Standard React pattern for resetting state when a prop/param changes
  // This happens during render and is allowed by React
  if (id !== prevId) {
    setPrevId(id)
    setBlog(null)
    setLoading(true)
  }

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    let isMounted = true;

    API.get('/blogs/' + id)
      .then((r) => {
        if (isMounted) {
          setBlog(r.data.data)
          setLoading(false)
          window.scrollTo(0, 0)
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false)
          navigate('/')
        }
      })

    return () => {
      isMounted = false;
    };
  }, [id, navigate])

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#030712',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '20px',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            border: '3px solid rgba(14,165,233,0.2)',
            borderTopColor: '#0ea5e9',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ color: '#334155', fontSize: '14px' }}>Loading article...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    )
  }

  if (!blog) return null

  const wordCount = blog.content
    ? blog.content.replace(/<[^>]*>/g, '').split(' ').length
    : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  // Build correct image URL
  const thumbnail = blog.thumbnailUrl ? imgUrl(blog.thumbnailUrl) : null

  return (
    <div style={{
      minHeight: '100vh',
      background: '#030712',
      paddingTop: '80px',
    }}>

      {/* Hero area */}
      <div style={{
        background: 'linear-gradient(180deg,#060d1f 0%,#030712 100%)',
        paddingBottom: '60px',
      }}>
        <div style={{
          width: '100%', maxWidth: '860px',
          margin: '0 auto', padding: '40px 24px 0',
          boxSizing: 'border-box',
        }}>

          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 18px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', color: '#94a3b8',
              fontSize: '14px', fontWeight: 500,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              marginBottom: '40px', transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(14,165,233,0.1)'
              e.currentTarget.style.borderColor = 'rgba(14,165,233,0.25)'
              e.currentTarget.style.color = '#38bdf8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = '#94a3b8'
            }}
          >
            <FiArrowLeft size={16} /> Back to Blog
          </motion.button>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '20px' }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '5px 14px',
              background: 'rgba(52,211,153,0.1)',
              border: '1px solid rgba(52,211,153,0.25)',
              borderRadius: '99px', fontSize: '12px',
              fontWeight: 700, color: '#34d399',
              letterSpacing: '1px', textTransform: 'uppercase',
            }}>
              Blog Post
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'clamp(1.8rem,4vw,3rem)',
              fontWeight: 900, color: '#f8fafc',
              lineHeight: 1.15, letterSpacing: '-1px',
              marginBottom: '24px',
            }}
          >
            {blog.title}
          </motion.h1>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: 'flex', alignItems: 'center',
              gap: '20px', flexWrap: 'wrap',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', color: '#475569',
            }}>
              <FiCalendar size={13} style={{ color: '#38bdf8' }} />
              {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', color: '#475569',
            }}>
              <FiClock size={13} style={{ color: '#38bdf8' }} />
              {readTime} min read
            </div>
            <div style={{ fontSize: '13px', color: '#334155' }}>
              {wordCount} words
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        width: '100%', maxWidth: '860px',
        margin: '0 auto', padding: '0 24px 80px',
        boxSizing: 'border-box',
      }}>

        {/* Thumbnail area */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            marginTop: '-20px',
            marginBottom: '48px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            background: 'linear-gradient(135deg,rgba(52,211,153,0.12),rgba(14,165,233,0.12))',
            position: 'relative',
            minHeight: thumbnail ? 'auto' : '300px',
          }}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={blog.title}
              style={{
                width: '100%', maxHeight: '440px',
                objectFit: 'cover', display: 'block',
              }}
              onError={function (e) {
                // If image fails to load, hide it and show fallback
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}

          {/* Fallback — shown when no image or image fails */}
          <div style={{
            width: '100%',
            height: thumbnail ? '440px' : '300px',
            display: thumbnail ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '8px',
            position: thumbnail ? 'absolute' : 'relative',
            top: 0, left: 0,
          }}>
            <div style={{
              fontSize: '82px', fontWeight: 900,
              color: 'rgba(52,211,153,0.2)',
              letterSpacing: '-4px',
            }}>
              {blog.title ? blog.title[0].toUpperCase() : 'B'}
            </div>
          </div>
        </motion.div>

        {/* Excerpt callout */}
        {blog.excerpt && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              padding: '20px 24px',
              background: 'rgba(14,165,233,0.06)',
              border: '1px solid rgba(14,165,233,0.15)',
              borderLeft: '4px solid #0ea5e9',
              borderRadius: '0 12px 12px 0',
              marginBottom: '40px',
            }}
          >
            <p style={{
              fontSize: '17px', color: '#94a3b8',
              lineHeight: 1.75, fontStyle: 'italic', margin: 0,
            }}>
              {blog.excerpt}
            </p>
          </motion.div>
        )}

        {/* Blog content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <style>{`
            .blog-content {
              font-size: 16px;
              color: #94a3b8;
              line-height: 1.85;
            }
            .blog-content h1,
            .blog-content h2,
            .blog-content h3,
            .blog-content h4,
            .blog-content h5 {
              color: #f1f5f9;
              font-weight: 700;
              margin: 2em 0 0.75em;
              line-height: 1.3;
              letter-spacing: -0.5px;
            }
            .blog-content h1 { font-size: 2rem; }
            .blog-content h2 { font-size: 1.6rem; }
            .blog-content h3 { font-size: 1.3rem; }
            .blog-content p {
              margin-bottom: 1.5em;
              color: #94a3b8;
            }
            .blog-content a {
              color: #38bdf8;
              text-decoration: underline;
            }
            .blog-content ul,
            .blog-content ol {
              padding-left: 1.5em;
              margin-bottom: 1.5em;
              color: #94a3b8;
            }
            .blog-content li {
              margin-bottom: 0.5em;
              line-height: 1.75;
            }
            .blog-content code {
              background: rgba(14,165,233,0.1);
              border: 1px solid rgba(14,165,233,0.2);
              padding: 2px 8px;
              border-radius: 6px;
              font-size: 14px;
              color: #7dd3fc;
            }
            .blog-content pre {
              background: #0a1628;
              border: 1px solid rgba(255,255,255,0.08);
              padding: 20px 24px;
              border-radius: 14px;
              overflow-x: auto;
              margin-bottom: 1.5em;
            }
            .blog-content pre code {
              background: none;
              border: none;
              padding: 0;
              font-size: 14px;
              color: #94a3b8;
            }
            .blog-content blockquote {
              border-left: 4px solid #0ea5e9;
              padding: 12px 20px;
              margin: 1.5em 0;
              background: rgba(14,165,233,0.05);
              border-radius: 0 12px 12px 0;
              color: #64748b;
              font-style: italic;
            }
            .blog-content img {
              max-width: 100%;
              border-radius: 12px;
              margin: 1.5em 0;
            }
            .blog-content strong {
              color: #f1f5f9;
              font-weight: 700;
            }
            .blog-content hr {
              border: none;
              border-top: 1px solid rgba(255,255,255,0.08);
              margin: 2em 0;
            }
            .blog-content table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 1.5em;
            }
            .blog-content th {
              background: rgba(14,165,233,0.08);
              color: #f1f5f9;
              padding: 10px 16px;
              text-align: left;
              font-weight: 600;
              border: 1px solid rgba(255,255,255,0.08);
            }
            .blog-content td {
              padding: 10px 16px;
              border: 1px solid rgba(255,255,255,0.06);
              color: #94a3b8;
            }
            .blog-content tr:nth-child(even) td {
              background: rgba(255,255,255,0.02);
            }
          `}</style>
        </motion.div>

        {/* Bottom back button */}
        <div style={{
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', gap: '16px',
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 24px',
              background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
              color: 'white', fontWeight: 700, fontSize: '14px',
              borderRadius: '12px', border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(14,165,233,0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(14,165,233,0.3)'
            }}
          >
            <FiArrowLeft size={16} /> Back to Blog
          </button>
          <span style={{ fontSize: '13px', color: '#1e3a5f' }}>
            Thanks for reading!
          </span>
        </div>

      </div>
    </div>
  )
}
