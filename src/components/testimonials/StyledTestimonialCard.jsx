import React from 'react';
import styled from 'styled-components';

const StyledTestimonialCard = ({ avatar, name, review, rating = 5, isActive = false }) => {
  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <svg key={i} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <StyledWrapper isActive={isActive}>
      <div className="card">
        <div className="header">
          <div className="image">
            <img src={avatar} alt={name} />
          </div>
          <div>
            <div className="stars">
              {renderStars(rating)}
            </div>
            <p className="name">{name}</p>
          </div>
        </div>
        <div className="message-container">
          <p className="message">
            {review}
          </p>
        </div>
        {!isActive && <div className="gradient-overlay" />}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
    padding: 3rem;
    width: 600px;
    height: 450px;
    border-radius: 30px;
    box-shadow: 0 0 30px rgba(209, 38, 197, 0.5);
    border: 2px solid rgba(209, 38, 197, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    opacity: ${props => props.isActive ? 1 : 0.7};
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0.9)'};
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
    filter: blur(2rem);
    opacity: 30%;
    z-index: -1;
  }

  .card:hover {
    box-shadow: 0 0 40px rgba(209, 38, 197, 0.8);
    border: 2px solid rgba(209, 38, 197, 0.8);
    transform: ${props => props.isActive ? 'translateY(-5px) scale(1)' : 'translateY(-5px) scale(0.9)'};
  }

  .header {
    display: flex;
    align-items: center;
    grid-gap: 1.5rem;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    flex-shrink: 0;
  }

  .header .image {
    height: 6rem;
    width: 6rem;
    border-radius: 9999px;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }

  .header .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .stars {
    display: flex;
    justify-content: center;
    grid-gap: 0.125rem;
    gap: 0.125rem;
    color: #FFD700;
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.8));
  }

  .stars svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  .name {
    margin-top: 0.25rem;
    font-size: 1.5rem;
    line-height: 1.75rem;
    font-weight: 600;
    color: white;
    font-family: "'Inter', 'Segoe UI', 'Roboto', sans-serif";
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .message-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .message {
    color: white;
    font-family: "'Inter', 'Segoe UI', 'Roboto', sans-serif";
    line-height: 1.6;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    overflow-y: auto;
    flex: 1;
    padding-right: 10px;
    margin: 0;
    font-size: 1.1rem;
  }

  .message::-webkit-scrollbar {
    width: 8px;
  }

  .message::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .message::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }

  .message::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(0, 0, 0, 0.8) 0%, 
      rgba(0, 0, 0, 0.4) 30%, 
      rgba(0, 0, 0, 0.1) 70%, 
      rgba(0, 0, 0, 0.8) 100%);
    pointer-events: none;
    z-index: 10;
  }
`;

export default StyledTestimonialCard; 