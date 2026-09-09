
export interface AnalysisItem {
  category: string;
  name: string;
  intensity: number; // 1-10
  officialDescription: string;
  analysis: string;
  evidence: string;
}

export interface SuggestedCopy {
  trigger: string;
  category: string;
  text: string;
  reasoning: string;
}

export interface SupportingTextSection {
  label: string;
  items: string[];
  limit?: number;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  foundItems: AnalysisItem[];
  improvements: string[];
  suggestedCTAs?: string[];
  suggestedCopys?: SuggestedCopy[];
  supportingTexts?: SupportingTextSection[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export type Brand = 'Anhanguera' | 'Unopar' | 'Unime' | 'Pitágoras' | 'Unic' | 'Uniderp' | 'Anglo' | 'Singularidades' | 'Red Balloon';

export const BRANDS: Brand[] = [
  'Anhanguera',
  'Unopar',
  'Unime',
  'Pitágoras',
  'Unic',
  'Uniderp',
  'Anglo',
  'Singularidades',
  'Red Balloon'
];

export type Platform = 
  | 'Meta Padrão' 
  | 'Meta Carrossel' 
  | 'Meta PDLOKAL' 
  | 'TikTok' 
  | 'Google PMax' 
  | 'Google DV360' 
  | 'Google Search' 
  | 'Google App' 
  | 'Google Display'
  | 'Roteiro';

export const PLATFORMS: Platform[] = [
  'Meta Padrão', 
  'Meta Carrossel', 
  'Meta PDLOKAL', 
  'TikTok', 
  'Google PMax', 
  'Google DV360', 
  'Google Search', 
  'Google App', 
  'Google Display',
  'Roteiro'
];
