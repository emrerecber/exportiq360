import React, { useState } from 'react';
import { AssessmentResult, BenchmarkData, Roadmap, Milestone } from '../../types/assessment';
import { categories } from '../../data/assessmentData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import ExecutiveDashboard from './ExecutiveDashboard';
import ROIAnalysis from './ROIAnalysis';
import BenchmarkAnalysis from './BenchmarkAnalysis';
import RecommendationsAnalysis from './RecommendationsAnalysis';
import RoadmapAnalysis from './RoadmapAnalysis';
import { exportToPDF, exportAllSections } from '../../utils/pdfExport';

interface EnhancedReportViewProps {
  result: AssessmentResult;
  language: 'tr' | 'en';
  onNewAssessment: () => void;
  benchmarkData?: BenchmarkData;
  roadmap?: Roadmap;
}

const EnhancedReportView: React.FC<EnhancedReportViewProps> = ({
  result,
  language,
  onNewAssessment,
  benchmarkData,
  roadmap
}) => {
  const [activeTab, setActiveTab] = useState<'executive' | 'roi' | 'benchmark' | 'detailed' | 'recommendations' | 'roadmap'>('executive');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCurrentTab = async () => {
    // PDF export geçici olarak devre dışı (oklch renk sorunu)
    alert('PDF indirme özelliği şu anda geliştirilmektedir. Ekran görüntüsü alabilir veya sayfayı yazdırabilirsiniz (Ctrl+P).');
    return;
    
    /* setIsExporting(true);
    try {
      const companyName = result.companyInfo?.companyName || 'Şirket';
      await exportToPDF(`report-content-${activeTab}`, {
        filename: `ExportIQ_360_${activeTab}_${new Date().toISOString().split('T')[0]}.pdf`,
        companyName,
        reportDate: result.completedAt.toLocaleDateString('tr-TR')
      });
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsExporting(false);
    } */
  };

  const handleExportAllSections = async () => {
    // PDF export geçici olarak devre dışı (oklch renk sorunu)
    alert('PDF indirme özelliği şu anda geliştirilmektedir. Yazdır komutu (Ctrl+P) ile PDF olarak kaydedebilirsiniz.');
    return;
    
    /* setIsExporting(true);
    try {
      const companyName = result.companyInfo?.companyName || 'Şirket';
      const sectionIds = [
        'report-content-executive',
        'report-content-roi',
        'report-content-benchmark',
        'report-content-detailed',
        'report-content-recommendations',
        'report-content-roadmap'
      ];
      await exportAllSections(sectionIds, {
        filename: `ExportIQ_360_Complete_Report_${new Date().toISOString().split('T')[0]}.pdf`,
        companyName,
        reportDate: result.completedAt.toLocaleDateString('tr-TR')
      });
    } catch (error) {
      console.error('Complete PDF export failed:', error);
      alert('Tam rapor oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsExporting(false);
    } */
  };

  const texts = {
    tr: {
      title: 'E-Ticaret Olgunluk Değerlendirme Raporu',
      executiveSummary: 'Yönetici Özeti',
      detailedAnalysis: 'Detaylı Analiz',
      recommendations: 'Öneriler',
      roadmap: 'Yol Haritası',
      benchmark: 'Karşılaştırmalı Analiz',
      overallScore: 'Genel Skor',
      maturityLevel: 'Olgunluk Seviyesi',
      strengths: 'Güçlü Yönler',
      weaknesses: 'Zayıf Yönler',
      criticalActions: 'Kritik Aksiyonlar',
      categoryScores: 'Kategori Skorları',
      trendAnalysis: 'Trend Analizi',
      quickWins: 'Hızlı Kazanımlar',
      longTermStrategy: 'Uzun Vadeli Strateji',
      roiEstimate: 'ROI Tahmini',
      timeline: '3 Aylık Plan',
      timeline6: '6 Aylık Plan',
      timeline12: '12 Aylık Plan',
      milestones: 'Kilometre Taşları',
      kpis: 'KPI Hedefleri',
      industryAverage: 'Sektör Ortalaması',
      topPerformers: 'En İyi Performans',
      yourScore: 'Sizin Skorunuz',
      percentile: 'Yüzdelik Dilim',
      newAssessment: 'Yeni Değerlendirme',
      downloadReport: 'Raporu İndir',
      shareReport: 'Raporu Paylaş',
      
      // Maturity levels
      basic: 'Temel',
      intermediate: 'Orta',
      advanced: 'İleri',
      expert: 'Uzman',

      // Categories
      strategy: 'Strateji ve Planlama',
      technology: 'Teknoloji ve Alt Yapı',
      marketing: 'Dijital Pazarlama',
      operations: 'Operasyonlar',
      analytics: 'Analitik ve Raporlama',
      customer: 'Müşteri Deneyimi',
      finance: 'Finans ve Ödeme'
    },
    en: {
      title: 'E-Commerce Maturity Assessment Report',
      executiveSummary: 'Executive Summary',
      detailedAnalysis: 'Detailed Analysis',
      recommendations: 'Recommendations',
      roadmap: 'Roadmap',
      benchmark: 'Benchmark Analysis',
      overallScore: 'Overall Score',
      maturityLevel: 'Maturity Level',
      strengths: 'Strengths',
      weaknesses: 'Weaknesses',
      criticalActions: 'Critical Actions',
      categoryScores: 'Category Scores',
      trendAnalysis: 'Trend Analysis',
      quickWins: 'Quick Wins',
      longTermStrategy: 'Long-term Strategy',
      roiEstimate: 'ROI Estimate',
      timeline: '3 Month Plan',
      timeline6: '6 Month Plan',
      timeline12: '12 Month Plan',
      milestones: 'Milestones',
      kpis: 'KPI Targets',
      industryAverage: 'Industry Average',
      topPerformers: 'Top Performers',
      yourScore: 'Your Score',
      percentile: 'Percentile',
      newAssessment: 'New Assessment',
      downloadReport: 'Download Report',
      shareReport: 'Share Report',

      // Maturity levels
      basic: 'Basic',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      expert: 'Expert',

      // Categories
      strategy: 'Strategy and Planning',
      technology: 'Technology and Infrastructure',
      marketing: 'Digital Marketing',
      operations: 'Operations',
      analytics: 'Analytics and Reporting',
      customer: 'Customer Experience',
      finance: 'Finance and Payment'
    }
  };

  const t = texts[language];

  // Maturity level colors
  const maturityColors = {
    basic: '#EF4444',     // Red
    intermediate: '#F59E0B', // Yellow
    advanced: '#10B981',     // Green
    expert: '#8B5CF6'        // Purple
  };

  // Chart data preparation
  const radarData = result.categoryScores.map(score => {
    const category = categories.find(c => c.id === score.categoryId);
    return {
      category: category?.name[language] || score.categoryId,
      score: score.percentage,
      fullMark: 100
    };
  });

  const barData = result.categoryScores.map(score => {
    const category = categories.find(c => c.id === score.categoryId);
    return {
      category: category?.name[language] || score.categoryId,
      score: score.percentage,
      color: category?.color || '#6366F1'
    };
  });

  // Mock trend data (would come from previous assessments)
  const trendData = [
    { month: 'Jan', score: Math.max(0, result.percentage - 25) },
    { month: 'Feb', score: Math.max(0, result.percentage - 20) },
    { month: 'Mar', score: Math.max(0, result.percentage - 15) },
    { month: 'Apr', score: Math.max(0, result.percentage - 10) },
    { month: 'May', score: Math.max(0, result.percentage - 5) },
    { month: 'Jun', score: result.percentage }
  ];

  const TabButton = ({ tabKey, label }: { tabKey: typeof activeTab, label: string }) => (
    <button
      onClick={() => setActiveTab(tabKey)}
      className={`px-6 py-3 rounded-t-lg font-medium transition-all duration-300 ${
        activeTab === tabKey
          ? 'bg-white text-indigo-600 border-b-2 border-indigo-600'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Dashboard'a Dön</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onNewAssessment}
                className="text-sm text-gray-700 hover:text-gray-900 font-medium flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Yeni Değerlendirme</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">
                {result.completedAt.toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US')}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleExportCurrentTab}
                disabled={isExporting}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Hazırlanıyor...
                  </>
                ) : (
                  `${t.downloadReport} (${activeTab})`
                )}
              </button>
              <button
                onClick={handleExportAllSections}
                disabled={isExporting}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Hazırlanıyor...
                  </>
                ) : (
                  'Tam Rapor İndir (PDF)'
                )}
              </button>
              <button
                onClick={onNewAssessment}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t.newAssessment}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
            <TabButton tabKey="executive" label={t.executiveSummary} />
            <TabButton tabKey="roi" label="ROI Analizi" />
            <TabButton tabKey="benchmark" label={t.benchmark} />
            <TabButton tabKey="detailed" label={t.detailedAnalysis} />
            <TabButton tabKey="recommendations" label={t.recommendations} />
            <TabButton tabKey="roadmap" label={t.roadmap} />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'executive' && (
            <div id="report-content-executive">
              <ExecutiveDashboard 
                result={result} 
                language={language}
                companyName={result.companyInfo?.companyName || 'Şirket'}
              />
            </div>
          )}

          {activeTab === 'executive-old' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
                  <div className="text-3xl font-bold">{result.percentage.toFixed(1)}%</div>
                  <div className="text-indigo-200">{t.overallScore}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
                  <div className="text-2xl font-bold capitalize" style={{ color: maturityColors[result.maturityLevel] }}>
                    {t[result.maturityLevel]}
                  </div>
                  <div className="text-purple-200">{t.maturityLevel}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl text-white">
                  <div className="text-3xl font-bold">{result.strengths.length}</div>
                  <div className="text-green-200">{t.strengths}</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl text-white">
                  <div className="text-3xl font-bold">{result.criticalActions.length}</div>
                  <div className="text-red-200">{t.criticalActions}</div>
                </div>
              </div>

              {/* Top Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Top 3 {t.strengths}
                  </h3>
                  <ul className="space-y-2">
                    {result.strengths.slice(0, 3).map((strength, index) => (
                      <li key={index} className="text-green-700 flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    Top 3 {t.weaknesses}
                  </h3>
                  <ul className="space-y-2">
                    {result.weaknesses.slice(0, 3).map((weakness, index) => (
                      <li key={index} className="text-red-700 flex items-start">
                        <span className="text-red-600 mr-2">!</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                    {t.criticalActions}
                  </h3>
                  <ul className="space-y-2">
                    {result.criticalActions.slice(0, 3).map((action, index) => (
                      <li key={index} className="text-yellow-700 flex items-start">
                        <span className="text-yellow-600 mr-2">⚡</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Overview Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.categoryScores}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        dataKey="score"
                        stroke="#6366F1"
                        fill="#6366F1"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.trendAnalysis}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'detailed' && (
            <div id="report-content-detailed" className="space-y-8">
              {/* Detailed Category Analysis */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">{t.categoryScores}</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <XAxis 
                      dataKey="category" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Category Details */}
              <div className="grid gap-6">
                {result.categoryScores.map((score) => {
                  const category = categories.find(c => c.id === score.categoryId);
                  if (!category) return null;

                  return (
                    <div key={score.categoryId} className="p-6 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <h4 className="text-lg font-semibold text-gray-800">
                            {category.name[language]}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-800">
                            {score.percentage.toFixed(1)}%
                          </div>
                          <div className="text-sm text-gray-500">
                            {score.answeredQuestions}/{score.totalQuestions} cevaplanmış
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${score.percentage}%`,
                              backgroundColor: category.color 
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm">
                        {category.description[language]}
                      </p>

                      {score.unknownCount > 0 && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-yellow-800 text-sm">
                            ⚠️ {score.unknownCount} soruda "Fikrim Yok" cevabı verilmiş - Bu alanda farkındalık gelişimi gerekiyor.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div id="report-content-recommendations">
              <RecommendationsAnalysis result={result} language={language} />
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div id="report-content-roadmap">
              <RoadmapAnalysis percentage={result.percentage} language={language} />
            </div>
          )}

          {activeTab === 'roi' && (
            <div id="report-content-roi">
              <ROIAnalysis percentage={result.percentage} language={language} />
            </div>
          )}

          {activeTab === 'benchmark' && (
            <div id="report-content-benchmark">
              <BenchmarkAnalysis result={result} language={language} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedReportView;