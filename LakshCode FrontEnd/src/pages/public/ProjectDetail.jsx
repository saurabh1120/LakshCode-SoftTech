import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'
import API from '../../api/axios'
import { imgUrl } from '../../api/imageUrl'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    API.get(`/projects/${id}`).then(r => setProject(r.data.data)).catch(() => navigate('/'))
  }, [id])

  if (!project) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-sky-400 mb-8 transition-colors">
          <FiArrowLeft /> Back to Projects
        </button>
        {project.imageUrl && (
          <img src={imgUrl(project.imageUrl)} alt={project.title} className="w-full h-72 object-cover rounded-3xl mb-8" />
        )}
        <h1 className="text-4xl font-black text-white mb-4">{project.title}</h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">{project.description}</p>
        {project.features && (
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold mb-4">Features</h2>
            <ul className="space-y-2">
              {project.features.split('\n').map((f, i) => (
                <li key={i} className="flex gap-3 text-gray-300"><span className="text-sky-400">✓</span>{f}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack?.split(',').map(t => (
            <span key={t} className="px-4 py-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm rounded-full">{t.trim()}</span>
          ))}
        </div>
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-2xl transition-all">
            View Live Project <FiExternalLink />
          </a>
        )}
      </div>
    </div>
  )
}