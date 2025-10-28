import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import MobileMenu from '../components/MobileMenu';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import { validatePasswordStrength } from '../utils/validation';

export default function Settings() {
  const { user, logout, updateUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    assessmentReminders: true,
    reportUpdates: true,
    marketingEmails: false,
    weeklyDigest: true,
  });

  // Language preference
  const [language, setLanguage] = useState('tr');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock update - In real app, this would call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (updateUser) {
        updateUser({
          ...user!,
          name: profileForm.name,
          email: profileForm.email,
          phone: profileForm.phone,
          company: profileForm.company,
        });
      }

      showToast('success', 'Profil bilgileriniz başarıyla güncellendi!');
    } catch (error) {
      showToast('error', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password strength
    const passwordStrength = validatePasswordStrength(passwordForm.newPassword);
    if (!passwordStrength.isValid) {
      showToast('error', 'Lütfen daha güçlü bir şifre oluşturun.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('error', 'Yeni şifreler eşleşmiyor!');
      return;
    }

    setLoading(true);

    try {
      // Mock password change - In real app, this would call API
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('success', 'Şifreniz başarıyla değiştirildi!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      showToast('error', 'Şifre değiştirilemedi. Mevcut şifrenizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);

    try {
      // Mock update - In real app, this would call API
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('notification_preferences', JSON.stringify(notifications));
      showToast('success', 'Bildirim tercihleri güncellendi!');
    } catch (error) {
      showToast('error', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = async (newLang: string) => {
    setLanguage(newLang);
    localStorage.setItem('preferred_language', newLang);
    showToast('success', `Dil tercihiniz ${newLang === 'tr' ? 'Türkçe' : 'English'} olarak güncellendi!`);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      showToast('info', 'Hesap silme özelliği şu an aktif değil. Lütfen destek ile iletişime geçin.');
    }
  };

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Profil Bilgileri', icon: '👤' },
    { id: 'password', label: 'Şifre Değiştir', icon: '🔒' },
    { id: 'notifications', label: 'Bildirimler', icon: '🔔' },
    { id: 'preferences', label: 'Tercihler', icon: '⚙️' },
    { id: 'account', label: 'Hesap', icon: '🗃️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
              Ayarlar
            </h1>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <div className="space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-3 text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="border-t mt-4 pt-4">
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
          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Profil Bilgileri</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        placeholder="0555 555 55 55"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Şirket Adı
                      </label>
                      <input
                        type="text"
                        value={profileForm.company}
                        onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {loading ? 'Güncelleniyor...' : 'Bilgileri Güncelle'}
                  </button>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Şifre Değiştir</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Mevcut Şifre *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Yeni Şifre *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      minLength={6}
                    />
                    <PasswordStrengthIndicator password={passwordForm.newPassword} />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Yeni Şifre (Tekrar) *
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                      required
                      minLength={6}
                    />
                    {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                      <p className="text-xs text-red-600 mt-1">Şifreler eşleşmiyor</p>
                    )}
                    {passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.newPassword && (
                      <p className="text-xs text-green-600 mt-1 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Şifreler eşleşiyor
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {loading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
                  </button>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Bildirim Tercihleri</h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'E-posta Bildirimleri', description: 'Önemli güncellemeler hakkında e-posta alın' },
                    { key: 'assessmentReminders', label: 'Değerlendirme Hatırlatmaları', description: 'Düzenli değerlendirme hatırlatmaları alın' },
                    { key: 'reportUpdates', label: 'Rapor Güncellemeleri', description: 'Raporlarınız hazır olduğunda bildirim alın' },
                    { key: 'marketingEmails', label: 'Pazarlama E-postaları', description: 'Yeni özellikler ve kampanyalar hakkında bilgi alın' },
                    { key: 'weeklyDigest', label: 'Haftalık Özet', description: 'Haftalık aktivite özetinizi e-posta ile alın' },
                  ].map(item => (
                    <div key={item.key} className="flex items-start justify-between py-3 border-b last:border-0">
                      <div className="flex-1 mr-4">
                        <div className="text-sm sm:text-base font-medium text-gray-900">{item.label}</div>
                        <div className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNotificationUpdate}
                  disabled={loading}
                  className="mt-6 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {loading ? 'Kaydediliyor...' : 'Tercihleri Kaydet'}
                </button>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Genel Tercihler</h2>
                
                <div className="space-y-6">
                  {/* Language Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Dil Tercihi
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleLanguageChange('tr')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          language === 'tr'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">🇹🇷</div>
                        <div className="font-semibold">Türkçe</div>
                      </button>
                      <button
                        onClick={() => handleLanguageChange('en')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          language === 'en'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">🇬🇧</div>
                        <div className="font-semibold">English</div>
                      </button>
                    </div>
                  </div>

                  {/* Theme (Future Feature) */}
                  <div className="opacity-50 pointer-events-none">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Tema (Yakında)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-lg border-2 border-gray-200">
                        <div className="text-2xl mb-2">☀️</div>
                        <div className="font-semibold">Açık Tema</div>
                      </div>
                      <div className="p-4 rounded-lg border-2 border-gray-200">
                        <div className="text-2xl mb-2">🌙</div>
                        <div className="font-semibold">Koyu Tema</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Hesap Yönetimi</h2>
                
                <div className="space-y-6">
                  {/* Account Info */}
                  <div className="p-4 sm:p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Hesap Bilgileri</h3>
                    <div className="space-y-2 text-sm sm:text-base">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hesap Tipi:</span>
                        <span className="font-medium text-gray-900">{user.role === 'admin' ? 'Admin' : 'Kullanıcı'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paket:</span>
                        <span className="font-medium text-gray-900">{user.plan.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Üyelik Tarihi:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Export Data */}
                  <div className="p-4 sm:p-6 border border-gray-200 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Verileri İndir</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      Tüm değerlendirmelerinizi ve raporlarınızı indirin
                    </p>
                    <button
                      onClick={() => showToast('info', 'Veri indirme özelliği yakında aktif olacak!')}
                      className="w-full sm:w-auto px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base"
                    >
                      Verilerimi İndir
                    </button>
                  </div>

                  {/* Delete Account */}
                  <div className="p-4 sm:p-6 border-2 border-red-200 bg-red-50 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-red-900 mb-2">Tehlikeli Bölge</h3>
                    <p className="text-xs sm:text-sm text-red-700 mb-4">
                      Hesabınızı kalıcı olarak silmek istiyorsanız bu işlemi gerçekleştirebilirsiniz. 
                      Bu işlem geri alınamaz ve tüm verileriniz silinecektir.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                    >
                      Hesabı Sil
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
