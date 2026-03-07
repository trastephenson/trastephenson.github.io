import React, { useState } from 'react';
import styled from 'styled-components';

const SkillsContainer = styled.section`
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: -0.04em;
  margin-bottom: 2rem;
`;

const AccordionStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
`;

const Panel = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition:
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 52px color-mix(in srgb, var(--accent) 12%, rgba(18, 25, 34, 0.1));
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
  padding: 1rem 1.1rem;
  text-align: left;
  outline: none;
  gap: 0.75rem;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
    border-radius: var(--radius-md);
  }
`;

const CategoryLabel = styled.span`
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  flex: 1;
`;

const SkillCount = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-secondary);
  opacity: 0.75;
  letter-spacing: 0.05em;
`;

const Chevron = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--text-secondary);
  opacity: 0.65;
  transition: transform var(--motion-normal) var(--ease-standard);
  transform: rotate(${(props) => (props.$open ? '180deg' : '0deg')});
  flex-shrink: 0;
`;

const TagsOuter = styled.div`
  display: grid;
  grid-template-rows: ${(props) => (props.$open ? '1fr' : '0fr')};
  transition: grid-template-rows var(--motion-slow) var(--ease-standard);
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
  background: color-mix(in srgb, var(--accent) 9%, white);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  border: 1px solid color-mix(in srgb, var(--accent) 16%, white);
  cursor: default;
  transition:
    background-color var(--motion-normal) var(--ease-standard),
    border-color var(--motion-normal) var(--ease-standard),
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);
  font-family: var(--font-body);

  &:hover {
    background: color-mix(in srgb, var(--accent) 14%, white);
    border-color: color-mix(in srgb, var(--accent) 22%, white);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }
`;

const SKILL_GROUPS = [
  {
    category: 'AI Systems',
    skills: [
      'Multi-Agent LLM Systems',
      'RAG Architecture',
      'OpenAI / Gemini / DeepSeek',
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
    category: 'Cloud and DevOps',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub / GitLab'],
  },
  {
    category: 'Languages and Frameworks',
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
  const [openGroup, setOpenGroup] = useState('AI Systems');

  const toggle = (category) => {
    setOpenGroup((prev) => (prev === category ? null : category));
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
                <Chevron $open={isOpen}>v</Chevron>
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
