import { Question, Channel } from '../types/assessment';
import { questions } from '../data/assessmentData';

type PlanType = 'free_trial' | 'ecommerce' | 'eexport' | 'combined';

/**
 * Pakete göre soruları filtrele
 */
export function filterQuestionsByPlan(plan: PlanType): Question[] {
  switch (plan) {
    case 'free_trial':
      // Ücretsiz deneme: İşaretli 10 temel soru
      return questions.filter(q => q.isFreeTrialQuestion).slice(0, 10);
    
    case 'ecommerce':
      // E-Ticaret: Sadece yurtiçi kanallar
      return questions.filter(q => {
        if (!q.channels || q.channels.length === 0) return true; // Genel sorular
        return q.channels.some(ch => 
          ch === 'domestic_website' || 
          ch === 'domestic_marketplace' ||
          ch === 'general'
        );
      });
    
    case 'eexport':
      // E-İhracat: Sadece yurtdışı kanallar
      return questions.filter(q => {
        if (!q.channels || q.channels.length === 0) return true; // Genel sorular
        return q.channels.some(ch => 
          ch === 'international_website' || 
          ch === 'global_marketplace' ||
          ch === 'general'
        );
      });
    
    case 'combined':
      // Kapsamlı: Tüm sorular
      return questions;
    
    default:
      // Varsayılan: Tüm sorular
      return questions;
  }
}

/**
 * Plan için beklenen soru sayısı
 */
export function getExpectedQuestionCount(plan: PlanType): number {
  switch (plan) {
    case 'free_trial': return 10;
    case 'ecommerce': return 50;
    case 'eexport': return 60;
    case 'combined': return 110;
    default: return questions.length;
  }
}

/**
 * Plan için tahmini süre (dakika)
 */
export function getEstimatedDuration(plan: PlanType): string {
  switch (plan) {
    case 'free_trial': return '5-7 dakika';
    case 'ecommerce': return '20-25 dakika';
    case 'eexport': return '30-35 dakika';
    case 'combined': return '45-50 dakika';
    default: return '20-30 dakika';
  }
}
