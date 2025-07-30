import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/travitar9000.gif'
import IMG2 from '../../assets/ciri.png'
import IMG3 from '../../assets/portfolio3.gif'
import IMG4 from '../../assets/0727.gif'
import TravIcon from '../../assets/travicon.png'
import SleekButton from '../common/SleekButton'

const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Travitar 9000 Virtual Chatbot of Me',
    description: 'A virtual chatbot that simulates conversations with me, built with modern web technologies and AI integration.',
    github: 'https://github.com/trastephenson/Travitar-9000',
    demo: 'https://travitar-9000.vercel.app/'
  },
  {
    id: 2,
    image: IMG2,
    title: 'Ciri and Friends Ruby CRUD App',
    description: 'A full-stack web application built with Ruby on Rails, featuring user authentication and data management.',
    github: 'https://github.com/chilooby/Ciri-and-Friends-Ruby-on-Rails-App',
    demo: 'http://ciriandfriendsapp.herokuapp.com/'
  },
  {
    id: 3,
    image: IMG3,
    title: 'Update of The Essential Life App in Flutter',
    description: 'Mobile application development using Flutter framework, focusing on user experience and modern design patterns.',
    github: 'https://youtu.be/3xAadIADHOw',
    demo: 'https://app.essentiallife.com/'
  },
  {
    id: 4,
    image: IMG4,
    title: 'Vacation Scheduler App',
    description: 'An offline-first trip planner that lets you create unlimited vacations with excursions. Features local data storage with Room, Android notifications, and one-tap sharing.',
    github: 'https://github.com/trastephenson/d424-capstone/tree/working-branch',
    demo: 'https://chilooby.itch.io/vacation-scheduler-app'
  }
]

const Portfolio = () => {
  return (
    <section id='portfolio' style={{ marginBottom: '0', paddingTop: '0' }}>
      <h5 style={{ 
        color: '#E6E6FA',
        fontSize: '1.2rem',
        fontWeight: '400',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>My Recent Work</h5>
      <h2 style={{ 
        color: 'white',
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: '700',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>Portfolio</h2>

      <div 
        className="slider"
        style={{
          '--width': '500px',
          '--height': '350px',
          '--quantity': data.length
        }}
      >
        <div className="list">
          {data.map(({id, image, title, description, github, demo}, index) => {
            return (
              <div key={id} className="item" style={{'--position': index + 1}}>
                <div className="card">
                  <img src={TravIcon} alt="Trav Icon" className="card-icon" />
                  <div className="card__image">
                    <img src={image} alt={title} />
                  </div>
                  <div className="card__content">
                    <p className="card__title">{title}</p>
                    <p className="card__description">{description}</p>
                    <a href={demo} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      <SleekButton>Live Demo</SleekButton>
                    </a>
                    <a href={github} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                      <SleekButton>Source Code</SleekButton>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
