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
  description: string; // Make sure this is always a string
  resultImage?: string;
  languages: { language: string; code: string }[];
  notes?: string;
}
