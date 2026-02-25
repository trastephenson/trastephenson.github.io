import React from 'react'
import styled from 'styled-components'
import {ImHome} from 'react-icons/im'
import {ImProfile} from 'react-icons/im'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {FaToolbox} from 'react-icons/fa'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { useScroll } from '../../context/ScrollContext'

const StyledNav = styled.nav`
  background: rgba(5, 5, 16, 0.6);
  width: max-content;
  display: flex;
  padding: 0.7rem 1.7rem;
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
  gap: 0.8rem;
  border-radius: 3rem;
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(0, 240, 255, 0.08);

  @media screen and (max-width: 600px) {
    padding: 0.5rem 1.2rem;
    gap: 0.5rem;
    bottom: 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.4rem 1rem;
    gap: 0.4rem;
  }
`;

const StyledNavButton = styled.button`
  background: transparent;
  padding: 0.9rem;
  border-radius: 50%;
  display: flex;
  color: var(--text-secondary);
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;

  @media screen and (max-width: 600px) {
    padding: 0.7rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  &:hover {
    color: var(--accent);
    background: rgba(0, 240, 255, 0.08);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
    transform: scale(1.1);
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
    &:active {
      color: var(--accent);
      background: rgba(0, 240, 255, 0.1);
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
      transform: scale(1.05);
    }
  }

  &.active {
    background: rgba(0, 240, 255, 0.12);
    color: var(--accent);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.2);
  }

  &.active:hover {
    background: rgba(0, 240, 255, 0.18);
    box-shadow: 0 0 25px rgba(0, 240, 255, 0.25);
  }
`;

const NAV_ITEMS = [
  { icon: ImHome, label: 'Home', sectionIndex: 0 },
  { icon: ImProfile, label: 'About', sectionIndex: 2 },
  { icon: GiDiceTwentyFacesTwenty, label: 'Skills', sectionIndex: 4 },
  { icon: FaToolbox, label: 'Work', sectionIndex: 6 },
  { icon: BiMessageSquareDetail, label: 'Contact', sectionIndex: 10 },
];

const SECTION_TO_NAV = {
  0: 0, 1: 0,
  2: 2, 3: 2,
  4: 4, 5: 4,
  6: 6, 7: 6, 8: 6,
  9: 10,
  10: 10,
  11: 10,
};

const Nav = () => {
  const { currentSection, scrollTo } = useScroll();
  const activeMapped = SECTION_TO_NAV[currentSection];

  return (
    <StyledNav aria-label="Section navigation">
      {NAV_ITEMS.map(({ icon: Icon, label, sectionIndex }) => (
        <StyledNavButton
          key={label}
          onClick={() => scrollTo(sectionIndex)}
          className={activeMapped === sectionIndex ? 'active' : ''}
          aria-label={`Navigate to ${label}`}
          aria-current={activeMapped === sectionIndex ? 'true' : undefined}
          title={label}
        >
          <Icon />
        </StyledNavButton>
      ))}
    </StyledNav>
  )
}

export default Nav
