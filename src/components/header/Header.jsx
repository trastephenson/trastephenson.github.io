import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const HeroName = styled.h1`
  color: var(--text-primary);
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 900;
  font-family: 'Inter', sans-serif;
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.1;
  margin: 0;
`;

const HeroTitle = styled.h2`
  color: var(--text-secondary);
  font-size: clamp(1rem, 3vw, 1.4rem);
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-top: 1rem;
  opacity: 0.9;
`;

const Header = () => {
  return (
    <HeroContainer>
      <HeroName>Travis Stephenson</HeroName>
      <HeroTitle>Principal Solutions Architect</HeroTitle>
    </HeroContainer>
  );
};

export default Header;
