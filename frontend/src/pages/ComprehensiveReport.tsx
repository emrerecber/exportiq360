import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { generateReport, ComprehensiveReport as ReportType } from '../services/api';
import { questions } from '../data/assessmentData';

const ComprehensiveReport: React.FC = () => {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [report, setReport] = useState<ReportType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'action'>('overview');

  useEffect(() => {
    if (!user?.id || !assessmentId) {
      navigate('/dashboard');
      return;
    }

    loadReport();
  }, [user, assessmentId]);

  const loadReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await generateReport(
        {
          user_id: user!.id,
          assessment_id: assessmentId!,
          language: 'tr'
        },
        questions
      );

      setReport(response.report);
    } catch (err: any) {
      console.error('Error loading report:', err);
      setError(err.message || 'Rapor yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-blue-100';
    if (percentage >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getLevelBadgeColor = (level: string): string => {
    switch (level) {
      case 'Uzman': return 'bg-purple-100 text-purple-800';
      case 'İleri': return 'bg-blue-100 text-blue-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Başlangıç': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-xl text-gray-700 font-medium mb-2">AI Raporunuz Hazırlanıyor...</p>
          <p className="text-sm text-gray-500 mb-4">Tüm sorularınız analiz ediliyor ve stratejik öneriler oluşturuluyor</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
          <p className="text-xs text-gray-400">Bu işlem 15-30 saniye sürebilir</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="text-red-500 text-6xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Rapor Yüklenemedi</h2>
          <p className="text-gray-600 mb-6 text-center">{error || 'Bir hata oluştu'}</p>
          <div className="space-y-3">
            <button
              onClick={() => loadReport()}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              🔄 Tekrar Dene
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Dashboard'a Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-xl p-8 mb-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🎯 Kapsamlı Değerlendirme Raporu
              </h1>
              <p className="text-gray-600">
                {user?.companyName && `${user.companyName} • `}
                {new Date(report.generated_at).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-6xl font-bold ${getScoreColor(report.overall_score)}`}>
                {report.overall_score.toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 mt-1">Genel Başarı</p>
            </div>
          </div>

          {/* Package Type Badge */}
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
            📦 {report.package_type === 'free_trial' ? 'Ücretsiz Deneme' : 
                 report.package_type === 'ecommerce' ? 'E-Ticaret Paketi' :
                 report.package_type === 'eexport' ? 'E-İhracat Paketi' : 'Kapsamlı Paket'}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: '📊 Genel Bakış', icon: '📊' },
              { id: 'detailed', label: '📋 Detaylı Analiz', icon: '📋' },
              { id: 'action', label: '🚀 Aksiyon Planı', icon: '🚀' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-xl p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Channel Scores */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📍 Kanal Bazlı Performans</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {report.channel_scores.map((channel, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{channel.channel}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(channel.level)}`}>
                          {channel.level}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Puan</span>
                          <span className="font-bold text-gray-900">{channel.score} / {channel.max_score}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${channel.percentage}%` }}
                          />
                        </div>
                        <div className={`text-2xl font-bold text-right ${getScoreColor(channel.percentage)}`}>
                          {channel.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Scores */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Kategori Performansı</h2>
                <div className="space-y-4">
                  {Object.entries(report.category_scores).map(([category, score], index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{category}</h3>
                        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                          {score.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SWOT-like Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💪</span> Güçlü Yönler
                  </h3>
                  <ul className="space-y-3">
                    {report.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">🎯</span> Gelişim Alanları
                  </h3>
                  <ul className="space-y-3">
                    {report.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-2 mt-1">→</span>
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💡</span> Öneriler
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.recommendations.map((rec, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-start">
                      <span className="text-blue-600 font-bold mr-3">{index + 1}.</span>
                      <span className="text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detailed Analysis Tab */}
          {activeTab === 'detailed' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔍 Soru Bazlı AI Analizi</h2>
              {report.question_analyses.map((qa, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                          {qa.category}
                        </span>
                        <span className="text-sm text-gray-500">Soru {index + 1}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-lg">{qa.question_text}</h3>
                    </div>
                    <div className={`ml-4 text-center ${getScoreBackground(qa.user_answer * 20)} px-4 py-2 rounded-lg`}>
                      <div className={`text-3xl font-bold ${getScoreColor(qa.user_answer * 20)}`}>
                        {qa.user_answer}
                      </div>
                      <div className="text-xs text-gray-600">/ 5</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🤖</span>
                      <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">AI Yorumu</p>
                        <p className="text-gray-700">{qa.ai_comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Plan Tab */}
          {activeTab === 'action' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Zaman Bazlı Aksiyon Planı</h2>
              
              {Object.entries(report.action_plan).map(([period, actions], index) => {
                const colors = [
                  { bg: 'from-red-50 to-orange-50', border: 'border-red-300', icon: '⚡' },
                  { bg: 'from-yellow-50 to-amber-50', border: 'border-yellow-300', icon: '📈' },
                  { bg: 'from-green-50 to-emerald-50', border: 'border-green-300', icon: '🎯' }
                ];
                const color = colors[index] || colors[0];

                return (
                  <div key={period} className={`bg-gradient-to-br ${color.bg} p-6 rounded-xl border-2 ${color.border}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">{color.icon}</span>
                      {period}
                    </h3>
                    <ul className="space-y-3">
                      {actions.map((action: string, idx: number) => (
                        <li key={idx} className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                          <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => window.print()}
            className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <span>🖨️</span>
            <span>Yazdır / PDF Olarak Kaydet</span>
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2"
          >
            <span>🏠</span>
            <span>Dashboard'a Dön</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveReport;
