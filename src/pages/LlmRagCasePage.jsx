import React from 'react';
import CaseStudyPage, {
  BodyText,
  BulletItem,
  BulletList,
  Callout,
  PerfTable,
  Section,
} from '../components/CaseStudyPage';

const pdfUrl = null;

const meta = [
  { label: 'Role', value: 'Principal Architect & AI Platform Lead' },
  { label: 'Stack', value: 'Python / AWS / Docker / TS' },
  { label: 'Models', value: 'OpenAI / Gemini / DeepSeek' },
  { label: 'Scope', value: 'Enterprise SaaS' },
];

const stats = [
  { num: '3', label: 'LLM providers integrated' },
  { num: 'RAG', label: 'Grounding architecture pattern' },
  { num: 'AWS', label: 'Cloud infrastructure' },
  { num: 'MA', label: 'Multi-agent coordination' },
];

const rows = [
  {
    opt: 'Model provider strategy',
    before: 'Single-vendor dependency',
    after: 'Capability routing across three providers',
  },
  {
    opt: 'Knowledge grounding',
    before: 'Ungrounded prompt-only answers',
    after: 'RAG pipelines tied to verified enterprise sources',
  },
  {
    opt: 'Workflow orchestration',
    before: 'Single LLM call per task',
    after: 'Specialized agents with coordination logic',
  },
  {
    opt: 'Production resilience',
    before: 'Manual recovery on provider failure',
    after: 'Fallback chains, retries, and quality gates',
  },
];

export default function LlmRagCasePage() {
  return (
    <CaseStudyPage
      accentColor="66D4EF"
      eyebrow="Case Study - AI Work"
      title="Multi-Agent LLM & RAG Pipelines"
      subtitle="Enterprise AI Platform Architecture - Knowledge Workflow Automation"
      meta={meta}
      stats={stats}
      pdfUrl={pdfUrl}
      returnToSectionIndex={8}
    >
      <Section label="Overview" title="From AI Prototype to Production Platform">
        <BodyText>
          This work spans the architecture and delivery of multi-agent LLM systems and
          retrieval-augmented generation pipelines for enterprise clients operating
          knowledge-intensive SaaS platforms.
        </BodyText>
        <BodyText>
          The scope included provider integration, agent coordination design, pipeline
          architecture, and the delivery governance required to turn AI-enabled automation
          into production infrastructure rather than a demo.
        </BodyText>
      </Section>

      <Section label="Architecture Patterns" title="Grounding, Coordination, and Provider Flexibility">
        <BodyText>
          Retrieval-augmented generation solved the core enterprise trust problem. Instead
          of relying on model training data, the system retrieved relevant context from
          structured knowledge bases at inference time and grounded outputs in current,
          auditable information.
        </BodyText>
        <BodyText>
          Multi-agent coordination handled workflows that were too complex for a single LLM
          call. Routing, specialist, synthesis, and validation agents each played distinct
          roles with explicit handoff rules, timeout controls, and retry logic.
        </BodyText>
        <BodyText>
          A multi-provider model layer removed vendor lock-in and enabled both capability
          routing and resilience. OpenAI, Gemini, and DeepSeek sat behind a unified
          interface so the best model could be chosen per task while preserving fallback
          paths when availability or cost shifted.
        </BodyText>
      </Section>

      <Section label="Technical Stack" title="Production AI Requires Platform Discipline">
        <PerfTable rows={rows} />
      </Section>

      <Section label="Enterprise Delivery" title="Governance Is Part of the Architecture">
        <BodyText>
          Enterprise clients need explicit data-governance controls. Sensitive data must be
          routed only to allowed inference environments, while lower-risk tasks can use
          public providers when it makes sense.
        </BodyText>
        <BodyText>
          Cost management has to be designed in up front. Token budgets, model-tier routing,
          caching, and per-client attribution all matter once LLM usage becomes part of a
          SaaS operating model.
        </BodyText>
        <BodyText>
          Reliability cannot depend on a single API succeeding every time. These pipelines
          included retry logic, cross-provider fallback, quality scoring, and human-in-the-
          loop escalation paths when automated confidence thresholds were not met.
        </BodyText>
        <Callout label="PM Takeaway">
          The most important architectural decision in enterprise AI is grounding. Selling
          enterprise AI without solving traceability and trust is selling a liability.
        </Callout>
      </Section>

      <Section label="Business Impact" title="Why the Pattern Matters">
        <BulletList>
          <BulletItem>
            Automated insight extraction reduced analyst time spent on document-heavy review
            tasks.
          </BulletItem>
          <BulletItem>
            Decision-support workflows surfaced relevant historical context at the point of
            action and shortened research cycles.
          </BulletItem>
          <BulletItem>
            Multi-provider routing reduced per-token costs by matching task complexity to the
            right model tier.
          </BulletItem>
          <BulletItem>
            RAG grounding eliminated hallucination risk that had made earlier LLM experiments
            hard to trust in enterprise settings.
          </BulletItem>
        </BulletList>
      </Section>
    </CaseStudyPage>
  );
}
