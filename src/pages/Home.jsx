import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Treatments from '../components/Treatments'
import BeforeAfter from '../components/BeforeAfter'
import Technology from '../components/Technology'
import Testimonials from '../components/Testimonials'
import Offer from '../components/Offer'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="noise">
      <Navbar />
      <main>
        <Hero />
        <Treatments />
        <BeforeAfter />
        <Technology />
        <Testimonials />
        <Offer />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
