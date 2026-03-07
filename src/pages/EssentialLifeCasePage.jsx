import React from 'react';
import CaseStudyPage, {
  BodyText,
  Callout,
  MiniCard,
  PerfTable,
  Section,
  TwoCol,
} from '../components/CaseStudyPage';

const pdfUrl = null;

const meta = [
  { label: 'Role', value: 'Platform Architect & PM' },
  { label: 'Stack', value: 'Flutter / iOS / Android' },
  { label: 'Scale', value: 'Enterprise' },
  { label: 'Status', value: 'Live - 929 ratings' },
];

const stats = [
  { num: '4.3-star', label: 'App Store (929 ratings)' },
  { num: '300K+', label: 'Users served' },
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

export default function EssentialLifeCasePage() {
  return (
    <CaseStudyPage
      accentColor="66D4EF"
      eyebrow="Case Study - Mobile Apps"
      title="The Essential Life App"
      subtitle="Flutter Platform Modernization - Enterprise Scale"
      meta={meta}
      stats={stats}
      liveUrl="https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865"
      pdfUrl={pdfUrl}
    >
      <Section label="Overview" title="Modernizing a High-Scale Consumer App">
        <BodyText>
          The Essential Life is a consumer-facing mobile application serving the doTERRA
          essential oils market at enterprise scale. With more than 300,000 users, 929 App
          Store ratings, and more than 6,000 oil-use solutions covering 600-plus ailments,
          it is an established, subscription-driven reference platform with a large active
          user base.
        </BodyText>
        <BodyText>
          Travis led the Flutter platform modernization, rearchitecting the technical
          foundation to support scale, maintainability, and cross-platform parity while
          preserving the user experience that had already earned strong market trust.
        </BodyText>
      </Section>

      <Section label="The Flutter Decision" title="A Rewrite Strategy Without Product Risk">
        <BodyText>
          Three forces drove the decision: platform fragmentation, a growing scalability
          ceiling, and a maintenance burden tied to legacy implementation details. Flutter's
          single-codebase, compiled-to-native model directly addressed those pressures while
          preserving app quality.
        </BodyText>
        <PerfTable rows={rows} />
      </Section>

      <Section label="Architecture" title="Migration Discipline at Enterprise Scale">
        <TwoCol>
          <MiniCard title="Migration Strategy">
            <BodyText>
              A big-bang rewrite was too risky for a live app with active subscribers. The
              migration was phased: low-risk screens first, feature parity validation in
              parallel, and critical user flows moved last.
            </BodyText>
          </MiniCard>
          <MiniCard title="Content Layer">
            <BodyText>
              The reference library needed fast, offline-capable search and browsing across
              oils, blends, supplements, ailments, body systems, and recipes. The new
              implementation relied on a structured local content database with incremental
              sync for updates.
            </BodyText>
          </MiniCard>
          <MiniCard title="Subscription Continuity">
            <BodyText>
              Subscription state could not break during the rewrite. App Store and Google
              Play entitlement systems were bridged explicitly so existing subscribers kept
              uninterrupted access throughout the migration.
            </BodyText>
          </MiniCard>
          <MiniCard title="Outcome">
            <BodyText>
              The product retained its 4.3-star market position while gaining a more
              maintainable, extensible technical foundation for future growth.
            </BodyText>
          </MiniCard>
        </TwoCol>
        <Callout>
          This was a platform modernization effort, not a greenfield redesign. The standard
          for success was preserving user trust while removing the architectural debt that
          would block future delivery.
        </Callout>
      </Section>
    </CaseStudyPage>
  );
}
