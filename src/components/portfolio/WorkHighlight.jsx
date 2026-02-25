import React from 'react';
import styled from 'styled-components';
import SleekButton from '../common/SleekButton';
import { useScroll } from '../../context/ScrollContext';

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  width: 100%;
`;

const Card = styled.div`
  flex: 1 1 280px;
  max-width: 480px;
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.08);
    transform: translateY(-4px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }

  @media screen and (max-width: 600px) {
    height: 140px;
  }
`;

const CardBody = styled.div`
  padding: 1.2rem;
`;

const CardTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardSummary = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const WorkLink = ({ url, children }) => {
  const { scrollTo } = useScroll();

  if (url === '#contact') {
    return (
      <button
        onClick={() => scrollTo(10)}
        style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
      {children}
    </a>
  );
};

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const WorkHighlight = ({ title, items }) => {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <CardGrid>
        {items.map((item) => (
          <Card key={item.id}>
            <CardImage>
              <img src={item.image} alt={item.title} />
            </CardImage>
            <CardBody>
              <CardTitle>{item.title}</CardTitle>
              <CardSummary>{item.summary}</CardSummary>
              <ButtonRow>
                <WorkLink url={item.primaryUrl}>
                  <SleekButton>{item.primaryCta}</SleekButton>
                </WorkLink>
                <WorkLink url={item.secondaryUrl}>
                  <SleekButton>{item.secondaryCta}</SleekButton>
                </WorkLink>
              </ButtonRow>
            </CardBody>
          </Card>
        ))}
      </CardGrid>
    </section>
  );
};

export default WorkHighlight;
