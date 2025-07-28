import React, { useEffect, useState } from 'react'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import { useRef } from 'react';
import emailjs from 'emailjs-com'
import StyledContactForm from './StyledContactForm'
import SleekButton from '../common/SleekButton'
import StyledPopup from '../common/StyledPopup'

const Contact = () => {
  const form = useRef();
  const [popup, setPopup] = useState({ isOpen: false, message: '', type: 'success' });

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('NDbWMvRzAqmh3g5Dj');
  }, []);

  const showPopup = (message, type = 'success') => {
    setPopup({ isOpen: true, message, type });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, message: '', type: 'success' });
  };

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
        showPopup('Message sent successfully! I\'ll get back to you soon.', 'success');
        e.target.reset();
      }, (error) => {
        console.log('FAILED...', error.text);
        console.log('Full error:', error);
        showPopup('Failed to send message. Please try again or use the Email/Messenger buttons above.', 'error');
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
      
      <StyledPopup 
        isOpen={popup.isOpen}
        message={popup.message}
        type={popup.type}
        onClose={closePopup}
      />
    </section>
  )
}

export default Contact
