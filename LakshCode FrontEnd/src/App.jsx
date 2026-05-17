import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import Home from './pages/public/Home'
import BlogDetail from './pages/public/BlogDetail'
import ProjectDetail from './pages/public/ProjectDetail'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ManageServices from './pages/admin/ManageServices'
import ManageProjects from './pages/admin/ManageProjects'
import ManageBlogs from './pages/admin/ManageBlogs'
import ManageTestimonials from './pages/admin/ManageTestimonials'
import ManageInquiries from './pages/admin/ManageInquiries'
import SiteSettings from './pages/admin/SiteSettings'
import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider } from './context/AuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Route>

          {/* Admin Auth */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Protected */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/services" element={<ManageServices />} />
              <Route path="/admin/projects" element={<ManageProjects />} />
              <Route path="/admin/blogs" element={<ManageBlogs />} />
              <Route path="/admin/testimonials" element={<ManageTestimonials />} />
              <Route path="/admin/inquiries" element={<ManageInquiries />} />
              <Route path="/admin/settings" element={<SiteSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}