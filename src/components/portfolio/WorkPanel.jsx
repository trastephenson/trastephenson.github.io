import React from 'react';
import SleekButton from '../common/SleekButton';

const headingStyle = {
  color: '#0088cc',
  fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  fontFamily: "'Inter', sans-serif",
  marginBottom: '1.5rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: '1.25rem',
};

const cardStyle = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.88) 0%, rgba(247,249,255,0.84) 100%)',
  backdropFilter: 'blur(28px) saturate(200%) brightness(112%)',
  WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(112%)',
  border: '1px solid rgba(255,255,255,0.75)',
  borderTop: '1.5px solid rgba(255,255,255,0.96)',
  borderRadius: '16px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.95)',
};

const imgStyle = {
  width: '100%',
  height: '160px',
  objectFit: 'cover',
};

const bodyStyle = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  flex: 1,
};

const titleStyle = {
  color: '#1a1a2e',
  fontWeight: 700,
  fontSize: '0.95rem',
  fontFamily: "'Inter', sans-serif",
  margin: 0,
};

const summaryStyle = {
  color: 'rgba(40, 50, 70, 0.75)',
  fontSize: '0.82rem',
  lineHeight: 1.55,
  margin: 0,
  flex: 1,
};

const btnRowStyle = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  marginTop: '0.25rem',
  justifyContent: 'center',
};

// Blue compact theme — smaller pill, side-by-side fit, blue fill on hover
const BTN_COLOR = {
  '--btn-text': '#0088cc',
  '--btn-fill': '#0088cc',
  '--btn-pad-y': '0.55rem',
  '--btn-pad-x': '1rem',
  '--btn-font-size': '0.78rem',
};

export default function WorkPanel({ items, title }) {
  return (
    <div>
      <h2 style={headingStyle}>{title}</h2>
      <div style={gridStyle}>
        {items.map((item) => (
          <div key={item.id} style={cardStyle}>
            <img src={item.image} alt={item.title} style={imgStyle} />
            <div style={bodyStyle}>
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={summaryStyle}>{item.summary}</p>
              <div style={btnRowStyle}>
                {item.primaryUrl && item.primaryUrl !== '#contact' && (
                  <SleekButton style={BTN_COLOR}>
                    <a href={item.primaryUrl} target="_blank" rel="noopener noreferrer"
                       style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.primaryCta}
                    </a>
                  </SleekButton>
                )}
                {item.secondaryUrl && item.secondaryUrl !== '#contact' && (
                  <SleekButton style={BTN_COLOR}>
                    <a href={item.secondaryUrl} target="_blank" rel="noopener noreferrer"
                       style={{ color: 'inherit', textDecoration: 'none' }}>
                      {item.secondaryCta}
                    </a>
                  </SleekButton>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
