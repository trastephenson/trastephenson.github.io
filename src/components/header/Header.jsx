import React from 'react';
import styled from 'styled-components';
import profile from '../../content/profile.json';

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
  font-size: clamp(0.74rem, 1.7vw, 0.94rem);
  font-weight: 700;
  font-family: var(--font-body);
  letter-spacing: 0.06em;
  text-transform: none;
  margin-top: 0.9rem;
  opacity: 0.88;
  max-width: min(92vw, 52rem);
  line-height: 1.5;
`;

const HeroTitleLine = styled.span`
  display: block;
`;

const Header = () => (
  <HeroContainer>
    <HeroName>{profile.name}</HeroName>
    <HeroTitle>
      {profile.headlineDisplayLines.map((line) => (
        <HeroTitleLine key={line}>{line}</HeroTitleLine>
      ))}
    </HeroTitle>
  </HeroContainer>
);

export default Header;
