import { Category, Question } from '../types/assessment';

// E-Ticaret Olgunluk Değerlendirme Kategorileri
export const categories: Category[] = [
  {
    id: 'strategy',
    name: {
      tr: 'Strateji ve Planlama',
      en: 'Strategy and Planning'
    },
    description: {
      tr: 'E-ticaret stratejisi, hedef belirleme ve planlama süreçleri',
      en: 'E-commerce strategy, goal setting and planning processes'
    },
    weight: 1.2, // Yüksek önem
    color: '#3B82F6', // Blue
    icon: 'strategy'
  },
  {
    id: 'technology',
    name: {
      tr: 'Teknoloji ve Alt Yapı',
      en: 'Technology and Infrastructure'
    },
    description: {
      tr: 'Platform, entegrasyonlar ve teknik altyapı',
      en: 'Platform, integrations and technical infrastructure'
    },
    weight: 1.1,
    color: '#10B981', // Green
    icon: 'technology'
  },
  {
    id: 'marketing',
    name: {
      tr: 'Dijital Pazarlama',
      en: 'Digital Marketing'
    },
    description: {
      tr: 'Online pazarlama, SEO, sosyal medya ve reklam stratejileri',
      en: 'Online marketing, SEO, social media and advertising strategies'
    },
    weight: 1.0,
    color: '#F59E0B', // Yellow
    icon: 'marketing'
  },
  {
    id: 'operations',
    name: {
      tr: 'Operasyonlar',
      en: 'Operations'
    },
    description: {
      tr: 'Lojistik, kargo, stok yönetimi ve müşteri hizmetleri',
      en: 'Logistics, shipping, inventory management and customer service'
    },
    weight: 1.0,
    color: '#EF4444', // Red
    icon: 'operations'
  },
  {
    id: 'analytics',
    name: {
      tr: 'Analitik ve Raporlama',
      en: 'Analytics and Reporting'
    },
    description: {
      tr: 'Veri analizi, KPI takibi ve performans ölçümü',
      en: 'Data analysis, KPI tracking and performance measurement'
    },
    weight: 0.9,
    color: '#8B5CF6', // Purple
    icon: 'analytics'
  },
  {
    id: 'customer',
    name: {
      tr: 'Müşteri Deneyimi',
      en: 'Customer Experience'
    },
    description: {
      tr: 'Kullanıcı deneyimi, kişiselleştirme ve müşteri memnuniyeti',
      en: 'User experience, personalization and customer satisfaction'
    },
    weight: 1.1,
    color: '#EC4899', // Pink
    icon: 'customer'
  },
  {
    id: 'finance',
    name: {
      tr: 'Finans ve Ödeme',
      en: 'Finance and Payment'
    },
    description: {
      tr: 'Ödeme sistemleri, finansal planlama ve risk yönetimi',
      en: 'Payment systems, financial planning and risk management'
    },
    weight: 0.8,
    color: '#06B6D4', // Cyan
    icon: 'finance'
  }
];

// E-Ticaret Olgunluk Değerlendirme Soruları
export const questions: Question[] = [
  // STRATEJİ VE PLANLAMA
  {
    id: 's1',
    categoryId: 'strategy',
    questionNumber: 1,
    text: {
      tr: 'Şirketinizin yazılı bir e-ticaret stratejisi var mı?',
      en: 'Does your company have a written e-commerce strategy?'
    },
    weight: 1.5,
    channels: ['ecommerce', 'eexport', 'combined'],
    isFreeTrialQuestion: true
  },
  {
    id: 's2',
    categoryId: 'strategy',
    questionNumber: 2,
    text: {
      tr: 'E-ticaret hedefleriniz ölçülebilir KPI\'lar ile tanımlanmış mı?',
      en: 'Are your e-commerce goals defined with measurable KPIs?'
    },
    channels: ['ecommerce', 'eexport', 'combined'],
    isFreeTrialQuestion: true
  },
  {
    id: 's3',
    categoryId: 'strategy',
    questionNumber: 3,
    text: {
      tr: 'Rakip analizi düzenli olarak yapılıyor mu?',
      en: 'Is competitor analysis conducted regularly?'
    },
    channels: ['ecommerce', 'eexport', 'combined']
  },
  {
    id: 's4',
    categoryId: 'strategy',
    questionNumber: 4,
    text: {
      tr: 'Yeni pazarlara giriş stratejiniz var mı?',
      en: 'Do you have a strategy for entering new markets?'
    },
    channels: ['eexport', 'combined']
  },
  {
    id: 's5',
    categoryId: 'strategy',
    questionNumber: 5,
    text: {
      tr: 'E-ticaret bütçeniz yıllık olarak planlanıyor mu?',
      en: 'Is your e-commerce budget planned annually?'
    },
    channels: ['ecommerce', 'eexport', 'combined']
  },

  // TEKNOLOJİ VE ALT YAPI
  {
    id: 't1',
    categoryId: 'technology',
    questionNumber: 6,
    text: {
      tr: 'E-ticaret siteniz mobil uyumlu mu?',
      en: 'Is your e-commerce site mobile-friendly?'
    },
    weight: 1.5,
    isFreeTrialQuestion: true
  },
  {
    id: 't2',
    categoryId: 'technology',
    questionNumber: 7,
    text: {
      tr: 'Site yükleme hızınız 3 saniyenin altında mı?',
      en: 'Is your site loading speed under 3 seconds?'
    }
  },
  {
    id: 't3',
    categoryId: 'technology',
    questionNumber: 8,
    text: {
      tr: 'SSL sertifikası ve güvenlik önlemleri mevcut mu?',
      en: 'Do you have SSL certificate and security measures in place?'
    },
    weight: 1.3,
    isFreeTrialQuestion: true
  },
  {
    id: 't4',
    categoryId: 'technology',
    questionNumber: 9,
    text: {
      tr: 'Düzenli site yedeklemesi yapılıyor mu?',
      en: 'Are regular site backups performed?'
    }
  },
  {
    id: 't5',
    categoryId: 'technology',
    questionNumber: 10,
    text: {
      tr: 'ERP/CRM sistemleri ile entegrasyon var mı?',
      en: 'Is there integration with ERP/CRM systems?'
    }
  },
  {
    id: 't6',
    categoryId: 'technology',
    questionNumber: 11,
    text: {
      tr: 'API\'lar üzerinden üçüncü taraf entegrasyonları yapabiliyor musunuz?',
      en: 'Can you make third-party integrations via APIs?'
    }
  },

  // DİJİTAL PAZARLAMA
  {
    id: 'm1',
    categoryId: 'marketing',
    questionNumber: 12,
    text: {
      tr: 'SEO optimizasyonu düzenli olarak yapılıyor mu?',
      en: 'Is SEO optimization done regularly?'
    },
    weight: 1.3,
    isFreeTrialQuestion: true
  },
  {
    id: 'm2',
    categoryId: 'marketing',
    questionNumber: 13,
    text: {
      tr: 'Google Ads veya sosyal medya reklamları kullanılıyor mu?',
      en: 'Are Google Ads or social media advertisements used?'
    },
    isFreeTrialQuestion: true
  },
  {
    id: 'm3',
    categoryId: 'marketing',
    questionNumber: 14,
    text: {
      tr: 'E-mail marketing kampanyaları düzenli olarak gönderiliyor mu?',
      en: 'Are email marketing campaigns sent regularly?'
    }
  },
  {
    id: 'm4',
    categoryId: 'marketing',
    questionNumber: 15,
    text: {
      tr: 'Sosyal medya hesaplarınız aktif olarak yönetiliyor mu?',
      en: 'Are your social media accounts actively managed?'
    }
  },
  {
    id: 'm5',
    categoryId: 'marketing',
    questionNumber: 16,
    text: {
      tr: 'İçerik pazarlama stratejiniz var mı?',
      en: 'Do you have a content marketing strategy?'
    }
  },
  {
    id: 'm6',
    categoryId: 'marketing',
    questionNumber: 17,
    text: {
      tr: 'Influencer marketing çalışmaları yapılıyor mu?',
      en: 'Are influencer marketing activities conducted?'
    }
  },

  // OPERASYONLAR
  {
    id: 'o1',
    categoryId: 'operations',
    questionNumber: 18,
    text: {
      tr: 'Stok yönetim sisteminiz var mı?',
      en: 'Do you have an inventory management system?'
    },
    weight: 1.4,
    isFreeTrialQuestion: true
  },
  {
    id: 'o2',
    categoryId: 'operations',
    questionNumber: 19,
    text: {
      tr: 'Kargo entegrasyonlarınız mevcut mu?',
      en: 'Do you have shipping integrations available?'
    },
    weight: 1.2,
    isFreeTrialQuestion: true
  },
  {
    id: 'o3',
    categoryId: 'operations',
    questionNumber: 20,
    text: {
      tr: 'Müşteri hizmetleri için canlı destek sistemi var mı?',
      en: 'Do you have a live support system for customer service?'
    }
  },
  {
    id: 'o4',
    categoryId: 'operations',
    questionNumber: 21,
    text: {
      tr: 'İade ve değişim süreçleriniz tanımlı mı?',
      en: 'Are your return and exchange processes defined?'
    }
  },
  {
    id: 'o5',
    categoryId: 'operations',
    questionNumber: 22,
    text: {
      tr: 'Sipariş takip sistemi müşterilere sunuluyor mu?',
      en: 'Is an order tracking system provided to customers?'
    }
  },

  // ANALİTİK VE RAPORLAMA
  {
    id: 'a1',
    categoryId: 'analytics',
    questionNumber: 23,
    text: {
      tr: 'Google Analytics kurulu ve aktif kullanılıyor mu?',
      en: 'Is Google Analytics installed and actively used?'
    },
    weight: 1.5,
    isFreeTrialQuestion: true
  },
  {
    id: 'a2',
    categoryId: 'analytics',
    questionNumber: 24,
    text: {
      tr: 'Satış raporları düzenli olarak inceleniyor mu?',
      en: 'Are sales reports reviewed regularly?'
    }
  },
  {
    id: 'a3',
    categoryId: 'analytics',
    questionNumber: 25,
    text: {
      tr: 'Müşteri davranış analizleri yapılıyor mu?',
      en: 'Are customer behavior analyses conducted?'
    }
  },
  {
    id: 'a4',
    categoryId: 'analytics',
    questionNumber: 26,
    text: {
      tr: 'A/B testleri düzenli olarak yapılıyor mu?',
      en: 'Are A/B tests conducted regularly?'
    }
  },
  {
    id: 'a5',
    categoryId: 'analytics',
    questionNumber: 27,
    text: {
      tr: 'Conversion rate optimization çalışmaları var mı?',
      en: 'Are there conversion rate optimization efforts?'
    }
  },

  // MÜŞTERİ DENEYİMİ
  {
    id: 'c1',
    categoryId: 'customer',
    questionNumber: 28,
    text: {
      tr: 'Site arama fonksiyonu etkili çalışıyor mu?',
      en: 'Does the site search function work effectively?'
    }
  },
  {
    id: 'c2',
    categoryId: 'customer',
    questionNumber: 29,
    text: {
      tr: 'Ürün sayfalarında detaylı bilgi ve görsel var mı?',
      en: 'Are there detailed information and visuals on product pages?'
    }
  },
  {
    id: 'c3',
    categoryId: 'customer',
    questionNumber: 30,
    text: {
      tr: 'Müşteri yorumları ve değerlendirmeler gösteriliyor mu?',
      en: 'Are customer reviews and ratings displayed?'
    }
  },
  {
    id: 'c4',
    categoryId: 'customer',
    questionNumber: 31,
    text: {
      tr: 'Kişiselleştirilmiş ürün önerileri sunuluyor mu?',
      en: 'Are personalized product recommendations provided?'
    }
  },
  {
    id: 'c5',
    categoryId: 'customer',
    questionNumber: 32,
    text: {
      tr: 'Checkout süreci basit ve hızlı mı?',
      en: 'Is the checkout process simple and fast?'
    },
    weight: 1.3,
    isFreeTrialQuestion: true
  },
  {
    id: 'c6',
    categoryId: 'customer',
    questionNumber: 33,
    text: {
      tr: 'Wishlist ve favoriler özelliği var mı?',
      en: 'Are there wishlist and favorites features?'
    }
  },

  // FİNANS VE ÖDEME
  {
    id: 'f1',
    categoryId: 'finance',
    questionNumber: 34,
    text: {
      tr: 'Çoklu ödeme seçenekleri sunuluyor mu?',
      en: 'Are multiple payment options offered?'
    },
    weight: 1.4,
    isFreeTrialQuestion: true
  },
  {
    id: 'f2',
    categoryId: 'finance',
    questionNumber: 35,
    text: {
      tr: '3D Secure güvenlik sistemi kullanılıyor mu?',
      en: 'Is 3D Secure security system used?'
    },
    weight: 1.2
  },
  {
    id: 'f3',
    categoryId: 'finance',
    questionNumber: 36,
    text: {
      tr: 'Taksitli ödeme seçenekleri var mı?',
      en: 'Are installment payment options available?'
    }
  },
  {
    id: 'f4',
    categoryId: 'finance',
    questionNumber: 37,
    text: {
      tr: 'Mali raporlama ve analiz düzenli olarak yapılıyor mu?',
      en: 'Are financial reporting and analysis done regularly?'
    }
  },
  {
    id: 'f5',
    categoryId: 'finance',
    questionNumber: 38,
    text: {
      tr: 'E-ticaret karlılık analizi yapılıyor mu?',
      en: 'Is e-commerce profitability analysis conducted?'
    }
  }
];

// Toplam soru sayısı: 38
// Kategori dağılımı:
// - Strateji ve Planlama: 5 soru
// - Teknoloji ve Alt Yapı: 6 soru  
// - Dijital Pazarlama: 6 soru
// - Operasyonlar: 5 soru
// - Analitik ve Raporlama: 5 soru
// - Müşteri Deneyimi: 6 soru
// - Finans ve Ödeme: 5 soru