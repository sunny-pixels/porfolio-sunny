/** Single swap-point for every image on the site. */
export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: string;
};

const shot = (slug: string, alt: string): SiteImage => ({
  src: `/projects/${slug}.webp`,
  alt,
  width: 1600,
  height: 1000,
  position: "50% 0%",
});

export const images = {
  portrait: {
    src: "/images/sunny.jpg",
    alt: "Sunny Prajapati in a white shirt, looking over his shoulder at the sea at dusk",
    width: 1440,
    height: 2560,
    position: "58% 22%",
  },
  maliha: shot("maliha", "Maliha homepage: two models in handcrafted kurtas framed as Women and Lookbook"),
  kkJewels: shot("kk-jewels", "KK Jewels homepage: a silver heritage necklace on red velvet"),
  almirah: shot("almirah", "Almirah Luxe Gallery hero: “A place where experience becomes art” beside an arch sculpture"),
  blitz: shot("blitz", "Blitz Infocom homepage: “Enterprise Grade Software. AI That Works in Production.”"),
  onyx: shot("onyx", "Onyx Technologies homepage: payroll and workforce solutions headline"),
  devTours: shot("dev-tours", "DevHolidays travel homepage: “Your Journey Begins Here” over an aerial coastline"),
  rahulImpex: shot("rahul-impex", "Rahul Impex homepage: a tray of dry fruits beside “Taste the finest dry fruits”"),
  careerLens: shot("career-lens", "Career Lens homepage: “Find jobs that truly match your skills”"),
  shipdoc: shot("shipdoc", "Ultra Doc-Intelligence interface: upload, ask and extract panels"),
  slaMonitor: shot("sla-monitor", "SLA Monitor dashboard: availability percentage and per-service health bars"),
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
