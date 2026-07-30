import React from 'react';
import CaseStudyPage, {
  BodyText,
  BulletItem,
  BulletList,
  Callout,
  CalloutPanel,
  FeatureRow,
  MiniCard,
  Section,
  ShowcaseImage,
  ShowcaseVideo,
  TwoCol,
} from '../components/CaseStudyPage';

const videoStudioBase = `${process.env.PUBLIC_URL || ''}/video-studio`;

const assets = {
  reel: `${videoStudioBase}/video-studio-sizzle-39s.mp4`,
  captions: `${videoStudioBase}/video-studio-sizzle.vtt`,
  poster: `${videoStudioBase}/video-studio-showcase-poster.png`,
  catalog: `${videoStudioBase}/video-studio-model-catalog.png`,
};

const meta = [
  { label: 'Role', value: 'Product design, front-end, and workflow engineering' },
  { label: 'Stack', value: 'Vanilla JS, Python, ComfyUI API, WebSockets' },
  { label: 'Models', value: 'LTX-2, Wan 5B / 14B, HunyuanVideo' },
  { label: 'Status', value: 'Fully local portfolio build' },
];

const stats = [
  { num: '16', label: 'Production recipes' },
  { num: '4', label: 'Model families' },
  { num: '60', label: 'Clips indexed on disk' },
  { num: '39s', label: 'Product reel' },
];

export default function VideoStudioCasePage() {
  return (
    <CaseStudyPage
      accentColor="1E7184"
      eyebrow="Case Study — Creative AI Platform"
      title="Video Studio"
      subtitle="From ComfyUI node graphs to a cinematic, recoverable creation flow."
      subtitleSupporting="A fully local interface that turns 16 model workflows into guided recipes, legible render progress, and a reusable results workspace."
      heroMetrics="16 recipes • 4 model families • 60 indexed clips • 39-second reel"
      heroMyRole="I shaped the product direction, researched the creative-tool category, designed and built the interface, and engineered the local ComfyUI workflow layer behind it."
      heroMedia={(
        <ShowcaseVideo
          autoPlay
          loop
          muted
          src={assets.reel}
          poster={assets.poster}
          captionsSrc={assets.captions}
          label="Video Studio 39-second product reel with a Wan 14B-generated opening ident"
          variant="hero"
          caption="The product in 39 seconds — opening on a locally generated Wan 14B studio ident, then moving through the composer, recipe catalog, generated motion, results workspace, and recovery-aware workflow. Sound is available in the player."
        />
      )}
      meta={meta}
      stats={stats}
      returnToSectionIndex={8}
    >
      <Section label="Overview" title="Turning Infrastructure Into a Creative Tool">
        <BodyText>
          ComfyUI exposes powerful video models through node graphs, but creators still have to
          understand model-specific inputs, quality tradeoffs, seeds, render time, and output
          locations. A single wrong choice can waste a multi-minute render.
        </BodyText>
        <BodyText>
          Video Studio reframes that infrastructure around the language of shots, recipes, and
          iterations. The system keeps model power available while moving operational complexity
          out of the primary creation path.
        </BodyText>
        <Callout label="Product question">
          How might a creator think in shots and iterations instead of nodes and infrastructure?
        </Callout>
      </Section>

      <Section label="Research" title="Benchmarking the Creative-Tool Category">
        <BodyText>
          Mobbin research connected interface patterns from leading creative and AI products to
          concrete product decisions. The goal was not to copy a dark aesthetic. It was to
          understand how mature tools make dense capability feel direct.
        </BodyText>
        <CalloutPanel label="Pattern → decision">
          <BulletList>
            <BulletItem prefix="Krea, Runway, and Artlist">
              A compact, media-led composer keeps the shot—not the settings—as the center of
              gravity.
            </BulletItem>
            <BulletItem prefix="Sora and OpenAI Platform">
              Results become the working surface, so iteration starts from output instead of a
              disconnected history screen.
            </BulletItem>
            <BulletItem prefix="Leonardo AI">
              A capability-rich catalog can stay approachable when recipes are grouped by family
              and explained in outcome language.
            </BulletItem>
            <BulletItem prefix="Grain and Deel">
              The portfolio story leads with one strong reel, then earns depth with product and
              engineering evidence.
            </BulletItem>
          </BulletList>
        </CalloutPanel>
        <ShowcaseImage
          src={assets.catalog}
          alt="Video Studio preset catalog grouped by model family with real output thumbnails"
          fit="contain"
          caption="Sixteen model workflows become visual recipes with real output, quality, duration, audio, and render-time context."
        />
      </Section>

      <Section label="Product Direction" title="Recipes Instead of Graphs">
        <FeatureRow
          feature="Outcome-led recipes"
          problem="Model names and graph files do not tell creators what a workflow is good for."
          decision="Describe each workflow by result, quality, duration, ETA, sound, and image requirements."
        />
        <FeatureRow
          feature="One focused composer"
          problem="Prompting, seed, preset, frames, and model guidance were scattered across the page."
          decision="Keep every shot-level choice in one composer with progressive disclosure for the catalog."
        />
        <FeatureRow
          feature="Results-first workspace"
          problem="Outputs were files on disk with no reliable path back to the recipe that created them."
          decision="Pair every clip with family, prompt, preset, seed, download, and exact recipe reuse."
        />
      </Section>

      <Section label="Trust" title="Long Renders Need Recovery, Not Optimism">
        <BodyText>
          Multi-minute generation changes the product requirement. Progress, failure recovery, and
          durable history are not edge cases; they are the trust layer.
        </BodyText>
        <TwoCol>
          <MiniCard title="Legible progress">
            <BodyText>
              Technical nodes become human stages such as Loading models, Rendering frames,
              Upscaling, and Encoding video, backed by WebSocket events with polling fallback.
            </BodyText>
          </MiniCard>
          <MiniCard title="Reload recovery">
            <BodyText>
              A refreshed page reattaches to the active ComfyUI job instead of losing the render
              state or pretending the queue is empty.
            </BodyText>
          </MiniCard>
          <MiniCard title="Disk-backed history">
            <BodyText>
              The gallery reads actual output files, so completed clips remain discoverable after
              the engine or interface restarts.
            </BodyText>
          </MiniCard>
          <MiniCard title="Queue-aware creation">
            <BodyText>
              New shots can be staged while a render is active, with clear offline and failure
              states instead of silent dead ends.
            </BodyText>
          </MiniCard>
        </TwoCol>
      </Section>

      <Section label="System Design" title="A Manifest-Driven Workflow Layer">
        <BodyText>
          A single manifest maps every recipe to its graph, prompt node, seed nodes, image inputs,
          model family, thumbnail, and capabilities. Adding a recipe changes data rather than
          duplicating interface logic.
        </BodyText>
        <BulletList>
          <BulletItem prefix="Submission">
            The selected graph is patched with prompt, validated seed, and uniquely named uploaded
            frames before it enters the ComfyUI queue.
          </BulletItem>
          <BulletItem prefix="Progress">
            WebSocket events power live stages while polling keeps the experience functional when
            real-time updates are unavailable.
          </BulletItem>
          <BulletItem prefix="Playback">
            The Python proxy preserves Range, HEAD, 206, and 416 behavior so large local files seek
            reliably instead of replaying from the start.
          </BulletItem>
          <BulletItem prefix="Reuse">
            Metadata recovered from ComfyUI history lets a clip restore the exact recipe that
            produced it.
          </BulletItem>
        </BulletList>
      </Section>

      <Section label="Evidence" title="Verified Across Models, Inputs, and Finishing Paths">
        <CalloutPanel label="What shipped">
          <BulletList>
            <BulletItem>16 production recipes across four model families.</BulletItem>
            <BulletItem>Four audio-capable LTX-2 recipes.</BulletItem>
            <BulletItem>Two start/end-frame Wan 14B recipes.</BulletItem>
            <BulletItem>
              Text-to-video, image-to-video, native-HD, latent-upscale, and ESRGAN finishing paths.
            </BulletItem>
            <BulletItem>
              Queue-aware generation, reload recovery, and outputs that survive engine restarts.
            </BulletItem>
            <BulletItem>
              Verified exports at 960×544 with audio, 1280×704, 1664×960 with Wan 14B,
              and 2560×1408 with audio.
            </BulletItem>
          </BulletList>
        </CalloutPanel>
        <Callout>
          The result is not a prettier ComfyUI. It is a creative tool that hides infrastructure
          until the creator needs it.
        </Callout>
      </Section>

      <Section label="Lessons" title="What This Build Proved">
        <TwoCol>
          <MiniCard title="As a product designer">
            <BulletList>
              <BulletItem>
                Capability feels premium when the interface makes tradeoffs legible at the moment
                of choice.
              </BulletItem>
              <BulletItem>
                Long-running AI work needs recovery and continuity designed into the happy path.
              </BulletItem>
            </BulletList>
          </MiniCard>
          <MiniCard title="As a platform builder">
            <BulletList>
              <BulletItem>
                A manifest can turn heterogeneous model graphs into one stable product contract.
              </BulletItem>
              <BulletItem>
                Media delivery details—range requests, metadata, and durable file discovery—shape
                the perceived quality of the entire tool.
              </BulletItem>
            </BulletList>
          </MiniCard>
        </TwoCol>
      </Section>
    </CaseStudyPage>
  );
}
