import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/case-study.css';
import { motionTokens } from '../styles/motionTokens';

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReducedMotion(event.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, []);

  return reducedMotion;
}

function useRevealObserver(ref, disabled) {
  const [visible, setVisible] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [disabled, ref]);

  return visible;
}

function formatAnimatedValue(value, progress) {
  const text = `${value}`;
  const numeric = text.match(/-?\d+(?:\.\d+)?/);

  if (!numeric) {
    return text;
  }

  const number = Number(numeric[0]);
  if (Number.isNaN(number)) {
    return text;
  }

  const current = number * progress;
  const formattedNumber = numeric[0].includes('.')
    ? current.toFixed(1).replace(/\.0$/, '')
    : `${Math.round(current)}`;

  return text.replace(numeric[0], formattedNumber);
}

function AnimatedStat({ num, label, reducedMotion, disableAnimation }) {
  const statRef = useRef(null);
  const isVisible = useRevealObserver(statRef, reducedMotion);
  const [progress, setProgress] = useState(reducedMotion || disableAnimation ? 1 : 0);

  useEffect(() => {
    if (disableAnimation || reducedMotion) {
      setProgress(1);
      return undefined;
    }

    if (!isVisible) {
      return undefined;
    }

    let animationFrame;
    const duration = motionTokens.slow * 1000;
    const start = performance.now();

    const tick = (now) => {
      const nextProgress = Math.min((now - start) / duration, 1);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [disableAnimation, isVisible, reducedMotion]);

  const displayNum = disableAnimation ? num : formatAnimatedValue(num, progress);

  return (
    <div className="case-study-stat" ref={statRef}>
      <span className="case-study-stat-num">{displayNum}</span>
      <span className="case-study-stat-label">{label}</span>
    </div>
  );
}

function HeroAnimationItem({ children, delayIndex }) {
  const delay = `${delayIndex * (motionTokens.fast * 0.6)}s`;

  return (
    <div className="case-study-hero-anim" style={{ '--case-delay': delay }}>
      {children}
    </div>
  );
}

export function Section({ label, title, children }) {
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef(null);
  const visible = useRevealObserver(sectionRef, reducedMotion);

  return (
    <section
      ref={sectionRef}
      className={`case-study-section case-study-reveal${visible ? ' is-visible' : ''}`}
    >
      {label ? <p className="case-study-section-eyebrow">{label}</p> : null}
      {title ? <h2 className="case-study-section-title">{title}</h2> : null}
      {children}
    </section>
  );
}

export function BodyText({ children }) {
  return <p className="case-study-body-text">{children}</p>;
}

export function BulletList({ children }) {
  return <ul className="case-study-bullets">{children}</ul>;
}

export function BulletItem({ prefix, children }) {
  return (
    <li className="case-study-bullet">
      {prefix ? <span className="case-study-bullet-prefix">{prefix} </span> : null}
      {children}
    </li>
  );
}

export function Callout({ label, children }) {
  return (
    <div className="case-study-callout">
      {label ? <span className="case-study-callout-label">{label}</span> : null}
      <BodyText>{children}</BodyText>
    </div>
  );
}

export function CalloutPanel({ label, children }) {
  return (
    <div className="case-study-callout case-study-callout--freeform">
      {label ? <span className="case-study-callout-label">{label}</span> : null}
      {children}
    </div>
  );
}

export function TwoCol({ children }) {
  return <div className="case-study-two-col">{children}</div>;
}

export function MiniCard({ title, children }) {
  return (
    <div className="case-study-mini-card">
      {title ? <h3 className="case-study-mini-card-title">{title}</h3> : null}
      {children}
    </div>
  );
}

export function FeatureRow({ feature, problem, decision }) {
  return (
    <div className="case-study-feature-row">
      <div className="case-study-feature-cell case-study-feature-cell--feature">
        <span className="case-study-feature-cell-label">Feature</span>
        <div className="case-study-feature-cell-text">{feature}</div>
      </div>
      <div className="case-study-feature-cell">
        <span className="case-study-feature-cell-label">Problem</span>
        <div className="case-study-feature-cell-text">{problem}</div>
      </div>
      <div className="case-study-feature-cell case-study-feature-cell--decision">
        <span className="case-study-feature-cell-label">Decision</span>
        <div className="case-study-feature-cell-text">{decision}</div>
      </div>
    </div>
  );
}

export function PerfTable({ rows }) {
  return (
    <div className="case-study-table-wrap">
      <table className="case-study-table">
        <thead>
          <tr>
            <th>Optimization</th>
            <th>Before</th>
            <th>After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.opt}>
              <td>{row.opt}</td>
              <td className="is-before">{row.before}</td>
              <td className="is-after">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Divider() {
  return <hr className="case-study-divider" />;
}

export function ShowcaseGrid({ columns = 2, children }) {
  return (
    <div
      className="case-study-media-grid"
      style={{ '--case-study-media-columns': `${columns}` }}
    >
      {children}
    </div>
  );
}

export function ShowcaseImage({
  src,
  alt,
  caption,
  fit = 'cover',
  ratio = '16 / 9',
}) {
  return (
    <figure
      className="case-study-media"
      style={{
        '--case-study-media-fit': fit,
        '--case-study-media-ratio': ratio,
      }}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption ? <figcaption className="case-study-media-caption">{caption}</figcaption> : null}
    </figure>
  );
}

export function ShowcaseVideo({
  src,
  poster,
  caption,
  captionsSrc,
  label = 'Product sizzle reel',
  ratio = '16 / 9',
}) {
  return (
    <figure
      className="case-study-media"
      style={{
        '--case-study-media-fit': 'cover',
        '--case-study-media-ratio': ratio,
      }}
    >
      <video
        aria-label={label}
        controls
        playsInline
        poster={poster}
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        {captionsSrc ? (
          <track
            default
            kind="captions"
            label="English"
            src={captionsSrc}
            srcLang="en"
          />
        ) : null}
        Your browser does not support embedded video.
      </video>
      {caption ? <figcaption className="case-study-media-caption">{caption}</figcaption> : null}
    </figure>
  );
}

function NavButton({ href, variant, children }) {
  return (
    <a
      className={`case-study-btn ${
        variant === 'secondary' ? 'case-study-btn--secondary' : 'case-study-btn--primary'
      }`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export default function CaseStudyPage({
  accentColor,
  eyebrow,
  title,
  subtitle,
  subtitleSupporting,
  heroMetrics,
  heroMyRole,
  meta,
  stats,
  liveUrl,
  pdfUrl,
  returnToSectionIndex = 6,
  children,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';

    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pageStyle = useMemo(
    () => ({
      '--accent': `#${accentColor}`,
    }),
    [accentColor]
  );

  return (
    <div className="case-study-page" style={pageStyle}>
      <nav className={`case-study-nav${isScrolled ? ' is-scrolled' : ''}`} aria-label="Case study">
        <Link className="case-study-back-link" to="/" state={{ returnToSection: returnToSectionIndex }}>
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Portfolio
        </Link>
        <div className="case-study-nav-actions">
          {liveUrl ? <NavButton href={liveUrl}>View Live -&gt;</NavButton> : null}
          {pdfUrl ? (
            <NavButton href={pdfUrl} variant="secondary">
              Case Study PDF
            </NavButton>
          ) : null}
        </div>
      </nav>

      <div className="case-study-shell">
        <header className="case-study-hero">
          <HeroAnimationItem delayIndex={0}>
            <p className="case-study-eyebrow">{eyebrow}</p>
          </HeroAnimationItem>
          <HeroAnimationItem delayIndex={1}>
            <h1 className="case-study-title">{title}</h1>
          </HeroAnimationItem>
          <HeroAnimationItem delayIndex={2}>
            <p className="case-study-subtitle">{subtitle}</p>
            {subtitleSupporting ? (
              <p className="case-study-subtitle case-study-subtitle--supporting">{subtitleSupporting}</p>
            ) : null}
            {heroMetrics ? (
              <p className="case-study-hero-metrics" role="presentation">
                {heroMetrics}
              </p>
            ) : null}
            {heroMyRole ? (
              <div className="case-study-hero-my-role">
                <div className="case-study-mini-card">
                  <p className="case-study-hero-my-role-label">My Role</p>
                  <p className="case-study-body-text case-study-body-text--tight">{heroMyRole}</p>
                </div>
              </div>
            ) : null}
          </HeroAnimationItem>
          <HeroAnimationItem delayIndex={3}>
            <div className="case-study-meta">
              {meta.map((item) => (
                <span className="case-study-meta-pill" key={`${item.label}-${item.value}`}>
                  <strong>{item.label}:</strong> {item.value}
                </span>
              ))}
            </div>
          </HeroAnimationItem>
          {(liveUrl || pdfUrl) && (
            <HeroAnimationItem delayIndex={4}>
              <div className="case-study-hero-actions">
                {liveUrl ? <NavButton href={liveUrl}>View Live -&gt;</NavButton> : null}
                {pdfUrl ? (
                  <NavButton href={pdfUrl} variant="secondary">
                    Case Study PDF
                  </NavButton>
                ) : null}
              </div>
            </HeroAnimationItem>
          )}
        </header>

        <section className="case-study-stats" aria-label="Key stats">
          {stats.map((item) => (
            <AnimatedStat
              key={`${item.num}-${item.label}`}
              num={item.num}
              label={item.label}
              reducedMotion={reducedMotion}
              disableAnimation={item.disableAnimation}
            />
          ))}
        </section>

        <main className="case-study-content">{children}</main>

        <Section label="Next Step" title="Let's Talk About the Build">
          <div className="case-study-closing-cta">
            <BodyText>
              If you want a deeper walkthrough of the product, platform decisions, or delivery
              approach, I can walk through the architecture and tradeoffs in detail.
            </BodyText>
            <div className="case-study-hero-actions">
              <Link className="case-study-btn case-study-btn--primary" to="/" state={{ returnToSection: 10 }}>
                Contact Travis
              </Link>
              {liveUrl ? (
                <NavButton href={liveUrl} variant="secondary">
                  View Live -&gt;
                </NavButton>
              ) : null}
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
