export interface HeroData {
  title: string;
  subtitle: string;
  styleClass: string;
}

export interface CtaData {
  ctaTaglinePrimary: string;
  ctaBtnPrimary: string;
  ctaBtnPrimaryLink: string;
  ctaTaglineSecondary: string;
  ctaBtnSecondary: string;
  ctaBtnSecondaryLink: string;
  styleClass: string;
}

export interface CodeSnippet {
  heading: string;
  description: string;
  resultImage?: string;
  // languages: { language: string; code: string }[];
  languages: Language[];
  notes?: string;
}

export interface Language {
  language: 'html' | 'css' | 'javascript' | 'typescript' | 'scss' | 'php';
  code: string;
}
