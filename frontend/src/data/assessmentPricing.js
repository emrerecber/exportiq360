// Assessment-Based Pricing Model
export const ASSESSMENT_PACKAGES = {
  ecommerce: {
    id: 'ecommerce',
    name: 'E-Ticaret Assessment',
    slug: 'e-commerce',
    price: 499, // Synced with PLANS in plans.ts
    originalPrice: null,
    currency: '₺',
    billingType: 'one-time',
    popular: false,
    icon: '📦',
    color: 'blue',
    description: 'Yerel e-ticaret yetkinliğinizi ölçün ve geliştirin',
    
    assessmentDetails: {
      type: 'e-commerce',
      questionCount: 45,
      estimatedTime: 15,
      categories: [
        'Dijital Altyapı',
        'Ödeme Sistemleri',
        'Lojistik',
        'Müşteri Deneyimi',
        'Pazarlama'
      ]
    },
    
    features: [
      'E-Ticaret Değerlendirmesi (45 soru, ~15 dk)',
      'AI destekli analiz ve öneriler',
      'Detaylı yetkinlik raporu',
      'Kategori bazlı skorlama',
      'Aksiyon planı',
      'PDF rapor indirme',
      '6 ay rapor erişimi',
      'Email destek'
    ],
    
    included: [
      'AI Analysis',
      'Detailed Report',
      'PDF Export',
      '6 Month Access',
      'Email Support'
    ],
    
    notIncluded: [
      'İhracat analizi',
      'Uluslararası pazar değerlendirmesi',
      'Priority destek',
      'Danışmanlık'
    ],
    
    bestFor: [
      'Yerel e-ticaret yapan işletmeler',
      'Yeni başlayanlar',
      'Dijital altyapılarını test etmek isteyenler'
    ]
  },
  
  eexport: {
    id: 'eexport',
    name: 'E-İhracat Assessment',
    slug: 'e-export',
    price: 899, // Synced with PLANS in plans.ts
    originalPrice: null,
    currency: '₺',
    billingType: 'one-time',
    popular: false,
    icon: '🌍',
    color: 'green',
    description: 'Uluslararası dijital satış yetkinliğinizi değerlendirin',
    
    assessmentDetails: {
      type: 'e-export',
      questionCount: 60,
      estimatedTime: 20,
      categories: [
        'Dijital Altyapı',
        'Ödeme Sistemleri',
        'Uluslararası Lojistik',
        'Yasal & Uyum',
        'Çok Dilli Pazarlama',
        'Müşteri Hizmetleri'
      ]
    },
    
    features: [
      'E-İhracat Değerlendirmesi (60 soru, ~20 dk)',
      'AI destekli ihracat analizi',
      'Uluslararası pazar hazırlık raporu',
      'ROI tahmini ve hesaplama',
      '12 aylık dijital ihracat roadmap',
      'Hedef pazar önerileri',
      'Benchmark karşılaştırması',
      'PDF rapor indirme',
      '6 ay rapor erişimi',
      'Priority email destek'
    ],
    
    included: [
      'AI Analysis',
      'Export Readiness Report',
      'ROI Calculation',
      '12-Month Roadmap',
      'Market Recommendations',
      'Benchmark Analysis',
      'PDF Export',
      '6 Month Access',
      'Priority Email Support'
    ],
    
    notIncluded: [
      'Aylık takip raporu',
      '1:1 danışmanlık',
      'WhatsApp destek'
    ],
    
    bestFor: [
      'İhracata başlamak isteyenler',
      'Mevcut ihracatı dijitalleştirmek isteyenler',
      'Uluslararası pazarlara açılmayı planlayan KOBİ\'ler'
    ]
  },
  
  combined: {
    id: 'combined',
    name: 'Kapsamlı Paket',
    slug: 'combined',
    price: 1299, // Synced with PLANS in plans.ts
    originalPrice: 1398, // 499 + 899 = 1398
    discount: 28, // %28 indirim
    currency: '₺',
    billingType: 'one-time',
    popular: true,
    recommended: true,
    icon: '🚀',
    color: 'purple',
    description: '360° dijital ticaret ve ihracat analizi - En avantajlı!',
    
    assessmentDetails: {
      type: 'combined',
      questionCount: 75,
      estimatedTime: 30,
      categories: [
        'Dijital Altyapı',
        'Ödeme Sistemleri',
        'Yerel & Uluslararası Lojistik',
        'Yasal & Uyum',
        'Çok Kanallı Pazarlama',
        'Müşteri Deneyimi',
        'İhracat Hazırlığı'
      ]
    },
    
    features: [
      'Tam Değerlendirme: E-Ticaret + E-İhracat (75 soru, ~30 dk)',
      'Gelişmiş AI analizi',
      '360° yetkinlik haritası',
      'Karşılaştırmalı analiz (yerel vs ihracat)',
      'Sektör benchmark raporu',
      'Detaylı ROI projeksiyonu',
      '12 aylık stratejik roadmap',
      'Aylık ilerleme takip raporu (6 ay)',
      'Hedef pazar analizi ve öncelik sıralaması',
      'Pazaryeri entegrasyon önerileri',
      'PDF rapor indirme',
      '6 ay rapor erişimi',
      '30 dakika 1:1 online danışmanlık',
      'Priority WhatsApp destek'
    ],
    
    included: [
      'E-Commerce + E-Export Assessment',
      'Advanced AI Analysis',
      '360° Competence Map',
      'Comparative Analysis',
      'Sector Benchmark',
      'ROI Projection',
      '12-Month Strategic Roadmap',
      'Monthly Progress Reports (6 months)',
      'Target Market Analysis',
      'Marketplace Integration Guide',
      'PDF Export',
      '6 Month Access',
      '30-min 1:1 Consultation',
      'Priority WhatsApp Support'
    ],
    
    notIncluded: [
      'Aylık düzenli danışmanlık',
      'Uygulama desteği',
      'Özel yazılım entegrasyonu'
    ],
    
    bestFor: [
      'Hem yerel hem uluslararası satış yapan/yapmak isteyen işletmeler',
      'Kapsamlı dijital dönüşüm planlayan firmalar',
      'Stratejik büyüme hedefi olan KOBİ\'ler',
      'Danışmanlık ve sürekli destek arayanlar'
    ],
    
    savings: {
      amount: 99,
      percentage: 28,
      message: '₺99 tasarruf! + Ekstra özellikler'
    }
  }
};

// Package comparison for UI
export const PACKAGE_COMPARISON = {
  features: [
    {
      category: 'Assessment',
      items: [
        { name: 'E-Ticaret Değerlendirmesi', ecommerce: true, eexport: false, comprehensive: true },
        { name: 'E-İhracat Değerlendirmesi', ecommerce: false, eexport: true, comprehensive: true },
        { name: 'Soru Sayısı', ecommerce: '45', eexport: '60', comprehensive: '75' },
        { name: 'Tahmini Süre', ecommerce: '15 dk', eexport: '20 dk', comprehensive: '30 dk' }
      ]
    },
    {
      category: 'Analiz & Rapor',
      items: [
        { name: 'AI Destekli Analiz', ecommerce: true, eexport: true, comprehensive: true },
        { name: 'Detaylı Yetkinlik Raporu', ecommerce: true, eexport: true, comprehensive: true },
        { name: 'ROI Hesaplaması', ecommerce: false, eexport: true, comprehensive: true },
        { name: 'Benchmark Karşılaştırması', ecommerce: false, eexport: true, comprehensive: true },
        { name: 'Karşılaştırmalı Analiz', ecommerce: false, eexport: false, comprehensive: true },
        { name: '360° Yetkinlik Haritası', ecommerce: false, eexport: false, comprehensive: true }
      ]
    },
    {
      category: 'Roadmap & Planlama',
      items: [
        { name: 'Aksiyon Planı', ecommerce: true, eexport: true, comprehensive: true },
        { name: '12 Aylık Roadmap', ecommerce: false, eexport: true, comprehensive: true },
        { name: 'Aylık Takip Raporu', ecommerce: false, eexport: false, comprehensive: '6 ay' },
        { name: 'Hedef Pazar Analizi', ecommerce: false, eexport: true, comprehensive: true }
      ]
    },
    {
      category: 'Destek & Danışmanlık',
      items: [
        { name: 'Email Destek', ecommerce: true, eexport: 'Priority', comprehensive: 'Priority' },
        { name: 'WhatsApp Destek', ecommerce: false, eexport: false, comprehensive: true },
        { name: '1:1 Danışmanlık', ecommerce: false, eexport: false, comprehensive: '30 dk' }
      ]
    },
    {
      category: 'Erişim',
      items: [
        { name: 'Rapor Erişim Süresi', ecommerce: '6 ay', eexport: '6 ay', comprehensive: '6 ay' },
        { name: 'PDF Export', ecommerce: true, eexport: true, comprehensive: true }
      ]
    }
  ]
};

// Helper function
export const getPackageById = (id) => {
  return ASSESSMENT_PACKAGES[id] || null;
};

export const getAllPackages = () => {
  return Object.values(ASSESSMENT_PACKAGES);
};

export const getPopularPackage = () => {
  return ASSESSMENT_PACKAGES.combined;
};
