import React from 'react';
import styled from 'styled-components';
import SleekButton from '../common/SleekButton';

const StyledContactForm = ({ onSubmit, formRef }) => {
  return (
    <StyledWrapper>
      <div className="form-card1">
        <div className="form-card2">
          <form className="form" ref={formRef} onSubmit={onSubmit}>
            <p className="form-heading">Get In Touch</p>

            <div className="form-field">
              <input 
                required 
                placeholder="Name" 
                className="input-field" 
                type="text" 
                name="name"
              />
            </div>

            <div className="form-field">
              <input
                required
                placeholder="Email"
                className="input-field"
                type="email"
                name="email"
              />
            </div>

            <div className="form-field">
              <input
                required
                placeholder="Subject"
                className="input-field"
                type="text"
                name="subject"
              />
            </div>

            <div className="form-field">
              <textarea
                required
                placeholder="Message"
                cols="30"
                rows="3"
                className="input-field"
                name="message"
              ></textarea>
            </div>

            <SleekButton type="submit">
              Send Message
            </SleekButton>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form-card1 {
    background: #3a4b8a;
    padding: 1px;
    border-radius: 1.2rem;
    box-shadow: 0px 1rem 1.5rem -0.9rem #000000e1, 0 0 20px rgba(255, 255, 255, 0.3);
    max-width: 100%;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .form-card1:hover {
    box-shadow: 0px 1.5rem 2rem -0.9rem #000000e1, 0 0 30px rgba(255, 255, 255, 0.5);
  }

  .form-card1:hover {
    box-shadow: 0px 1.5rem 2rem -0.9rem #000000e1;
  }

  .form-card2 {
    font-size: 1rem;
    color: #bec4cf;
    background: linear-gradient(135deg, #0d1120 0%, #3a4b8a 43%, #0d1120 100%);
    padding: 1.5rem;
    border-radius: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-self: center;
    font-family: inherit;
    gap: 1.2rem;
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }

  .form-heading {
    text-align: center;
    margin: 0 0 1rem 0;
    color: #bec4cf;
    font-size: 1.2em;
    background-color: transparent;
    align-self: center;
    text-shadow: 0 0 10px rgba(190, 196, 207, 0.5);
  }

  .form-field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    border-radius: 10px;
    padding: 0.6em;
    border: none;
    outline: none;
    color: white;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
  }

  .form-field:focus-within {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 10px rgba(190, 196, 207, 0.2);
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #bec4cf;
    padding-inline: 1em;
    font-family: "'Inter', 'Segoe UI', 'Roboto', sans-serif";
    font-size: 1rem;
    resize: vertical;
  }

  .input-field:focus {
    outline: none;
  }

  .input-field::placeholder {
    color: rgba(190, 196, 207, 0.6);
    font-family: "'Inter', 'Segoe UI', 'Roboto', sans-serif";
  }

  .btn-31 {
    width: 100%;
    margin-top: 1rem;
  }
`;

export default StyledContactForm; 