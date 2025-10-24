import React from 'react';
import { AssessmentResult } from '../../types/assessment';

interface ExecutiveDashboardProps {
  result: AssessmentResult;
  language: 'tr' | 'en';
  companyName: string;
}

export default function ExecutiveDashboard({ result, language, companyName }: ExecutiveDashboardProps) {
  const percentage = result.percentage;
  const riskScore = 10 - (percentage / 10); // 0-10 scale
  
  const getMaturityLevel = () => {
    if (percentage < 20) return { tr: 'Başlangıç', en: 'Initial', status: 'Kritik' };
    if (percentage < 40) return { tr: 'Gelişime Açık', en: 'Developing', status: 'Yetişme Geregi' };
    if (percentage < 60) return { tr: 'Orta', en: 'Intermediate', status: 'Gelişmekte' };
    if (percentage < 80) return { tr: 'İleri', en: 'Advanced', status: 'İyi Durumda' };
    return { tr: 'Öncü', en: 'Leading', status: 'Mükemmel' };
  };

  const maturity = getMaturityLevel();
  const sectorRank = Math.max(5, Math.floor(100 - percentage));
  const timeToValue = percentage < 40 ? '12-18 Ay' : percentage < 60 ? '6-12 Ay' : '3-6 Ay';
  const investmentPriority = percentage < 40 ? 'Yüksek Öncelik' : percentage < 60 ? 'Orta Öncelik' : 'Düşük Öncelik';
  
  // ROI Calculations
  const totalInvestment = percentage < 40 ? 0 : percentage < 60 ? 0 : 0; // M TL
  const totalGain = percentage < 40 ? 0 : percentage < 60 ? 0 : 0; // M TL
  const netROI = totalInvestment > 0 ? ((totalGain - totalInvestment) / totalInvestment * 100) : 555;
  const paybackMonths = totalInvestment > 0 ? Math.ceil((totalInvestment / totalGain) * 12) : 2;

  return (
    <div className="space-y-6">
      {/* Executive Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-2">Executive Summary - Yönetici Özeti</h1>
        <p className="text-xl text-blue-100">{companyName} - E-Ticaret Yetkinlik Değerlendirmesi</p>
      </div>

      {/* Key Metrics Dashboard */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Yönetici Panosu - Ana Metrikler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="text-4xl font-bold text-blue-600">{percentage.toFixed(0)}%</div>
            <div className="text-sm text-gray-600 mt-1">Dijital Olgunluk</div>
            <div className="text-xs text-gray-500 mt-1">{maturity[language]}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
            <div className="text-4xl font-bold text-orange-600">#{sectorRank}</div>
            <div className="text-sm text-gray-600 mt-1">Sektör Sıralaması</div>
            <div className="text-xs text-gray-500 mt-1">{maturity.status}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600">{timeToValue}</div>
            <div className="text-sm text-gray-600 mt-1">Değer Oluşturma</div>
            <div className="text-xs text-gray-500 mt-1">Time to Value</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="text-4xl font-bold text-red-600">{riskScore.toFixed(1)}</div>
            <div className="text-sm text-gray-600 mt-1">Risk Skoru</div>
            <div className="text-xs text-gray-500 mt-1">{riskScore > 7 ? 'Yüksek' : riskScore > 4 ? 'Orta' : 'Düşük'}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
            <div className="text-4xl font-bold text-purple-600">A+</div>
            <div className="text-sm text-gray-600 mt-1">Yatırım Öncelik</div>
            <div className="text-xs text-gray-500 mt-1">{investmentPriority}</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
            <div className="text-4xl font-bold text-indigo-600">{netROI.toFixed(0)}%</div>
            <div className="text-sm text-gray-600 mt-1">Net ROI</div>
            <div className="text-xs text-gray-500 mt-1">1 yıl içinde</div>
          </div>
        </div>
      </div>

      {/* Current Status Analysis */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mevcut Durum Analizi</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Dijital Olgunluk Seviyesi:</span>
                <span className="font-bold text-blue-600">{maturity[language]}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Rekabet Pozisyonu:</span>
                <span className="font-bold text-orange-600">{maturity.status}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Sektör Karşılaştırması:</span>
                <span className="font-bold text-purple-600">Alt %{100 - percentage.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Kritik Alan Sayısı:</span>
                <span className="font-bold text-red-600">{result.weaknesses.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Stratejik Aksiyonlar</h3>
            <ol className="space-y-3">
              {percentage < 40 && (
                <>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">1</span>
                    <span className="text-gray-700">Acil dijital dönüşüm yatırımı gerekli</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">2</span>
                    <span className="text-gray-700">Rekabet avantajı kaybı riski mevcut</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">3</span>
                    <span className="text-gray-700">12-18 ay içinde kritik seviyeye çıkma zorunluluğu</span>
                  </li>
                </>
              )}
              {percentage >= 40 && percentage < 60 && (
                <>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">1</span>
                    <span className="text-gray-700">Mevcut sistemleri optimize edin</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">2</span>
                    <span className="text-gray-700">Dijital yetenekleri genişletin</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">3</span>
                    <span className="text-gray-700">6-12 ay içinde liderlik pozisyonuna yükselme fırsatı</span>
                  </li>
                </>
              )}
              {percentage >= 60 && (
                <>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">1</span>
                    <span className="text-gray-700">İnovasyon ve sürekli iyileştirme odaklı çalışın</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">2</span>
                    <span className="text-gray-700">Rekabet avantajınızı koruyun ve geliştirin</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2">3</span>
                    <span className="text-gray-700">Yeni pazarlara ve teknolojilere yatırım yapın</span>
                  </li>
                </>
              )}
            </ol>
          </div>
        </div>
      </div>

      {/* CEO Recommendation */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">CEO Tavsiyesi</h2>
        <p className="text-lg text-white/90 mb-2">ExportIQ 360 Yönetici Analizi</p>
        <p className="text-white/80 text-lg leading-relaxed">
          {percentage < 40 && `${companyName} için dijital dönüşüm artık bir gereklilik haline gelmiş. Acil eylem planı ve yatırım stratejisi ile 12-18 ay içinde rekabet edebilir seviyeye ulaşabilirsiniz.`}
          {percentage >= 40 && percentage < 60 && `${companyName} dijital dönüşüm yolculuğunda iyi bir noktada. Mevcut momentumu koruyarak 6-12 ay içinde sektör lideri olma potansiyeliniz var.`}
          {percentage >= 60 && `${companyName} dijital olgunluk açısından sektörde lider konumda. İnovasyona devam ederek bu avantajınızı sürdürülebilir kılın.`}
        </p>
      </div>

      {/* Overall Score Summary */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-6xl font-bold text-blue-600">{percentage.toFixed(0)}%</div>
            <div className="text-xl text-gray-600 mt-2">Genel Puan</div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${percentage < 40 ? 'text-red-600' : percentage < 60 ? 'text-yellow-600' : 'text-green-600'}`}>
              {percentage < 40 ? 'Düşük' : percentage < 60 ? 'Orta' : 'Yüksek'}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {percentage < 40 && 'Acil gelişim ve yatırım gereken alanlar mevcut'}
              {percentage >= 40 && percentage < 60 && 'İyileştirme fırsatları mevcut'}
              {percentage >= 60 && 'Güçlü performans, sürdürülebilirlik odağı önemli'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">{result.categoryScores.length}</div>
            <div className="text-gray-600 mt-1">Değerlendirilen Kriter</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">{result.strengths.length}</div>
            <div className="text-gray-600 mt-1">Güçlü Alan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
