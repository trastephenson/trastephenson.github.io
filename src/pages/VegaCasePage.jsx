import React from 'react';
import CaseStudyPage, {
  BodyText,
  BulletItem,
  BulletList,
  Callout,
  CalloutPanel,
  MiniCard,
  Section,
  ShowcaseGrid,
  ShowcaseImage,
  TwoCol,
} from '../components/CaseStudyPage';

const pdfUrl = null;
const vegaBase = `${process.env.PUBLIC_URL || ''}/vega`;

const screenshots = {
  marketing: `${vegaBase}/vega-marketing-page.png`,
  upload: `${vegaBase}/vega-upload-blueprint.png`,
  categories: `${vegaBase}/vega-category-selection.png`,
  scaleSelection: `${vegaBase}/vega-scale-selection.png`,
  crop: `${vegaBase}/vega-crop-plan.png`,
  processing: `${vegaBase}/vega-processing-timeline.png`,
  extraction: `${vegaBase}/vega-spec-extraction.png`,
  preview: `${vegaBase}/vega-plan-preview.png`,
  generation: `${vegaBase}/vega-doc-generation.png`,
  download: `${vegaBase}/vega-download-docs.png`,
  secondFloor: `${vegaBase}/vega-second-floor-extraction.png`,
  report: `${vegaBase}/vega-subcontractor-report.png`,
};

const meta = [
  { label: 'Role', value: 'AI Platform Product Manager / Product Lead' },
  {
    label: 'Focus',
    value:
      'AI platform strategy, OCR/LLM workflows, human-in-the-loop validation, enterprise estimation',
  },
  { label: 'Domain', value: 'Construction takeoff and contractor bidding' },
  { label: 'Status', value: 'Beta-ready platform' },
];

const stats = [
  { num: '32x', label: 'Faster estimation workflows' },
  { num: '99%', label: 'Accuracy vs estimators' },
  { num: '200–300%', label: 'Increase in bid capacity', disableAnimation: true },
  { num: '35+', label: 'Subcontractor categories' },
];

const PRIMARY_SUMMARY =
  'AI platform converting blueprint plans into structured construction takeoffs, reducing estimation time by 32x.';

const SUPPORTING_SUMMARY =
  'Owned product strategy, system design, and delivery of an AI-driven estimation platform combining OCR, LLM workflows, and human-in-the-loop validation to scale contractor bidding capacity.';

const HERO_METRICS =
  '32x faster workflows • 99% accuracy vs estimators • 200–300% increase in bid capacity';

const MY_ROLE_HERO =
  'Owned product strategy, requirements, and end-to-end delivery. Defined system architecture, AI workflows, and evaluation approach while aligning engineering, stakeholders, and domain experts.';

export default function VegaCasePage() {
  return (
    <CaseStudyPage
      accentColor="2C90D0"
      eyebrow="Case Study — AI Platform"
      title="Vega"
      subtitle={PRIMARY_SUMMARY}
      subtitleSupporting={SUPPORTING_SUMMARY}
      heroMetrics={HERO_METRICS}
      heroMyRole={MY_ROLE_HERO}
      meta={meta}
      stats={stats}
      pdfUrl={pdfUrl}
      returnToSectionIndex={8}
    >
      <Section label="Overview" title="Turning Blueprint Analysis into a Usable Product">
        <BodyText>
          Construction estimation was a manual, time-intensive process with inconsistent outputs
          across estimators. This limited how many bids teams could produce and introduced
          variability in results.
        </BodyText>
        <BodyText>
          The goal was to convert unstructured blueprint data into a scalable, structured system
          that could support consistent, repeatable estimation workflows.
        </BodyText>
        <ShowcaseImage
          src={screenshots.extraction}
          alt="Vega specification extraction screen with structured flooring takeoff results beside a blueprint preview"
          fit="contain"
          caption="Structured extraction pairs blueprint context with trade-specific takeoff output—built for review, not one-off AI demos."
        />
      </Section>

      <Section label="Goal" title="Bridging AI Capability With Real-World Estimating">
        <BodyText>
          The core challenge was not just extracting data, but making it usable.
        </BodyText>
        <BodyText>
          Blueprints vary widely in format, structure, and quality. The system needed to normalize
          this variability into structured outputs that could be used consistently across projects
          and teams.
        </BodyText>
        <Callout>
          This was an AI platform, not a feature build: OCR, LLM-driven workflows,
          human-in-the-loop validation, and structured downstream outputs had to operate as one
          system estimators could trust in production.
        </Callout>
      </Section>

      <Section label="Approach" title="Architecture, Workflow Design, and Delivery Alignment">
        <CalloutPanel label="Key Product Decisions:">
          <BulletList>
            <BulletItem>
              Chose human-in-the-loop validation over full automation to ensure trust and adoption
            </BulletItem>
            <BulletItem>
              Defined evaluation framework comparing outputs against professional estimators
            </BulletItem>
            <BulletItem>Structured outputs to normalize inconsistent blueprint formats</BulletItem>
            <BulletItem>Prioritized phased rollout to validate accuracy before scaling</BulletItem>
          </BulletList>
        </CalloutPanel>
        <BodyText>
          I owned how the platform translated domain ambiguity into product requirements, system
          boundaries, and delivery sequencing. That meant defining what “good” looked like for
          estimators, how AI outputs would be reviewed, and which architectural choices preserved
          room to scale across trades without rewriting the core path.
        </BodyText>
        <BodyText>
          I aligned engineering execution with estimator reality: intake, trade-specific branching,
          review surfaces, and packaged outputs had to stay coherent from blueprint upload through
          bid-ready artifacts.
        </BodyText>
      </Section>

      <Section label="Execution" title="Designed the Platform Around Workflow Discipline">
        <BodyText>
          Designed the system around real estimator workflows rather than forcing new behavior,
          ensuring adoption and usability in production environments.
        </BodyText>
        <TwoCol>
          <MiniCard title="Product and platform scope">
            <BodyText>
              Owned the end-to-end blueprint-to-takeoff journey: document intake, preprocessing,
              category-specific extraction paths, review checkpoints, and structured outputs tied to
              bidding—not disconnected AI experiments.
            </BodyText>
          </MiniCard>
          <MiniCard title="Data and output model">
            <BodyText>
              Defined the structures estimators needed—category mappings, takeoff buckets,
              grouping rules, and staging logic—so LLM and OCR outputs could be compared,
              corrected, and reused reliably.
            </BodyText>
          </MiniCard>
          <MiniCard title="Delivery and stakeholder alignment">
            <BodyText>
              Prioritized decisions across backend, cloud, orchestration, and output delivery to
              reach beta-ready scale without breaking review workflows or inflating operational
              risk.
            </BodyText>
          </MiniCard>
          <MiniCard title="Domain to engineering translation">
            <BodyText>
              Converted estimator constraints into requirements, clarified tradeoffs for leadership,
              and kept technical choices tied to measurable accuracy and throughput outcomes.
            </BodyText>
          </MiniCard>
        </TwoCol>

        <ShowcaseGrid>
          <ShowcaseImage
            src={screenshots.upload}
            alt="Vega blueprint upload step"
            fit="contain"
            caption="Document intake starts with blueprint upload and project initialization."
          />
          <ShowcaseImage
            src={screenshots.categories}
            alt="Vega category selection step for multiple subcontractor plan crops"
            fit="contain"
            caption="Trade-specific pathways branch the workflow by subcontractor category."
          />
          <ShowcaseImage
            src={screenshots.scaleSelection}
            alt="Vega scale selection interface for blueprint measurement"
            fit="contain"
            caption="Scale selection addresses a primary source of estimation variability."
          />
          <ShowcaseImage
            src={screenshots.crop}
            alt="Vega crop-plan interface with blueprint area selection"
            fit="contain"
            caption="Cropping isolates the right plan context before extraction runs."
          />
        </ShowcaseGrid>
      </Section>

      <Section label="Key Challenges" title="Operationalizing AI in a Domain Full of Ambiguity">
        <BodyText>
          AI outputs needed to be reliable in real-world conditions, not just technically correct.
          The system was designed to handle ambiguity, edge cases, and variability in blueprint data.
        </BodyText>
        <BulletList>
          <BulletItem prefix="Blueprint variability">
            Plan sets differ by project; consistency required deliberate workflow and schema design,
            not ad hoc prompting.
          </BulletItem>
          <BulletItem prefix="Trade-specific interpretation">
            Subcontractor categories demand different grouping, validation, and quantity logic.
          </BulletItem>
          <BulletItem prefix="Structured output requirements">
            Estimators need reviewable, workflow-aligned outputs—not narrative AI summaries.
          </BulletItem>
          <BulletItem prefix="Human review integration">
            Oversight stayed in the product path by design, not as an afterthought.
          </BulletItem>
          <BulletItem prefix="Scalability across categories">
            The platform foundation had to extend across new trades without greenfield rebuilds.
          </BulletItem>
        </BulletList>
      </Section>

      <Section label="Architecture & Platform Thinking" title="This Needed a System, Not a Single AI Prompt">
        <BodyText>
          This was not a single-model problem. The platform required a structured system combining
          document parsing, AI extraction, validation layers, and structured outputs.
        </BodyText>
        <BodyText>
          I defined how ingestion, orchestration, intermediate artifacts, cloud processing,
          category mappings, human review, and final delivery connected into one coherent platform
          rather than a set of disconnected experiments.
        </BodyText>

        <ShowcaseGrid>
          <ShowcaseImage
            src={screenshots.processing}
            alt="Vega processing timeline modal"
            fit="contain"
            caption="Processing timelines made multi-step AI work legible to users."
          />
          <ShowcaseImage
            src={screenshots.extraction}
            alt="Vega extraction results for flooring trade"
            fit="contain"
            caption="Trade-specific extraction organized quantities into estimator-facing buckets."
          />
          <ShowcaseImage
            src={screenshots.preview}
            alt="Vega plan preview paired with extracted flooring details"
            fit="contain"
            caption="Blueprint context stayed visible alongside structured output for review."
          />
          <ShowcaseImage
            src={screenshots.secondFloor}
            alt="Vega second-floor extraction screen"
            fit="contain"
            caption="The workflow held as floor plans, room counts, and output shapes changed."
          />
        </ShowcaseGrid>
      </Section>

      <Section label="Output Delivery" title="The Platform Had to End With Usable Estimator Outputs">
        <BodyText>
          Deliverables had to match how estimators actually close a bid: packaged documents and
          downloads that reflect the workflow structure, not loose model output.
        </BodyText>
        <ShowcaseGrid columns={3}>
          <ShowcaseImage
            src={screenshots.generation}
            alt="Vega generating subcontractor documents"
            fit="contain"
            caption="Generation status kept users informed while documents assembled."
          />
          <ShowcaseImage
            src={screenshots.report}
            alt="Vega subcontractor report in PDF form"
            fit="contain"
            ratio="4 / 3"
            caption="Structured subcontractor reports turned extraction into reviewable estimating output."
          />
          <ShowcaseImage
            src={screenshots.download}
            alt="Vega document download step"
            fit="contain"
            caption="Final artifacts were staged for direct estimator download."
          />
        </ShowcaseGrid>
      </Section>

      <Section label="Outcomes" title="Moved the Platform Toward Beta-Ready Scale">
        <BodyText>
          The platform direction delivered measurable leverage: faster cycles, validated accuracy
          against professional estimators, and materially higher bid throughput across a growing set
          of subcontractor categories.
        </BodyText>
        <CalloutPanel label="Impact:">
          <BulletList>
            <BulletItem>Reduced estimation time by 32x</BulletItem>
            <BulletItem>Achieved 99% accuracy vs a control group of estimators</BulletItem>
            <BulletItem>Increased contractor bid capacity by 200–300%</BulletItem>
            <BulletItem>Enabled scaling across 35+ subcontractor categories</BulletItem>
          </BulletList>
        </CalloutPanel>
      </Section>

      <Section label="Inputs" title="A Good System Is Only as Good as Its Input">
        <BodyText>
          System performance depended heavily on input quality. The platform was designed to
          handle variability in blueprint formats while maintaining consistent output reliability.
        </BodyText>
      </Section>

      <Section label="Why This Project Matters" title="Product Leadership on High-Ambiguity AI Platforms">
        <BodyText>
          Vega demonstrates how I lead AI-enabled platforms from strategy through delivery: framing
          the product problem, defining system architecture and evaluation, aligning stakeholders
          and domain experts, and shipping structured outcomes that hold up in enterprise
          conditions—not slide-deck prototypes.
        </BodyText>
        <BulletList>
          <BulletItem>Owned AI platform direction across OCR, LLM workflows, and validation.</BulletItem>
          <BulletItem>Designed for messy real-world inputs and trade-specific needs.</BulletItem>
          <BulletItem>Prioritized measurable accuracy, throughput, and adoption over novelty.</BulletItem>
          <BulletItem>Aligned product, engineering, and estimators on a single delivery path.</BulletItem>
          <BulletItem>Drove the system from concept toward beta-ready production scale.</BulletItem>
        </BulletList>
        <Callout>
          For construction technology, that meant delivering a platform that made blueprint takeoff
          faster, more consistent, and more useful for teams responsible for winning bids—without
          sacrificing estimator trust.
        </Callout>
        <ShowcaseImage
          src={screenshots.marketing}
          alt="Vega marketing page promoting AI-assisted takeoff for construction estimates"
          fit="contain"
          ratio="4 / 3"
          caption="The outward story stayed simple: structured, actionable estimating data from plans—with human validation in the loop."
        />
      </Section>
    </CaseStudyPage>
  );
}
