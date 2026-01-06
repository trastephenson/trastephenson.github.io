import React from 'react';
import styled from 'styled-components';
import ME from '../../assets/me.png';
import { MdOutlineEmail } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import SleekButton from '../common/SleekButton';

const CardContainer = styled.div`
  width: 550px;
  height: 450px;
  background: linear-gradient(135deg, #0d1120 0%, #3a4b8a 43%, #0d1120 100%);
  border-radius: 32px;
  padding: 3px;
  position: relative;
  box-shadow: rgba(96, 75, 74, 0.3) 0px 70px 30px -50px, 0 0 30px rgba(255, 255, 255, 0.2);
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 2px solid rgba(255, 255, 255, 0.3);
  will-change: transform, box-shadow;
  overflow: hidden;
  isolation: isolate;

  &:hover {
    border-top-left-radius: 55px;
    box-shadow: 
      rgba(96, 75, 74, 0.4) 0px 70px 30px -50px, 
      0 0 40px rgba(255, 255, 255, 0.3),
      0 0 60px rgba(255, 255, 255, 0.2),
      0 0 80px rgba(255, 255, 255, 0.1),
      0 0 100px rgba(255, 255, 255, 0.4),
      0 0 120px rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1));
    border-radius: 36px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover::before {
    opacity: 1;
  }

  /* Mobile-first responsive sizing */
  width: clamp(320px, 95vw, 550px);
  height: clamp(360px, 85vh, 450px);
  max-width: 550px;

  @media screen and (min-width: 480px) {
    width: clamp(350px, 90vw, 450px);
    height: clamp(380px, 80vh, 400px);
  }

  @media screen and (min-width: 768px) {
    width: clamp(400px, 85vw, 500px);
    height: clamp(400px, 75vh, 420px);
  }

  @media screen and (min-width: 1024px) {
    width: 550px;
    height: 450px;
  }
`;



const ProfilePic = styled.div`
  position: absolute;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  top: 3px;
  left: 3px;
  border-radius: 29px;
  z-index: 3;
  border: 0px solid #E6E6FA;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), z-index 0s;
  transform-origin: top left;
  isolation: isolate;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: center center;
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  ${CardContainer}:hover & {
    width: 140px;
    height: 140px;
    aspect-ratio: 1;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    z-index: 5;
    border: 7px solid #E6E6FA;
    box-shadow: rgba(96, 75, 74, 0.3) 0px 5px 5px 0px;
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), z-index 0s;

     img {
  transform: scale(2.3) translateY(26%);
  object-position: center top;
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
  }
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 3px;
  left: 3px;
  right: 3px;
  background: linear-gradient(135deg, #E6E6FA 0%, #3a4b8a 100%);
  top: 80%;
  border-radius: 29px;
  z-index: 1;
  box-shadow: rgba(96, 75, 74, 0.3) 0px 5px 5px 0px inset;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: bottom center;
  isolation: isolate;

  ${CardContainer}:hover & {
    top: 20%;
    border-radius: 80px 29px 29px 29px;
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 2;
  }

  /* Mobile adjustments - more space for content */
  @media screen and (max-width: 767px) {
    top: 75%;
    
    ${CardContainer}:hover & {
      top: clamp(12%, 15vh, 18%);
    }
  }

  @media screen and (max-width: 479px) {
    top: 70%;
    
    ${CardContainer}:hover & {
      top: clamp(10%, 12vh, 15%);
    }
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  pointer-events: none;
  padding: 0 1rem;

  ${CardContainer}:hover & {
    opacity: 1;
  }

  @media screen and (max-width: 600px) {
    padding: 0 0.8rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0 0.6rem;
  }
`;

const Name = styled.span`
  display: block;
  font-size: 1.2rem;
  color: #0d1120;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const AboutMe = styled.p`
  display: block;
  font-size: 0.9rem;
  color: #0d1120;
  margin-top: 1rem;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    margin-top: 0.5rem;
    line-height: 1.3;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.7rem;
    margin-top: 0.5rem;
    line-height: 1.2;
  }
`;

const BottomBottom = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 4;
  pointer-events: auto;
  gap: 0.5rem;

  @media screen and (max-width: 600px) {
    bottom: 0.8rem;
    left: 1rem;
    right: 1rem;
    gap: 0.4rem;
  }

  @media screen and (max-width: 480px) {
    bottom: 0.6rem;
    left: 0.8rem;
    right: 0.8rem;
    gap: 0.3rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 1rem;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    height: 20px;
    fill: #0d1120;
    stroke: #0d1120;
    filter: drop-shadow(0 5px 5px rgba(165, 132, 130, 0.3));
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      fill: #fff;
      stroke: #fff;
      transform: scale(1.2);
    }
  }

  /* Mobile optimizations */
  @media screen and (max-width: 768px) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    ${CardContainer}:hover & {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
`;



const NewHeaderCard = () => {
  return (
    <CardContainer>
      <ProfilePic>
        <img src={ME} alt="Travis Stephenson" />
      </ProfilePic>
      <Bottom>
        <Content>
          <Name>Travis Stephenson</Name>
          <AboutMe>Principal Solutions Architect • Cloud & AI Platforms • Technical Product Leader</AboutMe>
        </Content>
        <BottomBottom>
          <SocialLinksContainer>
            <a href="https://www.linkedin.com/in/trastephenson/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:stephenson.tra@gmail.com" target="_blank" rel="noopener noreferrer">
              <MdOutlineEmail />
            </a>
            <a href="https://github.com/trastephenson" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
          </SocialLinksContainer>
          <SleekButton onClick={() => {
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
              portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>Featured Work</SleekButton>
        </BottomBottom>
      </Bottom>
    </CardContainer>
  );
};

export default NewHeaderCard; 