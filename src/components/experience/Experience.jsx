import React from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--accent);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Tag = styled.span`
  display: inline-block;
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  background: rgba(0, 240, 255, 0.06);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  border: 1px solid rgba(0, 240, 255, 0.12);
  cursor: default;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: rgba(0, 240, 255, 0.15);
    border-color: rgba(0, 240, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const ALL_SKILLS = [
  'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Next.js',
  'Vue.js', 'Angular', 'Tailwind CSS', 'Sass', 'Bootstrap', 'Ruby on Rails',
  'Node.js', 'Python', 'PHP', 'Elixir', 'Express.js',
  'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'GraphQL', 'Docker', 'AWS',
  'System Design', 'Microservices', 'API Design', 'Cloud Architecture',
  'Database Design', 'Security Architecture', 'Scalability Planning',
  'Integration Patterns', 'DevOps Practices', 'Performance Optimization',
  'Data Modeling', 'Enterprise Architecture',
  'CompTIA Project+', 'ITIL Foundations', 'Lean Six Sigma Yellow Belt',
  'AWS Cloud Practitioner', 'PMP Certification',
];

const Experience = () => {
  return (
    <SkillsContainer>
      <SectionTitle>Skills</SectionTitle>
      <TagCloud>
        {ALL_SKILLS.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </TagCloud>
    </SkillsContainer>
  );
};

export default Experience;
