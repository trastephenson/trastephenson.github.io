import React, { useEffect } from 'react'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import { useRef } from 'react';
import emailjs from 'emailjs-com'
import StyledContactForm from './StyledContactForm'
import SleekButton from '../common/SleekButton'

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('NDbWMvRzAqmh3g5Dj');
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_77o3efy', 'template_1kwjnyx', form.current, 'NDbWMvRzAqmh3g5Dj')
      .then((result) => {
        console.log('SUCCESS!', result.text);
        alert('Message sent successfully!');
        e.target.reset();
      }, (error) => {
        console.log('FAILED...', error.text);
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <section id='contact' style={{ marginBottom: '0' }}>
      <h5 style={{ 
        color: '#E6E6FA',
        fontSize: '1.2rem',
        fontWeight: '400',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>Get In Touch</h5>
      <h2 style={{ 
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>Contact Me</h2>

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
        </div>
        {/* END OF CONTACT OPTIONS */}
        <StyledContactForm onSubmit={sendEmail} formRef={form} />
      </div>
    </section>
  )
}

export default Contact
