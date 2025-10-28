import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SocialMediaLink {
  platform: string;
  url: string;
  enabled: boolean;
  icon: string;
}

const DEFAULT_SOCIAL_MEDIA: SocialMediaLink[] = [
  { platform: 'Facebook', url: '', enabled: false, icon: '📘' },
  { platform: 'Twitter', url: '', enabled: false, icon: '🐦' },
  { platform: 'LinkedIn', url: '', enabled: false, icon: '💼' },
  { platform: 'Instagram', url: '', enabled: false, icon: '📷' },
  { platform: 'YouTube', url: '', enabled: false, icon: '📺' }
];

export default function SocialMediaManagement() {
  const navigate = useNavigate();
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('social_media_links');
    if (stored) {
      setSocialLinks(JSON.parse(stored));
    } else {
      setSocialLinks(DEFAULT_SOCIAL_MEDIA);
    }
  }, []);

  const handleChange = (index: number, field: 'url' | 'enabled', value: string | boolean) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('social_media_links', JSON.stringify(socialLinks));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Tüm sosyal medya linklerini sıfırlamak istediğinize emin misiniz?')) {
      setSocialLinks(DEFAULT_SOCIAL_MEDIA);
      localStorage.removeItem('social_media_links');
      setSaved(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sosyal Medya Yönetimi</h1>
                <p className="text-sm text-gray-600">Footer'da görünecek sosyal medya linklerini yönetin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {saved && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 font-medium">Değişiklikler kaydedildi!</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600">
            <h2 className="text-2xl font-bold text-white">Sosyal Medya Linkleri</h2>
            <p className="text-blue-100 mt-1">Website footer'ında görünecek sosyal medya hesaplarınızı ekleyin</p>
          </div>

          <div className="p-6 space-y-6">
            {socialLinks.map((link, index) => (
              <div key={link.platform} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{link.icon}</div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{link.platform}</h3>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={link.enabled}
                            onChange={(e) => handleChange(index, 'enabled', e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`block w-14 h-8 rounded-full transition-colors ${
                            link.enabled ? 'bg-blue-600' : 'bg-gray-300'
                          }`}></div>
                          <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                            link.enabled ? 'transform translate-x-6' : ''
                          }`}></div>
                        </div>
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          {link.enabled ? 'Aktif' : 'Pasif'}
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {link.platform} Profil URL
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleChange(index, 'url', e.target.value)}
                        placeholder={`https://${link.platform.toLowerCase()}.com/yourcompany`}
                        disabled={!link.enabled}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>

                    {link.enabled && !link.url && (
                      <p className="text-sm text-orange-600">
                        ⚠️ Bu platform aktif ama URL girilmemiş
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-t-2 border-blue-200 p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">💡 Bilgi:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sadece aktif olan ve URL'si girilmiş platformlar footer'da görünecektir</li>
                  <li>Linkler yeni sekmede açılacaktır</li>
                  <li>URL'lerin doğru formatta olduğundan emin olun (https:// ile başlamalı)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 border-t flex justify-between">
            <button
              onClick={handleReset}
              className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors"
            >
              Sıfırla
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Değişiklikleri Kaydet
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Önizleme</h3>
          <p className="text-sm text-gray-600 mb-4">Footer'da şu şekilde görünecek:</p>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex justify-center space-x-4">
              {socialLinks
                .filter(link => link.enabled && link.url)
                .map(link => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors text-2xl"
                    title={link.platform}
                  >
                    {link.icon}
                  </a>
                ))}
              {socialLinks.filter(link => link.enabled && link.url).length === 0 && (
                <p className="text-gray-400 text-sm">Henüz aktif sosyal medya linki yok</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
