import { AssessmentResult, CategoryScore, Recommendation, BenchmarkData } from '../../types/assessment';
import { categories } from '../../data/assessmentData';

export interface CompanyProfile {
  name?: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large';
  annualRevenue?: string;
  currentChallenges?: string[];
  priorities?: string[];
  budget?: {
    range: 'low' | 'medium' | 'high';
    amount?: number;
  };
  timeframe?: 'immediate' | '3months' | '6months' | '12months';
}

export interface ActionConstraints {
  budget?: number;
  timeframe?: number; // months
  resources?: string[];
  industry?: string;
  companySize?: string;
  currentTeamSize?: number;
}

export interface PrioritizedAction extends Recommendation {
  urgencyScore: number;
  feasibilityScore: number;
  impactScore: number;
  overallPriority: number;
  quickWin: boolean;
  prerequisites?: string[];
  successMetrics?: string[];
}

export class RecommendationEngine {
  private apiKey: string | null = null;
  private baseUrl: string = 'https://api.openai.com/v1';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.REACT_APP_OPENAI_API_KEY || null;
  }

  /**
   * Ana öneri üretme fonksiyonu
   */
  async generateRecommendations(
    result: AssessmentResult,
    companyProfile: CompanyProfile,
    language: 'tr' | 'en' = 'tr'
  ): Promise<Recommendation[]> {
    // Eğer OpenAI API key yoksa, rule-based öneriler döndür
    if (!this.apiKey) {
      return this.generateRuleBasedRecommendations(result, companyProfile, language);
    }

    try {
      const prompt = this.buildPrompt(result, companyProfile, language);
      const response = await this.callOpenAI(prompt, language);
      return this.parseAIResponse(response, language);
    } catch (error) {
      console.warn('OpenAI API failed, falling back to rule-based recommendations:', error);
      return this.generateRuleBasedRecommendations(result, companyProfile, language);
    }
  }

  /**
   * Önerileri önceliklendir
   */
  prioritizeActions(
    recommendations: Recommendation[],
    constraints: ActionConstraints,
    result: AssessmentResult
  ): PrioritizedAction[] {
    return recommendations.map(rec => {
      // Urgency Score (0-100)
      const urgencyScore = this.calculateUrgencyScore(rec, result);
      
      // Feasibility Score (0-100) 
      const feasibilityScore = this.calculateFeasibilityScore(rec, constraints);
      
      // Impact Score (0-100)
      const impactScore = this.calculateImpactScore(rec, result);
      
      // Overall Priority (weighted combination)
      const overallPriority = (urgencyScore * 0.3) + (feasibilityScore * 0.2) + (impactScore * 0.5);
      
      // Quick Win (low effort, high impact)
      const quickWin = rec.effort === 'low' && rec.impact === 'high';

      return {
        ...rec,
        urgencyScore,
        feasibilityScore,
        impactScore,
        overallPriority,
        quickWin,
        prerequisites: this.generatePrerequisites(rec, result),
        successMetrics: this.generateSuccessMetrics(rec)
      };
    }).sort((a, b) => b.overallPriority - a.overallPriority);
  }

  /**
   * Rule-based öneriler (OpenAI olmadığında)
   */
  private generateRuleBasedRecommendations(
    result: AssessmentResult,
    companyProfile: CompanyProfile,
    language: 'tr' | 'en'
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const weakCategories = result.categoryScores.filter(score => score.percentage < 60);

    // Her zayıf kategori için öneriler üret
    weakCategories.forEach(categoryScore => {
      const category = categories.find(c => c.id === categoryScore.categoryId);
      if (!category) return;

      const categoryRecommendations = this.getCategorySpecificRecommendations(
        categoryScore,
        category,
        companyProfile,
        language
      );

      recommendations.push(...categoryRecommendations);
    });

    // Genel öneriler ekle
    const generalRecommendations = this.getGeneralRecommendations(result, companyProfile, language);
    recommendations.push(...generalRecommendations);

    return recommendations;
  }

  private getCategorySpecificRecommendations(
    categoryScore: CategoryScore,
    category: any,
    companyProfile: CompanyProfile,
    language: 'tr' | 'en'
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];
    const categoryId = categoryScore.categoryId;

    // Kategori bazlı öneriler
    switch (categoryId) {
      case 'strategy':
        if (categoryScore.percentage < 40) {
          recommendations.push({
            id: `${categoryId}-strategy-doc`,
            title: {
              tr: 'E-ticaret stratejisi belgesi oluşturun',
              en: 'Create e-commerce strategy document'
            },
            description: {
              tr: 'Şirketinizin e-ticaret vizyonu, hedefleri ve roadmap\'ini içeren kapsamlı strateji belgesi hazırlayın.',
              en: 'Prepare comprehensive strategy document including your company\'s e-commerce vision, goals and roadmap.'
            },
            category: categoryId,
            priority: 'high',
            impact: 'high',
            effort: 'medium',
            timeframe: 'short',
            estimatedROI: 300
          });
        }
        break;

      case 'technology':
        if (categoryScore.percentage < 50) {
          recommendations.push({
            id: `${categoryId}-mobile-optimize`,
            title: {
              tr: 'Mobil optimizasyonu acil olarak yapın',
              en: 'Urgent mobile optimization'
            },
            description: {
              tr: 'E-ticaret sitenizin mobil uyumluluğunu artırın ve sayfa yükleme hızını optimize edin.',
              en: 'Improve mobile compatibility of your e-commerce site and optimize page loading speed.'
            },
            category: categoryId,
            priority: 'high',
            impact: 'high',
            effort: 'medium',
            timeframe: 'immediate',
            estimatedROI: 250
          });
        }
        break;

      case 'marketing':
        if (categoryScore.percentage < 60) {
          recommendations.push({
            id: `${categoryId}-seo-basics`,
            title: {
              tr: 'Temel SEO optimizasyonu yapın',
              en: 'Implement basic SEO optimization'
            },
            description: {
              tr: 'Site içi SEO, meta etiketleri ve anahtar kelime optimizasyonunu gerçekleştirin.',
              en: 'Implement on-site SEO, meta tags and keyword optimization.'
            },
            category: categoryId,
            priority: 'medium',
            impact: 'high',
            effort: 'low',
            timeframe: 'short',
            estimatedROI: 200
          });
        }
        break;

      case 'operations':
        if (categoryScore.percentage < 50) {
          recommendations.push({
            id: `${categoryId}-inventory-system`,
            title: {
              tr: 'Stok yönetim sistemi kurun',
              en: 'Set up inventory management system'
            },
            description: {
              tr: 'Otomatik stok takibi ve uyarı sistemi ile operasyonel verimliliği artırın.',
              en: 'Increase operational efficiency with automatic stock tracking and alert system.'
            },
            category: categoryId,
            priority: 'high',
            impact: 'medium',
            effort: 'medium',
            timeframe: 'medium',
            estimatedROI: 180
          });
        }
        break;

      case 'analytics':
        if (categoryScore.percentage < 40) {
          recommendations.push({
            id: `${categoryId}-analytics-setup`,
            title: {
              tr: 'Google Analytics 4 kurulumu ve konfigürasyonu',
              en: 'Google Analytics 4 setup and configuration'
            },
            description: {
              tr: 'Detaylı e-ticaret takibi için GA4 kurulumu yapın ve temel raporları konfigüre edin.',
              en: 'Set up GA4 for detailed e-commerce tracking and configure basic reports.'
            },
            category: categoryId,
            priority: 'high',
            impact: 'high',
            effort: 'low',
            timeframe: 'immediate',
            estimatedROI: 150
          });
        }
        break;

      case 'customer':
        if (categoryScore.percentage < 55) {
          recommendations.push({
            id: `${categoryId}-ux-improvement`,
            title: {
              tr: 'Kullanıcı deneyimi iyileştirmeleri',
              en: 'User experience improvements'
            },
            description: {
              tr: 'Site arama fonksiyonu, ürün filtreleme ve checkout sürecini iyileştirin.',
              en: 'Improve site search function, product filtering and checkout process.'
            },
            category: categoryId,
            priority: 'medium',
            impact: 'high',
            effort: 'medium',
            timeframe: 'medium',
            estimatedROI: 220
          });
        }
        break;

      case 'finance':
        if (categoryScore.percentage < 50) {
          recommendations.push({
            id: `${categoryId}-payment-options`,
            title: {
              tr: 'Ödeme seçeneklerini çeşitlendirin',
              en: 'Diversify payment options'
            },
            description: {
              tr: 'Kredi kartı, dijital cüzdan ve taksit seçeneklerini ekleyerek conversion artırın.',
              en: 'Increase conversion by adding credit card, digital wallet and installment options.'
            },
            category: categoryId,
            priority: 'medium',
            impact: 'medium',
            effort: 'low',
            timeframe: 'short',
            estimatedROI: 160
          });
        }
        break;
    }

    return recommendations;
  }

  private getGeneralRecommendations(
    result: AssessmentResult,
    companyProfile: CompanyProfile,
    language: 'tr' | 'en'
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // Şirket büyüklüğüne göre öneriler
    if (companyProfile.size === 'startup' || companyProfile.size === 'small') {
      recommendations.push({
        id: 'general-automation',
        title: {
          tr: 'Temel süreçleri otomatikleştirin',
          en: 'Automate basic processes'
        },
        description: {
          tr: 'Sipariş takibi, email pazarlama ve müşteri hizmetleri için temel otomasyon kurun.',
          en: 'Set up basic automation for order tracking, email marketing and customer service.'
        },
        category: 'general',
        priority: 'medium',
        impact: 'medium',
        effort: 'low',
        timeframe: 'short',
        estimatedROI: 180
      });
    }

    // Genel skor düşükse
    if (result.percentage < 50) {
      recommendations.push({
        id: 'general-consultation',
        title: {
          tr: 'E-ticaret danışmanlığı alın',
          en: 'Get e-commerce consultation'
        },
        description: {
          tr: 'Uzman bir e-ticaret danışmanından kapsamlı değerlendirme ve roadmap alın.',
          en: 'Get comprehensive assessment and roadmap from an expert e-commerce consultant.'
        },
        category: 'general',
        priority: 'high',
        impact: 'high',
        effort: 'low',
        timeframe: 'immediate',
        estimatedROI: 400
      });
    }

    return recommendations;
  }

  private buildPrompt(result: AssessmentResult, companyProfile: CompanyProfile, language: 'tr' | 'en'): string {
    const categoryAnalysis = result.categoryScores.map(score => {
      const category = categories.find(c => c.id === score.categoryId);
      return `${category?.name[language]}: ${score.percentage.toFixed(1)}%`;
    }).join(', ');

    if (language === 'tr') {
      return `
E-ticaret olgunluk değerlendirmesi için AI destekli öneriler üret.

Şirket Profili:
- Sektör: ${companyProfile.industry}
- Büyüklük: ${companyProfile.size}
- Yıllık Ciro: ${companyProfile.annualRevenue || 'Belirtilmemiş'}

Değerlendirme Sonuçları:
- Genel Skor: ${result.percentage.toFixed(1)}%
- Olgunluk Seviyesi: ${result.maturityLevel}
- Kategori Skorları: ${categoryAnalysis}
- Güçlü Yönler: ${result.strengths.join(', ')}
- Zayıf Yönler: ${result.weaknesses.join(', ')}
- Kritik Aksiyonlar: ${result.criticalActions.join(', ')}

Lütfen JSON formatında 5-8 adet spesifik, uygulanabilir öneri üret. Her öneri şu formatta olmalı:
{
  "title": {"tr": "Türkçe başlık", "en": "English title"},
  "description": {"tr": "Türkçe açıklama", "en": "English description"},
  "category": "kategori_id",
  "priority": "high|medium|low",
  "impact": "high|medium|low", 
  "effort": "low|medium|high",
  "timeframe": "immediate|short|medium|long",
  "estimatedROI": sayı
}`;
    } else {
      return `
Generate AI-powered recommendations for e-commerce maturity assessment.

Company Profile:
- Industry: ${companyProfile.industry}
- Size: ${companyProfile.size}
- Annual Revenue: ${companyProfile.annualRevenue || 'Not specified'}

Assessment Results:
- Overall Score: ${result.percentage.toFixed(1)}%
- Maturity Level: ${result.maturityLevel}
- Category Scores: ${categoryAnalysis}
- Strengths: ${result.strengths.join(', ')}
- Weaknesses: ${result.weaknesses.join(', ')}
- Critical Actions: ${result.criticalActions.join(', ')}

Please generate 5-8 specific, actionable recommendations in JSON format. Each recommendation should have this format:
{
  "title": {"tr": "Turkish title", "en": "English title"},
  "description": {"tr": "Turkish description", "en": "English description"},
  "category": "category_id",
  "priority": "high|medium|low",
  "impact": "high|medium|low",
  "effort": "low|medium|high", 
  "timeframe": "immediate|short|medium|long",
  "estimatedROI": number
}`;
    }
  }

  private async callOpenAI(prompt: string, language: 'tr' | 'en'): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not provided');
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: language === 'tr' 
              ? 'Sen uzman bir e-ticaret danışmanısın. JSON formatında detaylı ve uygulanabilir öneriler üretiyorsun.'
              : 'You are an expert e-commerce consultant. You generate detailed and actionable recommendations in JSON format.'
          },
          {
            role: 'user', 
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private parseAIResponse(response: string, language: 'tr' | 'en'): Recommendation[] {
    try {
      // JSON'u parse et
      const jsonStart = response.indexOf('[');
      const jsonEnd = response.lastIndexOf(']') + 1;
      const jsonStr = response.substring(jsonStart, jsonEnd);
      const recommendations = JSON.parse(jsonStr);

      return recommendations.map((rec: any, index: number) => ({
        id: `ai-recommendation-${index}`,
        ...rec
      }));
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return [];
    }
  }

  private calculateUrgencyScore(rec: Recommendation, result: AssessmentResult): number {
    let score = 50; // base score

    // Yüksek öncelikli öneriler daha urgent
    if (rec.priority === 'high') score += 30;
    else if (rec.priority === 'medium') score += 15;

    // Kritik aksiyonlarda bahsedilen kategoriler daha urgent
    const categoryMentioned = result.criticalActions.some(action => 
      action.toLowerCase().includes(rec.category.toLowerCase())
    );
    if (categoryMentioned) score += 20;

    return Math.min(100, score);
  }

  private calculateFeasibilityScore(rec: Recommendation, constraints: ActionConstraints): number {
    let score = 50; // base score

    // Düşük effort daha feasible
    if (rec.effort === 'low') score += 30;
    else if (rec.effort === 'medium') score += 15;
    else score -= 10;

    // Bütçe uygunluğu
    if (constraints.budget && rec.estimatedROI) {
      const estimatedCost = rec.estimatedROI / 3; // Rough estimate
      if (estimatedCost <= constraints.budget) score += 20;
      else score -= 20;
    }

    // Zaman uygunluğu
    if (constraints.timeframe) {
      const timeframePriority = {
        'immediate': 4,
        'short': 3,
        'medium': 2,
        'long': 1
      };
      
      const recTimeScore = timeframePriority[rec.timeframe] || 1;
      const constraintTimeScore = constraints.timeframe >= 12 ? 1 : 
                                 constraints.timeframe >= 6 ? 2 :
                                 constraints.timeframe >= 3 ? 3 : 4;
      
      if (recTimeScore >= constraintTimeScore) score += 15;
      else score -= 10;
    }

    return Math.min(100, Math.max(0, score));
  }

  private calculateImpactScore(rec: Recommendation, result: AssessmentResult): number {
    let score = 50; // base score

    // Yüksek impact daha iyi
    if (rec.impact === 'high') score += 30;
    else if (rec.impact === 'medium') score += 15;

    // ROI'a göre impact artırımı
    if (rec.estimatedROI && rec.estimatedROI > 200) score += 20;
    else if (rec.estimatedROI && rec.estimatedROI > 100) score += 10;

    // Zayıf alanlarda high impact
    const weakCategories = result.categoryScores.filter(s => s.percentage < 50);
    const isWeakArea = weakCategories.some(s => s.categoryId === rec.category);
    if (isWeakArea) score += 15;

    return Math.min(100, score);
  }

  private generatePrerequisites(rec: Recommendation, result: AssessmentResult): string[] {
    const prerequisites: string[] = [];

    // Kategori bazlı ön gereklilikler
    switch (rec.category) {
      case 'technology':
        if (rec.id.includes('analytics')) {
          prerequisites.push('Website admin access', 'Google account');
        }
        break;
      case 'marketing':
        if (rec.id.includes('seo')) {
          prerequisites.push('Website content access', 'Keyword research tools');
        }
        break;
    }

    // Effort seviyesine göre
    if (rec.effort === 'high') {
      prerequisites.push('Dedicated team member', 'Management approval');
    } else if (rec.effort === 'medium') {
      prerequisites.push('Technical knowledge or external support');
    }

    return prerequisites;
  }

  private generateSuccessMetrics(rec: Recommendation): string[] {
    const metrics: string[] = [];

    // Kategori bazlı success metrics
    switch (rec.category) {
      case 'marketing':
        metrics.push('Organic traffic increase', 'Conversion rate improvement', 'Lead generation');
        break;
      case 'technology':
        metrics.push('Page load speed improvement', 'Mobile usability score', 'Site uptime');
        break;
      case 'customer':
        metrics.push('Customer satisfaction score', 'Return rate decrease', 'Average session duration');
        break;
      default:
        metrics.push('ROI achievement', 'Process efficiency improvement', 'User engagement increase');
    }

    // ROI bazlı metric ekle
    if (rec.estimatedROI) {
      metrics.push(`Target ROI: ${rec.estimatedROI}%`);
    }

    return metrics;
  }
}

export default RecommendationEngine;