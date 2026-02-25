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
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  font-family: 'Inter', sans-serif;
  line-height: 1.7;
  max-width: 600px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const CTA = () => {
  const { scrollTo } = useScroll();

  return (
    <TaglineContainer>
      <Subtitle>
        Technical Product &amp; Platform Leader | AI Engineering (MS)
        <br />
        Cloud-native platforms &bull; AI-enabled automation &bull; Client-facing architecture &amp; delivery ownership
      </Subtitle>

      <ButtonRow>
        <SleekButton>
          <a href={CV} download style={{ color: 'inherit', textDecoration: 'none' }}>
            Download Resume
          </a>
        </SleekButton>

        <SleekButton>
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

        <SleekButton>
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
