import React from 'react'
import styled from 'styled-components'
import {ImHome} from 'react-icons/im'
import {ImProfile} from 'react-icons/im'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {FaToolbox} from 'react-icons/fa'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {FaLinkedinIn} from 'react-icons/fa'
import { useScroll } from '../../context/ScrollContext'

const StyledNav = styled.nav`
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.30) 0%,
    rgba(240, 244, 255, 0.22) 100%
  );
  width: max-content;
  display: flex;
  align-items: stretch;
  padding: 0.7rem 1.1rem;
  z-index: 100;
  position: fixed;
  left: 50%;
  transform: translateX(-50%) perspective(600px) rotateX(-8deg);
  transform-origin: bottom center;
  bottom: 2rem;
  gap: 0.15rem;
  border-radius: 2rem;
  backdrop-filter: blur(52px) saturate(320%) brightness(124%);
  -webkit-backdrop-filter: blur(52px) saturate(320%) brightness(124%);
  border: 1.5px solid rgba(255, 255, 255, 0.84);
  border-top: 2px solid rgba(255, 255, 255, 1);
  box-shadow:
    0 32px 72px rgba(0, 0, 0, 0.16),
    0 10px 28px rgba(0, 0, 0, 0.10),
    0 2px 6px rgba(0, 0, 0, 0.05),
    inset 0 2px 0 rgba(255, 255, 255, 1),
    inset 0 1px 1px rgba(255, 255, 255, 0.85),
    inset 0 -1px 0 rgba(255, 255, 255, 0.42),
    inset 1px 0 0 rgba(255, 255, 255, 0.72),
    inset -1px 0 0 rgba(255, 255, 255, 0.38);

  @media screen and (max-width: 600px) {
    padding: 0.55rem 0.85rem;
    bottom: 1rem;
    /* Remove 3D tilt on small screens for readability */
    transform: translateX(-50%);
    border-radius: 1.6rem;
  }
`

const StyledNavButton = styled.button`
  background: transparent;
  padding: 0.62rem 1rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.22rem;
  color: var(--text-secondary, #555);
  transition: all 0.22s ease;
  cursor: pointer;
  border: none;
  outline: none;
  min-width: 66px;

  .icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.22s ease, filter 0.22s ease;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.18)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.10));
  }

  .label {
    font-size: 0.52rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    opacity: 0.5;
    line-height: 1;
    transition: opacity 0.22s ease;
    white-space: nowrap;
  }

  &:hover {
    color: var(--text-primary, #111);
    background: rgba(0, 0, 0, 0.055);
    transform: translateY(-2px);

    .icon {
      transform: scale(1.12) translateY(-1px);
      filter: drop-shadow(0 4px 6px rgba(0, 136, 204, 0.28)) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
    }

    .label {
      opacity: 0.85;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      .icon { transform: none; }
    }
    &:active {
      color: var(--text-primary, #111);
      background: rgba(0, 0, 0, 0.08);
    }
  }

  &.active {
    background: rgba(0, 0, 0, 0.07);
    color: var(--text-primary, #111);

    .label {
      opacity: 1;
    }
  }

  &.active:hover {
    background: rgba(0, 0, 0, 0.10);
  }

  @media screen and (max-width: 600px) {
    padding: 0.5rem 0.75rem;
    min-width: 48px;
  }
`

const NAV_ITEMS = [
  { icon: ImHome, label: 'Home', sectionIndex: 0 },
  { icon: ImProfile, label: 'About', sectionIndex: 2 },
  { icon: GiDiceTwentyFacesTwenty, label: 'Skills', sectionIndex: 4 },
  { icon: FaToolbox, label: 'Work', sectionIndex: 6 },
  { icon: BiMessageSquareDetail, label: 'Contact', sectionIndex: 10 },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mrtravisstephenson' },
]

const SECTION_TO_NAV = {
  0: 0, 1: 0,
  2: 2, 3: 2,
  4: 4, 5: 4,
  6: 6, 7: 6, 8: 6,
  9: 10,
  10: 10,
  11: 10,
}

const Nav = () => {
  const { currentSection, scrollTo } = useScroll()
  const activeMapped = SECTION_TO_NAV[currentSection]

  return (
    <StyledNav aria-label="Section navigation">
      {NAV_ITEMS.map(({ icon: Icon, label, sectionIndex, href }) => {
        if (href) {
          return (
            <StyledNavButton
              key={label}
              as="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
            >
              <span className="icon"><Icon /></span>
              <span className="label">{label}</span>
            </StyledNavButton>
          );
        }
        return (
          <StyledNavButton
            key={label}
            onClick={() => scrollTo(sectionIndex)}
            className={activeMapped === sectionIndex ? 'active' : ''}
            aria-label={`Navigate to ${label}`}
            aria-current={activeMapped === sectionIndex ? 'true' : undefined}
            title={label}
          >
            <span className="icon"><Icon /></span>
            <span className="label">{label}</span>
          </StyledNavButton>
        );
      })}
    </StyledNav>
  )
}

export default Nav
