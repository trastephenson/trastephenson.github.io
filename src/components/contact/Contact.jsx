import React, { useEffect } from 'react'
import styled from 'styled-components'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import { useRef } from 'react';
import emailjs from 'emailjs-com'
import StyledContactForm from './StyledContactForm'
import SleekButton from '../common/SleekButton'
import { FaLinkedinIn } from 'react-icons/fa'

const LinkedInButton = styled.div`
  .btn-31:hover:before {
    background: #0077b5 !important;
  }
  
  .btn-31:hover .text {
    color: white !important;
    mix-blend-mode: normal !important;
  }
  
  .btn-31:hover svg {
    color: white !important;
  }
`

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('NDbWMvRzAqmh3g5Dj');
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    // Log the form data for debugging
    const formData = new FormData(form.current);
    console.log('Form data being sent:');
    for (let [key, value] of formData.entries()) {
      console.log(key + ': ' + value);
    }

    emailjs.sendForm('service_77o3efy', 'template_1kwjnyx', form.current, 'NDbWMvRzAqmh3g5Dj')
      .then((result) => {
        console.log('SUCCESS!', result.text);
        console.log('Full response:', result);
        alert('Message sent successfully!');
        e.target.reset();
      }, (error) => {
        console.log('FAILED...', error.text);
        console.log('Full error:', error);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <section id='contact' style={{ marginBottom: '0', paddingTop: '4rem', paddingBottom: '0', marginTop: '0' }}>
      <h2 style={{ 
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>Contact Me</h2>

      <p style={{
        color: '#E6E6FA',
        maxWidth: '900px',
        margin: '0 auto 1rem auto',
        lineHeight: '1.7',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
      }}>
        Open to Principal Solutions Architect and Director / Principal Technical Product roles—especially platform and AI-enabled products where architecture and delivery ownership matter.
      </p>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <div className="card">
              <MdOutlineEmail className='contact__option-icon'/>
              <h4>Email</h4>
              <h5>stephenson.tra@gmail.com</h5>
              <a href="mailto:stephenson.tra@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <SleekButton>
                  Send a message
                </SleekButton>
              </a>
            </div>
          </article>
          <article className="contact__option">
            <div className="card">
              <RiMessengerLine className='contact__option-icon'/>
              <h4>Messenger</h4>
              <h5>Travis Stephenson</h5>
              <a href="https://m.me/travis.stephenson.9887" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                <SleekButton>
                  Send a message
                </SleekButton>
              </a>
            </div>
          </article>
          <article className="contact__option">
            <div className="card">
              <FaLinkedinIn className='contact__option-icon' style={{ fontSize: '1.5rem' }}/>
              <h4>LinkedIn</h4>
              <h5>Connect on LinkedIn</h5>
              <LinkedInButton>
                <SleekButton>
                  <a 
                    href="https://www.linkedin.com/in/mrtravisstephenson" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <FaLinkedinIn style={{ fontSize: '1.2em' }} />
                    Message me on LinkedIn
                  </a>
                </SleekButton>
              </LinkedInButton>
            </div>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}
        <StyledContactForm onSubmit={sendEmail} formRef={form} />
      </div>
    </section>
  )
}

export default Contact
