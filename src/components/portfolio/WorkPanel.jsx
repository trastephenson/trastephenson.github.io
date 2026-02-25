import React from 'react';

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
  background: 'rgba(255,255,255,0.7)',
  border: '1px solid rgba(0, 136, 204, 0.15)',
  borderRadius: '12px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
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
};

const linkStyle = {
  color: '#0088cc',
  fontSize: '0.75rem',
  textDecoration: 'none',
  border: '1px solid rgba(0, 136, 204, 0.3)',
  padding: '0.25rem 0.7rem',
  borderRadius: '4px',
  fontFamily: "'Inter', sans-serif",
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
                  <a href={item.primaryUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    {item.primaryCta}
                  </a>
                )}
                {item.secondaryUrl && item.secondaryUrl !== '#contact' && (
                  <a href={item.secondaryUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                    {item.secondaryCta}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
