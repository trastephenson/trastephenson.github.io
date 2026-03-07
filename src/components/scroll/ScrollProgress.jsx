import React from 'react';
import styled from 'styled-components';
import { useScroll } from '../../context/ScrollContext';

const ProgressContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 240px;
  background: var(--border-subtle);
  border-radius: 2px;
  z-index: 100;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    right: 12px;
    height: 180px;
    width: 2px;
  }
`;

const ProgressFill = styled.div`
  width: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: height var(--motion-fast) var(--ease-soft-out);
  box-shadow: 0 0 8px var(--accent-glow);
`;

const SectionDots = styled.div`
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 100;
  pointer-events: none;

  @media screen and (max-width: 600px) {
    right: 7px;
    height: 180px;
  }
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => props.$active ? 'var(--accent)' : 'var(--border-medium)'};
  transition: all var(--motion-normal) var(--ease-standard);
  box-shadow: ${props => props.$active ? '0 0 8px var(--accent-glow)' : 'none'};
  transform: ${props => props.$active ? 'scale(1.3)' : 'scale(1)'};

  @media screen and (max-width: 600px) {
    width: 5px;
    height: 5px;
  }
`;

export default function ScrollProgress() {
  const { progress, currentSection, totalSections } = useScroll();
  const heightPercent = Math.max(0, Math.min(100, progress * 100));

  return (
    <>
      <ProgressContainer aria-hidden="true">
        <ProgressFill style={{ height: `${heightPercent}%` }} />
      </ProgressContainer>
      <SectionDots aria-hidden="true">
        {Array.from({ length: totalSections }, (_, i) => (
          <Dot key={i} $active={i === currentSection} />
        ))}
      </SectionDots>
    </>
  );
}
