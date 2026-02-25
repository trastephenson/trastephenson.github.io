import React from 'react';
import { useScroll } from '../../context/ScrollContext';

const SECTION_NAMES = [
  'Hero',
  'Tagline',
  'About',
  'Strengths',
  'Skills',
  'Tools',
  'Work — Mobile Apps',
  'Work — Platforms',
  'Work — AI',
  'Testimonials',
  'Contact',
  'Footer',
];

const srOnlyStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export default function ScreenReaderStatus() {
  const { currentSection, totalSections } = useScroll();
  const sectionName = SECTION_NAMES[currentSection] || `Section ${currentSection + 1}`;

  return (
    <div
      id="scroll-status"
      style={srOnlyStyle}
      aria-live="polite"
      aria-atomic="true"
    >
      Viewing {sectionName}, section {currentSection + 1} of {totalSections}
    </div>
  );
}
