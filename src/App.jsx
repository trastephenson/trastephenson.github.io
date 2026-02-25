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
// Portfolio data is now rendered as 3D cards via WorkCard3D in Scene
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
      {/* Sections 6-8: Portfolio work cards rendered in 3D layer via WorkCard3D */}
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
