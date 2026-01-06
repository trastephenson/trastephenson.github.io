import React from 'react'
import './portfolio.css'
import TravIcon from '../../assets/travicon.png'
import IMG1 from '../../assets/sot.png'
import IMG2 from '../../assets/portfolio3.gif'
import IMG3 from '../../assets/CAMS.png'
import IMG4 from '../../assets/Safety.png'
import IMG5 from '../../assets/portfolio5.png'
import SleekButton from '../common/SleekButton'

const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Seeds of Thyme (Mobile App)',
    summary: 'Mobile app with UX/UI ownership—shipped to production on iOS.',
    description:
      'Role: Senior Technical Product Manager / Solutions Lead (UX/UI ownership)\n' +
      'Problem: Needed a clear, mobile-first UX to support core user workflows and adoption.\n' +
      'Owned: Led UX/UI design for production flows, information architecture, navigation, and feature screens; partnered with engineering to ship.\n' +
      'Impact: Shipped to production on iOS and supported ongoing iteration.',
    primaryCta: 'Product Site',
    primaryUrl: 'https://www.seedsofthyme.com/pages/app-seedsofthyme',
    secondaryCta: 'View on App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/seeds-of-thyme/id6450909951'
  },
  {
    id: 2,
    image: IMG2,
    title: 'The Essential Life App (Flutter Platform Delivery)',
    summary: 'Scalable mobile platform delivery and modernization for production customer experience.',
    description:
      'Role: Technical Product / Solutions Lead\n' +
      'Problem: Needed scalable mobile delivery and modernization for a production customer experience.\n' +
      'Owned: Product delivery leadership, technical planning, cross-team execution, and quality governance.\n' +
      'Impact: Improved delivery execution and supported a modernized mobile experience.',
    primaryCta: 'Product Site',
    primaryUrl: 'https://www.oillife.com/pages/essential-life-app',
    secondaryCta: 'View on App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865'
  },
  {
    id: 3,
    image: IMG3,
    title: 'CAMS (Companion ATM Management Systems)',
    summary: 'Operational platform with reliable workflows and scalable delivery.',
    description:
      'Role: Technical Product / Solutions Lead\n' +
      'Problem: Operational platform required reliable workflows, data consistency, and scalable delivery.\n' +
      'Owned: Requirements → architecture collaboration, API/data alignment, delivery governance across teams.\n' +
      'Impact: Improved delivery reliability and supported platform feature execution.',
    primaryCta: 'Company Site',
    primaryUrl: 'https://camscompanion.com/',
    secondaryCta: 'Learn More',
    secondaryUrl: 'https://camscompanion.com/'
  },
  {
    id: 4,
    image: IMG4,
    title: 'Safety Wallet (Platform + PDF Workflow Delivery)',
    summary: 'App delivery with reliable workflows and document generation capabilities.',
    description:
      'Role: Product & Delivery Lead\n' +
      'Problem: Needed reliable app workflows and document generation capabilities for real users.\n' +
      'Owned: App delivery leadership, testing strategy, client communication, and platform execution.\n' +
      'Impact: Stabilized delivery and improved production readiness for key workflows.',
    primaryCta: 'Company Site',
    primaryUrl: 'https://safetywallet.org/',
    secondaryCta: 'Contact Me',
    secondaryUrl: '#contact'
  },
  {
    id: 5,
    image: IMG5,
    title: 'GenAI / LLM Workflows (OpenAI, Gemini, DeepSeek)',
    summary: 'AI-enabled workflows for faster insight extraction and decision support.',
    description:
      'Role: Technical Product & Architecture Lead\n' +
      'Problem: Users needed faster workflows and better insight extraction across complex systems.\n' +
      'Owned: Defined LLM use cases, designed workflows, guided prompt iteration and response evaluation, aligned cost/latency constraints.\n' +
      'Impact: Improved workflow efficiency and decision support while maintaining reliability and operational constraints.',
    primaryCta: "Let's Talk",
    primaryUrl: '#contact',
    secondaryCta: 'LinkedIn',
    secondaryUrl: 'https://www.linkedin.com/in/mrtravisstephenson'
  }
]

const Portfolio = () => {
  return (
    <section id='portfolio' style={{ marginBottom: '0', paddingTop: '0' }}>
      <h2 style={{
        color: 'white',
        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
        fontWeight: '700',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>
        Featured Work
      </h2>

      <div
        className="slider"
        style={{
          '--width': '520px',
          '--height': '380px',
          '--quantity': data.length
        }}
      >
        <div className="list">
          {data.map(({ id, image, title, summary, description, primaryCta, primaryUrl, secondaryCta, secondaryUrl }, index) => (
            <div key={id} className="item" style={{ '--position': index + 1 }}>
              <div className="card">
                <img src={TravIcon} alt="Trav Icon" className="card-icon" />
                <div className="card__image">
                  <img src={image} alt={title} />
                </div>
                <div className="card__content">
                  <p className="card__title">{title}</p>
                  <p className="card__description" style={{ whiteSpace: 'pre-line' }}>{description}</p>

                  <div className="card__buttons">
                    <a href={primaryUrl} target={primaryUrl.startsWith('http') ? "_blank" : undefined}
                       rel={primaryUrl.startsWith('http') ? "noopener noreferrer" : undefined}
                       style={{ color: 'inherit', textDecoration: 'none' }}>
                      <SleekButton>{primaryCta}</SleekButton>
                    </a>

                    <a href={secondaryUrl} target={secondaryUrl.startsWith('http') ? "_blank" : undefined}
                       rel={secondaryUrl.startsWith('http') ? "noopener noreferrer" : undefined}
                       style={{ color: 'inherit', textDecoration: 'none' }}>
                      <SleekButton>{secondaryCta}</SleekButton>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
