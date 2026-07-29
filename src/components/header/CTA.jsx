import React from 'react';
import styled from 'styled-components';
import CV from '../../assets/cv.pdf';
import SleekButton from '../common/SleekButton';
import { FaLinkedinIn } from 'react-icons/fa';
import { useScroll } from '../../context/ScrollContext';
import profile from '../../content/profile.json';

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
        Owning product outcomes across AI, platform, and cloud systems from architecture
        through production.
      </Subtitle>

      <ButtonRow>
        <SleekButton as="a" href={CV} download style={primaryButtonStyle}>
          Download Resume
        </SleekButton>

        <SleekButton
          as="a"
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={secondaryButtonStyle}
        >
          <FaLinkedinIn style={{ fontSize: '1.2em', marginRight: '8px' }} />
          LinkedIn
        </SleekButton>

        <SleekButton
          onClick={(e) => {
            e.preventDefault();
            scrollTo(10);
          }}
          style={primaryButtonStyle}
        >
          Let's Talk
        </SleekButton>
      </ButtonRow>
    </TaglineContainer>
  );
};

export default CTA;
