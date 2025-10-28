import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PLANS } from '../data/plans';

const NewPricing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [billingCycle, setBillingCycle] = useState('onetime'); // Always onetime for this product

  // Convert PLANS to package format for this component
  const packages = [
    {
      id: 'free_trial',
      name: PLANS.free_trial.name,
      price: PLANS.free_trial.price,
      duration: '5-7 dakika',
      questions: '10',
      description: 'Sistemimizi ücretsiz deneyin ve temel değerlendirme alın',
      color: PLANS.free_trial.color,
      channels: [
        { name: 'Temel Sorular', included: true },
        { name: 'Detaylı Analiz', included: false },
        { name: 'PDF Rapor', included: false }
      ],
      features: PLANS.free_trial.features,
      notIncluded: PLANS.free_trial.limitations,
      isFree: true
    },
    {
      id: 'ecommerce',
      name: PLANS.ecommerce.name,
      price: PLANS.ecommerce.price,
      duration: '20-25 dakika',
      questions: '50+',
      description: 'Yurtiçi satış kanallarınız için kapsamlı dijital olgunluk değerlendirmesi',
      color: PLANS.ecommerce.color,
      channels: [
        { name: 'Kendi E-Ticaret Siteniz', included: true },
        { name: 'Ulusal Pazaryerleri (Trendyol, Hepsiburada vb.)', included: true },
        { name: 'Uluslararası Kanallar', included: false }
      ],
      features: PLANS.ecommerce.features,
      notIncluded: PLANS.ecommerce.limitations
    },
    {
      id: 'eexport',
      name: PLANS.eexport.name,
      price: PLANS.eexport.price,
      duration: '30-35 dakika',
      questions: '60+',
      description: 'Yurtdışı satış kanallarınız için uluslararası pazara özel değerlendirme',
      color: PLANS.eexport.color,
      channels: [
        { name: 'Yurtiçi Kanallar', included: false },
        { name: 'Kendi Web Siteniz (Uluslararası)', included: true },
        { name: 'Global Pazaryerleri (Amazon, eBay vb.)', included: true }
      ],
      features: PLANS.eexport.features,
      notIncluded: PLANS.eexport.limitations
    },
    {
      id: 'combined',
      name: PLANS.combined.name,
      price: PLANS.combined.price,
      originalPrice: 1398,
      discount: 28,
      duration: '45-50 dakika',
      questions: '110+',
      description: 'Tüm satış kanallarınız için eksiksiz 360° dijital olgunluk analizi',
      color: PLANS.combined.color,
      popular: PLANS.combined.popular,
      channels: [
        { name: 'Kendi E-Ticaret Siteniz (Yurtiçi)', included: true },
        { name: 'Ulusal Pazaryerleri', included: true },
        { name: 'Kendi Web Siteniz (Uluslararası)', included: true },
        { name: 'Global Pazaryerleri', included: true }
      ],
      features: PLANS.combined.features,
      notIncluded: PLANS.combined.limitations
    }
  ];

  const faqs = [
    {
      question: 'Hangi satış kanallarını kapsıyor?',
      answer: 'Assessment\'ımız 4 ana satış kanalını kapsar: Kendi E-Ticaret Siteniz (Yurtiçi), Ulusal Pazaryerleri (Trendyol, Hepsiburada, N11 vb.), Kendi Web Siteniz (Uluslararası) ve Global Pazaryerleri (Amazon, eBay, Etsy vb.). Başlangıçta hangi kanallarda aktif olduğunuzu seçersiniz.'
    },
    {
      question: 'Assessment\'ı tamamlamam ne kadar sürer?',
      answer: 'E-Ticaret Assessment 20-25 dakika, E-İhracat Assessment 30-35 dakika, Kapsamlı Paket ise 45-50 dakika sürer. İstediğiniz zaman ara verip daha sonra kaldığınız yerden devam edebilirsiniz.'
    },
    {
      question: 'Sadece aktif olduğum kanallara mı sorular gelecek?',
      answer: 'Evet! Assessment başlangıcında hangi kanallarda satış yaptığınızı seçersiniz. Sistem sadece seçtiğiniz kanallara özel sorular sorar. Bu sayede zamandan tasarruf eder ve size özel bir değerlendirme alırsınız.'
    },
    {
      question: 'Raporlar nasıl sunuluyor?',
      answer: 'Assessment\'ı tamamladıktan hemen sonra detaylı raporunuza erişebilirsiniz. Her kanal için ayrı skorlar, grafikler, güçlü ve gelişim alanları ile aksiyon önerileri içerir. PDF olarak da indirebilirsiniz.'
    },
    {
      question: 'İade politikanız nedir?',
      answer: 'Dijital ürünlerimiz anında erişime açıldığı için Mesafeli Satış Sözleşmesi gereği cayma hakkı bulunmamaktadır. Ancak teknik bir sorun yaşarsanız destek ekibimizle iletişime geçebilirsiniz.'
    },
    {
      question: 'Raporlara ne kadar süre erişebilirim?',
      answer: 'Tüm paketlerde 90 gün boyunca raporlarınıza sınırsız erişim sağlarsınız. Bu süre içinde raporlarınızı istediğiniz zaman görüntüleyebilir ve PDF olarak indirebilirsiniz.'
    },
    {
      question: 'Destek alabiliyor muyum?',
      answer: 'Evet! Tüm paketlerde e-posta destek mevcuttur. Kapsamlı Paket\'te öncelikli destek alırsınız. Teknik sorunlar veya sorularınız için info@exportiq360.com adresinden bize ulaşabilirsiniz.'
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı ve banka kartı ile güvenli online ödeme kabul ediyoruz. Ödeme işlemleri SSL sertifikası ile korunmaktadır.'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-500',
        hover: 'hover:border-blue-600'
      },
      purple: {
        gradient: 'from-purple-500 to-purple-600',
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-500',
        hover: 'hover:border-purple-600'
      },
      orange: {
        gradient: 'from-orange-500 to-orange-600',
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-500',
        hover: 'hover:border-orange-600'
      },
      gray: {
        gradient: 'from-gray-500 to-gray-600',
        bg: 'bg-gray-50',
        text: 'text-gray-600',
        border: 'border-gray-500',
        hover: 'hover:border-gray-600'
      },
      gradient: {
        gradient: 'from-blue-600 to-indigo-600',
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        text: 'text-blue-600',
        border: 'border-blue-600',
        hover: 'hover:border-indigo-600'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ExportIQ 360
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">Hakkımızda</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">İletişim</Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Giriş Yap</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            İhtiyacınıza Uygun Paketi Seçin
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tek seferlik ödeme ile dijital olgunluğunuzu ölçün. Her satış kanalınız için 
            ayrı skorlar ve özelleştirilmiş yol haritası alın.
          </p>
          
          {/* Channel Icons */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Kendi Siteniz</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Pazaryerleri</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Uluslararası</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">Global Pazarlar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => {
            const colors = getColorClasses(pkg.color);
            return (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                  pkg.popular ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:shadow-2xl'
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 font-semibold">
                    🌟 EN POPÜLER
                  </div>
                )}
                
                <div className="p-8">
                  {/* Header */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6 min-h-[48px]">{pkg.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    {pkg.originalPrice && (
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-gray-400 line-through text-lg">{pkg.originalPrice} ₺</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
                          %{pkg.discount} İndirim
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline">
                      {pkg.isFree ? (
                        <span className="text-5xl font-bold text-green-600">
                          ÜCRETSİZ
                        </span>
                      ) : (
                        <>
                          <span className={`text-5xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                            {pkg.price} ₺
                          </span>
                          <span className="text-gray-500 ml-2">/ tek seferlik</span>
                        </>
                      )}
                    </div>
                    <p className="text-gray-600 mt-2">{pkg.questions} soru • {pkg.duration}</p>
                  </div>

                  {/* Channels */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Kapsanan Kanallar:</h4>
                    <div className="space-y-2">
                      {pkg.channels.map((channel, idx) => (
                        <div key={idx} className="flex items-start">
                          {channel.included ? (
                            <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className={channel.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                            {channel.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Özellikler:</h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      // If user is logged in, go to checkout, otherwise register
                      if (isAuthenticated) {
                        navigate('/checkout', { state: { selectedPackage: pkg.id } });
                      } else {
                        navigate('/register', { state: { selectedPackage: pkg.id } });
                      }
                    }}
                    className={`w-full py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ${
                      pkg.isFree
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : pkg.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                        : `bg-gradient-to-r ${colors.gradient} text-white hover:opacity-90`
                    }`}
                  >
                    {pkg.isFree ? 'Ücretsiz Dene' : 'Hemen Başlayın'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Paketleri Karşılaştırın
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">Özellik</th>
                  <th className="text-center py-4 px-6 text-gray-500 font-semibold">Deneme</th>
                  <th className="text-center py-4 px-6 text-gray-700 font-semibold">E-Ticaret</th>
                  <th className="text-center py-4 px-6 text-gray-700 font-semibold">E-İhracat</th>
                  <th className="text-center py-4 px-6 text-blue-700 font-semibold">Kapsamlı 🌟</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-6 text-gray-700">Soru Sayısı</td>
                  <td className="text-center py-4 px-6 font-semibold">10</td>
                  <td className="text-center py-4 px-6 font-semibold">50+</td>
                  <td className="text-center py-4 px-6 font-semibold">60+</td>
                  <td className="text-center py-4 px-6 font-semibold">110+</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Kendi Web Siteniz (Yurtiçi)</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Ulusal Pazaryerleri</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Kendi Web Siteniz (Uluslararası)</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Global Pazaryerleri</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Kanal Bazlı Skorlama</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Detaylı PDF Rapor</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Platform Erişimi</td>
                  <td className="text-center py-4 px-6">7 gün</td>
                  <td className="text-center py-4 px-6">90 gün</td>
                  <td className="text-center py-4 px-6">90 gün</td>
                  <td className="text-center py-4 px-6">90 gün</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-700">Öncelikli Destek</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">✓</span></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-6 text-gray-700">Danışmanlık İndirimi</td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-gray-300 text-xl">✗</span></td>
                  <td className="text-center py-4 px-6"><span className="text-green-500 text-xl">%20</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Sıkça Sorulan Sorular
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            Hala Karar Veremediniz mi?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sorularınız için bizimle iletişime geçin veya ücretsiz hesap oluşturun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              İletişime Geçin
            </Link>
            <button
              onClick={() => {
                if (isAuthenticated) {
                  navigate('/dashboard');
                } else {
                  navigate('/register');
                }
              }}
              className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition-all shadow-lg"
            >
              {isAuthenticated ? 'Dashboard\'a Git' : 'Ücretsiz Hesap Oluşturun'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© {new Date().getFullYear()} ExportIQ 360. Tüm hakları saklıdır.</p>
          <div className="mt-4 space-x-6">
            <Link to="/privacy-policy" className="hover:text-white text-sm">Gizlilik Sözleşmesi</Link>
            <Link to="/distance-selling" className="hover:text-white text-sm">Mesafeli Satış Sözleşmesi</Link>
            <Link to="/kvkk" className="hover:text-white text-sm">KVKK</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewPricing;
