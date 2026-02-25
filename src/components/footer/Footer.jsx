import React from 'react';
import styled from 'styled-components';
import { FaLinkedinIn } from 'react-icons/fa';
import { useScroll } from '../../context/ScrollContext';

const FOOTER_LINKS = [
  { label: 'Home', sectionIndex: 0 },
  { label: 'About', sectionIndex: 2 },
  { label: 'Skills', sectionIndex: 4 },
  { label: 'Work', sectionIndex: 6 },
  { label: 'Testimonials', sectionIndex: 9 },
  { label: 'Contact', sectionIndex: 10 },
];

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  width: 100%;
`;

const LogoButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  display: inline-block;
  transition: all 0.3s ease;
  text-shadow: none;

  &:hover {
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

const NavLinks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto 1rem;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    color: var(--accent);
    text-decoration: none;
  }
`;

const Socials = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;

  a {
    background: rgba(0, 136, 204, 0.06);
    color: var(--text-primary);
    padding: 0.6rem;
    border-radius: 0.5rem;
    display: flex;
    border: 1px solid rgba(0, 136, 204, 0.12);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0, 136, 204, 0.12);
      border-color: rgba(0, 136, 204, 0.25);
      box-shadow: 0 2px 8px rgba(0, 136, 204, 0.12);
      transform: translateY(-2px);
    }
  }
`;

const Copyright = styled.small`
  color: var(--text-secondary);
  opacity: 0.6;
  font-size: 0.8rem;
`;

const Footer = () => {
  const { scrollTo } = useScroll();

  return (
    <FooterContainer>
      <LogoButton onClick={() => scrollTo(0)}>
        Travis Stephenson
      </LogoButton>

      <NavLinks>
        {FOOTER_LINKS.map(({ label, sectionIndex }) => (
          <li key={label}>
            <NavButton onClick={() => scrollTo(sectionIndex)}>
              {label}
            </NavButton>
          </li>
        ))}
      </NavLinks>

      <Socials>
        <a href="https://www.linkedin.com/in/mrtravisstephenson/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
      </Socials>

      <Copyright>&copy; Travis Stephenson. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
