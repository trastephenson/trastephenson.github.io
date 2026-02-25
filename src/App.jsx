import React from 'react'
import { ScrollProvider } from './context/ScrollContext'
import Scene from './components/three/Scene'
import SectionWrapper from './components/scroll/SectionWrapper'
import ScrollProgress from './components/scroll/ScrollProgress'
import ScreenReaderStatus from './components/scroll/ScreenReaderStatus'
import Header from './components/header/Header'
import CTA from './components/header/CTA'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Strengths from './components/about/Strengths'
import Experience from './components/experience/Experience'
import Services from './components/services/Services'
import { Work1, Work2, Work3 } from './components/portfolio/Portfolio'
import Testimonials from './components/testimonials/Testimonials'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <ScrollProvider>
      {/* Layer 1: 3D Background */}
      <Scene />

      {/* Layer 2: Content Sections (12 stops) */}
      <SectionWrapper sectionIndex={0} transition="center-zoom" noPanel>
        <Header />
      </SectionWrapper>
      <SectionWrapper sectionIndex={1} transition="center-zoom">
        <CTA />
      </SectionWrapper>
      <SectionWrapper sectionIndex={2} transition="slide-right">
        <About />
      </SectionWrapper>
      <SectionWrapper sectionIndex={3} transition="slide-left">
        <Strengths />
      </SectionWrapper>
      <SectionWrapper sectionIndex={4} transition="rise-up">
        <Experience />
      </SectionWrapper>
      <SectionWrapper sectionIndex={5} transition="rise-up">
        <Services />
      </SectionWrapper>
      <SectionWrapper sectionIndex={6} transition="slide-right">
        <Work1 />
      </SectionWrapper>
      <SectionWrapper sectionIndex={7} transition="slide-left">
        <Work2 />
      </SectionWrapper>
      <SectionWrapper sectionIndex={8} transition="slide-right">
        <Work3 />
      </SectionWrapper>
      <SectionWrapper sectionIndex={9} transition="materialize">
        <Testimonials />
      </SectionWrapper>
      <SectionWrapper sectionIndex={10} transition="materialize">
        <Contact />
      </SectionWrapper>
      <SectionWrapper sectionIndex={11} transition="center-zoom">
        <Footer />
      </SectionWrapper>

      {/* Layer 3: UI Overlay */}
      <Nav />
      <ScrollProgress />
      <ScreenReaderStatus />
    </ScrollProvider>
  )
}

export default App
