import React, { useState } from 'react';
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

const AccordionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
`;

const Panel = styled.div`
  background: linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(247,249,255,0.28) 100%);
  backdrop-filter: blur(28px) saturate(220%) brightness(115%);
  -webkit-backdrop-filter: blur(28px) saturate(220%) brightness(115%);
  border: 1px solid rgba(255,255,255,0.75);
  border-top: 1.5px solid rgba(255,255,255,0.96);
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 8px 28px rgba(0,0,0,0.07),
    0 2px 8px rgba(0,0,0,0.04),
    inset 0 1.5px 0 rgba(255,255,255,0.98),
    inset 0 -1px 0 rgba(255,255,255,0.25),
    inset 1px 0 0 rgba(255,255,255,0.68),
    inset -1px 0 0 rgba(255,255,255,0.18);
  transition: box-shadow 0.22s ease;

  &:hover {
    box-shadow:
      0 12px 36px rgba(0,136,204,0.09),
      0 2px 8px rgba(0,0,0,0.04),
      inset 0 1.5px 0 rgba(255,255,255,0.98),
      inset 0 -1px 0 rgba(255,255,255,0.25),
      inset 1px 0 0 rgba(255,255,255,0.68),
      inset -1px 0 0 rgba(255,255,255,0.18);
  }
`;

const PanelHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.9rem 1.1rem;
  text-align: left;
  outline: none;
  gap: 0.75rem;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
    border-radius: 12px;
  }
`;

const CategoryLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  text-shadow: 0 1px 3px rgba(0,136,204,0.18);
  flex: 1;
`;

const SkillCount = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-secondary);
  opacity: 0.55;
  letter-spacing: 0.05em;
`;

const Chevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: var(--text-secondary);
  opacity: 0.55;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(${props => props.$open ? '180deg' : '0deg'});
  flex-shrink: 0;
`;

// CSS grid trick: grid-template-rows 0fr → 1fr for smooth height animation
const TagsOuter = styled.div`
  display: grid;
  grid-template-rows: ${props => props.$open ? '1fr' : '0fr'};
  transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TagsInner = styled.div`
  overflow: hidden;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding: 0 1.1rem 1rem;
`;

const Tag = styled.span`
  display: inline-block;
  color: var(--text-primary);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  background: rgba(0, 136, 204, 0.07);
  padding: 0.35rem 0.85rem;
  border-radius: 50px;
  border: 1px solid rgba(0, 136, 204, 0.14);
  cursor: default;
  transition: all 0.22s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: rgba(0, 136, 204, 0.14);
    border-color: rgba(0, 136, 204, 0.28);
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
  // AI Systems open by default — leads with the most strategic category
  const [openGroup, setOpenGroup] = useState('AI Systems');

  const toggle = (category) => {
    setOpenGroup(prev => prev === category ? null : category);
  };

  return (
    <SkillsContainer>
      <SectionTitle>Capabilities</SectionTitle>
      <AccordionStack>
        {SKILL_GROUPS.map(({ category, skills }) => {
          const isOpen = openGroup === category;
          return (
            <Panel key={category}>
              <PanelHeader
                onClick={() => toggle(category)}
                aria-expanded={isOpen}
                aria-controls={`skills-${category}`}
              >
                <CategoryLabel>{category}</CategoryLabel>
                <SkillCount>{skills.length} skills</SkillCount>
                <Chevron $open={isOpen}>▼</Chevron>
              </PanelHeader>
              <TagsOuter $open={isOpen} id={`skills-${category}`} role="region">
                <TagsInner>
                  <TagRow>
                    {skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </TagRow>
                </TagsInner>
              </TagsOuter>
            </Panel>
          );
        })}
      </AccordionStack>
    </SkillsContainer>
  );
};

export default Experience;
