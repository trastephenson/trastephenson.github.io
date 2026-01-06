import React from 'react'
import './footer.css'
import {FaLinkedinIn} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <a href="#" className='footer__logo'>Travis Stephenson</a>

      <ul className='permalinks'>
        <li><a href="#">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Tools</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__socials">
        <a href="https://www.linkedin.com/in/mrtravisstephenson/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn/>
        </a>
      </div>

      <div className="footer__copyright">
        <small>&copy; Travis Stephenson All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
