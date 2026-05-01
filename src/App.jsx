import About from './components/About'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Skills from './components/Skills'

function App() {
  return (
    <div>
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
      <section id="projects"   style={{ minHeight: '100vh', padding: '80px 20px' }}><h2 style={{color:'var(--text-primary)'}}>Projects</h2></section>
      <section id="education" style={{ minHeight: '100vh', padding: '80px 20px' }}><h2 style={{color:'var(--text-primary)'}}>Education</h2></section>
      <section id="contact"    style={{ minHeight: '100vh', padding: '80px 20px' }}><h2 style={{color:'var(--text-primary)'}}>Contact</h2></section>
    </div>
  )
}

export default App