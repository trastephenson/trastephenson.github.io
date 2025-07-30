import React from 'react';
import styled from 'styled-components';

const StyledTestimonialCard = ({ avatar, name, jobTitle, review, rating = 5, isActive = false }) => {
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
            {jobTitle && <p className="job-title">{jobTitle}</p>}
          </div>
        </div>
        <div className="message-container">
          <p className="message">
            {review}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    background-color: rgba(243, 244, 246, 1);
    padding: 2rem;
    width: 640px;
    height: 322px;
    border-radius: 10px;
    box-shadow: 0 20px 30px -20px rgba(5, 5, 5, 0.24);
    opacity: ${props => props.isActive ? 1 : 0.7};
    transform: ${props => props.isActive ? 'scale(1)' : 'scale(0.95)'};
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      width: 90vw;
      max-width: 400px;
      height: 320px;
      padding: 1.5rem;
    }

    @media (max-width: 480px) {
      width: 95vw;
      max-width: 350px;
      height: 300px;
      padding: 1rem;
    }
  }

  .card:hover {
    transform: ${props => props.isActive ? 'translateY(-5px) scale(1)' : 'translateY(-5px) scale(0.95)'};
  }

  .header {
    display: flex;
    align-items: center;
    grid-gap: 1rem;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-shrink: 0;

    @media (max-width: 768px) {
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 480px) {
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  .header .image {
    height: 4rem;
    width: 4rem;
    border-radius: 9999px;
    overflow: hidden;
    object-fit: cover;
    background-color: royalblue;

    @media (max-width: 768px) {
      height: 3rem;
      width: 3rem;
    }

    @media (max-width: 480px) {
      height: 2.5rem;
      width: 2.5rem;
    }
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
    color: rgba(34, 197, 94, 1);

    @media (max-width: 768px) {
      gap: 0.1rem;
    }
  }

  .stars svg {
    height: 1rem;
    width: 1rem;

    @media (max-width: 768px) {
      height: 0.875rem;
      width: 0.875rem;
    }

    @media (max-width: 480px) {
      height: 0.75rem;
      width: 0.75rem;
    }
  }

  .name {
    margin-top: 0.25rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 600;
    --tw-text-opacity: 1;
    color: rgba(55, 65, 81, 1);

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.5rem;
      margin-top: 0.2rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
      line-height: 1.4rem;
      margin-top: 0.15rem;
    }
  }

  .job-title {
    margin-top: 0.125rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 400;
    color: rgba(107, 114, 128, 1);
    font-style: italic;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      line-height: 1.2rem;
      margin-top: 0.1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.75rem;
      line-height: 1.1rem;
      margin-top: 0.05rem;
    }
  }

  .message-container {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      min-height: 140px;
    }

    @media (max-width: 480px) {
      min-height: 120px;
    }
  }

  .message {
    color: rgba(107, 114, 128, 1);
    overflow-y: auto;
    flex: 1;
    margin: 0;
    padding-right: 8px;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.4;
      padding-right: 6px;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
      line-height: 1.3;
      padding-right: 4px;
    }
  }

  .message::-webkit-scrollbar {
    width: 6px;
  }

  .message::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  .message::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  .message::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }`;

export default StyledTestimonialCard; 