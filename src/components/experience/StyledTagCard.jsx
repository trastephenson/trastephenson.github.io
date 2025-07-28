import React from 'react';
import styled from 'styled-components';

const StyledTagCard = ({ title, tags }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <span className="title">{title}</span>
        <div className="card__tags">
          <ul className="tag">
            {tags.map((tag, index) => (
              <li key={index} className="tag__name">{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    height: 300px;
    margin: 30px;
    background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
    padding: 20px;
    display: flex;
    flex-direction: column;
    color: white;
    border-radius: 20px;
    box-shadow: 0 0 30px rgba(209, 38, 197, 0.5);
    border: 2px solid rgba(209, 38, 197, 0.3);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
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
    transform: translateY(-5px);
  }

  .card__tags {
    overflow: auto;
    height: 80%;
    margin-top: 15px;
  }

  .title {
    font-weight: 900;
    font-size: 1.7em;
    color: white;
    font-family: "'Inter', 'Segoe UI', 'Roboto', sans-serif";
    text-shadow: 0 0 20px rgba(255,255,255,0.8);
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .tag__name {
    display: inline-block;
    color: white;
    font-size: 1.1em;
    background: rgba(209, 38, 197, 0.8);
    padding: 8px 20px;
    border-radius: 70em;
    margin: 8px 6px 8px 0;
    margin-left: 0px;
    position: relative;
    text-transform: lowercase;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-family: "'Inter', 'Segoe UI', 'Roboto', sans-serif";
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 15px rgba(209, 38, 197, 0.5);
    backdrop-filter: blur(10px);
  }

  .tag__name::before,
  .tag__name::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }

  .tag__name::before {
    left: 8px;
  }

  .tag__name::after {
    right: 8px;
  }

  .tag__name:hover {
    transform: scale(1.1);
    background: rgba(209, 38, 197, 1);
    box-shadow: 0 0 25px rgba(209, 38, 197, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }

  .tag__name:hover::before,
  .tag__name:hover::after {
    background: white;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  }

  /* Custom scrollbar for the tags container */
  .card__tags::-webkit-scrollbar {
    width: 8px;
  }

  .card__tags::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  .card__tags::-webkit-scrollbar-thumb {
    background: rgba(209, 38, 197, 0.6);
    border-radius: 10px;
  }

  .card__tags::-webkit-scrollbar-thumb:hover {
    background: rgba(209, 38, 197, 0.8);
  }`;

export default StyledTagCard; 