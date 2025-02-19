import { CodeSnippet } from './components.interface';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  category: string;
  tags: string[];
  featured: false;
  publishDate: string;
  lastUpdateDate: string;
  popularity: number;
  languages: string[];
  codeImage: Language[]; // Keep codeImage as an array of Language objects
  codeSnippets: CodeSnippet[];
  github: string | null;
  liveDemo: string | null;
  content: ContentItem[];
  media: Media;
  conclusion: BlogConclusion;
  projects: number[]; // Array of project IDs
}

export interface Language {
  language: string;
  code: string;
}

// export interface CodeSnippet {
//   heading: string;
//   description?: string;
//   languages: Language[];
// }

export interface ContentItem {
  type: 'heading' | 'paragraph' | 'list' | 'image' | 'video' | 'quote';
  level?: number; // For headings
  textContent?: string | string[]; // String for paragraphs, headings, quotes. Array of strings for lists.
  publishDate: string;
  lastUpdateDate: string;
  status: 'draft' | 'published';
  listType: 'ordered' | 'unordered';
  src?: string; // For images and videos
  url?: string; // For images and videos
  alt?: string; // For images
  caption?: string; // For images and videos
}

export interface Media {
  images: MediaItem[];
}

export interface MediaItem {
  url: string;
  alt?: string;
  caption?: string;
}

export interface BlogConclusion {
  summary: string;
  callToAction: string;
}
