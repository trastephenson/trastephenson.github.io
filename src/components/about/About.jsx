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
  border: 2px solid rgba(0, 240, 255, 0.15);
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.1);

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
            I'm a <strong>Principal-level Solutions Architect</strong> and Technical Product Leader with 10+ years of experience delivering cloud-scale platforms across mobile, backend, and AI-enabled systems.
          </p>
          <p>
            My work bridges solution architecture, product strategy, and delivery governance — helping organizations translate complex business goals into scalable, production-ready systems.
          </p>
        </BioText>
      </AboutGrid>
    </section>
  );
};

export default About;
