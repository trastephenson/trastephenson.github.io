import React, { useState, useEffect } from 'react';
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

const toggleBtnStyle = {
  position: 'fixed',
  top: '1.25rem',
  right: '1.25rem',
  zIndex: 9999,
  padding: '0.48rem 1.1rem',
  borderRadius: '50px',
  border: '1.5px solid rgba(0,0,0,0.13)',
  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(16px) saturate(200%)',
  WebkitBackdropFilter: 'blur(16px) saturate(200%)',
  color: '#1a1a2e',
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  boxShadow: '0 2px 14px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,1)',
  fontFamily: "'Inter', sans-serif",
  lineHeight: 1,
  transition: 'all 0.2s ease',
};

const sectionGap = { paddingTop: '3rem', paddingBottom: '2rem' };

const App = () => {
  const [viewMode, setViewMode] = useState('3d');

  // Toggle native body scroll when switching modes
  useEffect(() => {
    if (viewMode === 'classic') {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    }
  }, [viewMode]);

  const toggleBtn = (
    <button
      style={toggleBtnStyle}
      onClick={() => setViewMode(m => m === '3d' ? 'classic' : '3d')}
      aria-label={viewMode === '3d' ? 'Switch to classic view' : 'Switch to 3D view'}
    >
      {viewMode === '3d' ? 'Classic View' : '3D View'}
    </button>
  );

  return (
    <ScrollProvider viewMode={viewMode}>
      {toggleBtn}

      {viewMode === '3d' ? (
        <>
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
        </>
      ) : (
        <>
          {/* Classic scrollable layout — same content, no 3D */}
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 8rem' }}>

            <div id="home" style={{ paddingTop: '5rem', paddingBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
              <img
                src={ME}
                alt="Travis Stephenson"
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover',
                         border: '3px solid rgba(124,111,247,0.22)', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              />
              <Header />
              <CTA />
            </div>

            <div id="about" style={sectionGap}><About /></div>
            <div id="strengths" style={sectionGap}><Strengths /></div>
            <div id="experience" style={sectionGap}><Experience /></div>
            <div id="services" style={sectionGap}><Services /></div>

            <div id="portfolio" style={{ ...sectionGap, display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <WorkPanel items={mobileApps} title="Featured Work - Mobile Apps" />
              <WorkPanel items={platforms} title="Featured Work - Platforms" />
              <WorkPanel items={aiWork} title="Featured Work - AI" />
            </div>

            <div id="testimonials" style={sectionGap}><Testimonials /></div>
            <div id="contact" style={sectionGap}><Contact /></div>
            <Footer />
          </div>

          {/* Keep Nav — scrollTo does DOM scrollIntoView in classic mode */}
          <Nav />
        </>
      )}
    </ScrollProvider>
  );
};

export default App;
