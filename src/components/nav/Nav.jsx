import React from 'react'
import styled from 'styled-components'
import {ImHome} from 'react-icons/im'
import {ImProfile} from 'react-icons/im'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {FaToolbox} from 'react-icons/fa'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { useState } from 'react'

const StyledNav = styled.nav`
  background: rgba(0, 0, 0, 0.3);
  width: max-content;
  display: block;
  padding: 0.7rem 1.7rem;
  z-index: 2;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
  display: flex;
  gap: 0.8rem;
  border-radius: 3rem;
  backdrop-filter: blur(15px);
`;

const StyledNavLink = styled.a`
  --glow-color: #8A2BE2;
  --glow-spread-color: rgba(138, 43, 226, 0.781);
  --enhanced-glow-color: rgb(138, 43, 226);
  
  background: transparent;
  padding: 0.9rem;
  border-radius: 50%;
  display: flex;
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: var(--glow-color);
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 1em 0.25em var(--glow-color),
                0 0 2em 1em var(--glow-spread-color);
    text-shadow: 0 0 0.5em var(--glow-color);
    transform: scale(1.1);
  }

  &.active {
    background: var(--color-primary);
    color: var(--color-bg);
    box-shadow: 0 0 1em 0.25em var(--glow-color),
                0 0 2em 1em var(--glow-spread-color);
  }

  &.active:hover {
    color: var(--color-bg);
    background: var(--color-primary);
    box-shadow: 0 0 1em 0.25em var(--glow-color),
                0 0 2em 1em var(--glow-spread-color);
  }
`;

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  return (
    <StyledNav>
      <StyledNavLink href="#" onClick={() => setActiveNav('#')} className={activeNav === '#' ? 'active' : ''}>
        <ImHome/>
      </StyledNavLink>
      <StyledNavLink href="#about" onClick={() => setActiveNav('#about')} className={activeNav === '#about' ? 'active' : ''}>
        <ImProfile/>
      </StyledNavLink>
      <StyledNavLink href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}>
        <GiDiceTwentyFacesTwenty/>
      </StyledNavLink>
      <StyledNavLink href="#services" onClick={() => setActiveNav('#services')} className={activeNav === '#services' ? 'active' : ''}>
        <FaToolbox/>
      </StyledNavLink>
      <StyledNavLink href='#contact' onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}>
        <BiMessageSquareDetail/>
      </StyledNavLink>
    </StyledNav>
  )
}

export default Nav