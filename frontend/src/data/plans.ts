import { Plans } from '../types/auth';

export const PLANS: Plans = {
  free_trial: {
    name: 'Ücretsiz Deneme',
    price: 0,
    currency: '₺',
    features: [
      '10 soruluk hızlı değerlendirme',
      'Temel yetkinlik raporu',
      '7 gün platform erişimi'
    ],
    limitations: [
      'Detaylı analiz yok',
      'PDF rapor yok'
    ],
    color: 'gray',
    popular: false
  },
  ecommerce: {
    name: 'E-Ticaret Assessment',
    price: 499,
    currency: '₺',
    features: [
      'Kendi web siteniz analizi (SEO, UX, Ödeme)',
      'Ulusal pazaryeri performans değerlendirmesi',
      'Listing ve kampanya optimizasyonu önerileri',
      'Her kanal için ayrı skorlar ve metrikler',
      'Detaylı gelişim yol haritası',
      '50+ soru • 20-25 dakika',
      '90 gün platform erişimi',
      'E-posta destek',
      'Anında PDF rapor'
    ],
    limitations: [
      'E-ihracat analizi yok',
      'Uluslararası pazar değerlendirmesi yok'
    ],
    color: 'blue',
    popular: false
  },
  eexport: {
    name: 'E-İhracat Assessment',
    price: 899,
    currency: '₺',
    features: [
      'Uluslararası web siteniz analizi',
      'Çok dilli ve çok para birimli destek değerlendirmesi',
      'Global pazaryeri stratejisi (FBA, FBM)',
      'Gümrük ve lojistik yetkinlik analizi',
      'Pazar bazlı skorlamalar',
      'Uluslararası ödeme sistemleri analizi',
      '60+ soru • 30-35 dakika',
      '90 gün platform erişimi',
      'E-posta destek',
      'Anında PDF rapor'
    ],
    limitations: [
      'Yurtiçi e-ticaret analizi yok',
      'Ulusal pazaryeri değerlendirmesi yok'
    ],
    color: 'purple',
    popular: false
  },
  combined: {
    name: 'Kapsamlı Paket',
    price: 1299,
    currency: '₺',
    features: [
      '🌟 Tüm 4 satış kanalı tam analizi',
      'Yurtiçi + Yurtdışı kapsamlı değerlendirme',
      'Her kanal için detaylı skorlar ve karşılaştırma',
      'Kanal bazlı büyüme stratejileri',
      'Cross-channel optimizasyon önerileri',
      'Öncelik bazlı aksiyon planı',
      '110+ soru • 45-50 dakika',
      '90 gün öncelikli erişim',
      'Öncelikli e-posta destek',
      'Detaylı PDF rapor paketi',
      'Ek danışmanlık seansı (%20 indirim)'
    ],
    limitations: [],
    color: 'orange',
    popular: true
  }
};
