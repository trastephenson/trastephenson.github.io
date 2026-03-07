import React from 'react';
import styled from 'styled-components';
import CV from '../../assets/cv.pdf';
import SleekButton from '../common/SleekButton';
import { FaLinkedinIn } from 'react-icons/fa';
import { useScroll } from '../../context/ScrollContext';

const TaglineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: clamp(1rem, 2.4vw, 1.18rem);
  font-family: var(--font-body);
  line-height: 1.75;
  max-width: 720px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const primaryButtonStyle = {
  '--btn-text': '#111111',
  '--btn-hover-text': '#ffffff',
  '--btn-surface': 'color-mix(in srgb, var(--accent) 14%, white)',
  '--btn-fill': 'var(--accent)',
  '--btn-border': 'rgba(18, 25, 34, 0.34)',
  '--btn-hover-border': 'rgba(18, 25, 34, 0.34)',
  '--btn-shadow': '0 10px 22px rgba(18, 25, 34, 0.1)',
  '--btn-hover-shadow': '0 14px 28px rgba(18, 25, 34, 0.16)',
  '--btn-pad-y': '0.78rem',
  '--btn-pad-x': '1.35rem',
  '--btn-font-size': '0.8rem',
};

const secondaryButtonStyle = {
  '--btn-text': 'var(--text-primary)',
  '--btn-fill': 'var(--accent-secondary)',
  '--btn-pad-y': '0.78rem',
  '--btn-pad-x': '1.35rem',
  '--btn-font-size': '0.8rem',
};

const CTA = () => {
  const { scrollTo } = useScroll();

  return (
    <TaglineContainer>
      <Subtitle>
        Architecting AI platforms, product systems, and enterprise delivery with clarity.
        <br />
        Multi-agent LLM systems • RAG pipelines • enterprise SaaS delivery
      </Subtitle>

      <ButtonRow>
        <SleekButton style={primaryButtonStyle}>
          <a href={CV} download style={{ color: 'inherit', textDecoration: 'none' }}>
            Download Resume
          </a>
        </SleekButton>

        <SleekButton style={secondaryButtonStyle}>
          <a
            href="https://www.linkedin.com/in/mrtravisstephenson"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FaLinkedinIn style={{ fontSize: '1.2em' }} />
            LinkedIn
          </a>
        </SleekButton>

        <SleekButton style={primaryButtonStyle}>
          <button
            onClick={(e) => { e.preventDefault(); scrollTo(10); }}
            style={{ color: 'inherit', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
          >
            Let's Talk
          </button>
        </SleekButton>
      </ButtonRow>
    </TaglineContainer>
  );
};

export default CTA;
