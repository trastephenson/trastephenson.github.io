import React from 'react';
import styled from 'styled-components';
import ME from '../../assets/me.png';

const CardWrapper = styled.div`
  position: relative;
  width: 380px;
  height: 508px;
  perspective: 1000px;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 60px;
  overflow: hidden;

  &:hover {
    transform: rotateY(10deg) rotateX(5deg);
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: linear-gradient(135deg, #0d1120 0%, #3a4b8a 43%, #0d1120 100%);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 60px;
  box-shadow: 
    0 0 30px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.2),
    0 0 90px rgba(255, 255, 255, 0.1),
    inset 0 0 30px rgba(255, 255, 255, 0.1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    animation: shimmer 3s infinite;
    z-index: 1;
  }

  &:hover {
    box-shadow: 
      0 0 40px rgba(255, 255, 255, 0.6),
      0 0 80px rgba(255, 255, 255, 0.3),
      0 0 120px rgba(255, 255, 255, 0.2),
      inset 0 0 40px rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: linear-gradient(135deg, #3a4b8a 0%, #0d1120 50%, #3a4b8a 100%);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 60px;
  transform: rotateY(180deg);
  box-shadow: 
    0 0 30px rgba(255, 255, 255, 0.4),
    0 0 60px rgba(255, 255, 255, 0.2),
    0 0 90px rgba(255, 255, 255, 0.1),
    inset 0 0 30px rgba(255, 255, 255, 0.1);
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 60px;
  z-index: 2;
  transition: all 0.3s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.05);
    filter: brightness(1.1) contrast(1.1);
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  background: linear-gradient(45deg, #fff, #3a4b8a, #fff, #3a4b8a);
  border-radius: 64px;
  z-index: 0;
  animation: glow 2s ease-in-out infinite alternate;
  opacity: 0.6;
  filter: blur(2px);

  @keyframes glow {
    0% { 
      opacity: 0.4;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
    100% { 
      opacity: 0.8;
      box-shadow: 0 0 40px rgba(255, 255, 255, 0.8);
    }
  }
`;

const OuterGlow = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 68px;
  z-index: -1;
  animation: outerGlow 3s ease-in-out infinite alternate;

  @keyframes outerGlow {
    0% { 
      opacity: 0.2;
      transform: scale(1);
    }
    100% { 
      opacity: 0.5;
      transform: scale(1.05);
    }
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
`;

const FloatingDot = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);

  &:nth-child(1) {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
  }

  &:nth-child(2) {
    top: 60%;
    right: 15%;
    animation-delay: 2s;
  }

  &:nth-child(3) {
    bottom: 30%;
    left: 20%;
    animation-delay: 4s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.8; }
    50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
  }
`;

const NewHeaderCard = () => {
  return (
    <CardWrapper>
      <OuterGlow />
      <GlowEffect />
      <Card>
        <CardFront>
          <ProfileImage src={ME} alt="Travis Stephenson" />
          <FloatingElements>
            <FloatingDot />
            <FloatingDot />
            <FloatingDot />
          </FloatingElements>
        </CardFront>
        <CardBack />
      </Card>
    </CardWrapper>
  );
};

export default NewHeaderCard; 