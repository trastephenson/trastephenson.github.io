import React, { Suspense } from 'react';
import { ScrollProvider } from './context/ScrollContext';
import Scene from './components/three/Scene';
import SpatialSection from './components/three/SpatialSection';
import WorkCard3D from './components/three/WorkCard3D';
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
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <ScrollProvider>
      {/* Layer 1+2: 3D Scene with spatial content */}
      <Scene>
        {/* HTML sections positioned in 3D space */}
        <SpatialSection sectionIndex={0} noPanel>
          <Header />
        </SpatialSection>
        <SpatialSection sectionIndex={1}>
          <CTA />
        </SpatialSection>
        <SpatialSection sectionIndex={2}>
          <About />
        </SpatialSection>
        <SpatialSection sectionIndex={3}>
          <Strengths />
        </SpatialSection>
        <SpatialSection sectionIndex={4}>
          <Experience />
        </SpatialSection>
        <SpatialSection sectionIndex={5}>
          <Services />
        </SpatialSection>

        {/* 3D holographic work cards — isolated Suspense per card so texture loading doesn't block other sections */}
        <Suspense fallback={null}>
          <WorkCard3D items={mobileApps} sectionIndex={6} title="Featured Work — Mobile Apps" />
        </Suspense>
        <Suspense fallback={null}>
          <WorkCard3D items={platforms} sectionIndex={7} title="Featured Work — Platforms" />
        </Suspense>
        <Suspense fallback={null}>
          <WorkCard3D items={aiWork} sectionIndex={8} title="Featured Work — AI" />
        </Suspense>

        {/* More HTML sections */}
        <SpatialSection sectionIndex={9}>
          <Testimonials />
        </SpatialSection>
        <SpatialSection sectionIndex={10}>
          <Contact />
        </SpatialSection>
        <SpatialSection sectionIndex={11}>
          <Footer />
        </SpatialSection>
      </Scene>

      {/* Layer 3: UI Overlay (outside Canvas, in DOM) */}
      <Nav />
      <ScrollProgress />
      <ScreenReaderStatus />
    </ScrollProvider>
  );
};

export default App;
