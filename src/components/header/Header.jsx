import React from 'react'
import './header.css'
import CTA from './CTA'
import HeaderSocial from './HeaderSocials'
import NewHeaderCard from './NewHeaderCard'

const Header = () => {
  return (
    <header style={{ paddingBottom: '4rem', minHeight: '100vh', height: 'auto', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', overflow: 'visible' }}>
      <div className="container header__container">
        <h5 style={{ 
          color: '#E6E6FA',
          fontSize: '1.2rem',
          fontWeight: '400',
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>Hello I'm</h5>
        <h1 style={{ 
          color: 'white', 
          fontSize: 'clamp(2.5rem, 8vw, 6rem)',
          fontWeight: '900',
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
          textShadow: '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.6), 0 0 90px rgba(255,255,255,0.3)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: '1.1',
          margin: '0.5rem 0'
        }}>Travis Stephenson</h1>
        <h2 style={{ 
          color: '#E6E6FA', 
          fontSize: 'clamp(1rem, 4vw, 1.5rem)',
          fontWeight: '700',
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
          textShadow: '0 0 20px rgba(230,230,250,0.8), 0 0 40px rgba(230,230,250,0.5)',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          lineHeight: '1.2',
          marginTop: '1rem'
        }}>
          Principal Solutions Architect | Technical Product & Platform Leader | AI Engineering (MS)
        </h2>
        <p style={{
          color: '#E6E6FA',
          marginTop: '0.75rem',
          fontSize: '1rem',
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
          letterSpacing: '0.02em',
          opacity: 0.95
        }}>
          Cloud-native platforms • AI-enabled automation • Client-facing architecture & delivery ownership
        </p>
        <CTA />
        <HeaderSocial />

        <div className="me">
          <NewHeaderCard />
        </div>


      </div>
    </header>
  )
}

export default Header
