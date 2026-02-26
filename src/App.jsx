import React from 'react';
import { ScrollProvider } from './context/ScrollContext';
import Scene from './components/three/Scene';
import SpatialGrid from './components/three/SpatialGrid';
import SectionOverlay from './components/scroll/SectionOverlay';
import ScrollProgress from './components/scroll/ScrollProgress';
import ScreenReaderStatus from './components/scroll/ScreenReaderStatus';
import BackButton from './components/scroll/BackButton';
import Header from './components/header/Header';
import CTA from './components/header/CTA';
import Nav from './components/nav/Nav';
import ME from './assets/me.png';
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
      <SectionOverlay sectionIndex={0}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center' }}>
          <img
            src={ME}
            alt="Travis Stephenson"
            style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover',
                     border: '3px solid rgba(124,111,247,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          />
          <Header />
          <CTA />
        </div>
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
        <WorkPanel items={mobileApps} title="Featured Work -Mobile Apps" />
      </SectionOverlay>
      <SectionOverlay sectionIndex={7}>
        <WorkPanel items={platforms} title="Featured Work -Platforms" />
      </SectionOverlay>
      <SectionOverlay sectionIndex={8}>
        <WorkPanel items={aiWork} title="Featured Work -AI" />
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
      <BackButton />
      <ScrollProgress />
      <ScreenReaderStatus />
    </ScrollProvider>
  );
};

export default App;
