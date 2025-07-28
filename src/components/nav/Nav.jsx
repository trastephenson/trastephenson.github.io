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

  /* Mobile responsive */
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

const StyledNavLink = styled.a`
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

  /* Mobile responsive */
  @media screen and (max-width: 600px) {
    padding: 0.7rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  &:hover {
    color: white;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
  }

  /* Touch device optimization */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
    
    &:active {
      color: white;
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
      transform: scale(1.05);
    }
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }

  &.active:hover {
    color: white;
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.7);
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
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