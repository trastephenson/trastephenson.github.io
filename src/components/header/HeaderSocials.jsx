import React from 'react'
import styled from 'styled-components'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'

const StyledSocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  position: absolute;
  left: 0;
  bottom: 3rem;

  &::after {
    content: "";
    width: 1px;
    height: 2rem;
    background: var(--color-primary);
  }

  /* Mobile responsive */
  @media screen and (max-width: 600px) {
    bottom: 2rem;
    gap: 0.6rem;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const StyledSocialLink = styled.a`
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

  /* Mobile responsive */
  @media screen and (max-width: 600px) {
    padding: 0.7rem;
    font-size: 1rem;
  }

  &:hover {
    color: var(--glow-color);
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 1em 0.25em var(--glow-color),
                0 0 2em 1em var(--glow-spread-color);
    text-shadow: 0 0 0.5em var(--glow-color);
    transform: scale(1.1);
  }

  /* Touch device optimization */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      box-shadow: none;
    }
    
    &:active {
      color: var(--glow-color);
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 1em 0.25em var(--glow-color),
                  0 0 2em 1em var(--glow-spread-color);
      text-shadow: 0 0 0.5em var(--glow-color);
      transform: scale(1.05);
    }
  }
`;

const HeaderSocials = () => {
  return (
    <StyledSocialsContainer>
        <StyledSocialLink href="https://www.linkedin.com/in/mrtravisstephenson/" target="_blank" rel="noreferrer">
          <BsLinkedin/>
        </StyledSocialLink>
        <StyledSocialLink href="https://github.com/trastephenson" target="_blank" rel="noreferrer">
          <FaGithub/>
        </StyledSocialLink>
        <StyledSocialLink href="mailto:stephenson.tra@gmail.com">
          <MdEmail/>
        </StyledSocialLink>
    </StyledSocialsContainer>
  )
}

export default HeaderSocials