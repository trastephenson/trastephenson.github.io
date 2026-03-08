import React from 'react';
import CaseStudyPage, {
  BodyText,
  BulletItem,
  BulletList,
  Callout,
  Divider,
  FeatureRow,
  MiniCard,
  PerfTable,
  Section,
  TwoCol,
} from '../components/CaseStudyPage';

const movieVaultUrl = `${process.env.PUBLIC_URL || ''}/movies.html`;
const pdfUrl = null;

const meta = [
  { label: 'Role', value: 'Solo PM, Design & Dev' },
  { label: 'Stack', value: 'Vanilla JS / Web Audio API / CSS' },
  { label: 'Constraint', value: 'Single .html file' },
  { label: 'Status', value: 'Used daily' },
];

const stats = [
  { num: '387', label: 'Films catalogued' },
  { num: '1', label: 'Developer' },
  { num: '139KB', label: 'Total file size' },
  { num: '0', label: 'Frameworks' },
];

const perfRows = [
  { opt: 'Video playback start', before: '15s+ buffering', after: 'Instant native preload' },
  { opt: 'Audio click feedback', before: '~200ms network fetch', after: '<1ms buffered audio' },
  { opt: 'Chunk render sweeps', before: '4 full-grid scans', after: '0 full-grid sweeps' },
  { opt: 'TMDB batch delay', before: '220ms per batch', after: '80ms batches' },
  { opt: 'Modal DOM queries', before: '15+ queries per open', after: 'Cached element refs' },
  { opt: 'Same-movie reopen', before: 'Repeated network work', after: 'Instant warm cache' },
  { opt: 'Tab handling', before: 'Repeated querySelectorAll scans', after: 'Event delegation' },
  { opt: 'Backdrop filters', before: '6 blur layers', after: '1 sticky blur layer' },
];

export default function MovieVaultCasePage() {
  return (
    <CaseStudyPage
      accentColor="B77045"
      eyebrow="Case Study - Personal Project"
      title="Movie Vault"
      subtitle="Personal Film Collection App - Built Solo, End to End"
      meta={meta}
      stats={stats}
      liveUrl={movieVaultUrl}
      pdfUrl={pdfUrl}
      returnToSectionIndex={8}
    >
      <Section label="Overview" title="A Real Product for a Real Daily Workflow">
        <BodyText>
          Movie Vault started as a replacement for a spreadsheet that tracked a personal film
          collection. The goal was not to make another CRUD app. It was to make the
          collection feel like a streaming product: rich poster browsing, search, filters,
          personal rankings, and a social rating ritual for group movie nights.
        </BodyText>
        <BodyText>
          Because the app is used daily, every feature came from real friction instead of
          invented personas. The product and engineering decisions are the same conversations
          Travis has with software teams, just compressed into a solo build.
        </BodyText>
        <Callout>
          This project sits at the product-engineering boundary. Scope, interaction quality,
          performance, and architecture were all solved by the same person with the same
          constraint in mind: make the tool joyful without losing speed.
        </Callout>
      </Section>

      <Section label="Product Thinking" title="Feature Prioritization From Actual Use">
        <BodyText>
          The core prioritization question was simple: does this make the app more likely to
          be opened tomorrow? Every feature maps to a concrete frustration.
        </BodyText>
        <FeatureRow
          feature="TMDB API + two-tier cache"
          problem="Spreadsheet rows had no posters, metadata, or visual browsing value."
          decision="Enrich on first load, cache aggressively, and treat network as a setup cost."
        />
        <FeatureRow
          feature="Genre filter + sort"
          problem="Browsing hundreds of titles linearly was unusable."
          decision="Map genre colors to TMDB IDs so the collection can be read at a glance."
        />
        <FeatureRow
          feature="Custom lists and rankings"
          problem="There was no durable way to build and share personal top 10 lists."
          decision="Use drag-and-drop shelves with FLIP-style movement to make ranking feel tactile."
        />
        <FeatureRow
          feature="Jericho rating system"
          problem="Group reactions during movie nights disappeared as soon as the credits rolled."
          decision="Capture multi-user ratings around a shared cultural reference instead of a generic score."
        />
        <FeatureRow
          feature="Trailer and sounds tab"
          problem="Reference moments required leaving the app."
          decision="Keep trailer playback and sound lookup inside the experience."
        />
      </Section>

      <Section label="Scope Cuts" title="What Did Not Need to Exist">
        <BodyText>
          Scope discipline mattered as much as feature ambition. Several obvious extensions
          were cut deliberately because they would have increased complexity without improving
          the core job to be done.
        </BodyText>
        <TwoCol>
          <MiniCard title="No Backend or Auth">
            <BodyText>
              The offline-first value proposition would have been weakened by a required
              server dependency.
            </BodyText>
          </MiniCard>
          <MiniCard title="No Native Mobile App">
            <BodyText>
              The responsive web build already covered the real usage pattern without
              fragmenting the codebase.
            </BodyText>
          </MiniCard>
          <MiniCard title="No Real-Time Sync">
            <BodyText>
              Multi-rater support mattered, but instant synchronization was not necessary for
              the way the app is actually used.
            </BodyText>
          </MiniCard>
          <MiniCard title="No Import or Export Layer">
            <BodyText>
              Local storage plus a copy of the HTML file was enough for a personal tool.
            </BodyText>
          </MiniCard>
        </TwoCol>
      </Section>

      <Divider />

      <Section label="Engineering" title="The No-Framework Constraint">
        <BodyText>
          The application runs as a single HTML file. No bundler, no framework runtime, no
          npm dependency tree. That constraint was a product choice as much as an engineering
          one because it kept the app portable and durable.
        </BodyText>
        <Callout>
          The single-file rule forced simpler, more deliberate code. The result was an app
          that stayed tiny enough to open anywhere while still feeling rich and interactive.
        </Callout>
        <BodyText>
          TMDB metadata is cached locally in two layers: a basic cache for enriched movie
          objects at first load, and a detail cache for full cast, crew, and trailer data
          loaded only when a film is opened in detail.
        </BodyText>
      </Section>

      <Section label="Engineering - Hard Problem" title="Fixing the Video Preload System">
        <BodyText>
          The Jericho overlay originally suffered from buffering delays that made the feature
          feel broken. The issue was not the asset size alone. It was the preload strategy.
        </BodyText>
        <Callout label="Root Cause">
          Fetching cross-origin MP4s as blobs from a local-file context failed because the
          preload approach depended on CORS behavior that the origin did not allow. The app
          thought it was preloading, but every click was still cold streaming.
        </Callout>
        <Callout label="Fix">
          Hidden native video elements with <code>preload=&quot;auto&quot;</code> replaced the custom
          fetch-and-blob pipeline. That let the browser's media cache do the work reliably
          and made playback effectively instant.
        </Callout>
        <BodyText>
          A second bug came from clearing the video source on close, which destroyed the
          buffer. The fix was to pause and reset playback time without dropping the source.
        </BodyText>
      </Section>

      <Divider />

      <Section label="Feature Deep Dive" title="The Jericho Rating System">
        <BodyText>
          The Jericho system exists to make group reactions memorable and structured in the
          moment. It supports multiple named raters, persistent sentiment, and animated
          presentation that feels specific to the social ritual instead of generic UI chrome.
        </BodyText>
        <BulletList>
          <BulletItem prefix="Data Model">
            Ratings are stored by movie and person name, so new raters can be added without
            changing schema.
          </BulletItem>
          <BulletItem prefix="Visual Feedback">
            Rated cards surface stacked rating markers directly in the collection and list
            views.
          </BulletItem>
          <BulletItem prefix="Interaction Model">
            Overlay animation originates from the click point, giving the rating action a
            physical sense of place rather than feeling detached from the card.
          </BulletItem>
        </BulletList>
      </Section>

      <Section label="Results" title="Performance Gains">
        <PerfTable rows={perfRows} />
      </Section>

      <Section label="Lessons Learned" title="Product and Engineering Takeaways">
        <TwoCol>
          <MiniCard title="As a Product Leader">
            <BulletList>
              <BulletItem>
                Constraints can sharpen a product when they remove accidental complexity.
              </BulletItem>
              <BulletItem>
                Real usage exposes interaction gaps that never show up in a static spec.
              </BulletItem>
              <BulletItem>
                Technical debt becomes a product problem the moment it touches responsiveness.
              </BulletItem>
            </BulletList>
          </MiniCard>
          <MiniCard title="As a Developer">
            <BulletList>
              <BulletItem>
                Native browser capabilities often beat elaborate custom preload systems.
              </BulletItem>
              <BulletItem>
                Profiling matters more than intuition when tuning visual effects and scroll
                performance.
              </BulletItem>
              <BulletItem>
                Simple DOM caching can remove a surprising amount of interaction jank.
              </BulletItem>
            </BulletList>
          </MiniCard>
        </TwoCol>
      </Section>
    </CaseStudyPage>
  );
}
