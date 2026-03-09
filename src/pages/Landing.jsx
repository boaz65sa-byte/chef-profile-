import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
