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
  margin-bottom: 2rem;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.6),
    0 2px 0 rgba(0,100,180,0.15),
    0 3px 8px rgba(0,136,204,0.12);
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
`;

const Group = styled.div`
  background: linear-gradient(145deg, rgba(255,255,255,0.88) 0%, rgba(247,249,255,0.84) 100%);
  backdrop-filter: blur(28px) saturate(200%) brightness(112%);
  -webkit-backdrop-filter: blur(28px) saturate(200%) brightness(112%);
  border: 1px solid rgba(255,255,255,0.75);
  border-top: 1.5px solid rgba(255,255,255,0.96);
  border-radius: 16px;
  padding: 1.1rem 1.2rem;
  box-shadow:
    0 12px 40px rgba(0,0,0,0.09),
    0 4px 12px rgba(0,0,0,0.06),
    inset 0 1.5px 0 rgba(255,255,255,0.98),
    inset 0 -1px 0 rgba(255,255,255,0.28),
    inset 1px 0 0 rgba(255,255,255,0.72),
    inset -1px 0 0 rgba(255,255,255,0.20);
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow:
      0 20px 56px rgba(0,136,204,0.10),
      0 6px 18px rgba(0,0,0,0.07),
      inset 0 1.5px 0 rgba(255,255,255,0.98),
      inset 0 -1px 0 rgba(255,255,255,0.28),
      inset 1px 0 0 rgba(255,255,255,0.72),
      inset -1px 0 0 rgba(255,255,255,0.20);
    transform: translateY(-2px);
  }
`;

const GroupLabel = styled.p`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.8rem;
  text-shadow: 0 1px 3px rgba(0,136,204,0.18);
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Tag = styled.span`
  display: inline-block;
  color: var(--text-primary);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  background: rgba(0, 136, 204, 0.06);
  padding: 0.35rem 0.85rem;
  border-radius: 50px;
  border: 1px solid rgba(0, 136, 204, 0.12);
  cursor: default;
  transition: all 0.25s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: rgba(0, 136, 204, 0.12);
    border-color: rgba(0, 136, 204, 0.25);
    box-shadow: 0 2px 8px rgba(0, 136, 204, 0.10);
    transform: translateY(-1px);
  }
`;

const SKILL_GROUPS = [
  {
    category: 'AI Systems',
    skills: [
      'Multi-Agent LLM Systems',
      'RAG Architecture',
      'OpenAI · Gemini · DeepSeek',
      'LLM Workflow Orchestration',
      'AI-Enabled Automation',
    ],
  },
  {
    category: 'Platform Architecture',
    skills: [
      'System Design',
      'Enterprise Architecture',
      'Microservices',
      'API Design',
      'Cloud Architecture',
      'Integration Patterns',
    ],
  },
  {
    category: 'Engineering Operations',
    skills: [
      'Delivery Governance',
      'Technical Roadmapping',
      'Agile / Scrum',
      'ITIL Foundations',
      'Lean Six Sigma',
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub / GitLab'],
  },
  {
    category: 'Languages & Frameworks',
    skills: ['Python', 'TypeScript', 'React', 'Node.js', 'GraphQL', 'PostgreSQL'],
  },
  {
    category: 'Certifications',
    skills: [
      'AWS Cloud Practitioner',
      'CompTIA Project+',
      'PMP',
      'ITIL Foundations',
      'Lean Six Sigma Yellow Belt',
    ],
  },
];

const Experience = () => {
  return (
    <SkillsContainer>
      <SectionTitle>Capabilities</SectionTitle>
      <GroupsGrid>
        {SKILL_GROUPS.map(({ category, skills }) => (
          <Group key={category}>
            <GroupLabel>{category}</GroupLabel>
            <TagRow>
              {skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </TagRow>
          </Group>
        ))}
      </GroupsGrid>
    </SkillsContainer>
  );
};

export default Experience;
