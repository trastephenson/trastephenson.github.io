import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/travitar9000.gif'
import IMG2 from '../../assets/ciri.png'
import IMG3 from '../../assets/portfolio3.gif'
import IMG4 from '../../assets/ciri.png'
import IMG5 from '../../assets/ciri.png'
import IMG6 from '../../assets/ciri.png'



const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Travitar 9000 Virtual Chatbot of Me',
    github: 'https://github.com/trastephenson/Travitar-9000',
    demo: 'https://travitar-9000.vercel.app/'
  },
  {
    id: 2,
    image: IMG2,
    title: 'Ciri and Friends Ruby CRUD App',
    github: 'https://github.com/trastephenson/Ciri-and-Friends-Ruby-on-Rails-App',
    demo: 'http://ciriandfriendsapp.herokuapp.com/'
  },
  {
    id: 3,
    image: IMG3,
    title: 'Identicon Maker in Elixir',
    github: 'https://github.com/trastephenson/identicon',
    demo: 'https://www.youtube.com/watch?v=8ybW48rKBME'
  }
]


const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {
          data.map(({id, image, title, github, demo}) => {
            return (
              <article key={id} className='portfolio__item'>
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className="portfolio__item-cta">
                <a href={github} className='btn' target='_blank'>Github</a>
                <a href={demo} className='btn btn-primary' target='_blank'>Live Demo</a>
              </div>
            </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Portfolio
