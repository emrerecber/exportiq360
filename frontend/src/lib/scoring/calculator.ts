import { Answer, AnswerValue, Category, Question, CategoryScore, AssessmentResult, BenchmarkData } from '../../types/assessment';

export class ScoringSystem {
  // Puanlama sabitleri
  private static readonly SCORES = {
    yes: 1.0,
    no: 0.0,
    unknown: -0.5, // Farkındalık eksikliği penaltısı
  };

  // Olgunluk seviyeleri
  private static readonly MATURITY_LEVELS = {
    basic: { min: 0, max: 40 },
    intermediate: { min: 40, max: 70 },
    advanced: { min: 70, max: 85 },
    expert: { min: 85, max: 100 }
  };

  constructor(
    private categories: Category[],
    private questions: Question[]
  ) {}

  /**
   * Ana puanlama fonksiyonu
   */
  calculateScore(answers: Answer[], benchmarkData?: BenchmarkData): AssessmentResult {
    const categoryScores = this.calculateCategoryScores(answers);
    const totalScore = this.calculateTotalScore(categoryScores);
    const maxTotalScore = this.calculateMaxTotalScore();
    const percentage = Math.max(0, (totalScore / maxTotalScore) * 100);
    const maturityLevel = this.determineMaturityLevel(percentage);
    const penaltyFromDontKnow = this.calculateUnknownPenalty(answers);

    // Güçlü ve zayıf yönleri belirle
    const analysis = this.analyzePerformance(categoryScores);

    return {
      id: this.generateId(),
      totalScore,
      maxTotalScore,
      percentage: Math.round(percentage * 10) / 10, // 1 ondalık basamak
      maturityLevel,
      categoryScores,
      penaltyFromDontKnow,
      completedAt: new Date(),
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      criticalActions: analysis.criticalActions,
      recommendations: [] // Bu ayrı bir serviste doldurulacak
    };
  }

  /**
   * Kategori bazlı skorları hesapla
   */
  private calculateCategoryScores(answers: Answer[]): CategoryScore[] {
    return this.categories.map(category => {
      const categoryQuestions = this.questions.filter(q => q.categoryId === category.id);
      const categoryAnswers = answers.filter(answer => 
        categoryQuestions.some(q => q.id === answer.questionId)
      );

      let totalScore = 0;
      let unknownCount = 0;

      categoryAnswers.forEach(answer => {
        const score = ScoringSystem.SCORES[answer.value];
        const question = categoryQuestions.find(q => q.id === answer.questionId);
        const weight = question?.weight || 1;
        
        totalScore += score * weight;
        
        if (answer.value === 'unknown') {
          unknownCount++;
        }
      });

      const maxScore = categoryQuestions.reduce((sum, q) => sum + (q.weight || 1), 0);
      const percentage = maxScore > 0 ? Math.max(0, (totalScore / maxScore) * 100) : 0;

      return {
        categoryId: category.id,
        score: totalScore,
        maxScore,
        percentage: Math.round(percentage * 10) / 10,
        answeredQuestions: categoryAnswers.length,
        totalQuestions: categoryQuestions.length,
        unknownCount
      };
    });
  }

  /**
   * Ağırlıklı toplam skoru hesapla
   */
  private calculateTotalScore(categoryScores: CategoryScore[]): number {
    const weightedSum = categoryScores.reduce((sum, score) => {
      const category = this.categories.find(c => c.id === score.categoryId);
      const weight = category?.weight || 1;
      return sum + (score.score * weight);
    }, 0);

    return weightedSum;
  }

  /**
   * Maksimum olası skoru hesapla
   */
  private calculateMaxTotalScore(): number {
    const weightedMax = this.categories.reduce((sum, category) => {
      const categoryQuestions = this.questions.filter(q => q.categoryId === category.id);
      const categoryMaxScore = categoryQuestions.reduce((qSum, q) => qSum + (q.weight || 1), 0);
      return sum + (categoryMaxScore * category.weight);
    }, 0);

    return weightedMax;
  }

  /**
   * "Fikrim Yok" cevaplarının toplam penaltısını hesapla
   */
  private calculateUnknownPenalty(answers: Answer[]): number {
    const unknownAnswers = answers.filter(a => a.value === 'unknown');
    return unknownAnswers.length * Math.abs(ScoringSystem.SCORES.unknown);
  }

  /**
   * Yüzdelik dilime göre olgunluk seviyesini belirle
   */
  private determineMaturityLevel(percentage: number): 'basic' | 'intermediate' | 'advanced' | 'expert' {
    for (const [level, range] of Object.entries(ScoringSystem.MATURITY_LEVELS)) {
      if (percentage >= range.min && percentage < range.max) {
        return level as 'basic' | 'intermediate' | 'advanced' | 'expert';
      }
    }
    return percentage >= 85 ? 'expert' : 'basic';
  }

  /**
   * Performans analizi - güçlü ve zayıf yönleri belirle
   */
  private analyzePerformance(categoryScores: CategoryScore[]) {
    const sortedByPerformance = [...categoryScores].sort((a, b) => b.percentage - a.percentage);
    
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const criticalActions: string[] = [];

    // En iyi 3 kategori - güçlü yönler
    sortedByPerformance.slice(0, 3).forEach(score => {
      if (score.percentage >= 70) {
        const category = this.categories.find(c => c.id === score.categoryId);
        if (category) {
          strengths.push(category.name.tr);
        }
      }
    });

    // En kötü 3 kategori - zayıf yönler
    sortedByPerformance.slice(-3).forEach(score => {
      if (score.percentage < 50) {
        const category = this.categories.find(c => c.id === score.categoryId);
        if (category) {
          weaknesses.push(category.name.tr);
        }
      }
    });

    // Kritik eylemler - çok düşük skorlu kategoriler için
    categoryScores.forEach(score => {
      if (score.percentage < 30 || score.unknownCount > score.totalQuestions * 0.5) {
        const category = this.categories.find(c => c.id === score.categoryId);
        if (category) {
          if (score.unknownCount > score.totalQuestions * 0.5) {
            criticalActions.push(`${category.name.tr} alanında farkındalık eksikliği - acil eğitim gerekiyor`);
          } else {
            criticalActions.push(`${category.name.tr} alanında kritik gelişim gerekiyor`);
          }
        }
      }
    });

    return { strengths, weaknesses, criticalActions };
  }

  /**
   * Sektörel benchmark ile karşılaştırma
   */
  calculatePercentile(totalScore: number, benchmarkData: BenchmarkData): number {
    // Basit percentile hesaplaması - gerçek uygulamada daha karmaşık olabilir
    if (totalScore >= benchmarkData.topPerformers.score) return 95;
    if (totalScore >= benchmarkData.averageScore * 1.2) return 80;
    if (totalScore >= benchmarkData.averageScore) return 50;
    if (totalScore >= benchmarkData.averageScore * 0.8) return 30;
    return 15;
  }

  /**
   * Gelişim alanlarını önceliklendir
   */
  prioritizeImprovementAreas(categoryScores: CategoryScore[]): Array<{
    categoryId: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
  }> {
    return categoryScores
      .map(score => {
        const category = this.categories.find(c => c.id === score.categoryId);
        let priority: 'high' | 'medium' | 'low';
        let reason: string;

        if (score.percentage < 30) {
          priority = 'high';
          reason = 'Kritik gelişim gerekiyor';
        } else if (score.percentage < 60) {
          priority = 'medium';
          reason = 'Önemli gelişim alanı';
        } else {
          priority = 'low';
          reason = 'İyileştirme potansiyeli var';
        }

        // Bilinmeyen cevap oranı yüksekse öncelik artar
        if (score.unknownCount > score.totalQuestions * 0.4) {
          priority = priority === 'low' ? 'medium' : 'high';
          reason += ' - Farkındalık eksikliği var';
        }

        return {
          categoryId: score.categoryId,
          priority,
          reason
        };
      })
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}