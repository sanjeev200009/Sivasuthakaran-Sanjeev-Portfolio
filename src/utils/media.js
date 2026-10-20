const R2_PUBLIC_BASE = "https://pub-985c7f2e369d49558880e58912bfa289.r2.dev";

const r2Image = (path) => `${R2_PUBLIC_BASE}/images/${path}`;

export const PORTFOLIO_IMAGES = {
  hero: {
    cutout: r2Image("sanjeev-cutout.webp"),
    illustrated: r2Image("sanjeev-illustrated.webp"),
  },
  projects: {
    aura: r2Image("projects/aura-thumbnail.webp"),
    mailgridLight: r2Image("projects/mailgrid-light.webp"),
    mailgridDark: r2Image("projects/mailgrid-dark.webp"),
    career141: r2Image("projects/career141-thumbnail.webp"),
    career141V2: r2Image("projects/career141-v2-thumbnail.webp"),
    vota: r2Image("projects/vota-thumbnail.webp"),
    talentUnwrapped: r2Image("projects/talent-unwrapped-thumbnail.webp"),
    talentSuite: r2Image("projects/talent-suite-thumbnail.webp"),
  },
};
