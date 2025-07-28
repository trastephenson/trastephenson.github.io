import React from 'react';
import styled from 'styled-components';

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

            <button type="submit" className="sendMessage-btn">Send Message</button>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    align-self: center;
    font-family: inherit;
    gap: 10px;
    padding-inline: 2em;
    padding-bottom: 0.4em;
    background-color: #171717;
    border-radius: 20px;
  }

  .form-heading {
    text-align: center;
    margin: 2em;
    color: rgb(209, 38, 197);
    font-size: 1.2em;
    background-color: transparent;
    align-self: center;
    text-shadow: 0 0 10px rgba(209, 38, 197, 0.5), 0 0 20px rgba(209, 38, 197, 0.3);
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
    background-color: #171717;
    box-shadow: inset 2px 5px 10px rgb(5, 5, 5);
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #ccd6f6;
    padding-inline: 1em;
    font-family: inherit;
    resize: vertical;
    text-shadow: 0 0 5px rgba(204, 214, 246, 0.3);
  }

  .input-field:focus {
    text-shadow: 0 0 8px rgba(209, 38, 197, 0.6), 0 0 15px rgba(209, 38, 197, 0.4);
  }

  .input-field::placeholder {
    color: #8892b0;
    text-shadow: 0 0 3px rgba(136, 146, 176, 0.3);
  }

  .sendMessage-btn {
    cursor: pointer;
    margin-bottom: 3em;
    padding: 1em;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: transparent;
    color: rgb(209, 38, 197);
    font-weight: bold;
    outline: 1px solid rgb(209, 38, 197);
    transition: all ease-in-out 0.3s;
    font-family: inherit;
    text-shadow: 0 0 5px rgba(209, 38, 197, 0.5), 0 0 10px rgba(209, 38, 197, 0.3);
  }

  .sendMessage-btn:hover {
    transition: all ease-in-out 0.3s;
    background-color: rgb(209, 38, 197);
    color: #000;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(209, 38, 197, 0.8), inset 2px 5px 10px rgb(5, 5, 5);
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  }

  .form-card1 {
    background-image: linear-gradient(163deg, rgb(209, 38, 197) 0%, rgb(209, 38, 197) 100%);
    border-radius: 22px;
    transition: all 0.3s;
  }

  .form-card1:hover {
    box-shadow: 0px 0px 30px 1px rgba(209, 38, 197, 0.3);
  }

  .form-card2 {
    border-radius: 0;
    transition: all 0.2s;
  }

  .form-card2:hover {
    transform: scale(0.98);
    border-radius: 20px;
  }
`;

export default StyledContactForm; 