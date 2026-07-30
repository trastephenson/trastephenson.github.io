import IMG1 from '../../assets/sot.png';
import IMG2 from '../../assets/portfolio3.gif';
import IMG3 from '../../assets/CAMS.png';
import IMG4 from '../../assets/Safety.png';
import IMG5 from '../../assets/portfolio5.png';
import MovieVaultPlaceholder from '../../assets/MovieVaultPlaceholder';
import profile from '../../content/profile.json';

const videoStudioBase = `${process.env.PUBLIC_URL || ''}/video-studio`;

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function pickWorkFields(item = {}) {
  return ['title', 'summary', 'secondaryCta', 'secondaryUrl'].reduce((fields, key) => {
    if (item[key]) {
      fields[key] = item[key];
    }
    return fields;
  }, {});
}

function findImportedWork(key, title) {
  const importedItems = Array.isArray(profile.featuredWork) ? profile.featuredWork : [];
  const normalizedKey = slugify(key);
  const normalizedTitle = slugify(title);

  return importedItems.find((item) => {
    const itemKey = slugify(item.key);
    const itemTitle = slugify(item.title);
    return itemKey === normalizedKey || itemKey === normalizedTitle || itemTitle === normalizedTitle;
  });
}

function withProfileWork(key, localItem) {
  const curated = profile.featuredWorkOverrides?.[key] || {};
  const imported = curated.enabled === false ? null : findImportedWork(key, curated.title || localItem.title);

  return {
    ...localItem,
    ...pickWorkFields(curated),
    ...pickWorkFields(imported),
    profileKey: key,
  };
}

export const mobileApps = [
  withProfileWork('seedsOfThyme', {
    id: 1,
    image: IMG1,
    imageAlt: 'Seeds of Thyme mobile app preview',
    title: 'Seeds of Thyme',
    summary: 'End-to-end product ownership for iOS/Android essential oil education app - architecture, UX direction, subscription model design, and App Store delivery.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/seeds-of-thyme',
    secondaryCta: 'App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/seeds-of-thyme/id6450909951',
  }),
  withProfileWork('essentialLife', {
    id: 2,
    image: IMG2,
    imageAlt: 'The Essential Life mobile app preview',
    title: 'The Essential Life App',
    summary: 'Led Flutter platform modernization for a consumer mobile app at enterprise scale - 929 ratings, 6,000+ oil solutions, full cross-platform architecture.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/essential-life',
    secondaryCta: 'App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865',
  }),
];

export const platforms = [
  withProfileWork('camsAtm', {
    id: 3,
    image: IMG3,
    imageAlt: 'CAMS ATM platform dashboard preview',
    title: 'CAMS ATM Management',
    summary: 'Architected and delivered an enterprise ATM operational management platform - real-time workflow automation, compliance tracking, and cloud-native SaaS on AWS.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/cams-atm',
    secondaryCta: 'Company Site',
    secondaryUrl: 'https://camscompanion.com/',
  }),
  withProfileWork('safetyWallet', {
    id: 4,
    image: IMG4,
    imageAlt: 'Safety Wallet compliance platform preview',
    title: 'Safety Wallet',
    summary: 'Directed delivery of a safety compliance platform - automated PDF generation, QR code verification, and multi-stakeholder integration across workers, employers, and certification bodies.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/safety-wallet',
    secondaryCta: 'Contact Me',
    secondaryUrl: '#contact',
  }),
];

export const aiWork = [
  withProfileWork('videoStudio', {
    id: 'video-studio',
    image: `${videoStudioBase}/video-studio-showcase-poster.png`,
    imageAlt: 'Video Studio local AI motion workspace with a cinematic prompt composer',
    video: `${videoStudioBase}/video-studio-sizzle.mp4`,
    videoPoster: `${videoStudioBase}/video-studio-showcase-poster.png`,
    videoBadge: '39s reel',
    title: 'Video Studio',
    summary: 'Designed and engineered a fully local AI video studio that turns 16 ComfyUI workflows into guided recipes, recoverable renders, and a cinematic results workspace.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/video-studio',
  }),
  withProfileWork('vega', {
    id: 5,
    image: `${process.env.PUBLIC_URL || ''}/vega/vega-spec-extraction.png`,
    imageAlt: 'Vega AI estimation platform extraction workflow preview',
    title: 'Vega',
    summary: 'AI-assisted construction takeoff platform that converts blueprint sets into structured, trade-specific outputs estimators can review and use for bidding.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/vega',
    secondaryCta: 'Contact Me',
    secondaryUrl: '#contact',
  }),
  withProfileWork('llmRagPipelines', {
    id: 6,
    image: IMG5,
    imageAlt: 'AI workflow visualization',
    title: 'Multi-Agent LLM & RAG Pipelines',
    summary: 'Architected multi-agent LLM systems and RAG pipelines for enterprise knowledge workflows. Integrated OpenAI, Gemini, and DeepSeek APIs to automate insight extraction and decision support across SaaS platforms.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/llm-rag-pipelines',
    secondaryCta: 'LinkedIn',
    secondaryUrl: profile.links.linkedin,
  }),
  withProfileWork('movieVault', {
    id: 7,
    imageComponent: MovieVaultPlaceholder,
    imageAlt: 'Movie Vault placeholder artwork',
    title: 'Movie Vault',
    summary: 'Personal film collection app built solo - TMDB API, Web Audio API, GPU-composited animations, multi-user social rating system. Vanilla JS, zero frameworks, 139KB total.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/movie-vault',
    secondaryCta: 'View App',
    secondaryUrl: `${process.env.PUBLIC_URL || ''}/movies.html`,
  }),
];
