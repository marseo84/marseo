export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: BlogContent;
  date: string;
  lastUpdateDate: string;
  tags: string[];
  category: string;
  popularity: number;
  codeImage?: string;
}

export interface BlogContent {
  headings: string[];
  paragraphs: Paragraph[];
  lists: BlogLists;
  codeSnippets: CodeSnippet[];
  media: BlogMedia;
  conclusion?: BlogConclusion;
}

export interface Paragraph {
  name: string;
  text: string;
}

export interface BlogLists {
  ordered: string[];
  unordered: string[];
}

export interface CodeSnippet {
  language: string;
  snippet: string;
}

export interface BlogMedia {
  images: MediaItem[];
  videos: MediaItem[];
}

export interface MediaItem {
  url: string;
  alt: string;
  caption?: string;
}

export interface BlogConclusion {
  summary: string;
  callToAction: string;
}
