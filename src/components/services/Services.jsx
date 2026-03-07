import React from 'react';
import styled from 'styled-components';

const ToolsContainer = styled.section`
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

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  max-width: 1000px;
  margin: 0 auto;
  text-align: left;
`;

const Group = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(22px) saturate(165%);
  -webkit-backdrop-filter: blur(22px) saturate(165%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 1.1rem 1.2rem;
  box-shadow: var(--shadow-md);
  transition:
    box-shadow var(--motion-normal) var(--ease-standard),
    transform var(--motion-normal) var(--ease-standard);

  &:hover {
    box-shadow: 0 24px 54px color-mix(in srgb, var(--accent) 12%, rgba(18, 25, 34, 0.1));
    transform: translateY(-2px);
  }
`;

const GroupLabel = styled.p`
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.8rem;
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

const TOOL_GROUPS = [
  {
    category: 'Cloud and Infrastructure',
    tools: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
  },
  {
    category: 'Development and API',
    tools: ['GitHub / GitLab', 'VSCode', 'IntelliJ', 'Postman', 'CI/CD Pipelines'],
  },
  {
    category: 'Design and Prototyping',
    tools: ['Figma', 'Prototyping', 'Wireframing'],
  },
  {
    category: 'Project and Collaboration',
    tools: ['Jira', 'Confluence', 'Slack', 'Microsoft Teams'],
  },
];

const Services = () => {
  return (
    <ToolsContainer>
      <SectionTitle>Tools and Platforms</SectionTitle>
      <GroupsGrid>
        {TOOL_GROUPS.map(({ category, tools }) => (
          <Group key={category}>
            <GroupLabel>{category}</GroupLabel>
            <TagRow>
              {tools.map((tool) => (
                <Tag key={tool}>{tool}</Tag>
              ))}
            </TagRow>
          </Group>
        ))}
      </GroupsGrid>
    </ToolsContainer>
  );
};

export default Services;
