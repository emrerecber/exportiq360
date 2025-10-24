import React, { useState } from 'react';

const ChannelSelector = ({ onChannelsSelected, selectedChannels = [] }) => {
  const [selected, setSelected] = useState(selectedChannels);

  const channels = [
    {
      id: 'domestic-own',
      name: 'Kendi E-Ticaret Siteniz (Yurtiçi)',
      description: 'Kendi e-ticaret siteniz üzerinden yurtiçi satış yapıyorsunuz',
      icon: '🏠',
      color: 'blue',
      platforms: 'WooCommerce, Shopify, T-Soft, Ideasoft',
      questions: '12-15 soru',
      topics: ['SEO', 'Ödeme', 'UX/UI', 'Lojistik']
    },
    {
      id: 'domestic-marketplace',
      name: 'Ulusal Pazaryerleri',
      description: 'Trendyol, Hepsiburada, N11 gibi platformlarda satış yapıyorsunuz',
      icon: '🛍️',
      color: 'purple',
      platforms: 'Trendyol, Hepsiburada, N11, Çiçeksepeti',
      questions: '10-12 soru',
      topics: ['Listing', 'Kampanya', 'Stok', 'M.Hizmetleri']
    },
    {
      id: 'international-own',
      name: 'Kendi Web Siteniz (Yurtdışı)',
      description: 'Kendi siteniz üzerinden uluslararası satış yapıyorsunuz',
      icon: '🌍',
      color: 'green',
      platforms: 'Çok dilli web siteniz',
      questions: '15-18 soru',
      topics: ['Çok Dil', 'Global Ödeme', 'Gümrük', 'Int.SEO']
    },
    {
      id: 'international-marketplace',
      name: 'Uluslararası Pazaryerleri',
      description: 'Amazon, eBay, Etsy gibi global platformlarda satış yapıyorsunuz',
      icon: '🌐',
      color: 'orange',
      platforms: 'Amazon, eBay, Etsy, AliExpress',
      questions: '12-15 soru',
      topics: ['FBA', 'Global SEO', 'Pazar Analizi', 'Reklam']
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        selectedBorder: 'border-blue-500',
        selectedBg: 'bg-blue-50',
        text: 'text-blue-600',
        ring: 'ring-blue-500'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        selectedBorder: 'border-purple-500',
        selectedBg: 'bg-purple-50',
        text: 'text-purple-600',
        ring: 'ring-purple-500'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        selectedBorder: 'border-green-500',
        selectedBg: 'bg-green-50',
        text: 'text-green-600',
        ring: 'ring-green-500'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        selectedBorder: 'border-orange-500',
        selectedBg: 'bg-orange-50',
        text: 'text-orange-600',
        ring: 'ring-orange-500'
      }
    };
    return colors[color];
  };

  const toggleChannel = (channelId) => {
    const newSelected = selected.includes(channelId)
      ? selected.filter(id => id !== channelId)
      : [...selected, channelId];
    setSelected(newSelected);
  };

  const handleContinue = () => {
    if (selected.length > 0 && onChannelsSelected) {
      onChannelsSelected(selected);
    }
  };

  const getTotalQuestions = () => {
    const counts = {
      'domestic-own': 15,
      'domestic-marketplace': 12,
      'international-own': 18,
      'international-marketplace': 15
    };
    return selected.reduce((sum, id) => sum + (counts[id] || 0), 0);
  };

  const getEstimatedTime = () => {
    const total = getTotalQuestions();
    const minutes = Math.ceil(total * 1.5); // Soru başına ~1.5 dakika
    return minutes;
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Hangi Kanallarda Satış Yapıyorsunuz?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Size özel bir değerlendirme için aktif olduğunuz satış kanallarını seçin. 
          Birden fazla kanal seçebilirsiniz.
        </p>
      </div>

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {channels.map((channel) => {
          const isSelected = selected.includes(channel.id);
          const colors = getColorClasses(channel.color);

          return (
            <div
              key={channel.id}
              onClick={() => toggleChannel(channel.id)}
              className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? `${colors.selectedBorder} ${colors.selectedBg} ring-2 ${colors.ring} ring-opacity-50 shadow-lg`
                  : `${colors.border} hover:${colors.selectedBorder} hover:shadow-md bg-white`
              }`}
            >
              {/* Selection Checkmark */}
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center ${colors.text}`}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="text-5xl mb-4">{channel.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 pr-10">
                {channel.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">
                {channel.description}
              </p>

              {/* Platforms */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-1">PLATFORMLAR:</p>
                <p className="text-sm text-gray-700">{channel.platforms}</p>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {channel.questions}
                </span>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-2">
                {channel.topics.map((topic, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-xs font-medium`}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary & Continue */}
      {selected.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {selected.length} Kanal Seçildi
              </h3>
              <p className="text-sm text-gray-600">
                Yaklaşık {getTotalQuestions()} soru • Tahmini {getEstimatedTime()} dakika
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Devam Et</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          💡 <strong>İpucu:</strong> Sadece aktif olduğunuz kanallara özel sorular alacaksınız. 
          İstediğiniz zaman kaldığınız yerden devam edebilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default ChannelSelector;
