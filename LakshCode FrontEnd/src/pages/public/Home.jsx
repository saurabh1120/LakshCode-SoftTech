import { Helmet } from 'react-helmet-async'
import Hero from '../../sections/Hero'
import Services from '../../sections/Services'
import Projects from '../../sections/Projects'
import WhyUs from '../../sections/WhyUs'
import TechStack from '../../sections/TechStack'
import Process from '../../sections/Process'
import Testimonials from '../../sections/Testimonials'
import Blog from '../../sections/Blog'
import Contact from '../../sections/Contact'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>LakshCode SoftTech | Software Solutions</title>
        <meta name="description" content="LakshCode SoftTech builds modern web apps, mobile apps, and cloud solutions." />
      </Helmet>
      <Hero />
      <Services />
      <Projects />
      <WhyUs />
      <TechStack />
      <Process />
      <Testimonials />
      <Blog />
      <Contact />
    </>
  )
}