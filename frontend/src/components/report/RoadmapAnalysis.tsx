import React from 'react';

interface RoadmapProps {
  percentage: number;
  language: 'tr' | 'en';
}

export default function RoadmapAnalysis({ percentage, language }: RoadmapProps) {
  const currentLevel = Math.floor(percentage / 20);
  const nextLevelProgress = (percentage % 20) / 20 * 100;
  const pointsToNextLevel = 20 - (percentage % 20);
  const estimatedMonths = Math.ceil(pointsToNextLevel / 5);

  const levels = [
    { id: 1, name: 'Seviye 1: Başlangıç', range: '0-20%', desc: 'Temel dijital araçlar ve süreçler', color: 'red' },
    { id: 2, name: 'Seviye 2: Gelişmekte', range: '21-40%', desc: 'Parçalı dijital çözümler', color: 'orange' },
    { id: 3, name: 'Seviye 3: Tanımlı', range: '41-60%', desc: 'Standartlaşmış dijital süreçler', color: 'yellow' },
    { id: 4, name: 'Seviye 4: Yönetilen', range: '61-80%', desc: 'Entegre dijital ekosistem', color: 'blue' },
    { id: 5, name: 'Seviye 5: Optimize', range: '81-100%', desc: 'İleri düzey ve sürekli iyileştirme', color: 'green' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Dijital Olgunluk Modeli ve Roadmap</h2>
        <p className="text-cyan-100">Aşamalı gelişim planı ve yol haritası</p>
      </div>

      {/* Current Level Status */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-6xl font-bold text-blue-600 mb-2">{currentLevel + 1}</div>
            <h3 className="text-2xl font-bold text-gray-900">{levels[currentLevel].name}</h3>
            <p className="text-gray-600 mt-1">{levels[currentLevel].desc}</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-gray-900 mb-2">{percentage.toFixed(0)}%</div>
            <p className="text-gray-600">Mevcut Puan</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Bu seviyedeki ilerleme</span>
            <span>{nextLevelProgress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${nextLevelProgress}%` }}
            ></div>
          </div>
        </div>

        {currentLevel < 4 && (
          <p className="text-sm text-gray-600">
            Bir sonraki seviye için <span className="font-bold text-blue-600">{pointsToNextLevel.toFixed(0)} puan</span> daha gerekli
          </p>
        )}
      </div>

      {/* Maturity Levels */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Dijital Olgunluk Yol Haritası</h3>
        <div className="space-y-6">
          {levels.map((level, idx) => {
            const isCompleted = idx < currentLevel;
            const isCurrent = idx === currentLevel;
            const isPending = idx > currentLevel;

            return (
              <div key={level.id} className="relative">
                {idx < levels.length - 1 && (
                  <div className="absolute left-8 top-16 bottom-0 w-1 bg-gray-200"></div>
                )}
                
                <div className={`flex items-start space-x-4 p-6 rounded-xl border-2 transition-all ${
                  isCompleted ? 'bg-green-50 border-green-300' :
                  isCurrent ? 'bg-blue-50 border-blue-500 shadow-lg' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isCurrent ? 'bg-blue-600 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {isCompleted ? '✓' : level.id}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{level.name}</h4>
                      {isCurrent && <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Mevcut Seviye</span>}
                    </div>
                    <p className="text-gray-600 mb-2">{level.desc}</p>
                    <p className="text-sm text-gray-500">Puan aralığı: {level.range}</p>
                    
                    {isCurrent && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 mb-2">Bu seviyedeki ilerlemeniz: {nextLevelProgress.toFixed(0)}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${nextLevelProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Level Strategy */}
      {currentLevel < 4 && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-bold text-gray-900 mb-2">Hedef Seviye</h4>
              <p className="text-2xl font-bold text-blue-600 mb-1">{levels[currentLevel + 1].name.split(':')[1]}</p>
              <p className="text-sm text-gray-600">{levels[currentLevel + 1].desc}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">📈</div>
              <h4 className="font-bold text-gray-900 mb-2">Gerekli Puan Artışı</h4>
              <p className="text-3xl font-bold text-orange-600 mb-1">+{pointsToNextLevel.toFixed(0)}</p>
              <p className="text-sm text-gray-600">puan artışı gerekli</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">⏱️</div>
              <h4 className="font-bold text-gray-900 mb-2">Tahmini Süre</h4>
              <p className="text-3xl font-bold text-green-600 mb-1">{estimatedMonths}</p>
              <p className="text-sm text-gray-600">ay (tahmini)</p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Roadmap */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">12 Aylık Gelişim Planı</h3>
        <div className="space-y-6">
          {[
            { quarter: 'Q1 (0-3 Ay)', title: 'Temel Oluşturma', items: ['Hızlı kazanım projeleri', 'Kritik altyapı iyileştirmeleri', 'Ekip eğitimleri'], color: 'red' },
            { quarter: 'Q2 (3-6 Ay)', title: 'Hızlanma', items: ['Sistem entegrasyonları', 'Süreç optimizasyonları', 'Müşteri deneyimi iyileştirmeleri'], color: 'orange' },
            { quarter: 'Q3 (6-9 Ay)', title: 'Dönüşüm', items: ['AI ve otomasyon', 'Omnichannel stratejisi', 'İleri analitik'], color: 'blue' },
            { quarter: 'Q4 (9-12 Ay)', title: 'Konsolidasyon', items: ['Sürekli iyileştirme', 'Yeni pazar girişleri', 'İnovasyon projeleri'], color: 'green' }
          ].map((phase, idx) => (
            <div key={idx} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className={`flex-shrink-0 w-12 h-12 bg-${phase.color}-500 text-white rounded-full flex items-center justify-center font-bold`}>
                Q{idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-900">{phase.quarter}</h4>
                  <span className="text-sm font-semibold text-gray-600">{phase.title}</span>
                </div>
                <ul className="space-y-1">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Factors */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6">Başarı Faktörleri</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-lg mb-3">✅ Yapılması Gerekenler</h4>
            <ul className="space-y-2 text-white/90">
              <li>• Üst yönetim desteğini sağlayın</li>
              <li>• Açık ve ölçülebilir hedefler belirleyin</li>
              <li>• Düzenli ilerleme takibi yapın</li>
              <li>• Ekip motivasyonunu yüksek tutun</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-3">⚠️ Kaçınılması Gerekenler</h4>
            <ul className="space-y-2 text-white/90">
              <li>• Çok fazla projeyi aynı anda başlatmak</li>
              <li>• Ölçüm ve takip yapmadan ilerlemek</li>
              <li>• Değişim yönetimini ihmal etmek</li>
              <li>• Hızlı kazanımları göz ardı etmek</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
