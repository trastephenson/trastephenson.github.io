import React from 'react';
import styled from 'styled-components';
import ME from '../../assets/me.png';

const CardContainer = styled.div`
  position: relative;
  width: 380px;
  height: 508px;
  background: rgba(255, 255, 255, 0);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: 0.3s ease;
  border-radius: 60px;
  filter: drop-shadow(0px 0px 30px rgba(255, 255, 255, 0.5));
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1);

  &::after {
    content: '';
    background: rgba(24, 24, 24, 0);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    position: absolute;
    z-index: 1;
    transition: 0.3s ease;
    height: 98%;
    width: 98%;
    top: 1%;
    left: 1%;
    border-radius: 56px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &:hover {
    filter: drop-shadow(0px 0px 30px rgba(255, 255, 255, 1));
    border: 2px solid rgba(255, 255, 255, 1);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0);
  }
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
`;

const GlowingCard = () => {
  return (
    <CardContainer>
      <ProfileImage src={ME} alt="Travis Stephenson" />
    </CardContainer>
  );
};

export default GlowingCard; 