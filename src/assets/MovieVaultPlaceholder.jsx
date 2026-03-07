import React from 'react';

const containerStyle = {
  width: '100%',
  aspectRatio: '2.42 / 1.12',
  background: 'linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 50%, #0088cc 100%)',
  borderRadius: 'var(--radius-md)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255,255,255,0.4)',
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-sm)',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

const MovieVaultPlaceholder = () => (
  <div aria-hidden="true" style={containerStyle}>
    Movie Vault
  </div>
);

export default MovieVaultPlaceholder;
