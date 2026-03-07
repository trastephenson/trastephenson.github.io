// Shared layout constants for the spatial card grid and camera positions.
// 4 columns × 3 rows = 12 section cards in a bowl arrangement.

export const TOTAL_SECTIONS = 12;
export const GRID_COLS = 4;
export const GRID_ROWS = 3;

export const CARD_W = 2.8;
export const CARD_H = 1.8;

const GAP_X = 0.55;
const GAP_Y = 0.5;

const TOTAL_W = GRID_COLS * CARD_W + (GRID_COLS - 1) * GAP_X;
const TOTAL_H = GRID_ROWS * CARD_H + (GRID_ROWS - 1) * GAP_Y;

// Camera z when showing the full overview grid (10.5 = ~33% larger than z=14)
export const OVERVIEW_Z = 10.5;
// How far in front of the card the camera stops when zoomed in
export const DETAIL_Z_OFFSET = 6;

/**
 * Returns [x, y, z] for a card at the given section index.
 * Cards in the center are slightly closer (bowl effect).
 */
export function getCardPosition(index) {
  const col = index % GRID_COLS;
  const row = Math.floor(index / GRID_COLS);
  const x = col * (CARD_W + GAP_X) - TOTAL_W / 2 + CARD_W / 2;
  const y = -(row * (CARD_H + GAP_Y)) + TOTAL_H / 2 - CARD_H / 2;
  // Bowl: center cards come 1.5 units closer to camera
  const distFromCenter = Math.hypot(col - 1.5, row - 1);
  const z = -distFromCenter * 1.5;
  return [x, y, z];
}

// One accent colour per section — used by both the 3D card and the HTML overlay
export const ACCENT_COLORS = [
  '#b77045', '#66d4ef', '#7d9d73', '#b88b68',
  '#66d4ef', '#7d9d73', '#b77045', '#66d4ef',
  '#7d9d73', '#b77045', '#66d4ef', '#8f8c84',
];

export const SECTION_LABELS = [
  'Hello',
  'Tagline',
  'About Me',
  'Strengths',
  'Experience',
  'Services',
  'Mobile Apps',
  'Platforms',
  'AI Work',
  'Testimonials',
  'Contact',
  'Connect',
];

// Keep SCROLL_CONFIG as a re-export alias so existing imports don't break
export const SCROLL_CONFIG = {
  SECTION_HEIGHT: 10,
  TOTAL_SECTIONS,
  MAX_SCROLL: (TOTAL_SECTIONS - 1) * 10,
};
