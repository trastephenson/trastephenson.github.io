import React from 'react';
import CaseStudyPage, {
  BodyText,
  BulletItem,
  BulletList,
  Callout,
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
  { label: 'Role', value: 'Solutions Architect / Technical Product & Platform Lead' },
  {
    label: 'Focus',
    value:
      'AI workflow design, platform architecture, estimation systems, blueprint-to-structured-output pipelines',
  },
  { label: 'Domain', value: 'Construction takeoff and estimation' },
  { label: 'Status', value: 'Beta-ready platform direction' },
];

const stats = [
  { num: '5-step', label: 'Blueprint-to-takeoff workflow' },
  { num: 'Multi-trade', label: 'Category-specific extraction paths' },
  { num: 'HITL', label: 'Estimator review preserved' },
  { num: 'Beta', label: 'Scalable platform foundation' },
];

export default function VegaCasePage() {
  return (
    <CaseStudyPage
      accentColor="2C90D0"
      eyebrow="Case Study - AI Work"
      title="Vega"
      subtitle="AI Estimation Platform for Construction Takeoff"
      meta={meta}
      stats={stats}
      pdfUrl={pdfUrl}
      returnToSectionIndex={8}
    >
      <Section label="Overview" title="Turning Blueprint Analysis Into a Usable Estimation Workflow">
        <BodyText>
          Construction estimating is still heavily manual in many environments. Estimators
          often spend hours reviewing blueprint sets, locating relevant details across
          inconsistent drawing packages, organizing quantities by trade, and translating all
          of that into takeoff outputs that can actually be used for bidding.
        </BodyText>
        <BodyText>
          The problem is not just speed. It is inconsistency. Every project can arrive with
          different plan layouts, drawing conventions, naming patterns, annotation styles,
          and levels of detail. Vega was built to address that gap by creating an AI-assisted
          construction estimation platform capable of converting blueprint documents into
          structured, reviewable takeoff outputs across multiple subcontractor categories.
        </BodyText>
        <ShowcaseImage
          src={screenshots.extraction}
          alt="Vega specification extraction screen with structured flooring takeoff results beside a blueprint preview"
          fit="contain"
          caption="Best portfolio-card screenshot: Vega's structured specification extraction flow shows the core value clearly at a glance - blueprint context on one side, trade-specific takeoff output on the other."
        />
      </Section>

      <Section label="Goal" title="Bridge AI Capability With Real-World Estimating">
        <BodyText>
          The goal was not just to read plans with AI. It was to turn blueprint analysis
          from a largely manual process into a scalable workflow that could ingest highly
          variable plan documents, organize extracted information into structured
          trade-specific outputs, support AI-assisted quantity generation, preserve
          reviewability for estimators, and create a foundation that could scale across
          subcontractor categories over time.
        </BodyText>
        <Callout>
          This was a platform problem, not a prompt problem. The system had to produce
          outputs estimators could actually review, trust, and use in bidding workflows.
        </Callout>
      </Section>

      <Section label="My Role" title="Architecture, Workflow Design, and Delivery Alignment">
        <BodyText>
          I helped lead the platform from the architecture and workflow-design side, working
          across product direction, technical planning, data structure design, and delivery
          execution.
        </BodyText>
        <BodyText>
          My role sat at the intersection of business needs, estimator workflows, and
          engineering implementation. I helped shape how the platform should work end to end,
          from document intake through output delivery, while making sure the system stayed
          grounded in how construction estimators actually operate.
        </BodyText>
      </Section>

      <Section label="What I Did" title="Designed the Platform Around Workflow Discipline">
        <TwoCol>
          <MiniCard title="Led Architecture and Workflow Design">
            <BodyText>
              I led architecture and workflow design for an AI-assisted construction
              estimation platform that converted blueprint documents into structured takeoff
              outputs across multiple subcontractor categories.
            </BodyText>
          </MiniCard>
          <MiniCard title="Defined the Data Structure">
            <BodyText>
              I helped define the structural logic the AI system needed in order to produce
              more consistent outputs, including category mappings, takeoff-result data
              structures, grouping rules, and estimation workflow logic.
            </BodyText>
          </MiniCard>
          <MiniCard title="Coordinated Platform Decisions">
            <BodyText>
              I helped coordinate backend, cloud, orchestration, and output-staging decisions
              needed to move the platform toward beta readiness without breaking the estimator
              workflow.
            </BodyText>
          </MiniCard>
          <MiniCard title="Bridged Business and Engineering">
            <BodyText>
              I translated estimator pain points into product requirements, business goals
              into delivery direction, and technical constraints into practical workflow
              decisions.
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
            caption="Trade-specific pathways let the workflow branch by subcontractor category."
          />
          <ShowcaseImage
            src={screenshots.scaleSelection}
            alt="Vega scale selection interface for blueprint measurement"
            fit="contain"
            caption="Scale selection handles one of the key sources of estimation variability."
          />
          <ShowcaseImage
            src={screenshots.crop}
            alt="Vega crop-plan interface with blueprint area selection"
            fit="contain"
            caption="Cropping makes the workflow operationally useful by isolating the right plan context before extraction."
          />
        </ShowcaseGrid>
      </Section>

      <Section label="Key Challenges" title="Operationalizing AI in a Domain Full of Ambiguity">
        <BulletList>
          <BulletItem prefix="Blueprint variability">
            Plan sets vary significantly from project to project, making consistency
            difficult without strong workflow and data-structure design.
          </BulletItem>
          <BulletItem prefix="Trade-specific interpretation">
            Different subcontractor categories require different ways of reading, grouping,
            and validating quantity data.
          </BulletItem>
          <BulletItem prefix="Structured output requirements">
            Estimators do not need vague AI summaries. They need outputs that are organized,
            reviewable, and close enough to real workflow expectations to be actionable.
          </BulletItem>
          <BulletItem prefix="Human review integration">
            The system had to support AI assistance without removing estimator oversight,
            which meant reviewability had to be part of the workflow design.
          </BulletItem>
          <BulletItem prefix="Scalability across categories">
            The platform needed a foundation that could support future subcontractor
            categories without being rebuilt from scratch each time.
          </BulletItem>
        </BulletList>
      </Section>

      <Section label="Architecture & Platform Thinking" title="This Needed a System, Not a Single AI Prompt">
        <BodyText>
          From a platform perspective, Vega required more than a document parser. It had to
          support document ingestion and preprocessing, orchestration of multi-step
          estimation workflows, structured intermediate and final outputs, cloud-based
          processing and storage patterns, trade and category mappings, human-in-the-loop
          review, and output delivery suitable for estimating use.
        </BodyText>
        <BodyText>
          My contribution focused on ensuring those components worked together as a coherent
          platform rather than a disconnected set of experiments.
        </BodyText>

        <ShowcaseGrid>
          <ShowcaseImage
            src={screenshots.processing}
            alt="Vega processing timeline modal"
            fit="contain"
            caption="Processing timelines made the AI workflow legible instead of opaque."
          />
          <ShowcaseImage
            src={screenshots.extraction}
            alt="Vega extraction results for flooring trade"
            fit="contain"
            caption="Trade-specific extraction organized quantities into usable estimator-facing buckets."
          />
          <ShowcaseImage
            src={screenshots.preview}
            alt="Vega plan preview paired with extracted flooring details"
            fit="contain"
            caption="Blueprint context stayed visible alongside structured output for reviewability."
          />
          <ShowcaseImage
            src={screenshots.secondFloor}
            alt="Vega second-floor extraction screen"
            fit="contain"
            caption="The workflow had to hold even as floor plans, room counts, and output structures changed."
          />
        </ShowcaseGrid>
      </Section>

      <Section label="Output Delivery" title="The Platform Had to End With Usable Estimator Outputs">
        <BodyText>
          A core design requirement was output packaging for estimator use. That meant
          generating documents and downloadable artifacts that reflected the structure of the
          workflow instead of leaving users with loose AI-generated fragments.
        </BodyText>
        <ShowcaseGrid columns={3}>
          <ShowcaseImage
            src={screenshots.generation}
            alt="Vega generating subcontractor documents"
            fit="contain"
            caption="Generation status kept users informed while docs were being assembled."
          />
          <ShowcaseImage
            src={screenshots.report}
            alt="Vega subcontractor report in PDF form"
            fit="contain"
            ratio="4 / 3"
            caption="Structured subcontractor reports turned extracted data into reviewable estimating output."
          />
          <ShowcaseImage
            src={screenshots.download}
            alt="Vega document download step"
            fit="contain"
            caption="Final deliverables were staged for direct estimator download."
          />
        </ShowcaseGrid>
      </Section>

      <Section label="Outcomes" title="Moved the Platform Toward Beta-Ready Scale">
        <BodyText>
          My work helped move Vega toward a more scalable, beta-ready AI estimation platform
          by bringing structure to a highly variable problem space.
        </BodyText>
        <BulletList>
          <BulletItem>A clearer end-to-end blueprint-to-takeoff workflow.</BulletItem>
          <BulletItem>Stronger category mapping and output consistency.</BulletItem>
          <BulletItem>A more usable foundation for AI-assisted quantity generation.</BulletItem>
          <BulletItem>
            Better alignment between estimator expectations and engineering execution.
          </BulletItem>
          <BulletItem>
            A platform direction capable of expanding across more trades over time.
          </BulletItem>
        </BulletList>
      </Section>

      <Section label="Why This Project Matters" title="A Good Example of My Best Work">
        <BodyText>
          Vega is a strong example of the kind of work I do best. I do not just help build
          software. I help turn complex, high-ambiguity concepts into usable platforms by
          creating the structure, workflows, and delivery alignment needed to make them real.
        </BodyText>
        <BulletList>
          <BulletItem>Lead AI-enabled platform architecture.</BulletItem>
          <BulletItem>Design workflows around messy real-world inputs.</BulletItem>
          <BulletItem>Create structure for scalable automation.</BulletItem>
          <BulletItem>Connect user needs to technical implementation.</BulletItem>
          <BulletItem>Guide systems from concept toward production readiness.</BulletItem>
        </BulletList>
        <Callout>
          For construction technology, that meant helping shape a platform that could make
          blueprint takeoff faster, more structured, and more useful for the people
          responsible for building accurate bids.
        </Callout>
        <ShowcaseImage
          src={screenshots.marketing}
          alt="Vega marketing page promoting AI-assisted takeoff for construction estimates"
          fit="contain"
          ratio="4 / 3"
          caption="The outward product story was simple: turn construction plans into structured, actionable estimating data without losing estimator oversight."
        />
      </Section>
    </CaseStudyPage>
  );
}
