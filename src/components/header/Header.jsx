import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 0.25rem 1rem;
`;

const HeroName = styled.h1`
  color: var(--text-primary);
  font-size: clamp(1.8rem, 6vw, 3.5rem);
  font-weight: 900;
  font-family: 'Inter', sans-serif;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.85),
    0 2px 0 rgba(0,0,0,0.06),
    0 3px 0 rgba(0,0,0,0.04),
    0 4px 12px rgba(0,0,0,0.12);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.1;
  margin: 0;
`;

const HeroTitle = styled.h2`
  color: var(--text-secondary);
  font-size: clamp(0.85rem, 2.4vw, 1.15rem);
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.75rem;
  opacity: 0.9;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.7),
    0 1px 4px rgba(0,0,0,0.08);
`;

const Header = () => {
  return (
    <HeroContainer>
      <HeroName>Travis Stephenson</HeroName>
      <HeroTitle>Director of Engineering Operations · AI Platform Architecture</HeroTitle>
    </HeroContainer>
  );
};

export default Header;
