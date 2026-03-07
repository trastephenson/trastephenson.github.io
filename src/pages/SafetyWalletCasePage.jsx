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
  { label: 'Role', value: 'Delivery Director & PM' },
  { label: 'Stack', value: 'Mobile + Web SaaS' },
  { label: 'Model', value: 'B2B2C Compliance' },
  { label: 'Status', value: 'Live' },
];

const stats = [
  { num: 'QR', label: 'Instant on-site verification' },
  { num: 'PDF', label: 'Automated document generation' },
  { num: '1K+', label: 'Google Play downloads' },
  { num: '3', label: 'Core stakeholder groups' },
];

const rows = [
  {
    opt: 'Proof of certification',
    before: 'Physical cards and paper records',
    after: 'Digital wallet with live status',
  },
  {
    opt: 'Field verification',
    before: 'Visual inspection and phone calls',
    after: 'QR-linked real-time lookup',
  },
  {
    opt: 'Expiry management',
    before: 'Users discover lapses too late',
    after: 'Proactive renewal alerts',
  },
  {
    opt: 'Audit readiness',
    before: 'Manual evidence collection',
    after: 'Structured automated records',
  },
];

export default function SafetyWalletCasePage() {
  return (
    <CaseStudyPage
      accentColor="B77045"
      eyebrow="Case Study - Platforms"
      title="Safety Wallet"
      subtitle="Safety Compliance Platform - Multi-Stakeholder Document Automation"
      meta={meta}
      stats={stats}
      pdfUrl={pdfUrl}
    >
      <Section label="Overview" title="Turning Compliance Into a Live Digital Workflow">
        <BodyText>
          Safety Wallet serves a multi-stakeholder ecosystem: workers who need to store and
          present training certifications, employers who need to verify compliance in the
          field, and issuing bodies such as EICA and NORCAT that need their certifications
          to remain digitally accessible and trustworthy.
        </BodyText>
        <BodyText>
          Travis directed delivery of the platform, owning the technical delivery, automated
          document generation system, workflow automation, and the integration architecture
          that made the certification ecosystem work as a product.
        </BodyText>
      </Section>

      <Section label="The Problem" title="A Paper-Based Compliance System">
        <BodyText>
          Compliance management in training-heavy industries was still a paper problem.
          Workers carried physical cards, employers verified them manually on site, renewal
          dates were easy to miss, and audits required manual evidence collection.
        </BodyText>
        <PerfTable rows={rows} />
      </Section>

      <Section label="Platform Architecture" title="Trust, Verification, and Automation">
        <BodyText>
          Automated PDF generation was the cornerstone feature. When certification data was
          updated through upload or issuer integration, the system generated branded PDF
          records that workers could store offline and access without a network connection.
        </BodyText>
        <Callout label="Verification Model">
          Each worker profile included a unique QR code tied to the live compliance record.
          Employers could scan and verify status instantly against the platform database
          instead of trusting static cards or screenshots.
        </Callout>
        <BodyText>
          The value of the platform increased further when issuing bodies connected their
          record systems directly. Certifications flowed from the issuer into the wallet and
          back into the verification loop without manual handling.
        </BodyText>
        <Callout label="Retention and Workflow">
          Renewal alerts converted compliance from a reactive discovery problem into a
          proactive workflow. Workers saw upcoming expirations in time to complete
          recertification before they fell out of compliance.
        </Callout>
      </Section>

      <Section label="Delivery" title="Multi-Stakeholder Rollout">
        <BulletList>
          <BulletItem prefix="Platform Delivery">
            Directed end-to-end delivery across iOS, Android, and the web portal.
          </BulletItem>
          <BulletItem prefix="Document System">
            Architected automated PDF generation with offline download capability.
          </BulletItem>
          <BulletItem prefix="Verification">
            Built the QR code verification workflow with real-time database lookup.
          </BulletItem>
          <BulletItem prefix="Integrations">
            Coordinated certification-body integrations so trust originated at the source.
          </BulletItem>
          <BulletItem prefix="Onboarding">
            Managed different onboarding paths for workers, employers, and issuing bodies.
          </BulletItem>
        </BulletList>
        <Callout label="Outcome">
          Safety Wallet is live across mobile platforms with more than 1,000 Google Play
          downloads and active use in industries where compliance failures carry real cost.
        </Callout>
      </Section>
    </CaseStudyPage>
  );
}
