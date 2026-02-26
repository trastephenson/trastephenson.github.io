import React from 'react';
import styled from 'styled-components';
import ME from '../../assets/me-about.png';

const AboutGrid = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 4vw, 3rem);
  width: 100%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const PhotoWrapper = styled.div`
  flex-shrink: 0;
  width: clamp(120px, 20vw, 200px);
  height: clamp(120px, 20vw, 200px);
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 136, 204, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BioText = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.7;

  p {
    margin-bottom: 0.75rem;
  }

  strong {
    color: var(--text-primary);
  }
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.6),
    0 2px 0 rgba(0,100,180,0.15),
    0 3px 8px rgba(0,136,204,0.12);
`;

const About = () => {
  return (
    <section>
      <SectionTitle>About Me</SectionTitle>
      <AboutGrid>
        <PhotoWrapper>
          <img src={ME} alt="Travis Stephenson" />
        </PhotoWrapper>
        <BioText>
          <p>
            I'm a <strong>Director of Engineering Operations</strong> with 10+ years leading AI-enabled enterprise SaaS platforms from architecture through production delivery. I design and operate multi-agent LLM systems, RAG pipelines, and cloud-native platform infrastructure at scale.
          </p>
          <p>
            At Appstango, I lead engineering operations across the full platform lifecycle - translating executive strategy into governed technical roadmaps, shipping 5+ production platforms across mobile, backend, and AI systems, and aligning cross-functional teams around architecture decisions that hold under real enterprise load.
          </p>
          <p>
            I partner with product, data, and C-suite stakeholders to drive AI platform strategy, manage delivery governance, and bring clarity to complex, multi-team builds.
          </p>
        </BioText>
      </AboutGrid>
    </section>
  );
};

export default About;
