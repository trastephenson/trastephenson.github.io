import React from 'react';
import styled from 'styled-components';

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
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-secondary);
  line-height: 1.9;
  font-size: 1rem;

  li {
    padding-left: 0.75rem;
    position: relative;

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
      <SectionTitle>What I Do Best</SectionTitle>
      <BulletList>
        <li>Architect and operate multi-agent LLM systems and RAG pipelines at enterprise scale.</li>
        <li>Drive engineering operations, delivery governance, and cloud-native SaaS strategy.</li>
        <li>Lead cross-functional execution across engineering, product, data, and C-suite stakeholders.</li>
        <li>Define platform architecture across AWS, APIs, data models, reliability, and scalability.</li>
      </BulletList>
      <OpenTo>
        <strong>Open to:</strong> Director of Engineering, AI Platform Architecture, and
        Principal Architect roles - enterprise SaaS, multi-agent systems, and AI-enabled
        platform delivery.
      </OpenTo>
    </StrengthsContainer>
  );
};

export default Strengths;
