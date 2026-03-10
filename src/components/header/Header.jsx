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
  font-size: clamp(2.3rem, 7vw, 4.8rem);
  font-weight: 700;
  font-family: var(--font-display);
  letter-spacing: -0.04em;
  line-height: 0.94;
  margin: 0;
`;

const HeroTitle = styled.h2`
  color: var(--text-secondary);
  font-size: clamp(0.75rem, 1.9vw, 0.95rem);
  font-weight: 700;
  font-family: var(--font-body);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-top: 0.9rem;
  opacity: 0.88;
`;

const Header = () => (
  <HeroContainer>
    <HeroName>Travis Stephenson</HeroName>
    <HeroTitle>
      Technical Product Manager &middot; Engineer &middot; Platform Architecture
    </HeroTitle>
  </HeroContainer>
);

export default Header;
