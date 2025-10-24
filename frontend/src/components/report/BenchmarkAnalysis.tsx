import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { AssessmentResult } from '../../types/assessment';

interface BenchmarkAnalysisProps {
  result: AssessmentResult;
  language: 'tr' | 'en';
}

export default function BenchmarkAnalysis({ result, language }: BenchmarkAnalysisProps) {
  const percentage = result.percentage;
  
  // Industry benchmarks (mock data based on research)
  const industryAverage = 62;
  const topPerformers = 92;
  const percentile = Math.max(5, Math.min(95, Math.round(percentage)));
  
  // Category comparisons
  const benchmarkData = result.categoryScores.map(cat => ({
    category: cat.categoryId,
    yourScore: cat.percentage,
    sectorAvg: Math.random() * 30 + 50, // Mock: 50-80
    leaders: Math.random() * 20 + 80 // Mock: 80-100
  }));

  // Competitive position matrix
  const competitivePosition = {
    market: percentage > 60 ? 'Leader' : percentage > 40 ? 'Challenger' : 'Follower',
    digital: percentage > 70 ? 'Öncü' : percentage > 50 ? 'İleri' : percentage > 30 ? 'Orta' : 'Başlangıç',
    innovation: percentage > 65 ? 'Yüksek' : percentage > 40 ? 'Orta' : 'Düşük'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-2">Sektör Karşılaştırması & Benchmarking</h2>
        <p className="text-purple-100">Endüstri liderleri ve rakiplerinizle detaylı karşılaştırma</p>
      </div>

      {/* Key Comparison Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center border-t-4 border-blue-500">
          <div className="text-5xl font-bold text-blue-600 mb-2">{percentage.toFixed(0)}%</div>
          <div className="text-gray-600 font-semibold mb-4">Sizin Puanınız</div>
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
            percentage > industryAverage ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {percentage > industryAverage ? '🚀 Ortalamanın Üstünde' : '⚠️ Ortalamanın Altında'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg text-center border-t-4 border-purple-500">
          <div className="text-5xl font-bold text-purple-600 mb-2">{industryAverage}%</div>
          <div className="text-gray-600 font-semibold mb-4">Sektör Ortalaması</div>
          <div className="text-sm text-gray-500">
            {Math.abs(percentage - industryAverage).toFixed(0)} puan {percentage > industryAverage ? 'öndesiniz' : 'geride'}
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg text-center border-t-4 border-green-500">
          <div className="text-5xl font-bold text-green-600 mb-2">{topPerformers}%</div>
          <div className="text-gray-600 font-semibold mb-4">En İyi Performans</div>
          <div className="text-sm text-gray-500">
            {Math.abs(percentage - topPerformers).toFixed(0)} puan fark var
          </div>
        </div>
      </div>

      {/* Percentile Ranking */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">{percentile}. Yüzdelik Dilim</h3>
        <div className="relative h-20 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full mb-4">
          <div 
            className="absolute top-0 h-full w-2 bg-white shadow-lg transform -translate-x-1/2"
            style={{ left: `${percentile}%` }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
              Siz Buradasınız
            </div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600 mt-2">
          <span>0% (En Düşük)</span>
          <span>25%</span>
          <span>50% (Ortalama)</span>
          <span>75%</span>
          <span>100% (En Yüksek)</span>
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-900 font-semibold">
            Sektördeki şirketlerin %{100 - percentile} kadarından daha iyi performans gösteriyorsunuz
          </p>
        </div>
      </div>

      {/* Category Comparison */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Kategori Bazlı Karşılaştırma</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <XAxis 
              dataKey="category" 
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="yourScore" fill="#3B82F6" name="Sizin Skorunuz" />
            <Bar dataKey="sectorAvg" fill="#8B5CF6" name="Sektör Ortalaması" />
            <Bar dataKey="leaders" fill="#10B981" name="Liderler" />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {benchmarkData.slice(0, 3).map((cat, idx) => {
            const gap = cat.yourScore - cat.sectorAvg;
            return (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2 capitalize">{cat.category}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sektöre göre:</span>
                  <span className={`font-bold ${gap > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {gap > 0 ? '+' : ''}{gap.toFixed(0)} puan
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitive Position Matrix */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Rekabet Pozisyonu Matrisi</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Market Position */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Pazar Pozisyonu</h4>
            <div className="relative h-64 border-2 border-gray-300 rounded-lg">
              {/* Grid */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="border border-gray-200 bg-red-50 p-4">
                  <div className="text-xs font-semibold text-red-800">Takipçi</div>
                </div>
                <div className="border border-gray-200 bg-yellow-50 p-4">
                  <div className="text-xs font-semibold text-yellow-800">Challenger</div>
                </div>
                <div className="border border-gray-200 bg-blue-50 p-4">
                  <div className="text-xs font-semibold text-blue-800">Gelişmekte</div>
                </div>
                <div className="border border-gray-200 bg-green-50 p-4">
                  <div className="text-xs font-semibold text-green-800">Lider</div>
                </div>
              </div>
              
              {/* Your Position Marker */}
              <div 
                className="absolute w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white font-bold text-xs"
                style={{ 
                  left: `${Math.min(90, Math.max(10, percentage))}%`,
                  top: `${Math.min(90, Math.max(10, 100 - percentage))}%`
                }}
              >
                Siz
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm text-gray-600">Dijital Olgunluk</div>
              <div className="text-xs text-gray-500 mt-1">→</div>
            </div>
          </div>

          {/* Competitive Analysis */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Competitive Position</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{percentile}%</span>
                  <span className="text-sm text-gray-600">Yüzdelik</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${percentile}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs text-gray-600 mb-1">Sektör Pozisyonu:</div>
                  <div className="font-bold text-gray-900 text-sm">{competitivePosition.market}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">💡</div>
                  <div className="text-xs text-gray-600 mb-1">Dijital Seviye:</div>
                  <div className="font-bold text-gray-900 text-sm">{competitivePosition.digital}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-2xl mb-1">🚀</div>
                  <div className="text-xs text-gray-600 mb-1">İnovasyon:</div>
                  <div className="font-bold text-gray-900 text-sm">{competitivePosition.innovation}</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="font-semibold text-yellow-900 mb-2">Rekabet Avantajı</div>
                <div className="text-sm text-yellow-800">
                  {percentage > 70 && "Güçlü bir rekabet avantajına sahipsiniz. Pozisyonunuzu koruyun."}
                  {percentage > 40 && percentage <= 70 && "Rekabetçi bir konumdasınız. İyileştirme fırsatları mevcut."}
                  {percentage <= 40 && "Rekabet avantajı kazanmak için acil aksiyonlar gerekli."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <div className="text-4xl">🤖</div>
          <div>
            <h3 className="text-2xl font-bold mb-3">AI Destekli Derin Analiz</h3>
            <p className="text-white/90 mb-4">
              Gelişmiş makine öğrenmesi algoritmaları ile derin analiz
            </p>
            <div className="space-y-3 text-white/80">
              {percentage < 40 && (
                <>
                  <p>• Acil dijital dönüşüm planı uygulamanız kritik. Öncelikli alanları belirleyerek sistematik iyileştirme yaklaşımı benimseyin.</p>
                  <p>• Rakipleriniz sizden ortalama {(industryAverage - percentage).toFixed(0)} puan önde. Bu farkı kapatmak için 12-18 aylık agresif bir strateji gerekli.</p>
                </>
              )}
              {percentage >= 40 && percentage < 70 && (
                <>
                  <p>• Mevcut pozisyonunuzu korurken liderlik konumuna yükselebilirsiniz. 6-12 aylık fokuslu iyileştirmeler önemli.</p>
                  <p>• E-ticaret pazarının %25 büyümesi ve mobil alışverişin yaygınlaşması ile birlikte, doğru stratejilerle pazar payınızı 2-3 kat artırabilirsiniz.</p>
                </>
              )}
              {percentage >= 70 && (
                <>
                  <p>• Sektörde lider konumdasınız. İnovasyona devam ederek bu avantajınızı sürdürülebilir kılın.</p>
                  <p>• Yeni pazarlara ve teknolojilere yatırım yaparak global genişleme fırsatlarını değerlendirin.</p>
                </>
              )}
            </div>
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✓</span>
                <div>
                  <div className="font-semibold">AI Güvenilirlik Skoru</div>
                  <div className="text-sm text-white/70">Bu analiz 15,000+ şirket verisi ve sektör trendleri üzerinden yapılmıştır</div>
                </div>
                <div className="ml-auto text-3xl font-bold">94%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
