// E-Ticaret Olgunluk Değerlendirme Sistemi - Type Definitions

export interface Question {
  id: string;
  categoryId: string;
  text: {
    tr: string;
    en: string;
  };
  questionNumber: number;
  weight?: number; // Sorunun ağırlığı (default: 1)
}

export interface Category {
  id: string;
  name: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  weight: number; // Kategori ağırlığı
  color: string; // Chart için renk
  icon?: string; // Icon class name
}

export type AnswerValue = 'yes' | 'no' | 'unknown';

export interface Answer {
  questionId: string;
  value: AnswerValue;
  timestamp: Date;
}

export interface AssessmentResponse {
  id: string;
  companyId?: string;
  answers: Answer[];
  startedAt: Date;
  completedAt?: Date;
  language: 'tr' | 'en';
  companyInfo?: {
    name: string;
    industry: string;
    size: 'startup' | 'small' | 'medium' | 'large';
    annualRevenue?: string;
  };
}

export interface CategoryScore {
  categoryId: string;
  score: number;
  maxScore: number;
  percentage: number;
  answeredQuestions: number;
  totalQuestions: number;
  unknownCount: number;
}

export interface AssessmentResult {
  id: string;
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  maturityLevel: 'basic' | 'intermediate' | 'advanced' | 'expert';
  categoryScores: CategoryScore[];
  penaltyFromDontKnow: number;
  completedAt: Date;
  assessmentType?: 'e-commerce' | 'e-export' | 'combined';
  
  // Company info
  companyInfo?: {
    companyName?: string;
    industry?: string;
    size?: string;
    revenue?: string;
  };
  
  // Detaylı analiz için
  strengths: string[];
  weaknesses: string[];
  criticalActions: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  category: string;
  priority: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  timeframe: 'immediate' | 'short' | 'medium' | 'long'; // 0-1ay, 1-3ay, 3-6ay, 6-12ay
  estimatedROI?: number;
  resources?: string[];
  dependencies?: string[];
}

export interface BenchmarkData {
  industry: string;
  companySize: string;
  averageScore: number;
  categoryAverages: Record<string, number>;
  percentile: number;
  topPerformers: {
    score: number;
    practices: string[];
  };
}

// Yol Haritası için
export interface Milestone {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  targetDate: Date;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  kpis: string[];
  dependencies: string[];
}

export interface Roadmap {
  id: string;
  assessmentId: string;
  timeframe: '3months' | '6months' | '12months';
  milestones: Milestone[];
  estimatedBudget?: number;
  expectedROI?: number;
}

// UI State için
export interface AssessmentUIState {
  currentQuestionIndex: number;
  currentCategoryId: string;
  isNavigating: boolean;
  progress: {
    answeredQuestions: number;
    totalQuestions: number;
    percentage: number;
    categoryProgress: Record<string, number>;
  };
  filters: {
    showOnlyUnanswered?: boolean;
    categoryFilter?: string;
  };
}