import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollProvider, useScroll } from '../context/ScrollContext';
import LoadingScreen from '../components/common/LoadingScreen';
import SectionOverlay from '../components/scroll/SectionOverlay';
import ScrollProgress from '../components/scroll/ScrollProgress';
import ScreenReaderStatus from '../components/scroll/ScreenReaderStatus';
import BackButton from '../components/scroll/BackButton';
import Header from '../components/header/Header';
import CTA from '../components/header/CTA';
import Nav from '../components/nav/Nav';
import About from '../components/about/About';
import Strengths from '../components/about/Strengths';
import Experience from '../components/experience/Experience';
import Services from '../components/services/Services';
import { mobileApps, platforms, aiWork } from '../components/portfolio/Portfolio';
import WorkPanel from '../components/portfolio/WorkPanel';
import Testimonials from '../components/testimonials/Testimonials';
import Contact from '../components/contact/Contact';
import Footer from '../components/footer/Footer';
import ME from '../assets/me.png';
import profile from '../content/profile.json';

const Scene = lazy(() => import('../components/three/Scene'));
const SpatialGrid = lazy(() => import('../components/three/SpatialGrid'));
const COMPACT_BREAKPOINT = 768;

const statItems = profile.stats;

const toggleBtnStyle = {
  position: 'fixed',
  top: '1.25rem',
  right: '1.25rem',
  zIndex: 9000,
  padding: '0.48rem 1.1rem',
  borderRadius: '50px',
  border: '1px solid rgba(255,255,255,0.52)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.16) 100%)',
  backdropFilter: 'blur(28px) saturate(240%)',
  WebkitBackdropFilter: 'blur(28px) saturate(240%)',
  color: 'var(--text-primary)',
  fontSize: '0.68rem',
  fontWeight: 700,
  letterSpacing: '0.09em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  boxShadow:
    '0 16px 36px rgba(18, 25, 34, 0.12), 0 4px 10px rgba(18, 25, 34, 0.05), inset 0 1px 0 rgba(255,255,255,0.96), inset 0 -1px 0 rgba(255,255,255,0.18)',
  fontFamily: 'var(--font-display)',
  lineHeight: 1,
  transition: 'all 0.2s ease',
};

const sectionGap = { paddingTop: '3rem', paddingBottom: '2rem' };

const heroImageStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  border: '3px solid color-mix(in srgb, var(--accent) 24%, white)',
  boxShadow: 'var(--shadow-md)',
};

const statsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
  gap: '1rem',
};

const statCardStyle = {
  background: 'var(--glass-bg)',
  borderRadius: 'var(--radius-md)',
  padding: 'clamp(1rem, 3vw, 1.4rem)',
  textAlign: 'center',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--shadow-sm)',
  backdropFilter: 'blur(20px) saturate(170%)',
  WebkitBackdropFilter: 'blur(20px) saturate(170%)',
};

const primaryLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  minHeight: '44px',
  padding: '0.72rem 1.45rem',
  borderRadius: 'var(--radius-pill)',
  background: 'var(--accent)',
  color: '#fff',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: '0.8rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  boxShadow: '0 16px 34px color-mix(in srgb, var(--accent) 24%, transparent)',
};

const secondaryLinkStyle = {
  ...primaryLinkStyle,
  background: 'var(--bg-surface)',
  color: 'var(--text-primary)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--shadow-sm)',
};

const threeSceneFallbackStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 1,
  background:
    'radial-gradient(circle at top left, rgba(102, 212, 239, 0.1), transparent 24%), radial-gradient(circle at top right, rgba(183, 112, 69, 0.1), transparent 24%), linear-gradient(180deg, #f7f3ec 0%, #ebe4d8 100%)',
};

function useCompactViewport() {
  const [isCompactViewport, setIsCompactViewport] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= COMPACT_BREAKPOINT : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT}px)`);
    const handleChange = (event) => {
      setIsCompactViewport(event.matches);
    };

    setIsCompactViewport(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  return isCompactViewport;
}

function StatGrid() {
  return (
    <div style={statsGridStyle}>
      {statItems.map(({ num, label, sub }) => (
        <div key={label} style={statCardStyle}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
              lineHeight: 1,
            }}
          >
            {num}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--accent)',
              marginTop: '0.35rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              marginTop: '0.3rem',
              lineHeight: 1.55,
            }}
          >
            {sub}
          </div>
        </div>
      ))}
    </div>
  );
}

function ModeToggleButton({ viewMode, setViewMode, onPrepareMode, isCompactViewport }) {
  const [isHovered, setIsHovered] = useState(false);
  const [cornerIndex, setCornerIndex] = useState(0);
  const [isRelocating, setIsRelocating] = useState(false);
  const nextMode = viewMode === '3d' ? 'classic' : '3d';
  const nextModeLabel = nextMode === 'classic' ? 'Browse Mode' : 'Explore Mode';
  const nextModeAriaLabel =
    viewMode === '3d' ? 'Switch to browse mode' : 'Switch to explore mode';
  const shouldPulse = viewMode === 'classic';
  const toggleWidth = isCompactViewport ? '9.85rem' : '11.85rem';
  const toggleHeight = isCompactViewport ? '3.05rem' : '3.4rem';
  const edgeOffset = isCompactViewport ? '0.9rem' : '1.25rem';
  const cornerSequence = ['topRight', 'bottomLeft', 'topLeft', 'bottomRight'];
  const currentCorner = cornerSequence[cornerIndex];
  const nextCorner = cornerSequence[(cornerIndex + 1) % cornerSequence.length];
  const relocationKey = `${currentCorner}:${nextCorner}`;
  const sneakVectors = {
    'topRight:bottomLeft': {
      prepX: '10px',
      prepY: '-2px',
      driftX: '-8px',
      driftY: '6px',
      settleX: '-4px',
      settleY: '3px',
    },
    'bottomLeft:topLeft': {
      prepX: '-2px',
      prepY: '10px',
      driftX: '0px',
      driftY: '-8px',
      settleX: '0px',
      settleY: '-4px',
    },
    'topLeft:bottomRight': {
      prepX: '-10px',
      prepY: '-2px',
      driftX: '8px',
      driftY: '6px',
      settleX: '4px',
      settleY: '3px',
    },
    'bottomRight:topRight': {
      prepX: '2px',
      prepY: '10px',
      driftX: '0px',
      driftY: '-8px',
      settleX: '0px',
      settleY: '-4px',
    },
  };
  const activeSneakVector = sneakVectors[relocationKey] ?? {
    prepX: '0px',
    prepY: '0px',
    driftX: '0px',
    driftY: '0px',
    settleX: '0px',
    settleY: '0px',
  };
  const cornerPositions = {
    topRight: {
      top: edgeOffset,
      left: `calc(100vw - ${edgeOffset} - ${toggleWidth})`,
      transformOrigin: '100% 0%',
    },
    bottomLeft: {
      top: `calc(100vh - ${edgeOffset} - ${toggleHeight})`,
      left: edgeOffset,
      transformOrigin: '0% 100%',
    },
    topLeft: { top: edgeOffset, left: edgeOffset, transformOrigin: '0% 0%' },
    bottomRight: {
      top: `calc(100vh - ${edgeOffset} - ${toggleHeight})`,
      left: `calc(100vw - ${edgeOffset} - ${toggleWidth})`,
      transformOrigin: '100% 100%',
    },
  };

  const handleToggle = () => {
    onPrepareMode?.(nextMode);
    setViewMode(nextMode);
  };

  useEffect(() => {
    if (isCompactViewport) {
      setCornerIndex(0);
      setIsRelocating(false);
      return undefined;
    }

    const timers = [];

    const scheduleCycle = () => {
      const cycleTimer = window.setTimeout(() => {
        setIsRelocating(true);

        timers.push(
          window.setTimeout(() => {
            setCornerIndex((currentIndex) => (currentIndex + 1) % cornerSequence.length);
          }, 260)
        );

        timers.push(
          window.setTimeout(() => {
            setIsRelocating(false);
          }, 1440)
        );

        scheduleCycle();
      }, 60000);

      timers.push(cycleTimer);
    };

    scheduleCycle();

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [cornerSequence.length, isCompactViewport]);

  return (
    <div
      style={{
        position: 'fixed',
        top: cornerPositions[currentCorner].top,
        left: cornerPositions[currentCorner].left,
        zIndex: 9000,
        maxWidth: 'calc(100vw - 1.8rem)',
        transformOrigin: cornerPositions[currentCorner].transformOrigin,
        animation: shouldPulse ? 'mode-toggle-pulse 9.2s cubic-bezier(0.22, 1, 0.36, 1) infinite' : 'none',
        transition: 'top 1120ms cubic-bezier(0.2, 0.84, 0.2, 1), left 1120ms cubic-bezier(0.2, 0.84, 0.2, 1)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: isCompactViewport ? '-0.24rem' : '-0.38rem',
          borderRadius: '999px',
          background:
            nextMode === 'classic'
              ? 'radial-gradient(circle, rgba(183, 112, 69, 0.28) 0%, rgba(183, 112, 69, 0.12) 48%, rgba(183, 112, 69, 0) 78%)'
              : 'radial-gradient(circle, rgba(102, 212, 239, 0.32) 0%, rgba(102, 212, 239, 0.12) 46%, rgba(102, 212, 239, 0) 78%)',
          opacity: shouldPulse ? 0.74 : 0,
          pointerEvents: 'none',
          filter: 'blur(14px)',
          animation: shouldPulse ? 'mode-toggle-halo 9.2s cubic-bezier(0.22, 1, 0.36, 1) infinite' : 'none',
        }}
      />
      <button
        type="button"
        style={{
          ...toggleBtnStyle,
          position: 'relative',
          top: 'auto',
          right: 'auto',
          zIndex: 1,
          width: toggleWidth,
          minHeight: toggleHeight,
          padding: isCompactViewport ? '0.58rem 1rem' : '0.68rem 1.42rem',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.72)',
          background:
            isHovered
              ? 'linear-gradient(135deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.32) 42%, rgba(255,255,255,0.16) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0.26) 42%, rgba(255,255,255,0.12) 100%)',
          color: '#0d141c',
          boxShadow:
            isHovered
              ? '0 20px 44px rgba(18, 25, 34, 0.18), 0 8px 16px rgba(18, 25, 34, 0.08), inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,0.32)'
              : '0 14px 34px rgba(18, 25, 34, 0.14), 0 5px 12px rgba(18, 25, 34, 0.06), inset 0 1px 0 rgba(255,255,255,0.96), inset 0 -1px 0 rgba(255,255,255,0.2)',
          backdropFilter: 'blur(32px) saturate(255%)',
          WebkitBackdropFilter: 'blur(32px) saturate(255%)',
          overflow: 'hidden',
          isolation: 'isolate',
          '--mode-toggle-sneak-prep-x': activeSneakVector.prepX,
          '--mode-toggle-sneak-prep-y': activeSneakVector.prepY,
          '--mode-toggle-sneak-drift-x': activeSneakVector.driftX,
          '--mode-toggle-sneak-drift-y': activeSneakVector.driftY,
          '--mode-toggle-sneak-settle-x': activeSneakVector.settleX,
          '--mode-toggle-sneak-settle-y': activeSneakVector.settleY,
          transform: isRelocating ? 'translate3d(0, 0, 0)' : isHovered ? 'translateY(-1px)' : 'translateY(0)',
          transition:
            'transform 220ms var(--ease-standard), background 220ms var(--ease-standard), border-color 220ms var(--ease-standard), box-shadow 220ms var(--ease-standard)',
          animation: isRelocating ? 'mode-toggle-sneak 1440ms cubic-bezier(0.2, 0.84, 0.2, 1) both' : 'none',
          fontSize: isCompactViewport ? '0.62rem' : '0.68rem',
        }}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        aria-label={nextModeAriaLabel}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '1px',
            borderRadius: 'inherit',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.28) 28%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.14) 100%)',
            opacity: 1,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '8%',
            left: '9%',
            width: '52%',
            height: '40%',
            borderRadius: '999px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.08) 100%)',
            opacity: 0.98,
            filter: 'blur(6px)',
            transform: 'rotate(-7deg)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '14%',
            bottom: '12%',
            width: '58%',
            height: '34%',
            borderRadius: '999px',
            background:
              nextMode === 'classic'
                ? 'linear-gradient(90deg, rgba(183, 112, 69, 0.16) 0%, rgba(255,255,255,0.28) 34%, rgba(255,255,255,0) 100%)'
                : 'linear-gradient(90deg, rgba(102, 212, 239, 0.18) 0%, rgba(255,255,255,0.28) 34%, rgba(255,255,255,0) 100%)',
            opacity: 0.9,
            filter: 'blur(10px)',
            transform: 'rotate(3deg)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '0.65rem',
            top: '50%',
            width: '1.85rem',
            height: '1.85rem',
            borderRadius: '999px',
            background:
              nextMode === 'classic'
                ? 'radial-gradient(circle, rgba(183, 112, 69, 0.54) 0%, rgba(255,255,255,0.18) 32%, rgba(183, 112, 69, 0.12) 58%, rgba(183, 112, 69, 0) 100%)'
                : 'radial-gradient(circle, rgba(102, 212, 239, 0.58) 0%, rgba(255,255,255,0.18) 32%, rgba(102, 212, 239, 0.14) 58%, rgba(102, 212, 239, 0) 100%)',
            transform: 'translateY(-50%)',
            filter: 'blur(3.5px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '1px',
            borderRadius: 'inherit',
            border: '1px solid rgba(255,255,255,0.34)',
            opacity: 0.72,
            pointerEvents: 'none',
            zIndex: 0,
            mixBlendMode: 'screen',
          }}
        />
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: isCompactViewport ? '7.1rem' : '9rem',
            textShadow: '0 1px 0 rgba(255,255,255,0.48)',
            fontWeight: 800,
          }}
        >
          {nextModeLabel}
        </span>
      </button>
      <style>{`
        @keyframes mode-toggle-pulse {
          0%, 100% {
            transform: scale(1);
          }
          7% {
            transform: scale(1.024);
          }
          14% {
            transform: scale(1);
          }
          21% {
            transform: scale(1.03);
          }
          28% {
            transform: scale(1);
          }
          35% {
            transform: scale(1.024);
          }
          42% {
            transform: scale(1);
          }
        }

        @keyframes mode-toggle-halo {
          0%, 100% {
            opacity: 0.34;
            transform: scale(0.97);
          }
          7% {
            opacity: 0.84;
            transform: scale(1.12);
          }
          14% {
            opacity: 0.28;
            transform: scale(1);
          }
          21% {
            opacity: 0.88;
            transform: scale(1.15);
          }
          28% {
            opacity: 0.26;
            transform: scale(1);
          }
          35% {
            opacity: 0.82;
            transform: scale(1.12);
          }
          42% {
            opacity: 0.24;
            transform: scale(1);
          }
        }

        @keyframes mode-toggle-sneak {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          6% {
            transform: translate3d(-1.5px, 0.5px, 0) scale(0.994) rotate(-0.35deg);
          }
          12% {
            transform: translate3d(2px, -0.5px, 0) scale(0.992) rotate(0.38deg);
          }
          18% {
            transform: translate3d(-1.75px, 0.75px, 0) scale(0.99) rotate(-0.42deg);
          }
          24% {
            transform: translate3d(1px, -0.4px, 0) scale(0.992) rotate(0.24deg);
          }
          32% {
            transform: translate3d(var(--mode-toggle-sneak-prep-x), var(--mode-toggle-sneak-prep-y), 0) scale(0.95, 0.92);
          }
          52% {
            transform: translate3d(var(--mode-toggle-sneak-drift-x), var(--mode-toggle-sneak-drift-y), 0) scale(0.985, 0.97);
          }
          76% {
            transform: translate3d(var(--mode-toggle-sneak-settle-x), var(--mode-toggle-sneak-settle-y), 0) scale(1.01);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function HomePortfolioContent({ viewMode, setViewMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useScroll();
  const isCompactViewport = useCompactViewport();
  const responsiveSectionGap = {
    paddingTop: isCompactViewport ? '2rem' : sectionGap.paddingTop,
    paddingBottom: isCompactViewport ? '1.5rem' : sectionGap.paddingBottom,
  };
  const deferredSectionStyle = {
    contentVisibility: 'auto',
    containIntrinsicSize: isCompactViewport ? '480px' : '640px',
    contain: 'layout style paint',
  };

  useEffect(() => {
    if (location.state?.returnToSection === undefined) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      scrollTo(location.state.returnToSection);
      navigate(location.pathname, { replace: true, state: null });
    }, 60);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.state, navigate, scrollTo]);

  useEffect(() => {
    if (viewMode === 'classic') {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      return () => {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
      };
    }

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [viewMode]);

  const toggleBtn = (
    <ModeToggleButton
      viewMode={viewMode}
      setViewMode={setViewMode}
      onPrepareMode={() => {}}
      isCompactViewport={isCompactViewport}
    />
  );

  return (
    <>
      <LoadingScreen variant="initial" />
      {toggleBtn}

      {viewMode === '3d' ? (
        <>
          <Suspense fallback={<div style={threeSceneFallbackStyle} />}>
            <Scene>
              <SpatialGrid />
            </Scene>
          </Suspense>
          <SectionOverlay sectionIndex={0}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isCompactViewport ? '1rem' : '1.25rem',
                textAlign: 'center',
                padding: isCompactViewport ? '0 1rem' : undefined,
              }}
            >
              <img
                src={ME}
                alt="Travis Stephenson"
                style={{ ...heroImageStyle, width: '110px', height: '110px' }}
              />
              <Header />
              <CTA />
            </div>
          </SectionOverlay>
          <SectionOverlay sectionIndex={1}>
            <StatGrid />
          </SectionOverlay>
          <SectionOverlay sectionIndex={2}><About /></SectionOverlay>
          <SectionOverlay sectionIndex={3}><Strengths /></SectionOverlay>
          <SectionOverlay sectionIndex={4}><Experience /></SectionOverlay>
          <SectionOverlay sectionIndex={5}><Services /></SectionOverlay>
          <SectionOverlay sectionIndex={6}>
            <WorkPanel items={mobileApps} title="Featured Work - Mobile Apps" />
          </SectionOverlay>
          <SectionOverlay sectionIndex={7}>
            <WorkPanel items={platforms} title="Featured Work - Platforms" />
          </SectionOverlay>
          <SectionOverlay sectionIndex={8}>
            <WorkPanel items={aiWork} title="Featured Work - AI" />
          </SectionOverlay>
          <SectionOverlay sectionIndex={9}><Testimonials /></SectionOverlay>
          <SectionOverlay sectionIndex={10}><Contact /></SectionOverlay>
          <SectionOverlay sectionIndex={11}>
            <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <p
                style={{
                  maxWidth: '44rem',
                  margin: '0 auto 2rem',
                  fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                {profile.availability.summary}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  justifyContent: 'center',
                }}
              >
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={primaryLinkStyle}
                >
                  LinkedIn
                </a>
                <a href={profile.links.email} style={secondaryLinkStyle}>
                  Email
                </a>
              </div>
            </div>
          </SectionOverlay>

          <Nav />
          <BackButton />
          <ScrollProgress />
          <ScreenReaderStatus />
        </>
      ) : (
        <>
          <div
            style={{
              maxWidth: isCompactViewport ? '100%' : '960px',
              margin: '0 auto',
              padding: isCompactViewport ? '1rem 1rem 7rem' : '2rem 1.5rem 8rem',
            }}
          >
            <div
              id="home"
              style={{
                paddingTop: isCompactViewport ? '4.25rem' : '5rem',
                paddingBottom: isCompactViewport ? '2.25rem' : '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isCompactViewport ? '1.15rem' : '1.5rem',
                textAlign: 'center',
              }}
            >
              <img src={ME} alt="Travis Stephenson" style={heroImageStyle} />
              <Header />
              <CTA />
            </div>

            <div style={{ ...responsiveSectionGap, ...deferredSectionStyle, paddingTop: '0.5rem' }}>
              <StatGrid />
            </div>

            <div id="about" style={{ ...responsiveSectionGap, ...deferredSectionStyle }}><About /></div>
            <div id="strengths" style={{ ...responsiveSectionGap, ...deferredSectionStyle }}><Strengths /></div>
            <div id="experience" style={{ ...responsiveSectionGap, ...deferredSectionStyle }}><Experience /></div>
            <div id="services" style={{ ...responsiveSectionGap, ...deferredSectionStyle }}><Services /></div>

            <div
              id="portfolio"
              style={{
                ...responsiveSectionGap,
                ...deferredSectionStyle,
                display: 'flex',
                flexDirection: 'column',
                gap: isCompactViewport ? '2rem' : '2.5rem',
              }}
            >
              <WorkPanel items={mobileApps} title="Featured Work - Mobile Apps" />
              <WorkPanel items={platforms} title="Featured Work - Platforms" />
              <WorkPanel items={aiWork} title="Featured Work - AI" />
            </div>

            <div id="testimonials" style={{ ...responsiveSectionGap, ...deferredSectionStyle }}><Testimonials /></div>
            <div id="contact" style={{ ...responsiveSectionGap, ...deferredSectionStyle }}><Contact /></div>
            <Footer />
          </div>

          <Nav />
        </>
      )}
    </>
  );
}

export default function HomePortfolioPage() {
  const [viewMode, setViewMode] = useState('classic');

  return (
    <ScrollProvider viewMode={viewMode}>
      <HomePortfolioContent viewMode={viewMode} setViewMode={setViewMode} />
    </ScrollProvider>
  );
}
