import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdOutlineEmail } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import SleekButton from '../common/SleekButton';

const ContactSection = styled.section`
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContactOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactCard = styled.article`
  background: rgba(0, 240, 255, 0.03);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.06);
  }

  svg {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  h4 {
    color: var(--text-primary);
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  h5 {
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 400;
    margin-bottom: 0.75rem;
  }
`;

const FormWrapper = styled.div`
  background: rgba(8, 12, 28, 0.5);
  border: 1px solid rgba(0, 240, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
`;

const FormTitle = styled.p`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

const FormField = styled.div`
  background: rgba(0, 240, 255, 0.03);
  border-radius: 10px;
  padding: 0.6rem;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;

  &:focus-within {
    background: rgba(0, 240, 255, 0.06);
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.08);
  }
`;

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const TextArea = styled.textarea`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  resize: vertical;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const Contact = () => {
  const form = useRef();

  useEffect(() => {
    emailjs.init('NDbWMvRzAqmh3g5Dj');
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_77o3efy', 'template_1kwjnyx', form.current, 'NDbWMvRzAqmh3g5Dj')
      .then(() => {
        alert('Message sent successfully!');
        e.target.reset();
      }, () => {
        alert('Failed to send message. Please try again.');
      });
  };

  return (
    <ContactSection>
      <SectionTitle>Contact Me</SectionTitle>
      <Subtitle>
        Open to Principal Solutions Architect and Director / Principal Technical Product roles — especially platform and AI-enabled products.
      </Subtitle>

      <Grid>
        <ContactOptions>
          <ContactCard>
            <MdOutlineEmail />
            <h4>Email</h4>
            <h5>stephenson.tra@gmail.com</h5>
            <a href="mailto:stephenson.tra@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              <SleekButton>Send a message</SleekButton>
            </a>
          </ContactCard>

          <ContactCard>
            <RiMessengerLine />
            <h4>Messenger</h4>
            <h5>Travis Stephenson</h5>
            <a href="https://m.me/travis.stephenson.9887" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              <SleekButton>Send a message</SleekButton>
            </a>
          </ContactCard>

          <ContactCard>
            <FaLinkedinIn />
            <h4>LinkedIn</h4>
            <h5>Connect on LinkedIn</h5>
            <a
              href="https://www.linkedin.com/in/mrtravisstephenson"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <SleekButton>Message me</SleekButton>
            </a>
          </ContactCard>
        </ContactOptions>

        <FormWrapper>
          <form ref={form} onSubmit={sendEmail}>
            <FormTitle>Get In Touch</FormTitle>
            <FormField>
              <Input required placeholder="Name" type="text" name="name" />
            </FormField>
            <FormField>
              <Input required placeholder="Email" type="email" name="email" />
            </FormField>
            <FormField>
              <Input required placeholder="Subject" type="text" name="subject" />
            </FormField>
            <FormField>
              <TextArea required placeholder="Message" cols="30" rows="3" name="message" />
            </FormField>
            <SleekButton type="submit">Send Message</SleekButton>
          </form>
        </FormWrapper>
      </Grid>
    </ContactSection>
  );
};

export default Contact;
