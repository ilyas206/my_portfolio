import About from './components/About'
import Contact from './components/Contact'
import Education from './components/Education'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import StarField from './components/StarField'

function App() {

  return (
    <div className='overflow-hidden'>
      <StarField/>
      <Navbar />
      <section id="hero">
        <Hero/>
      </section>
      <section id="about">
        <About/>
      </section>
      <section id="skills">
        <Skills/>
      </section>
      <section id="projects">
        <Projects/>
      </section>
      <section id="education">
        <Education/>
      </section>
      <section id="contact">
        <Contact/>
      </section>
      <Footer/>
    </div>
  )
}

export default App