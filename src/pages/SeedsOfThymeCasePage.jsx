import React from 'react';
import CaseStudyPage, {
  BodyText,
  BulletItem,
  BulletList,
  Callout,
  MiniCard,
  Section,
  TwoCol,
} from '../components/CaseStudyPage';

const pdfUrl = null;

const meta = [
  { label: 'Role', value: 'PM & Product Owner' },
  { label: 'Platform', value: 'iOS / Android' },
  { label: 'Client', value: 'Seeds of Thyme' },
  { label: 'Status', value: 'Live on App Store' },
];

const stats = [
  { num: '4.6-star', label: 'App Store rating' },
  { num: '$8.99', label: 'Annual subscription' },
  { num: 'YL', label: 'Young Living partner' },
  { num: 'E2E', label: 'Ownership scope' },
];

export default function SeedsOfThymeCasePage() {
  return (
    <CaseStudyPage
      accentColor="7D9D73"
      eyebrow="Case Study - Mobile Apps"
      title="Seeds of Thyme"
      subtitle="iOS and Android - End-to-End Product Ownership"
      meta={meta}
      stats={stats}
      liveUrl="https://apps.apple.com/us/app/seeds-of-thyme/id6450909951"
      pdfUrl={pdfUrl}
    >
      <Section label="Overview" title="A Content-Led Product Strategy">
        <BodyText>
          Seeds of Thyme is a subscription-based iOS and Android application built for the
          essential oils education market. As the official publisher of the Essential Oils
          Home Reference guide, the product delivers exclusive, in-depth knowledge from a
          highly valued reference resource as a digital-first mobile experience.
        </BodyText>
        <BodyText>
          Travis owned this product end to end: from initial architecture decisions and UX
          direction through to production delivery and App Store launch. This was sustained
          ownership across the full product lifecycle, not a consulting handoff.
        </BodyText>
        <Callout>
          The defensible moat here was never the app itself. It was the exclusive content
          relationship, and every product decision had to surface that advantage as clearly
          and accessibly as possible.
        </Callout>
      </Section>

      <Section label="The Problem" title="Strong Brand, No Mobile Product">
        <BodyText>
          The Seeds of Thyme brand had an established audience of essential oil enthusiasts
          and a valuable reference resource, but no mobile presence. Their content lived in
          a physical book customers loved but could not take into the field.
        </BodyText>
        <TwoCol>
          <MiniCard title="No Digital Access">
            <BodyText>
              Content was locked in print with no search, filtering, or mobile accessibility.
            </BodyText>
          </MiniCard>
          <MiniCard title="No Revenue Stream">
            <BodyText>
              There was no subscription product despite a loyal audience and clear demand.
            </BodyText>
          </MiniCard>
          <MiniCard title="No Community Layer">
            <BodyText>
              Users had no place to contribute personal remedies or recipes back into the
              experience.
            </BodyText>
          </MiniCard>
          <MiniCard title="No Discovery">
            <BodyText>
              Relevant content could not be surfaced contextually at the moment of need.
            </BodyText>
          </MiniCard>
        </TwoCol>
      </Section>

      <Section label="Product Decisions" title="Monetization, Structure, and Retention">
        <BodyText>
          The pricing architecture, $0.99 per month or $8.99 per year, was designed to
          minimize trial friction while pushing users toward annual commitment. The 7-day
          free trial gave people enough time to experience the depth of the content before
          deciding to subscribe.
        </BodyText>
        <BodyText>
          Content architecture mattered just as much as pricing. The app had to make a
          large reference corpus feel navigable instead of overwhelming, so the experience
          was organized across multiple browsing axes: oil name, health condition, body
          system, and recipe or remedy type.
        </BodyText>
        <BodyText>
          Community was treated as a retention layer. User-contributed remedies and recipes
          sat on top of the trusted reference content, creating a reason for subscribers to
          come back and build their own investment in the platform.
        </BodyText>
      </Section>

      <Section label="Delivery" title="From Zero to Store Launch">
        <BulletList>
          <BulletItem prefix="Architecture">
            Architected the full iOS and Android application from scratch with no legacy
            codebase to inherit.
          </BulletItem>
          <BulletItem prefix="UX Direction">
            Directed the visual and interaction design to match the physical reference
            guide's brand language.
          </BulletItem>
          <BulletItem prefix="Monetization">
            Integrated subscription and in-app purchase flows for both the App Store and
            Google Play.
          </BulletItem>
          <BulletItem prefix="Content Model">
            Implemented the full taxonomy for oils, ailments, body systems, recipes, and
            booklets.
          </BulletItem>
          <BulletItem prefix="Retention Features">
            Built user profiles, favorites, and community remedy contribution systems.
          </BulletItem>
          <BulletItem prefix="Launch">
            Coordinated delivery through App Store and Google Play review and approval.
          </BulletItem>
        </BulletList>
        <Callout label="Outcome">
          Seeds of Thyme launched live on the App Store with a 4.6-star rating and became
          the digital expression of a brand relationship that generalist wellness products
          cannot easily replicate.
        </Callout>
      </Section>
    </CaseStudyPage>
  );
}
