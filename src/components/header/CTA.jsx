import React from 'react'
import styled from 'styled-components'
import CV from '../../assets/cv.pdf'
import SleekButton from '../common/SleekButton'
import { FaLinkedinIn } from 'react-icons/fa'

const LinkedInButtonWrapper = styled.div`
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

const CTA = () => {
  return (
    <div className='cta'>
      <SleekButton>
        <a href={CV} download style={{ color: 'inherit', textDecoration: 'none' }}>
          Download Resume
        </a>
      </SleekButton>

      <LinkedInButtonWrapper>
        <SleekButton>
          <a 
            href="https://www.linkedin.com/in/mrtravisstephenson" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <FaLinkedinIn style={{ fontSize: '1.2em' }} />
            |  Follow us on LinkedIn
          </a>
        </SleekButton>
      </LinkedInButtonWrapper>

      <SleekButton>
        <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>
          Let's Talk
        </a>
      </SleekButton>
    </div>
  )
}

export default CTA