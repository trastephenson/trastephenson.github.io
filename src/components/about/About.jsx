import React from 'react'
import './about.css'
import ME from '../../assets/me-about.png'
import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'
import {IoIosPeople} from 'react-icons/io'
import {MdOutlineFolderSpecial} from 'react-icons/md'

const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="About Image" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className='about__card'>
              <GiDiceTwentyFacesTwenty className='about__icon'/>
              <h5>Experience</h5>
              <small>8+ Years Web Development</small>
            </article>

            <article className='about__card'>
              <IoIosPeople className='about__icon'/>
              <h5>Clients</h5>
              <small>150+ Worldwide</small>
            </article>

            <article className='about__card'>
              <MdOutlineFolderSpecial className='about__icon'/>
              <h5>Projects</h5>
              <small>150+ Completed</small>
            </article>
          </div>

          <p>
           This is the About me section.
          </p>

          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About
