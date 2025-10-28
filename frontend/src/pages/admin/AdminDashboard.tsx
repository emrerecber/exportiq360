import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not admin - TEMPORARILY DISABLED FOR TESTING
  // if (!isAdmin) {
  //   navigate('/dashboard');
  //   return null;
  // }

  // Mock data - gerçek uygulamada API'den gelecek
  const stats = {
    totalUsers: 1247,
    activeUsers: 856,
    totalAssessments: 3421,
    revenue: 124500,
    growthRate: 12.5,
    newUsersThisMonth: 89
  };

  const recentUsers = [
    { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@example.com', company: 'ABC Ltd.', plan: 'Premium', joinDate: '2025-01-15', status: 'active' },
    { id: '2', name: 'Ayşe Demir', email: 'ayse@example.com', company: 'XYZ A.Ş.', plan: 'Standard', joinDate: '2025-01-14', status: 'active' },
    { id: '3', name: 'Mehmet Kaya', email: 'mehmet@example.com', company: 'DEF Corp.', plan: 'Basic', joinDate: '2025-01-13', status: 'active' },
    { id: '4', name: 'Fatma Şahin', email: 'fatma@example.com', company: 'GHI Ltd.', plan: 'Free', joinDate: '2025-01-12', status: 'inactive' },
  ];

  const recentAssessments = [
    { id: '1', userName: 'Ahmet Yılmaz', company: 'ABC Ltd.', type: 'E-Commerce', score: 78, date: '2025-01-20' },
    { id: '2', userName: 'Ayşe Demir', company: 'XYZ A.Ş.', type: 'E-Export', score: 65, date: '2025-01-20' },
    { id: '3', userName: 'Mehmet Kaya', company: 'DEF Corp.', type: 'Combined', score: 82, date: '2025-01-19' },
    { id: '4', userName: 'Fatma Şahin', company: 'GHI Ltd.', type: 'E-Commerce', score: 71, date: '2025-01-19' },
  ];

  const planDistribution = [
    { plan: 'Free', count: 524, percentage: 42 },
    { plan: 'Basic', count: 312, percentage: 25 },
    { plan: 'Standard', count: 286, percentage: 23 },
    { plan: 'Premium', count: 125, percentage: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                <p className="text-indigo-100 text-sm">ExportIQ 360 Yönetim Konsolu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">👋 {user?.name}</span>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-white hover:text-indigo-200 text-sm font-medium"
              >
                Kullanıcı Modu
              </button>
              <button
                onClick={logout}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: '📊 Genel Bakış', icon: '📊' },
              { id: 'users', label: '👥 Kullanıcılar', icon: '👥' },
              { id: 'pricing', label: '💰 Fiyatlandırma', icon: '💰' },
              { id: 'promos', label: '🎟️ Kampanyalar', icon: '🎟️' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Toplam Kullanıcı</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">↑ {stats.newUsersThisMonth} bu ay</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Aktif Kullanıcı</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2">{((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% oran</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Değerlendirme</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalAssessments.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">↑ {stats.growthRate}% artış</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Toplam Gelir</p>
                    <p className="text-3xl font-bold text-gray-900">₺{stats.revenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">↑ {stats.growthRate}% artış</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Paket Dağılımı</h3>
              <div className="space-y-4">
                {planDistribution.map((item) => (
                  <div key={item.plan}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.plan}</span>
                      <span className="text-sm text-gray-600">{item.count} kullanıcı ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Access Cards */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Hızlı Erişim</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/admin/questions')}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-indigo-500 text-left"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Soru Yönetimi</h4>
                  <p className="text-sm text-gray-600">Assessment sorularını düzenle</p>
                </button>
                
                <button
                  onClick={() => navigate('/admin/pricing-management')}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-green-500 text-left"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fiyatlandırma</h4>
                  <p className="text-sm text-gray-600">Paket fiyatlarını güncelle</p>
                </button>
                
                <button
                  onClick={() => navigate('/admin/promo-management')}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-orange-500 text-left"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🎫</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Kampanyalar</h4>
                  <p className="text-sm text-gray-600">Promosyon kodları</p>
                </button>
                
                <button
                  onClick={() => navigate('/admin/social-media')}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-blue-500 text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sosyal Medya</h4>
                  <p className="text-sm text-gray-600">Footer linkleri</p>
                </button>
              </div>
            </div>

            {/* Recent Assessments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Değerlendirmeler</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Kullanıcı</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Şirket</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Tip</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Skor</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAssessments.map((assessment) => (
                      <tr key={assessment.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{assessment.userName}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{assessment.company}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {assessment.type}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-semibold ${assessment.score >= 75 ? 'text-green-600' : assessment.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {assessment.score}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{assessment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Kullanıcı Yönetimi</h3>
              <div className="flex space-x-3">
                <input
                  type="search"
                  placeholder="Kullanıcı ara..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Filtrele
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">İsim</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Şirket</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Paket</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Kayıt Tarihi</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Durum</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.company}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                          Detay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Fiyatlandırma yönetimi ayrı sayfada açılacak</p>
            <button
              onClick={() => navigate('/admin/pricing-management')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Fiyatlandırma Yönetimine Git
            </button>
          </div>
        )}

        {activeTab === 'promos' && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Kampanya yönetimi ayrı sayfada açılacak</p>
            <button
              onClick={() => navigate('/admin/promo-management')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Kampanya Yönetimine Git
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
