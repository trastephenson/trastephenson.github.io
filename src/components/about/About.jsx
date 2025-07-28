import React from 'react'
import './about.css'
import ME from '../../assets/me-about.png'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {MdOutlineFolderSpecial} from 'react-icons/md'
import SleekButton from '../common/SleekButton'
import InteractiveCard from './InteractiveCard'

const About = () => {
  return (
    <section id='about' style={{ marginBottom: '0' }}>
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
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
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
              subtitle="<ul><li>Total Wellness Media</li><li>Seeds of Thyme</li><li>Utah Valley University</li><li>Companion Asset Management</li><li>Angel Studios</li></ul>"
              prompt="HOVER FOR DETAILS"
            />

            <InteractiveCard 
              icon={MdOutlineFolderSpecial}
              title="Projects"
              subtitle="<ul><li><a href='https://www.oillife.com/pages/essential-life-app' target='_blank' rel='noopener noreferrer'>Essential Life</a></li><li><a href='https://www.seedsofthyme.com/pages/app-seedsofthyme' target='_blank' rel='noopener noreferrer'>Seeds of Thyme</a></li><li><a href='https://camscompanion.com/' target='_blank' rel='noopener noreferrer'>CAMS ATM Management</a></li><li><a href='https://safetywallet.org/' target='_blank' rel='noopener noreferrer'>Safety Wallet</a></li><li><a href='https://www.pantryplenty.com/' target='_blank' rel='noopener noreferrer'>Pantry Plenty</a></li></ul>"
              prompt="HOVER FOR DETAILS"
            />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <SleekButton>
              <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Let's Talk</a>
            </SleekButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
