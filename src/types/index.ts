export type ProjectCategory = 'video' | 'thumbnail' | 'minecraft';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  tools: string[];
  role: string;
  highlights: string[];
  isConcept: boolean;
  accentColor?: string;
  previewType: 'video' | 'image' | 'code';
}

export interface ServiceItem {
  id: string;
  title: string;
  discipline: string;
  tagline: string;
  description: string;
  tools: string[];
  capabilities: string[];
  workflow: { step: string; title: string; desc: string }[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string | null; // Null or empty when not configured yet
  handle?: string;
}

export interface CWRLink {
  platform: string;
  label: string;
  url: string | null;
}
