import React, { useState, useEffect } from 'react'
import './testimonials.css'
import MAGESH from '../../assets/magesh.jpg'
import BERT from '../../assets/bert.jpg'
import ARYAN from '../../assets/aryan.jpg'
import SAM from '../../assets/sam.jpg'
import ANIRBAN from '../../assets/anirban.jpg'
import StyledTestimonialCard from './StyledTestimonialCard'

// Import React Awesome Slider
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const data = [
  {
    avatar: MAGESH,
    name: 'Magesh',
    jobTitle: 'QA Lead at Fidelity',
    review: '"I\'ve had a pleasure of working with Travis and can confidently say they are a highly skilled, dedicated professional. Their ability to manage projects efficiently, communicate effectively, and solve problems proactively sets them apart. Travis collaboration and consistently delivers high-quality results on time. I highly recommend them for any role requiring strong leadership and strategic thinking."',
    rating: 5
  },
  {
    avatar: BERT,
    name: 'Bert Curtis',
    jobTitle: 'Senior SDET',
    review: '"It has been a pleasure to see Travis as he develops his full stack software development skills. He consistently demonstrates a passion for learning and problem-solving, with a strong grasp of both front-end and back-end technologies. I have no doubt that Travis will excel in any tech and make a valuable contribution to any team he joins."',
    rating: 5
  },
  {
    avatar: ARYAN,
    name: 'Aryan Basak',
    jobTitle: 'Project Manager & Customer Success @ Utah Tech Labs',
    review: '"I had the pleasure of working with Travis as an Agile Project Manager, and I can confidently say he is a standout professional in his field. Travis excels at managing complex projects with a keen eye for detail and a strong commitment to Agile principles. His ability to foster collaboration within the team and drive projects to successful completion is truly impressive. He is highly organized, communicates effectively, and is adept at navigating challenges to keep projects on track. Travis\'s leadership skills, combined with his technical understanding and proactive approach, make him an invaluable asset to any team. I highly recommend Travis for any Agile project management role."',
    rating: 5
  },
  {
    avatar: SAM,
    name: 'Sammuel Syphrett',
    jobTitle: 'Concrete Paving Estimator',
    review: '"As a supervisor, Travis has consistently demonstrated exceptional leadership and humility. His ability to explain complex concepts clearly and effectively makes him an invaluable asset to any team. Travis is not only a hard worker but also an intelligent problem solver who approaches challenges with a positive attitude. His dedication and leadership skills are truly remarkable."',
    rating: 5
  },
  {
    avatar: ANIRBAN,
    name: 'Anirban Dutta',
    jobTitle: 'Python Data Engineer',
    review: '"Travis is a well organised Project Manager who has lots of experience in handling clients. He is a great team player and always keeps the team spirit high. He not only manages the project well but also assures quality delivery. Travis always goes beyond to assure the project is successful."',
    rating: 5
  },
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
         <section id='testimonials' style={{ 
       marginBottom: '0',
       width: '100vw',
       marginLeft: 'calc(-50vw + 50%)',
       paddingTop: window.innerWidth <= 768 ? '2rem' : '4rem',
       paddingBottom: window.innerWidth <= 768 ? '2rem' : '0',
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
       minHeight: window.innerWidth <= 768 ? 'auto' : '100vh'
     }}>
             <h2 style={{ 
         color: 'white',
         fontSize: window.innerWidth <= 768 ? 'clamp(1.2rem, 5vw, 1.8rem)' : 'clamp(1.5rem, 4vw, 2.5rem)',
         fontWeight: '700',
         fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
         letterSpacing: '0.05em',
         textTransform: 'uppercase',
         textShadow: '0 0 20px rgba(255,255,255,0.3)',
         marginBottom: window.innerWidth <= 768 ? '2rem' : '3rem',
         textAlign: 'center',
         padding: window.innerWidth <= 768 ? '0 1rem' : '0'
       }}>Recommendations</h2>

             <div style={{ 
         width: '100%', 
         height: window.innerWidth <= 768 ? '400px' : '500px',
         maxWidth: '100vw',
         overflow: 'hidden'
       }}>
         <AwesomeSlider
           fillParent={true}
           bullets={true}
           organicArrows={true}
           infinite={true}
           selected={activeIndex}
           onTransitionRequest={(e) => setActiveIndex(e.nextIndex)}
           mobileTouch={true}
           touchStartThreshold={5}
           touchEndThreshold={30}
           style={{
             '--slider-height-percentage': '100%',
             '--slider-transition-duration': '600ms',
             '--organic-arrow-thickness': window.innerWidth <= 768 ? '3px' : '4px',
             '--organic-arrow-border-radius': '0px',
             '--organic-arrow-height': window.innerWidth <= 768 ? '30px' : '40px',
             '--organic-arrow-color': '#ffffff',
             '--control-button-width': window.innerWidth <= 768 ? '15%' : '10%',
             '--control-button-height': window.innerWidth <= 768 ? '30%' : '25%',
             '--control-button-background': 'transparent',
             '--control-bullet-color': '#ffffff',
             '--control-bullet-active-color': '#ffffff',
             '--loader-bar-color': '#ffffff',
             '--loader-bar-height': window.innerWidth <= 768 ? '4px' : '6px'
           }}
         >
                     {data.map(({avatar, name, jobTitle, review, rating}, index) => (
             <div key={index} style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               padding: window.innerWidth <= 768 ? '1rem' : '2rem',
               backgroundColor: 'transparent',
               width: '100%',
               maxWidth: window.innerWidth <= 768 ? '90vw' : '100%'
             }}>
              <StyledTestimonialCard 
                avatar={avatar}
                name={name}
                jobTitle={jobTitle}
                review={review}
                rating={rating}
                isActive={activeIndex === index}
              />
            </div>
          ))}
        </AwesomeSlider>
      </div>
    </section>
  )
}

export default Testimonials