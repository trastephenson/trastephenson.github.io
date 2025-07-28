import React from 'react'
import CV from '../../assets/cv.pdf'
import SleekButton from '../common/SleekButton'

const CTA = () => {
  return (
    <div className='cta'>
        <SleekButton>
          <a href={CV} download style={{ color: 'inherit', textDecoration: 'none' }}>Download CV</a>
        </SleekButton>
        <SleekButton>
          <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Let's Talk</a>
        </SleekButton>
    </div>
  )
}

export default CTA