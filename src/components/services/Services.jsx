import React from 'react'
import './services.css'
import {FaToolbox} from 'react-icons/fa'
import {FaFigma} from 'react-icons/fa'

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
      Adobe Creative Cloud{' '}
      <a
        href="https://youtu.be/3xAadIADHOw"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiAdobe />
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
            
          </ul>
        </article>
       
        <article className="service">
          <div className="service__head">
            <h3>Web Development</h3>
          </div>

          <ul className='service__list'>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
          </ul>
        </article>
       
        <article className="service">
          <div className="service__head">
            <h3>Content Creation</h3>
          </div>

          <ul className='service__list'>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
            <li>
              <FaToolbox className='service__list-icon' />
              <p>Lorem, ipsum dolor sit amet consectetur elit.</p>
            </li>
          </ul>
        </article>
        
      </div>
    </section>
  )
}

export default Services
