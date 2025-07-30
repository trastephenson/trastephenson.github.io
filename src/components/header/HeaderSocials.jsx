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
  bottom: 5rem;

  &::after {
    content: "";
    width: 1px;
    height: 2rem;
    background: rgba(255, 255, 255, 0.5);
  }

  /* Mobile responsive */
  @media screen and (max-width: 600px) {
    bottom: 4rem;
    gap: 0.6rem;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const StyledSocialLink = styled.a`
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
`;

const HeaderSocials = () => {
  return (
    <StyledSocialsContainer>
        <StyledSocialLink href="https://www.linkedin.com/in/trastephenson/" target="_blank" rel="noreferrer">
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