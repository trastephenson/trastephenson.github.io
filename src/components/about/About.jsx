import React from 'react'
import './about.css'
import ME from '../../assets/travicon.png'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {MdOutlineFolderSpecial} from 'react-icons/md'
import GlowingButton from '../common/GlowingButton'
import InteractiveCard from './InteractiveCard'

const About = () => {
  return (
    <section id='about'>
      <h5 style={{ 
        color: '#E6E6FA',
        fontSize: '1.2rem',
        fontWeight: '400',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>Get To Know</h5>
      <h2 style={{ 
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About Image" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <InteractiveCard 
              icon={GiDiceTwentyFacesTwenty}
              title="Experience"
              subtitle="<ul><li>Software Development</li><li>Project Management</li><li>QA</li><li>Solutions Architecture</li></ul>"
              prompt="HOVER FOR DETAILS"
            />

            <InteractiveCard 
              icon={IoIosPeople}
              title="Clients"
              subtitle="50+ Worldwide"
              prompt="HOVER FOR DETAILS"
            />

            <InteractiveCard 
              icon={MdOutlineFolderSpecial}
              title="Projects"
              subtitle="50+ Completed"
              prompt="HOVER FOR DETAILS"
            />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <GlowingButton>
              <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Let's Talk</a>
            </GlowingButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
