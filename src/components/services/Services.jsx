import React from 'react'
import './services.css'
import StyledTagCard from '../experience/StyledTagCard'

const Services = () => {
  const uiUxTools = [
    'Figma', 'Adobe XD', 'Blender', 'Adalo', 'Sketch', 'InVision',
    'Adobe Creative Suite', 'Prototyping', 'Wireframing', 'User Research'
  ];

  const softwareDevTools = [
    'AWS', 'Azure', 'GitHub/GitLab', 'Docker', 'Kubernetes', 'Jenkins',
    'Terraform', 'Ansible', 'Vagrant', 'VSCode', 'IntelliJ', 'Postman'
  ];

  const projectManagementTools = [
    'Jira', 'DevOps', 'Lean Six Sigma', 'OpenProject', 'Confluence',
    'Trello', 'Asana', 'Monday.com', 'Slack', 'Microsoft Teams'
  ];

  return (
    <section id='services' style={{ marginBottom: '0' }}>
      <h5 style={{ 
        color: '#E6E6FA',
        fontSize: '1.2rem',
        fontWeight: '400',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>Other Proficiencies</h5>
      <h2 style={{ 
        color: 'white',
        fontSize: '2.5rem',
        fontWeight: '700',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textShadow: '0 0 20px rgba(255,255,255,0.3)'
      }}>Tools</h2>

      <div className="container services__container">
        <StyledTagCard 
          title="UI/UX Design Tools"
          tags={uiUxTools}
        />
        
        <StyledTagCard 
          title="Software Development Tools"
          tags={softwareDevTools}
        />

        <StyledTagCard 
          title="Project Management Tools"
          tags={projectManagementTools}
        />
      </div>
    </section>
  )
}

export default Services
