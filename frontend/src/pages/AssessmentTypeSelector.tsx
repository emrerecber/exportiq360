import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AssessmentTypeSelector: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const assessmentTypes = [
    {
      id: 'e-commerce',
      title: {
        tr: 'E-Ticaret Yetkinliği',
        en: 'E-Commerce Competence'
      },
      description: {
        tr: 'İç pazar e-ticaret operasyonlarınızın olgunluk seviyesini değerlendirin',
        en: 'Assess the maturity level of your domestic e-commerce operations'
      },
      icon: '🛒',
      features: [
        { tr: 'Platform ve teknoloji altyapısı', en: 'Platform and technology infrastructure' },
        { tr: 'Dijital pazarlama yetkinlikleri', en: 'Digital marketing capabilities' },
        { tr: 'Müşteri deneyimi ve UX', en: 'Customer experience and UX' },
        { tr: 'Operasyonel süreç analizi', en: 'Operational process analysis' },
        { tr: 'Veri analitiği ve raporlama', en: 'Data analytics and reporting' }
      ],
      color: 'from-blue-500 to-indigo-600',
      route: '/assessment/e-commerce'
    },
    {
      id: 'e-export',
      title: {
        tr: 'E-İhracat Yetkinliği',
        en: 'E-Export Competence'
      },
      description: {
        tr: 'Uluslararası e-ticaret ve e-ihracat yetkinliğinizi ölçün',
        en: 'Measure your international e-commerce and e-export competence'
      },
      icon: '🌍',
      features: [
        { tr: 'Uluslararası pazar bilgisi', en: 'International market knowledge' },
        { tr: 'Çapraz sınır lojistik', en: 'Cross-border logistics' },
        { tr: 'Global e-ticaret platformları', en: 'Global e-commerce platforms' },
        { tr: 'Çoklu para birimi ve ödeme', en: 'Multi-currency and payment' },
        { tr: 'Uluslararası uyumluluk', en: 'International compliance' }
      ],
      color: 'from-green-500 to-teal-600',
      route: '/assessment/e-export'
    },
    {
      id: 'combined',
      title: {
        tr: 'Kapsamlı Değerlendirme',
        en: 'Comprehensive Assessment'
      },
      description: {
        tr: 'E-ticaret ve e-ihracat yetkinliklerinin tamamını değerlendirin',
        en: 'Assess both e-commerce and e-export competencies comprehensively'
      },
      icon: '🚀',
      features: [
        { tr: 'Tüm e-ticaret yetkinlikleri', en: 'All e-commerce competencies' },
        { tr: 'Tüm e-ihracat yetkinlikleri', en: 'All e-export competencies' },
        { tr: 'Entegre analiz ve raporlama', en: 'Integrated analysis and reporting' },
        { tr: 'Karşılaştırmalı performans', en: 'Comparative performance' },
        { tr: 'Kapsamlı yol haritası', en: 'Comprehensive roadmap' }
      ],
      color: 'from-purple-500 to-pink-600',
      badge: { tr: 'Önerilen', en: 'Recommended' },
      route: '/assessment/combined'
    }
  ];

  const handleTypeSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ExportIQ 360</h1>
                <p className="text-sm text-gray-600">Yetkinlik Değerlendirme Platformu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Hoş geldiniz, {user?.name || 'Kullanıcı'}</span>
              <button
                onClick={() => navigate('/pricing')}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Planlar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Değerlendirme Tipini Seçin
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            İşletmenizin ihtiyaçlarına uygun değerlendirme türünü seçerek dijital dönüşüm yolculuğunuza başlayın
          </p>
        </div>

        {/* Assessment Type Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {assessmentTypes.map((type) => (
            <div
              key={type.id}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Badge if exists */}
              {type.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                    {type.badge.tr}
                  </span>
                </div>
              )}

              {/* Header with gradient */}
              <div className={`bg-gradient-to-br ${type.color} p-8 text-white`}>
                <div className="text-6xl mb-4">{type.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{type.title.tr}</h3>
                <p className="text-white/90 text-sm">{type.description.tr}</p>
              </div>

              {/* Features List */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature.tr}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleTypeSelect(type.route)}
                  className={`w-full bg-gradient-to-r ${type.color} text-white py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-md`}
                >
                  Başla
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500 rounded-2xl pointer-events-none transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Kapsamlı Analiz</h4>
              <p className="text-sm text-gray-600">
                70+ soru ile detaylı yetkinlik ölçümü ve McKinsey tarzı profesyonel raporlama
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI Destekli Öneriler</h4>
              <p className="text-sm text-gray-600">
                Yapay zeka ile özelleştirilmiş aksiyonlar ve yatırım önceliklendirmesi
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Karşılaştırmalı Analiz</h4>
              <p className="text-sm text-gray-600">
                Sektör benchmarkları ve rakip analizi ile konumunuzu değerlendirin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentTypeSelector;
