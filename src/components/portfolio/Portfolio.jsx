import IMG1 from '../../assets/sot.png';
import IMG2 from '../../assets/portfolio3.gif';
import IMG3 from '../../assets/CAMS.png';
import IMG4 from '../../assets/Safety.png';
import IMG5 from '../../assets/portfolio5.png';
import MovieVaultPlaceholder from '../../assets/MovieVaultPlaceholder';

export const mobileApps = [
  {
    id: 1,
    image: IMG1,
    imageAlt: 'Seeds of Thyme mobile app preview',
    title: 'Seeds of Thyme',
    summary: 'End-to-end product ownership for iOS/Android essential oil education app - architecture, UX direction, subscription model design, and App Store delivery.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/seeds-of-thyme',
    secondaryCta: 'App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/seeds-of-thyme/id6450909951',
  },
  {
    id: 2,
    image: IMG2,
    imageAlt: 'The Essential Life mobile app preview',
    title: 'The Essential Life App',
    summary: 'Led Flutter platform modernization for a consumer mobile app at enterprise scale - 929 ratings, 6,000+ oil solutions, full cross-platform architecture.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/essential-life',
    secondaryCta: 'App Store',
    secondaryUrl: 'https://apps.apple.com/us/app/the-essential-life-oil-guide/id1434661865',
  },
];

export const platforms = [
  {
    id: 3,
    image: IMG3,
    imageAlt: 'CAMS ATM platform dashboard preview',
    title: 'CAMS ATM Management',
    summary: 'Architected and delivered an enterprise ATM operational management platform - real-time workflow automation, compliance tracking, and cloud-native SaaS on AWS.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/cams-atm',
    secondaryCta: 'Company Site',
    secondaryUrl: 'https://camscompanion.com/',
  },
  {
    id: 4,
    image: IMG4,
    imageAlt: 'Safety Wallet compliance platform preview',
    title: 'Safety Wallet',
    summary: 'Directed delivery of a safety compliance platform - automated PDF generation, QR code verification, and multi-stakeholder integration across workers, employers, and certification bodies.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/safety-wallet',
    secondaryCta: 'Contact Me',
    secondaryUrl: '#contact',
  },
];

export const aiWork = [
  {
    id: 5,
    image: `${process.env.PUBLIC_URL || ''}/vega/vega-spec-extraction.png`,
    imageAlt: 'Vega AI estimation platform extraction workflow preview',
    title: 'Vega',
    summary: 'AI-assisted construction takeoff platform that converts blueprint sets into structured, trade-specific outputs estimators can review and use for bidding.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/vega',
    secondaryCta: 'Contact Me',
    secondaryUrl: '#contact',
  },
  {
    id: 6,
    image: IMG5,
    imageAlt: 'AI workflow visualization',
    title: 'Multi-Agent LLM & RAG Pipelines',
    summary: 'Architected multi-agent LLM systems and RAG pipelines for enterprise knowledge workflows. Integrated OpenAI, Gemini, and DeepSeek APIs to automate insight extraction and decision support across SaaS platforms.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/llm-rag-pipelines',
    secondaryCta: 'LinkedIn',
    secondaryUrl: 'https://www.linkedin.com/in/mrtravisstephenson',
  },
  {
    id: 7,
    imageComponent: MovieVaultPlaceholder,
    imageAlt: 'Movie Vault placeholder artwork',
    title: 'Movie Vault',
    summary: 'Personal film collection app built solo - TMDB API, Web Audio API, GPU-composited animations, multi-user social rating system. Vanilla JS, zero frameworks, 139KB total.',
    primaryCta: 'Case Study',
    routeUrl: '/projects/movie-vault',
    secondaryCta: 'View App',
    secondaryUrl: `${process.env.PUBLIC_URL || ''}/movies.html`,
  },
];
