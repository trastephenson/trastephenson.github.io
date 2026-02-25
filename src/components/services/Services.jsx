import React from 'react';
import styled from 'styled-components';

const ToolsContainer = styled.section`
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
  background: rgba(0, 180, 212, 0.08);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  border: 1px solid rgba(0, 180, 212, 0.15);
  cursor: default;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    background: rgba(0, 180, 212, 0.2);
    border-color: rgba(0, 180, 212, 0.35);
    box-shadow: 0 0 15px rgba(0, 180, 212, 0.2);
    transform: translateY(-2px);
  }
`;

const ALL_TOOLS = [
  'Figma', 'Adobe XD', 'Blender', 'Adalo', 'Sketch', 'InVision',
  'Adobe Creative Suite', 'Prototyping', 'Wireframing', 'User Research',
  'AWS', 'Azure', 'GitHub/GitLab', 'Docker', 'Kubernetes', 'Jenkins',
  'Terraform', 'Ansible', 'Vagrant', 'VSCode', 'IntelliJ', 'Postman',
  'Jira', 'DevOps', 'Lean Six Sigma', 'OpenProject', 'Confluence',
  'Trello', 'Asana', 'Monday.com', 'Slack', 'Microsoft Teams',
];

const Services = () => {
  return (
    <ToolsContainer>
      <SectionTitle>Tools</SectionTitle>
      <TagCloud>
        {ALL_TOOLS.map((tool) => (
          <Tag key={tool}>{tool}</Tag>
        ))}
      </TagCloud>
    </ToolsContainer>
  );
};

export default Services;
