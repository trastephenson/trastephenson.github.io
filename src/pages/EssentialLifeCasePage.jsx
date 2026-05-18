import React from 'react';
import CaseStudyPage, {
  BodyText,
  BulletItem,
  BulletList,
  Callout,
  CalloutPanel,
  MiniCard,
  PerfTable,
  Section,
  TwoCol,
} from '../components/CaseStudyPage';

const pdfUrl = null;

const meta = [
  { label: 'Role', value: 'Senior Product Manager / Platform Lead' },
  { label: 'Stack', value: 'Flutter · iOS · Android' },
  { label: 'Scale', value: '500K+ users · subscription consumer app' },
  { label: 'Status', value: 'Live · 4.3★ · 929 App Store ratings' },
];

const stats = [
  { num: '4.3★', label: 'App Store rating (929 ratings)', disableAnimation: true },
  { num: '500K+', label: 'Users served' },
  { num: '6000+', label: 'Oil use solutions' },
  { num: '600+', label: 'Ailments covered' },
  { num: '1', label: 'Flutter platform modernized' },
];

const rows = [
  {
    opt: 'Platform fragmentation',
    before: 'Separate iOS and Android maintenance tracks',
    after: 'Single compiled Flutter codebase',
  },
  {
    opt: 'Feature velocity',
    before: 'Parallel native delivery overhead',
    after: 'Cross-platform feature parity by default',
  },
  {
    opt: 'Scale risk',
    before: 'Architecture limits on catalogue growth',
    after: 'Structured content foundation for expansion',
  },
  {
    opt: 'Maintenance burden',
    before: 'Specialized legacy knowledge required',
    after: 'More maintainable shared platform',
  },
];

const PRIMARY_SUBTITLE =
  'High-risk platform modernization of a 500K+ user consumer app, preserving user trust while rebuilding the system for long-term scale.';

const SUPPORTING_HERO =
  'Owned platform strategy and delivery of a cross-platform rewrite, aligning engineering execution with product continuity and user experience preservation.';

const HERO_METRICS = '500K+ users • 4.3 App Store rating • 6000+ solutions • 600+ ailments';

export default function EssentialLifeCasePage() {
  return (
    <CaseStudyPage
      accentColor="66D4EF"
      eyebrow="Case Study — Consumer Platform"
      title="The Essential Life App"
      subtitle={PRIMARY_SUBTITLE}
      subtitleSupporting={SUPPORTING_HERO}
      heroMetrics={HERO_METRICS}
      meta={meta}
      stats={stats}
      liveUrl="https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865"
      pdfUrl={pdfUrl}
      returnToSectionIndex={8}
    >
      <Section label="Overview" title="Modernizing a High-Scale Consumer App">
        <BodyText>
          The Essential Life App is a consumer-facing mobile application serving over 500,000
          users with 929 App Store ratings and a 4.3-star average. It provides over 6,000
          oil-use solutions across 600+ ailments, operating as a subscription-driven reference
          platform with a large active user base.
        </BodyText>
        <BodyText>
          This project required modernizing the platform architecture without disrupting an
          existing, trusted product. The challenge was not just technical migration, but
          preserving user experience, subscription continuity, and product stability during a
          full platform transition.
        </BodyText>
        <BodyText>
          Included development of AI-driven discovery patterns across a large consumer content
          platform, enabling personalized and contextual content recommendations at scale.
        </BodyText>
      </Section>

      <Section label="The Flutter Decision" title="A Rewrite Strategy Without Breaking the Product">
        <BodyText>
          The decision to move to Flutter was driven by three core pressures: platform
          fragmentation, scaling limitations, and long-term maintenance cost.
        </BodyText>
        <BodyText>
          The key constraint was that this could not behave like a typical rewrite. The
          product was live, revenue-generating, and relied on by an active user base. The
          strategy needed to reduce technical risk while preserving continuity.
        </BodyText>
        <CalloutPanel label="Key Product Decisions:">
          <BulletList>
            <BulletItem>Chose phased migration over big-bang rewrite to reduce user risk</BulletItem>
            <BulletItem>Prioritized feature parity before introducing new functionality</BulletItem>
            <BulletItem>
              Maintained subscription continuity across App Store and Google Play
            </BulletItem>
            <BulletItem>
              Balanced modernization with preservation of existing user experience
            </BulletItem>
          </BulletList>
        </CalloutPanel>
        <BodyText>
          The comparison below frames the same tradeoffs as a product and platform decision—not
          a code migration in isolation.
        </BodyText>
        <PerfTable rows={rows} />
      </Section>

      <Section label="Architecture" title="Migration Discipline at Enterprise Scale">
        <BodyText>
          Migration required disciplined execution at enterprise scale. The system needed to
          transition to a modern architecture while maintaining uptime, subscription integrity,
          and user trust.
        </BodyText>
        <TwoCol>
          <MiniCard title="Migration Strategy">
            <BodyText>
              A big-bang rewrite was too risky for a live app with active subscribers.
              Migration was phased: low-risk features first, feature parity validation in
              parallel, and critical user flows moved last.
            </BodyText>
          </MiniCard>
          <MiniCard title="Content Layer">
            <BodyText>
              The reference library required fast, offline-capable search and browsing. The new
              system introduced a structured content model with incremental sync to support
              performance and scalability.
            </BodyText>
          </MiniCard>
          <MiniCard title="Subscription Continuity">
            <BodyText>
              Subscription state could not break. App Store and Google Play entitlements were
              explicitly bridged to existing users to ensure uninterrupted access throughout
              migration.
            </BodyText>
          </MiniCard>
          <MiniCard title="Outcome">
            <BodyText>
              The product retained its 4.3-star rating while gaining a more maintainable and
              extensible technical foundation for future growth.
            </BodyText>
          </MiniCard>
        </TwoCol>
        <Callout>
          This was a platform modernization effort, not a greenfield redesign. The standard for
          success was preserving user trust while removing the architectural debt that would
          block future delivery.
        </Callout>
      </Section>

      <Section label="Discovery" title="AI-Driven Discovery Layer">
        <BodyText>
          Beyond platform modernization, the product introduced AI-driven discovery patterns
          across a large content catalog.
        </BodyText>
        <BodyText>
          The Essential Life platform contains thousands of structured and semi-structured data
          points across oils, blends, ailments, and usage contexts. The challenge was not just
          storing this data, but helping users navigate it in a way that felt personalized,
          relevant, and intuitive.
        </BodyText>
        <BodyText>
          This led to the development of a discovery layer that surfaces contextual
          recommendations based on user intent, behavior, and content relationships —
          effectively functioning as a consumer-facing AI system built from structured data,
          recommendation logic, and UX—not a standalone LLM chat product.
        </BodyText>
        <BodyText>
          Rather than forcing users to search or navigate rigid hierarchies alone, the system
          dynamically surfaces relevant content, similar to a discovery agent model implemented
          through rules, graph-like relationships, and ranked surfacing.
        </BodyText>

        <CalloutPanel label="AI System Characteristics:">
          <BulletList>
            <BulletItem>
              Large-scale content graph across oils, ailments, and usage scenarios
            </BulletItem>
            <BulletItem>
              Contextual recommendation patterns based on user input and navigation
            </BulletItem>
            <BulletItem>Dynamic content surfacing instead of static search flows</BulletItem>
            <BulletItem>Structured data model enabling scalable recommendation logic</BulletItem>
          </BulletList>
        </CalloutPanel>

        <BodyText>
          This pattern directly parallels modern AI discovery systems, where large content
          ecosystems are transformed into personalized, context-aware user experiences.
        </BodyText>
        <BodyText>
          The system effectively acts as a consumer-facing discovery agent, connecting users to
          relevant information without requiring them to understand the underlying data
          structure.
        </BodyText>
      </Section>

      <Section label="Results" title="Impact">
        <BulletList>
          <BulletItem>
            Successfully modernized a live app serving 500K+ users without disrupting user
            experience
          </BulletItem>
          <BulletItem>Preserved 4.3-star App Store rating throughout migration</BulletItem>
          <BulletItem>
            Reduced long-term maintenance burden through a unified Flutter codebase
          </BulletItem>
          <BulletItem>
            Enabled faster cross-platform feature delivery and future scalability
          </BulletItem>
          <BulletItem>
            Strengthened contextual discovery across a large consumer content catalog
          </BulletItem>
        </BulletList>
      </Section>
    </CaseStudyPage>
  );
}
