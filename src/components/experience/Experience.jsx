import React from 'react'
import './experience.css'
import StyledTagCard from './StyledTagCard'

const Experience = () => {
  const frontendSkills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Ruby on Rails',
    'TypeScript', 'Next.js', 'Tailwind CSS', 'Sass', 'Vue.js', 'Angular'
  ];

  const backendSkills = [
    'Node.js', 'MongoDB', 'MySQL', 'PHP', 'Elixir', 'Python',
    'Express.js', 'PostgreSQL', 'Redis', 'GraphQL', 'Docker', 'AWS'
  ];

  const projectManagementCertifications = [
    'CompTIA Project+', 'ITIL Foundations', 'Lean Six Sigma Yellow Belt',
    'AWS Cloud Practitioner', 'PMP Certification'
  ];

  const solutionsArchitectureSkills = [
    'System Design', 'Microservices', 'API Design', 'Cloud Architecture',
    'Database Design', 'Security Architecture', 'Scalability Planning',
    'Integration Patterns', 'DevOps Practices', 'Performance Optimization',
    'Data Modeling', 'Enterprise Architecture'
  ];

  return (
    <section id='experience' style={{ marginBottom: '0' }}>
      <h5 style={{ 
        color: '#E6E6FA',
        fontSize: '1.2rem',
        fontWeight: '400',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>The Skills I Have</h5>
      <h2 style={{ 
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>My Experience</h2>
      
      <div className="container experience__container">
        <StyledTagCard 
          title="Frontend Development"
          tags={frontendSkills}
        />
        
        <StyledTagCard 
          title="Backend Development"
          tags={backendSkills}
        />

        <StyledTagCard 
          title="Solutions Architecture"
          tags={solutionsArchitectureSkills}
        />

        <StyledTagCard 
          title="Project Management & Certifications"
          tags={projectManagementCertifications}
        />
      </div>
    </section>
  )
}

export default Experience