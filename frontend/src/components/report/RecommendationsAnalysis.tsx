import React from 'react';
import { AssessmentResult } from '../../types/assessment';

interface RecommendationsProps {
  result: AssessmentResult;
  language: 'tr' | 'en';
}

export default function RecommendationsAnalysis({ result, language }: RecommendationsProps) {
  const percentage = result.percentage;

  // Generate recommendations based on score and weaknesses
  const generateRecommendations = () => {
    const recommendations = {
      immediate: [] as string[],
      shortTerm: [] as string[],
      mediumTerm: [] as string[],
      longTerm: [] as string[]
    };

    // Immediate priorities (0-1 month)
    if (percentage < 40) {
      recommendations.immediate.push(
        'Acil dijital dönüşüm planı oluşturun ve yönetim onayı alın',
        'Temel teknolojik altyapıyı gözden geçirin ve kritik eksiklikleri belirleyin',
        'Uzman danışmanlık desteği alın ve dönüşüm ekibi kurun',
        'Mobil uyumluluk kontrolü yapın ve acil optimizasyonları tamamlayın'
      );
    } else if (percentage < 60) {
      recommendations.immediate.push(
        'Mevcut sistemlerin entegrasyonunu iyileştirin',
        'Müşteri deneyimi ölçümlerini başlatın',
        'Öncelikli zayıf alanlar için hızlı kazanım projeleri başlatın'
      );
    } else {
      recommendations.immediate.push(
        'İnovasyon odaklı pilot projeler başlatın',
        'Yeni teknolojileri değerlendirin (AI, IoT, vb.)',
        'Ekip becerilerini ileri düzey eğitimlerle geliştirin'
      );
    }

    // Short term (1-6 months)
    result.weaknesses.slice(0, 2).forEach(weakness => {
      recommendations.shortTerm.push(`${weakness} alanında kapsamlı iyileştirme planı uygulayın`);
    });
    recommendations.shortTerm.push(
      'Sosyal medya pazarlama stratejisi geliştirin ve uygulayın',
      'Müşteri deneyimi haritası oluşturun ve iyileştirme noktalarını belirleyin',
      'E-posta pazarlama otomasyonu kurun',
      'Temel KPI\'ları tanımlayın ve ölçüm sistemini kurun'
    );

    // Medium term (6-12 months)
    recommendations.mediumTerm.push(
      'Omnichannel satış stratejisi planlayın ve pilot uygulayın',
      'AI destekli ürün öneri sistemi kurun',
      'Müşteri segmentasyonu ve kişiselleştirme stratejisi geliştirin',
      'Lojistik ve tedarik zinciri optimizasyonu yapın'
    );

    // Long term (12+ months)
    recommendations.longTerm.push(
      'Uluslararası pazarlara açılım planı hazırlayın',
      'Sürdürülebilir e-ticaret modelini benimseyin',
      'İleri düzey veri analitiği ve tahminleme sistemleri kurun',
      'Ekosistem ortaklıkları ve stratejik iş birlikleri geliştirin'
    );

    return recommendations;
  };

  const recommendations = generateRecommendations();

  // SWOT Analysis
  const swotAnalysis = {
    strengths: result.strengths.slice(0, 4),
    weaknesses: result.weaknesses.slice(0, 4),
    opportunities: [
      'Mobil Ticaret: Mobil alışveriş trendinin artışı',
      'Sosyal Medya Pazarlama: Sosyal ticaret platformlarının yaygınlaşması',
      'AI ve Kişiselleştirme: Yapay zeka destekli müşteri deneyimi',
      'Sürdürülebilirlik: Çevre dostu ürün ve hizmet talebi'
    ],
    threats: [
      'Artan Rekabet: Dijital pazarlarda yoğun rekabet ortamı',
      'Teknolojik Değişim: Hızlı teknoloji değişimi ve adaptasyon zorluğu',
      'Düzenlemeler: Veri koruma ve ticaret düzenlemeleri',
      'Siber Güvenlik: Artan siber saldırı riski'
    ]
  };

  // Priority Matrix
  const priorities = {
    quick: result.criticalActions.slice(0, 3),
    strategic: recommendations.longTerm.slice(0, 2)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Gelişim Önerileri ve Aksiyon Planı</h2>
        <p className="text-orange-100">Veriye dayalı, uygulanabilir öneriler ve stratejik rehberlik</p>
      </div>

      {/* Priority Matrix */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Öncelik Matrisi</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-red-900">Acil Öncelikler</h4>
              <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full font-semibold">0-1 Ay</span>
            </div>
            <div className="text-2xl font-bold text-red-600 mb-2">{recommendations.immediate.length}</div>
            <div className="text-sm text-red-700">öneri</div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-orange-900">Kısa Vadeli</h4>
              <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full font-semibold">1-6 Ay</span>
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-2">{recommendations.shortTerm.length}</div>
            <div className="text-sm text-orange-700">öneri</div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-blue-900">Orta Vadeli</h4>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold">6-12 Ay</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-2">{recommendations.mediumTerm.length}</div>
            <div className="text-sm text-blue-700">öneri</div>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-purple-900">Uzun Vadeli</h4>
              <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full font-semibold">12+ Ay</span>
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-2">{recommendations.longTerm.length}</div>
            <div className="text-sm text-purple-700">öneri</div>
          </div>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="space-y-6">
        {/* Immediate */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">🔥 Acil Öncelikler (0-1 Ay)</h3>
            <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold">YÜKSEK ÖNCELİK</span>
          </div>
          <div className="space-y-4">
            {recommendations.immediate.map((rec, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{rec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Short Term */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">⚡ Kısa Vadeli (1-6 Ay)</h3>
            <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">ORTA ÖNCELİK</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.shortTerm.map((rec, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-900 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medium Term */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">📈 Orta Vadeli (6-12 Ay)</h3>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">STRATEJİK</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.mediumTerm.map((rec, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-900 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Long Term */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">🚀 Uzun Vadeli (12+ Ay)</h3>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">VİZYONER</span>
          </div>
          <div className="space-y-4">
            {recommendations.longTerm.map((rec, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-gray-900">{rec}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SWOT Analysis */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">SWOT Analizi</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">💪</div>
              <h4 className="text-xl font-bold text-green-900">Güçlü Yanlar (Strengths)</h4>
            </div>
            <ul className="space-y-2">
              {swotAnalysis.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-green-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">⚠️</div>
              <h4 className="text-xl font-bold text-red-900">Zayıf Yanlar (Weaknesses)</h4>
            </div>
            <ul className="space-y-2">
              {swotAnalysis.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-red-600 mt-1">!</span>
                  <span className="text-red-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🎯</div>
              <h4 className="text-xl font-bold text-blue-900">Fırsatlar (Opportunities)</h4>
            </div>
            <ul className="space-y-2">
              {swotAnalysis.opportunities.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">→</span>
                  <span className="text-blue-800 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">⚡</div>
              <h4 className="text-xl font-bold text-purple-900">Tehditler (Threats)</h4>
            </div>
            <ul className="space-y-2">
              {swotAnalysis.threats.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-purple-600 mt-1">⚠</span>
                  <span className="text-purple-800 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6">Uygulama Rehberi</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-6">
            <div className="text-4xl mb-3">1️⃣</div>
            <h4 className="font-bold text-lg mb-2">Önceliklendirin</h4>
            <p className="text-white/80 text-sm">
              Acil önceliklerden başlayarak sistematik bir yaklaşım benimseyin
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-6">
            <div className="text-4xl mb-3">2️⃣</div>
            <h4 className="font-bold text-lg mb-2">Ekip Oluşturun</h4>
            <p className="text-white/80 text-sm">
              Her alan için sorumlu ekipler belirleyin ve düzenli takip yapın
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-6">
            <div className="text-4xl mb-3">3️⃣</div>
            <h4 className="font-bold text-lg mb-2">Ölçün ve İyileştirin</h4>
            <p className="text-white/80 text-sm">
              İlerlemenizi düzenli olarak ölçerek stratejinizi güncelleyin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
