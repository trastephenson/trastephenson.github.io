import React from 'react';
import { ScrollProvider } from './context/ScrollContext';
import Scene from './components/three/Scene';
import SpatialGrid from './components/three/SpatialGrid';
import SectionOverlay from './components/scroll/SectionOverlay';
import ScrollProgress from './components/scroll/ScrollProgress';
import ScreenReaderStatus from './components/scroll/ScreenReaderStatus';
import Header from './components/header/Header';
import CTA from './components/header/CTA';
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Strengths from './components/about/Strengths';
import Experience from './components/experience/Experience';
import Services from './components/services/Services';
import { mobileApps, platforms, aiWork } from './components/portfolio/Portfolio';
import WorkPanel from './components/portfolio/WorkPanel';
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <ScrollProvider>
      {/* Layer 1: 3D scene — spatial grid of clickable section cards */}
      <Scene>
        <SpatialGrid />
      </Scene>

      {/* Layer 2: HTML content — CSS-positioned, scroll-driven overlays in the DOM */}
      <SectionOverlay sectionIndex={0} noPanel>
        <Header />
      </SectionOverlay>
      <SectionOverlay sectionIndex={1}>
        <CTA />
      </SectionOverlay>
      <SectionOverlay sectionIndex={2}>
        <About />
      </SectionOverlay>
      <SectionOverlay sectionIndex={3}>
        <Strengths />
      </SectionOverlay>
      <SectionOverlay sectionIndex={4}>
        <Experience />
      </SectionOverlay>
      <SectionOverlay sectionIndex={5}>
        <Services />
      </SectionOverlay>
      <SectionOverlay sectionIndex={6}>
        <WorkPanel items={mobileApps} title="Featured Work — Mobile Apps" />
      </SectionOverlay>
      <SectionOverlay sectionIndex={7}>
        <WorkPanel items={platforms} title="Featured Work — Platforms" />
      </SectionOverlay>
      <SectionOverlay sectionIndex={8}>
        <WorkPanel items={aiWork} title="Featured Work — AI" />
      </SectionOverlay>
      <SectionOverlay sectionIndex={9}>
        <Testimonials />
      </SectionOverlay>
      <SectionOverlay sectionIndex={10}>
        <Contact />
      </SectionOverlay>
      <SectionOverlay sectionIndex={11}>
        <Footer />
      </SectionOverlay>

      {/* Layer 3: Persistent UI overlay */}
      <Nav />
      <ScrollProgress />
      <ScreenReaderStatus />
    </ScrollProvider>
  );
};

export default App;
