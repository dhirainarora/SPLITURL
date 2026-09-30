export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath?: string;
}

export const SEO_CONFIGS: Record<string, PageSeoConfig> = {
  HOME: {
    title: "Split Roulette — Don't split the bill. Let fate split it.",
    description:
      'A social bill-splitting game for friends that randomly decides how much each person pays while guaranteeing the exact bill total.',
    canonicalPath: '/',
  },
  SETUP: {
    title: 'Set Up Split — Split Roulette',
    description:
      'Configure your group, bill amount, currency, and risk distribution mode on Split Roulette.',
    canonicalPath: '/',
  },
  RESULTS: {
    title: 'Split Results — Split Roulette',
    description:
      'View your randomized bill split breakdown, shares, and verifiable payment summary.',
    canonicalPath: '/',
  },
  HISTORY: {
    title: 'Split History — Split Roulette',
    description:
      'Review previous bill splits saved locally on your device with Split Roulette.',
    canonicalPath: '/',
  },
  SETTINGS: {
    title: 'Settings — Split Roulette',
    description:
      'Customize default currency, audio effects, haptics, and display preferences for Split Roulette.',
    canonicalPath: '/',
  },
  PRIVACY: {
    title: 'Privacy Policy — Split Roulette',
    description:
      "Read Split Roulette's Privacy Policy. Learn about local device storage, advertising cookies, data retention, and your privacy rights.",
    canonicalPath: '/privacy-policy',
  },
  TERMS: {
    title: 'Terms of Service — Split Roulette',
    description:
      'Review the Terms of Service for Split Roulette, covering acceptable use, entertainment disclaimers, and service limitations.',
    canonicalPath: '/terms',
  },
  CONTACT: {
    title: 'Contact Us — Split Roulette',
    description:
      'Get in touch with the Split Roulette team for support, feature feedback, advertising, or bug reports.',
    canonicalPath: '/contact',
  },
  ABOUT: {
    title: 'About Split Roulette — The Social Bill-Splitting Game',
    description:
      'Discover how Split Roulette turns group bill splitting into an exciting, fair, and mathematically exact game with zero lost cents.',
    canonicalPath: '/about',
  },
};

export function updatePageSeo(screenKey: string) {
  if (typeof document === 'undefined') return;

  const config = SEO_CONFIGS[screenKey] || SEO_CONFIGS.HOME;

  // Update <title>
  document.title = config.title;

  // Update or create standard meta description
  setOrCreateMetaTag('description', config.description, 'name');

  // Update OpenGraph tags
  setOrCreateMetaTag('og:title', config.title, 'property');
  setOrCreateMetaTag('og:description', config.description, 'property');

  // Update Twitter tags
  setOrCreateMetaTag('twitter:title', config.title, 'name');
  setOrCreateMetaTag('twitter:description', config.description, 'name');

  // Update canonical URL if path provided
  if (config.canonicalPath && typeof window !== 'undefined') {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', `${window.location.origin}${config.canonicalPath}`);
  }
}

function setOrCreateMetaTag(nameOrProperty: string, content: string, attributeType: 'name' | 'property') {
  let element = document.querySelector(`meta[${attributeType}="${nameOrProperty}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeType, nameOrProperty);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}
