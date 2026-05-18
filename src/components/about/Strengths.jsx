import React from 'react';
import styled from 'styled-components';
import profile from '../../content/profile.json';

const StrengthsContainer = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
`;

const BulletList = styled.ul`
  text-align: left;
  max-width: 46rem;
  margin: 0 auto;
  color: var(--text-secondary);
  line-height: 1.9;
  font-size: 1rem;

  li {
    padding-left: 0.75rem;
    position: relative;
    list-style: none;

    &::before {
      content: '->';
      color: var(--accent);
      position: absolute;
      left: -1rem;
      top: 0;
      font-family: var(--font-display);
      font-weight: 700;
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    line-height: 1.75;
  }
`;

const OpenTo = styled.p`
  color: var(--text-secondary);
  margin-top: 1.5rem;
  font-size: 0.95rem;
  line-height: var(--leading-body);

  strong {
    color: var(--accent);
  }
`;

const Strengths = () => {
  return (
    <StrengthsContainer>
      <SectionTitle>{profile.strengths.title}</SectionTitle>
      <BulletList>
        {profile.strengths.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </BulletList>
      <OpenTo>
        <strong>{profile.strengths.openToLabel}</strong> {profile.availability.summary}
      </OpenTo>
    </StrengthsContainer>
  );
};

export default Strengths;
