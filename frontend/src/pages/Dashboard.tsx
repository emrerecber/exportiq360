import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PLANS } from '../data/plans';
import EmptyState from '../components/common/EmptyState';
import MobileMenu from '../components/MobileMenu';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [savedAssessments, setSavedAssessments] = useState<any[]>([]);

  // Load saved assessments
  useEffect(() => {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    setSavedAssessments(assessments);
  }, []);

  if (!user) {
    return null;
  }

  const currentPlan = PLANS[user.plan] || PLANS['free_trial'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menüyü Aç"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ExportIQ 360
            </h1>
            <div className="hidden md:flex items-center space-x-4">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin/dashboard')}
                  className="text-purple-600 hover:text-purple-700 transition-colors flex items-center space-x-1 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Admin Panel</span>
                </button>
              )}
              <button
                onClick={() => navigate('/pricing')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Paketler
              </button>
              <button
                onClick={() => navigate('/assessment-type')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all"
              >
                Yeni Değerlendirme
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                >
                  Çıkış
                </button>
              </div>
            </div>
            
            {/* Mobile Actions */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => navigate('/assessment-type')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:opacity-90 transition-all"
                aria-label="Yeni Değerlendirme"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        {/* Mobile Navigation */}
        <div className="space-y-2 mb-6">
          {[
            { id: 'overview', icon: '🏠', label: 'Genel Bakış', action: 'view' },
            { id: 'assessments', icon: '📊', label: 'Değerlendirmelerim', action: 'view' },
            { id: 'subscription', icon: '👑', label: 'Abonelik', action: 'view' },
            { id: 'profile', icon: '👤', label: 'Profil', action: 'view' },
            { id: 'settings', icon: '⚙️', label: 'Ayarlar', action: 'navigate' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.action === 'navigate') {
                  navigate(`/${item.id}`);
                  setIsMobileMenuOpen(false);
                } else {
                  setCurrentView(item.id);
                  setIsMobileMenuOpen(false);
                }
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                currentView === item.id && item.action === 'view'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile User Info */}
        <div className="border-t pt-4 space-y-3">
          <div className="px-4 py-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-gray-600">Kullanıcı</div>
            <div className="font-semibold text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
          
          {isAdmin && (
            <button
              onClick={() => {
                navigate('/admin/dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors flex items-center font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Admin Panel
            </button>
          )}
          
          <button
            onClick={() => {
              navigate('/pricing');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Paketler
          </button>
          
          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </MobileMenu>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Sidebar - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <nav className="space-y-2">
                {[
                  { id: 'overview', icon: '🏠', label: 'Genel Bakış' },
                  { id: 'assessments', icon: '📊', label: 'Değerlendirmelerim' },
                  { id: 'subscription', icon: '👑', label: 'Abonelik' },
                  { id: 'profile', icon: '👤', label: 'Profil' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center px-4 py-3 rounded-lg transition-all hover:bg-gray-100 text-gray-700 border-t mt-2 pt-4"
                >
                  <span className="mr-3">⚙️</span>
                  Ayarlar
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 w-full">
            {currentView === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Hoş Geldiniz, {user.name}!
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">Dijital ticaret yetkinlik paneliniz</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="text-2xl sm:text-3xl mb-2">📊</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                      {savedAssessments.length}
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">Değerlendirme</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="text-2xl sm:text-3xl mb-2">👑</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{currentPlan.name}</div>
                    <div className="text-sm sm:text-base text-gray-600">Paket</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                    <div className="text-2xl sm:text-3xl mb-2">📅</div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                      {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">Üyelik Tarihi</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button
                      onClick={() => navigate('/assessment-type')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition-all"
                    >
                      Yeni Değerlendirme Başlat
                    </button>
                    <button
                      onClick={() => setCurrentView('subscription')}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition-all"
                    >
                      Paketimi Yükselt
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'subscription' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Abonelik & Paketler</h2>
                <div className="mb-4 sm:mb-6 p-4 sm:p-6 bg-blue-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">Mevcut Paket</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900">{currentPlan.name}</div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                      {currentPlan.price} {currentPlan.currency}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/pricing')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg text-sm sm:text-base font-medium hover:opacity-90"
                >
                  Paket Değiştir
                </button>
              </div>
            )}

            {currentView === 'assessments' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Değerlendirmelerim</h2>
                {savedAssessments.length > 0 ? (
                  <div className="space-y-4">
                    {savedAssessments.map((assessment, index) => (
                      <div 
                        key={assessment.id || index} 
                        className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-indigo-500 transition-colors cursor-pointer"
                        onClick={() => {
                          // Store selected assessment and navigate to report
                          localStorage.setItem('current_report', JSON.stringify(assessment));
                          navigate('/report');
                        }}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                          <div className="flex-1">
                            <div className="text-sm sm:text-base font-semibold text-gray-900 capitalize">
                              {assessment.assessmentType === 'e-commerce' ? 'E-Ticaret' : 
                               assessment.assessmentType === 'e-export' ? 'E-İhracat' : 
                               'Kapsamlı'} Değerlendirmesi
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-1">
                              {new Date(assessment.completedAt).toLocaleDateString('tr-TR')}
                            </div>
                            {assessment.companyInfo?.companyName && (
                              <div className="text-xs text-gray-500 mt-1">
                                {assessment.companyInfo.companyName}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                            <div className="text-xl sm:text-2xl font-bold text-blue-600">{assessment.percentage.toFixed(1)}%</div>
                            <div className="text-xs text-gray-500 capitalize">
                              {assessment.maturityLevel === 'basic' ? 'Temel' :
                               assessment.maturityLevel === 'intermediate' ? 'Orta' :
                               assessment.maturityLevel === 'advanced' ? 'İleri' : 'Uzman'}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-end">
                          <span className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700">
                            Raporu Görüntüle →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="📊"
                    title="Henüz değerlendirme yapmadınız"
                    description="İlk dijital yetkinlik değerlendirmenizi yaparak işletmenizin güçlü ve gelişmeye açık yönlerini keşfedin."
                    actionLabel="İlk Değerlendirmeyi Başlat"
                    onAction={() => navigate('/assessment-type')}
                  />
                )}
              </div>
            )}

            {currentView === 'profile' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Profil Ayarları</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                    <input
                      type="text"
                      value={user.name}
                      disabled
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">E-posta</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  {user.company && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Şirket</label>
                      <input
                        type="text"
                        value={user.company}
                        disabled
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
