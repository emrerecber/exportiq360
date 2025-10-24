/**
 * ChatGPT API Service
 * 
 * Bu servis assessment sorularının üretilmesi ve yanıtların değerlendirilmesi
 * için ChatGPT API'yi kullanır.
 * 
 * BACKEND ENTEGRASYONU İÇİN:
 * - API_KEY: Backend'den environment variable olarak alınacak
 * - Tüm API çağrıları backend üzerinden proxy'lenecek
 * - Bu dosya sadece frontend'de mock response sağlıyor
 */

// ============================================================================
// MOCK DATA - Gerçek API entegrasyonunda kaldırılacak
// ============================================================================

const MOCK_FREE_TRIAL_QUESTIONS = [
  {
    id: 1,
    question: "E-ticaret sitenizde kaç farklı ödeme yöntemi sunuyorsunuz?",
    type: "multiple_choice",
    options: [
      { value: "0-1", label: "Hiç veya sadece 1 yöntem", score: 1 },
      { value: "2-3", label: "2-3 yöntem", score: 3 },
      { value: "4+", label: "4 veya daha fazla", score: 5 }
    ],
    category: "Ödeme Sistemleri"
  },
  {
    id: 2,
    question: "Sitenizde mobil uyumlu (responsive) tasarım var mı?",
    type: "yes_no",
    options: [
      { value: "yes", label: "Evet, tamamen mobil uyumlu", score: 5 },
      { value: "partial", label: "Kısmen uyumlu", score: 3 },
      { value: "no", label: "Hayır", score: 0 }
    ],
    category: "Teknik Altyapı"
  },
  {
    id: 3,
    question: "Ürün sayfalarınızda kaç adet görsel kullanıyorsunuz?",
    type: "multiple_choice",
    options: [
      { value: "1", label: "Sadece 1 görsel", score: 1 },
      { value: "2-4", label: "2-4 görsel", score: 3 },
      { value: "5+", label: "5 veya daha fazla", score: 5 }
    ],
    category: "Ürün Yönetimi"
  },
  {
    id: 4,
    question: "SEO optimizasyonu yapıyor musunuz?",
    type: "yes_no",
    options: [
      { value: "yes", label: "Evet, düzenli olarak", score: 5 },
      { value: "sometimes", label: "Ara sıra", score: 2 },
      { value: "no", label: "Hayır", score: 0 }
    ],
    category: "Dijital Pazarlama"
  },
  {
    id: 5,
    question: "Müşteri yorumları ve değerlendirmeleri topluyor musunuz?",
    type: "yes_no",
    options: [
      { value: "yes", label: "Evet, aktif olarak topluyorum", score: 5 },
      { value: "passive", label: "Pasif olarak topluyorum", score: 3 },
      { value: "no", label: "Hayır", score: 0 }
    ],
    category: "Müşteri Deneyimi"
  },
  {
    id: 6,
    question: "Kargo takip sisteminiz var mı?",
    type: "yes_no",
    options: [
      { value: "yes", label: "Evet, otomatik", score: 5 },
      { value: "manual", label: "Manuel olarak", score: 2 },
      { value: "no", label: "Hayır", score: 0 }
    ],
    category: "Lojistik"
  },
  {
    id: 7,
    question: "Sosyal medya hesaplarınızdan e-ticaret sitenize link veriyorsunuz musunuz?",
    type: "yes_no",
    options: [
      { value: "yes", label: "Evet, tüm platformlarda", score: 5 },
      { value: "some", label: "Bazı platformlarda", score: 3 },
      { value: "no", label: "Hayır", score: 0 }
    ],
    category: "Dijital Pazarlama"
  },
  {
    id: 8,
    question: "E-posta pazarlama kampanyaları yapıyor musunuz?",
    type: "yes_no",
    options: [
      { value: "regular", label: "Düzenli olarak", score: 5 },
      { value: "occasional", label: "Ara sıra", score: 2 },
      { value: "no", label: "Hayır", score: 0 }
    ],
    category: "Dijital Pazarlama"
  },
  {
    id: 9,
    question: "Stok yönetim sisteminiz var mı?",
    type: "yes_no",
    options: [
      { value: "automated", label: "Evet, otomatik sistem", score: 5 },
      { value: "manual", label: "Manuel takip", score: 2 },
      { value: "no", label: "Hayır", score: 0 }
    ],
    category: "Operasyon"
  },
  {
    id: 10,
    question: "Müşteri hizmetleri için hangi kanalları kullanıyorsunuz?",
    type: "multiple_choice",
    options: [
      { value: "none", label: "Hiçbiri", score: 0 },
      { value: "email", label: "Sadece e-posta", score: 2 },
      { value: "multiple", label: "E-posta, telefon, canlı destek", score: 5 }
    ],
    category: "Müşteri Deneyimi"
  }
];

// ============================================================================
// API SERVICE CLASS
// ============================================================================

class ChatGPTService {
  constructor() {
    // Backend URL - production'da environment variable'dan gelecek
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    
    // Mock mode - backend hazır olmadığında true
    this.useMockData = !this.apiKey;
  }

  /**
   * Ücretsiz deneme için 10 soruluk basit assessment üret
   * @returns {Promise<Array>} Soru listesi
   */
  async generateFreeTrialQuestions() {
    if (this.useMockData) {
      // Mock data döndür
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            questions: MOCK_FREE_TRIAL_QUESTIONS
          });
        }, 500);
      });
    }

    // Gerçek API çağrısı - backend hazır olduğunda
    try {
      const response = await fetch(`${this.baseURL}/assessment/free-trial-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          count: 10,
          difficulty: 'beginner'
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating free trial questions:', error);
      // Fallback to mock data
      return {
        success: true,
        questions: MOCK_FREE_TRIAL_QUESTIONS
      };
    }
  }

  /**
   * Ücretli assessment için sorular üret
   * @param {string} assessmentType - 'e-commerce', 'e-export', 'combined'
   * @param {Array} selectedChannels - Kullanıcının seçtiği kanallar
   * @returns {Promise<Array>} Soru listesi
   */
  async generateAssessmentQuestions(assessmentType, selectedChannels = []) {
    if (this.useMockData) {
      // Mock data - gerçek sorular backend'den gelecek
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            questions: this._getMockQuestionsByType(assessmentType),
            message: 'Mock data - Backend hazır olduğunda gerçek sorular gelecek'
          });
        }, 1000);
      });
    }

    // Gerçek API çağrısı
    try {
      const response = await fetch(`${this.baseURL}/assessment/generate-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          assessmentType,
          selectedChannels,
          language: 'tr'
        })
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating assessment questions:', error);
      return {
        success: false,
        error: 'Sorular üretilirken hata oluştu'
      };
    }
  }

  /**
   * Assessment cevaplarını ChatGPT ile değerlendir ve rapor üret
   * @param {Object} assessmentData - Assessment verileri
   * @returns {Promise<Object>} Değerlendirme raporu
   */
  async evaluateAssessment(assessmentData) {
    if (this.useMockData) {
      // Mock evaluation
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockScore = this._calculateMockScore(assessmentData.answers);
          resolve({
            success: true,
            evaluation: {
              overallScore: mockScore,
              categoryScores: this._getMockCategoryScores(assessmentData.answers),
              strengths: [
                'Ödeme sistemleri çeşitliliği iyi',
                'Mobil uyumluluk mevcut'
              ],
              improvements: [
                'SEO optimizasyonu geliştirilebilir',
                'E-posta pazarlama eksik'
              ],
              recommendations: [
                'SEO çalışmalarına başlayın',
                'Düzenli e-posta kampanyaları oluşturun',
                'Müşteri yorumlarını aktif olarak toplayın'
              ],
              message: 'Mock değerlendirme - Backend hazır olduğunda AI analizi yapılacak'
            }
          });
        }, 2000);
      });
    }

    // Gerçek API çağrısı - ChatGPT ile değerlendirme
    try {
      const response = await fetch(`${this.baseURL}/assessment/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assessmentData)
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error evaluating assessment:', error);
      return {
        success: false,
        error: 'Değerlendirme yapılırken hata oluştu'
      };
    }
  }

  // ============================================================================
  // PRIVATE HELPER METHODS - Mock data için
  // ============================================================================

  _getMockQuestionsByType(type) {
    // Gerçek sorular backend'den gelecek
    // Şimdilik placeholder
    return MOCK_FREE_TRIAL_QUESTIONS;
  }

  _calculateMockScore(answers) {
    if (!answers || answers.length === 0) return 0;
    
    const totalScore = answers.reduce((sum, answer) => {
      const question = MOCK_FREE_TRIAL_QUESTIONS.find(q => q.id === answer.questionId);
      if (!question) return sum;
      
      const option = question.options.find(opt => opt.value === answer.selectedValue);
      return sum + (option?.score || 0);
    }, 0);

    const maxScore = MOCK_FREE_TRIAL_QUESTIONS.length * 5;
    return Math.round((totalScore / maxScore) * 100);
  }

  _getMockCategoryScores(answers) {
    const categories = {};
    
    answers.forEach(answer => {
      const question = MOCK_FREE_TRIAL_QUESTIONS.find(q => q.id === answer.questionId);
      if (!question) return;
      
      const option = question.options.find(opt => opt.value === answer.selectedValue);
      const score = option?.score || 0;
      
      if (!categories[question.category]) {
        categories[question.category] = { total: 0, count: 0 };
      }
      
      categories[question.category].total += score;
      categories[question.category].count += 1;
    });

    const result = {};
    Object.keys(categories).forEach(cat => {
      result[cat] = Math.round((categories[cat].total / (categories[cat].count * 5)) * 100);
    });

    return result;
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

const chatgptService = new ChatGPTService();
export default chatgptService;

// Named exports
export { ChatGPTService, MOCK_FREE_TRIAL_QUESTIONS };
