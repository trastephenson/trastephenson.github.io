import React from 'react'
import './services.css'
import {FaToolbox} from 'react-icons/fa'
import {FaFigma} from 'react-icons/fa'
import {SiAdobexd} from 'react-icons/fa'
import {SiBlender} from 'react-icons/fa'


const Services = () => {
  return (
    <section id='services'>
      <h5>Other Proficiencies</h5>
      <h2>Tools Used</h2>

      <div className="container services__container">
        <article className="service">
          <div className="service__head">
            <h3>UI/UX Design</h3>
          </div>

          <ul className='service__list'>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>
      Figma-Check out one of my component libraries.{' '}
      <a
        href="https://www.figma.com/file/qcOL0OUNoaHpRW4T4EJehX/Appstango-Library?node-id=0%3A1&t=vKZ8xTL9DZaMSXGq-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFigma />
      </a>
    </p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>
      Adobe XD{' '}
      <a
        href="https://youtu.be/3xAadIADHOw"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiAdobexd />
      </a>
    </p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
               <p>
      Blender{' '}
      <a
        href="https://photos.app.goo.gl/dHMsJJ84dinH115z6"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiBlender />
      </a>
    </p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Adalo</p>
            </li>
            
          </ul>
        </article>
       
        <article className="service">
          <div className="service__head">
            <h3>Software Development</h3>
          </div>

          <ul className='service__list'>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>AWS</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Azure</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Github/Gitlab</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Docker</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Slack</p>
            </li>
          </ul>
        </article>
       
        <article className="service">
          <div className="service__head">
            <h3>Project Management</h3>
          </div>

          <ul className='service__list'>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Jira</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>DevOps</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lean Sigma Six Yellow Belt</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>OpenProject</p>
            </li>
          </ul>
        </article>
        
      </div>
    </section>
  )
}

export default Services
