/**
 * API Service - Backend communication layer
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface SaveResponsesRequest {
  user_id: string;
  user_email: string;
  assessment_id: string;
  responses: Array<{
    question_id: string;
    answer: number;
  }>;
  package_type: string;
}

export interface GenerateReportRequest {
  user_id: string;
  assessment_id: string;
  language: string;
}

export interface QuestionAnalysis {
  question_id: string;
  question_text: string;
  user_answer: number;
  ai_comment: string;
  category: string;
}

export interface ChannelScore {
  channel: string;
  score: number;
  max_score: number;
  percentage: number;
  level: string;
}

export interface ComprehensiveReport {
  user_id: string;
  assessment_id: string;
  package_type: string;
  overall_score: number;
  channel_scores: ChannelScore[];
  category_scores: Record<string, number>;
  question_analyses: QuestionAnalysis[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  action_plan: Record<string, string[]>;
  generated_at: string;
}

/**
 * Save user assessment responses
 */
export async function saveResponses(data: SaveResponsesRequest): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/responses/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to save responses');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving responses:', error);
    throw error;
  }
}

/**
 * Get user responses for a specific assessment
 */
export async function getResponses(userId: string, assessmentId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/responses/${userId}/${assessmentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get responses');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting responses:', error);
    throw error;
  }
}

/**
 * Get all assessments for a user
 */
export async function getAllUserAssessments(userId: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/responses/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to get assessments');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting assessments:', error);
    throw error;
  }
}

/**
 * Generate comprehensive AI report with timeout
 */
export async function generateReport(
  request: GenerateReportRequest,
  questions: any[]
): Promise<{ status: string; report: ComprehensiveReport }> {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    const response = await fetch(`${API_BASE_URL}/report/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...request,
        questions,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Rapor oluşturulamadı');
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Rapor oluşturma süresi aşıldı. Lütfen tekrar deneyin.');
    }
    console.error('Error generating report:', error);
    throw error;
  }
}

/**
 * Analyze competence (legacy endpoint)
 */
export async function analyzeCompetence(scores: {
  strategy: number;
  tech: number;
  marketing: number;
  logistics: number;
  analytics: number;
  language?: string;
}): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scores),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Analysis failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error analyzing competence:', error);
    throw error;
  }
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('API health check failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
}

export default {
  saveResponses,
  getResponses,
  getAllUserAssessments,
  generateReport,
  analyzeCompetence,
  checkHealth,
};
