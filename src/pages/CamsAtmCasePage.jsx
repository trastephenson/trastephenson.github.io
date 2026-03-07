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
  { label: 'Role', value: 'Platform Architect & Delivery Lead' },
  { label: 'Stack', value: 'Cloud-Native / AWS' },
  { label: 'Client', value: 'Companion Asset Mgmt' },
  { label: 'Type', value: 'B2B Enterprise' },
];

const stats = [
  { num: 'B2B', label: 'Enterprise SaaS' },
  { num: 'RT', label: 'Real-time workflow' },
  { num: 'AWS', label: 'Cloud platform' },
  { num: 'E2E', label: 'Delivery ownership' },
];

const rows = [
  {
    opt: 'Coordination model',
    before: 'Email threads and manual follow-up',
    after: 'Single workflow-driven portal',
  },
  {
    opt: 'Field documentation',
    before: 'Free-form notes and disconnected files',
    after: 'Structured, auditable service records',
  },
  {
    opt: 'Compliance tracking',
    before: 'Reactive evidence collection',
    after: 'Continuous compliance visibility',
  },
  {
    opt: 'Management visibility',
    before: 'Status chasing across stakeholders',
    after: 'Real-time dashboard updates',
  },
];

export default function CamsAtmCasePage() {
  return (
    <CaseStudyPage
      accentColor="66D4EF"
      eyebrow="Case Study - Platforms"
      title="CAMS ATM Management"
      subtitle="Enterprise SaaS - Real-Time Workflow Automation"
      meta={meta}
      stats={stats}
      liveUrl="https://camscompanion.com/"
      pdfUrl={pdfUrl}
    >
      <Section label="Overview" title="Operational Control for ATM Fleets">
        <BodyText>
          CAMS is an enterprise ATM operational management platform built for financial
          institutions and ATM service providers. It consolidates ATM brand intelligence,
          field service coordination, compliance tracking, and operational data into a
          single cloud-native portal.
        </BodyText>
        <BodyText>
          Travis architected and delivered the platform end to end, owning both the
          technical architecture and the delivery governance from initial design through
          production deployment.
        </BodyText>
      </Section>

      <Section label="The Problem" title="Too Many Stakeholders, Too Little Structure">
        <BodyText>
          ATM management at scale is a coordination problem across field technicians,
          compliance requirements, signage and illumination rules, and management reporting.
          Conventional tools handled that complexity poorly.
        </BodyText>
        <PerfTable rows={rows} />
      </Section>

      <Section label="Platform Architecture" title="One Portal for the Field and the Office">
        <BodyText>
          The core decision was to build CAMS as a cloud-native web portal rather than a
          desktop or hybrid client. That made the platform accessible to field technicians
          on mobile devices and to management teams on desktop from a single codebase.
        </BodyText>
        <BodyText>
          Built on AWS, the platform provided the scalability, reliability, and security
          posture required by financial-industry clients while supporting real-time status
          updates across service workflows.
        </BodyText>
        <BodyText>
          Structured service documentation replaced free-form email reporting with
          standardized records, photo capture, and compliance evidence that flowed directly
          into the management portal.
        </BodyText>
        <Callout>
          The automation layer was the differentiator. Service requests moved from creation
          through assignment, execution, documentation, and sign-off without the manual
          coordination overhead that had defined the workflow before CAMS.
        </Callout>
      </Section>

      <Section label="Service Capabilities" title="Operational Coverage That Matched the Real Work">
        <BulletList>
          <BulletItem prefix="Brand Intelligence">
            Consolidated visibility into brand element condition across the full ATM fleet.
          </BulletItem>
          <BulletItem prefix="Site Surveys">
            Structured survey workflows with photo documentation and compliance checklist
            integration.
          </BulletItem>
          <BulletItem prefix="Field Services">
            Technician dispatch, work order management, and real-time status tracking.
          </BulletItem>
          <BulletItem prefix="Recurring Maintenance">
            Cleaning and detailing workflows with service history tracking.
          </BulletItem>
          <BulletItem prefix="Compliance">
            ADA, braille decal, signage, and illumination tracking with audit trails.
          </BulletItem>
          <BulletItem prefix="Delivery Governance">
            Stakeholder alignment, phased rollout planning, onboarding, and integration into
            existing client reporting flows.
          </BulletItem>
        </BulletList>
      </Section>
    </CaseStudyPage>
  );
}
