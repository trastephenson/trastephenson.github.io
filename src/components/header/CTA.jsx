import React from 'react'
import CV from '../../assets/cv.pdf'
import GlowingButton from '../common/GlowingButton'

const CTA = () => {
  return (
    <div className='cta'>
        <GlowingButton>
          <a href={CV} download style={{ color: 'inherit', textDecoration: 'none' }}>Download CV</a>
        </GlowingButton>
        <GlowingButton>
          <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Let's Talk</a>
        </GlowingButton>
    </div>
  )
}

export default CTA