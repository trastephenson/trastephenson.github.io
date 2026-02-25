/**
 * CardPreview — section-specific mini content rendered inside each 3D card
 * via drei Html transform mode. Container is 840 × 540 px (aspect = CARD_W/CARD_H).
 * Font/image sizes are scaled up so they read clearly at card-display size.
 */
import React from 'react';
import TRAVITAR from '../../assets/travitar9000.gif';
import ME_ABOUT from '../../assets/me-about.png';
import IMG_SOT from '../../assets/sot.png';
import IMG_APP from '../../assets/portfolio3.gif';
import IMG_CAMS from '../../assets/CAMS.png';
import IMG_SAFETY from '../../assets/Safety.png';
import IMG_AI from '../../assets/portfolio5.png';
import IMG_BERT from '../../assets/bert.jpg';
import { ACCENT_COLORS } from '../../utils/cardLayout';

const W = 840;
const H = 540;

// Shared container style
const wrap = (accentColor) => ({
  width: `${W}px`,
  height: `${H}px`,
  overflow: 'hidden',
  boxSizing: 'border-box',
  fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
  pointerEvents: 'none',
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
  background: 'transparent',
  // 5px accent stripe at the very top, matching the card accent colour
  borderTop: `5px solid ${accentColor}`,
});

// ── 0: Hello ──────────────────────────────────────────────────────────────
function HelloPreview({ c }) {
  return (
    <div style={{ ...wrap(c), alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '32px' }}>
      <img
        src={TRAVITAR}
        alt="Travis"
        style={{ width: '170px', height: '170px', borderRadius: '50%', objectFit: 'cover',
                 border: `4px solid ${c}44` }}
      />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '52px', fontWeight: 900, color: '#111', lineHeight: 1.1 }}>
          Travis<br />Stephenson
        </div>
        <div style={{ marginTop: '12px', fontSize: '26px', fontWeight: 500, color: '#666',
                      letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Principal Solutions Architect
        </div>
      </div>
    </div>
  );
}

// ── 1: Tagline ─────────────────────────────────────────────────────────────
function TaglinePreview({ c }) {
  return (
    <div style={{ ...wrap(c), justifyContent: 'center', padding: '50px 56px', gap: '18px' }}>
      <div style={{ fontSize: '44px', fontWeight: 800, color: '#111', lineHeight: 1.25 }}>
        Technical Product<br />&amp; Platform Leader
      </div>
      <div style={{ fontSize: '28px', fontWeight: 400, color: '#666', lineHeight: 1.5 }}>
        AI Engineering (MS) · Cloud-native platforms<br />
        AI-enabled automation · Architecture leadership
      </div>
    </div>
  );
}

// ── 2: About Me ────────────────────────────────────────────────────────────
function AboutPreview({ c }) {
  return (
    <div style={{ ...wrap(c), flexDirection: 'row', alignItems: 'center', gap: '36px', padding: '44px 48px' }}>
      <img
        src={ME_ABOUT}
        alt="Travis Stephenson"
        style={{ width: '195px', height: '195px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
      <div>
        <div style={{ fontSize: '40px', fontWeight: 700, color: '#111', lineHeight: 1.25, marginBottom: '14px' }}>
          10+ Years<br />Cloud &amp; Product
        </div>
        <div style={{ fontSize: '26px', fontWeight: 400, color: '#555', lineHeight: 1.55 }}>
          Bridging architecture, product<br />strategy &amp; delivery governance
        </div>
      </div>
    </div>
  );
}

// ── Generic: tag-cloud cards (Strengths, Experience, Tools) ───────────────
function TagCloudPreview({ c, title, tags }) {
  return (
    <div style={{ ...wrap(c), padding: '36px', gap: '18px' }}>
      <div style={{ fontSize: '32px', fontWeight: 700, color: '#111',
                    textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {tags.map(t => (
          <span key={t} style={{
            fontSize: '24px', fontWeight: 500, padding: '7px 18px',
            borderRadius: '50px',
            background: `${c}11`,
            border: `1px solid ${c}33`,
            color: '#333',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Generic: photo-grid cards (Mobile Apps, Platforms, AI Work) ───────────
function PhotoGridPreview({ c, title, items }) {
  return (
    <div style={{ ...wrap(c), padding: '32px', gap: '16px' }}>
      <div style={{ fontSize: '32px', fontWeight: 700, color: '#111',
                    textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {title}
      </div>
      <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: '12px', overflow: 'hidden',
            border: '1px solid rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column',
          }}>
            <img src={item.img} alt={item.title}
                 style={{ width: '100%', flex: 1, objectFit: 'cover', minHeight: 0 }} />
            <div style={{ padding: '12px 16px', fontSize: '22px', fontWeight: 600, color: '#111',
                          background: 'rgba(255,255,255,0.9)', flexShrink: 0 }}>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 9: Testimonials ────────────────────────────────────────────────────────
function TestimonialsPreview({ c }) {
  return (
    <div style={{ ...wrap(c), justifyContent: 'center', padding: '44px 52px', gap: '20px' }}>
      <div style={{ fontSize: '80px', color: '#ccc', lineHeight: 0.7, fontFamily: 'Georgia, serif' }}>"</div>
      <div style={{ fontSize: '30px', fontStyle: 'italic', color: '#333', lineHeight: 1.55 }}>
        Travis consistently delivered beyond expectations — a rare combination of technical depth and business alignment.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <img src={IMG_BERT} alt="Reviewer"
             style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ fontSize: '24px', fontWeight: 600, color: '#777' }}>
          Bert Deceuninck — Manager
        </div>
      </div>
    </div>
  );
}

// ── 10: Contact ────────────────────────────────────────────────────────────
function ContactPreview({ c }) {
  return (
    <div style={{ ...wrap(c), justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '44px' }}>
      <div style={{ fontSize: '88px', lineHeight: 1, color: c }}>✉</div>
      <div style={{ fontSize: '48px', fontWeight: 800, color: '#111', textAlign: 'center' }}>
        Let's Connect
      </div>
      <div style={{ fontSize: '26px', color: '#777', textAlign: 'center', lineHeight: 1.5 }}>
        Open to architecture consulting,<br />advisory &amp; senior product leadership
      </div>
    </div>
  );
}

// ── 11: Footer ─────────────────────────────────────────────────────────────
function FooterPreview({ c }) {
  return (
    <div style={{ ...wrap(c), justifyContent: 'center', alignItems: 'center', gap: '28px', padding: '44px' }}>
      <div style={{ fontSize: '46px', fontWeight: 800, color: '#111' }}>Travis Stephenson</div>
      <div style={{ display: 'flex', gap: '20px' }}>
        {['LinkedIn', 'GitHub', 'Email'].map(l => (
          <span key={l} style={{
            padding: '12px 28px', borderRadius: '12px', fontSize: '28px',
            fontWeight: 600, background: `${c}14`, color: '#333',
            border: `1px solid ${c}33`,
          }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ── Dispatcher ────────────────────────────────────────────────────────────
const SKILLS = ['React', 'Node.js', 'Python', 'AWS', 'TypeScript', 'Docker', 'GraphQL', 'System Design'];
const EXP    = ['Solutions Architecture', 'Technical Leadership', 'Cloud Strategy', 'Product Delivery', 'AI/ML Integration', 'Team Mentoring'];
const TOOLS  = ['Figma', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jira', 'Confluence', 'GitHub'];

export default function CardPreview({ index }) {
  const c = ACCENT_COLORS[index] ?? '#888';
  switch (index) {
    case 0:  return <HelloPreview c={c} />;
    case 1:  return <TaglinePreview c={c} />;
    case 2:  return <AboutPreview c={c} />;
    case 3:  return <TagCloudPreview c={c} title="Core Skills" tags={SKILLS} />;
    case 4:  return <TagCloudPreview c={c} title="Experience" tags={EXP} />;
    case 5:  return <TagCloudPreview c={c} title="Tools & Stack" tags={TOOLS} />;
    case 6:  return <PhotoGridPreview c={c} title="Mobile Apps"
               items={[{ img: IMG_SOT, title: 'Seeds of Thyme' }, { img: IMG_APP, title: 'Essential Life' }]} />;
    case 7:  return <PhotoGridPreview c={c} title="Platforms"
               items={[{ img: IMG_CAMS, title: 'CAMS ATM' }, { img: IMG_SAFETY, title: 'Safety Wallet' }]} />;
    case 8:  return <PhotoGridPreview c={c} title="AI Work"
               items={[{ img: IMG_AI, title: 'GenAI / LLM Workflows' }]} />;
    case 9:  return <TestimonialsPreview c={c} />;
    case 10: return <ContactPreview c={c} />;
    case 11: return <FooterPreview c={c} />;
    default: return null;
  }
}
