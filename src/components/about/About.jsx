import React from 'react';
import styled from 'styled-components';
import ME from '../../assets/me-about.png';

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  align-items: start;
  gap: clamp(2rem, 5vw, 4.5rem);
  width: 100%;

  @media screen and (max-width: 860px) {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }
`;

const PortraitColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: min(100%, 280px);
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 2rem;
  padding: 0.55rem;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.84) 0%, rgba(255, 255, 255, 0.34) 42%, rgba(255, 255, 255, 0.18) 100%),
    linear-gradient(145deg, color-mix(in srgb, var(--accent) 18%, white) 0%, rgba(255, 255, 255, 0.22) 100%);
  border: 1px solid color-mix(in srgb, var(--accent) 18%, white);
  box-shadow:
    0 26px 50px rgba(20, 24, 30, 0.12),
    0 10px 22px rgba(20, 24, 30, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.92);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: -10% auto auto -14%;
    width: 62%;
    height: 40%;
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.08) 100%);
    filter: blur(14px);
    opacity: 0.88;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    right: -8%;
    bottom: -12%;
    width: 46%;
    height: 34%;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(183, 112, 69, 0.22) 0%, rgba(183, 112, 69, 0) 72%);
    filter: blur(16px);
    pointer-events: none;
  }

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 1.55rem;
    object-fit: cover;
    object-position: center 24%;
  }
`;

const PhotoMeta = styled.div`
  padding: 1rem 1.05rem;
  border-radius: 1.4rem;
  background: color-mix(in srgb, var(--bg-surface) 86%, white);
  border: 1px solid color-mix(in srgb, var(--accent) 14%, white);
  box-shadow: var(--shadow-sm);
`;

const MetaEyebrow = styled.div`
  color: var(--accent);
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const MetaTitle = styled.div`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  margin-top: 0.35rem;
`;

const MetaNote = styled.div`
  color: var(--text-secondary);
  font-size: 0.84rem;
  line-height: 1.6;
  margin-top: 0.4rem;
`;

const BioText = styled.div`
  max-width: 46rem;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: var(--leading-body);
  font-family: var(--font-body);
  padding-top: clamp(0.2rem, 1vw, 0.7rem);

  p {
    margin-bottom: 1rem;
  }

  strong {
    color: var(--text-primary);
  }

  @media screen and (max-width: 860px) {
    padding-top: 0;
  }
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 1.75rem;
  text-align: center;
`;

const About = () => {
  return (
    <section>
      <SectionTitle>About Me</SectionTitle>
      <AboutGrid>
        <PortraitColumn>
          <PhotoWrapper>
            <img src={ME} alt="Travis Stephenson" />
          </PhotoWrapper>
          <PhotoMeta>
            <MetaEyebrow>Engineering Leadership</MetaEyebrow>
            <MetaTitle>Director of Engineering Operations</MetaTitle>
            <MetaNote>AI platforms, SaaS delivery, and multi-agent systems from strategy through production.</MetaNote>
          </PhotoMeta>
        </PortraitColumn>
        <BioText>
          <p>
            <strong>Director of Engineering Operations</strong> with 10+ years delivering
            enterprise SaaS, AI systems, and software platforms from architecture through
            production. I turn executive strategy into governed roadmaps, scalable systems,
            and shipped products that create measurable business value, including platforms
            supporting 500,000+ users.
          </p>
          <p>
            At Appstango, I&apos;ve led delivery across 5+ production platforms spanning
            mobile apps, backend services, and AI-enabled systems, aligning engineering,
            product, and stakeholders to move complex initiatives from concept to launch. My
            work has focused on reducing ambiguity in large builds, improving delivery
            execution, and putting the architecture and operational processes in place to
            support real-world scale.
          </p>
          <p>
            I partner with product, data, and executive leadership to drive AI platform
            strategy, delivery governance, and technical decision-making across multi-team
            environments - bringing structure, velocity, and clarity to high-stakes software
            initiatives.
          </p>
        </BioText>
      </AboutGrid>
    </section>
  );
};

export default About;
