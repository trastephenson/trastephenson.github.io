import React from 'react';
import styled from 'styled-components';

const StrengthsContainer = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

const BulletList = styled.ul`
  text-align: left;
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary);
  line-height: 2;
  font-size: 1rem;

  li {
    padding-left: 0.5rem;
    position: relative;

    &::before {
      content: '\\25B8';
      color: var(--accent);
      position: absolute;
      left: -1rem;
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    line-height: 1.8;
  }
`;

const OpenTo = styled.p`
  color: var(--text-secondary);
  margin-top: 1.5rem;
  font-size: 0.95rem;

  strong {
    color: var(--accent);
  }
`;

const Strengths = () => {
  return (
    <StrengthsContainer>
      <SectionTitle>What I Do Best</SectionTitle>
      <BulletList>
        <li>Own solution architecture from discovery through delivery and production readiness</li>
        <li>Define cloud standards across AWS/Azure (APIs, data models, reliability practices)</li>
        <li>Lead cross-functional execution across engineering, product, design, and QA</li>
        <li>Integrate GenAI/LLM workflows for automation, search, summarization, and decision support</li>
      </BulletList>
      <OpenTo>
        <strong>Open to:</strong> Principal Solutions Architect and Director / Principal Technical Product roles (platform-scale and AI-enabled systems)
      </OpenTo>
    </StrengthsContainer>
  );
};

export default Strengths;
