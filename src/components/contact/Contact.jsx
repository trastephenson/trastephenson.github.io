import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MdOutlineEmail } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import SleekButton from '../common/SleekButton';
import profile from '../../content/profile.json';

const ContactSection = styled.section`
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 1.5rem;
  text-align: center;
  font-size: 0.95rem;
  line-height: var(--leading-body);
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
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.2rem;
  text-align: center;
  transition:
    transform var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    border-color var(--motion-normal) var(--ease-standard);
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 54px color-mix(in srgb, var(--accent) 12%, rgba(18, 25, 34, 0.1));
    border-color: color-mix(in srgb, var(--accent) 18%, white);
  }

  svg {
    font-size: 1.5rem;
    color: var(--accent);
    margin-bottom: 0.5rem;
  }

  h4 {
    color: var(--text-primary);
    font-family: var(--font-display);
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
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
`;

const FormTitle = styled.p`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
`;

const FormField = styled.div`
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  padding: 0.6rem;
  margin-bottom: 0.8rem;
  transition:
    border-color var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    background-color var(--motion-normal) var(--ease-standard);

  &:focus-within {
    background: rgba(255, 255, 255, 0.82);
    border-color: color-mix(in srgb, var(--accent) 20%, white);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 10%, transparent);
  }
`;

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 100%;
  color: var(--text-primary);
  padding: 0.4rem 0.8rem;
  font-family: var(--font-body);
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
  font-family: var(--font-body);
  font-size: 0.95rem;
  resize: vertical;

  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const Contact = () => {
  const form = useRef();
  const emailAddress = profile.links.email.replace(/^mailto:/, '');

  useEffect(() => {
    emailjs.init('NDbWMvRzAqmh3g5Dj');
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_77o3efy', 'template_1kwjnyx', form.current, 'NDbWMvRzAqmh3g5Dj')
      .then(
        () => {
          alert('Message sent successfully!');
          e.target.reset();
        },
        () => {
          alert('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <ContactSection>
      <SectionTitle>Contact Me</SectionTitle>
      <Subtitle>{profile.availability.summary}</Subtitle>

      <Grid>
        <ContactOptions>
          <ContactCard>
            <MdOutlineEmail />
            <h4>Email</h4>
            <h5>{emailAddress}</h5>
            <a href={profile.links.email} style={{ color: 'inherit', textDecoration: 'none' }}>
              <SleekButton>Send a message</SleekButton>
            </a>
          </ContactCard>

          <ContactCard>
            <RiMessengerLine />
            <h4>Messenger</h4>
            <h5>Travis Stephenson</h5>
            <a
              href={profile.links.messenger}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <SleekButton>Send a message</SleekButton>
            </a>
          </ContactCard>

          <ContactCard>
            <FaLinkedinIn />
            <h4>LinkedIn</h4>
            <h5>Connect on LinkedIn</h5>
            <a
              href={profile.links.linkedin}
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
