export interface NavigationItem {
  label: string;
  href: `#${string}`;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  handle: string;
}

export interface ShowreelConfig {
  title: string;
  videoSrc: string;
  poster: string;
}

export interface SiteInfo {
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  location: string;
  locationShort: string;
  email: string;
  availability: string;
  heroDescription: string;
  heroMeta: string;
  selectedWorkLabel: string;
  scrollHint: string;
  showreel: ShowreelConfig;
}
