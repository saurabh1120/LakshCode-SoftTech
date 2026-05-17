import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function PublicLayout() {
  return (
    <div className="bg-[#020817] min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}