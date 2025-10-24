import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PLANS } from '../data/plans';

const DEFAULT_SOCIAL_ICONS = {
  Facebook: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>,
  Twitter: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>,
  LinkedIn: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>,
  Instagram: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>,
  YouTube: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [socialLinks, setSocialLinks] = useState([]);

  // Carousel announcements
  const announcements = [
    {
      id: 1,
      type: 'campaign',
      title: 'Ücretsiz Deneme!',
      description: 'Kayıt olun, 10 soruluk ücretsiz assessment ile başlayın!',
      bgColor: 'from-orange-500 to-red-500',
      icon: '🎁'
    },
    {
      id: 2,
      type: 'feature',
      title: 'Yeni Özellik: Kanal Bazlı Analiz',
      description: 'Artık tüm satış kanallarınızı ayrı ayrı değerlendirebilirsiniz!',
      bgColor: 'from-blue-500 to-indigo-500',
      icon: '🚀'
    },
    {
      id: 3,
      type: 'announcement',
      title: '90 Gün Erişim',
      description: 'Raporlarınıza 3 ay boyunca sınırsız erişin',
      bgColor: 'from-green-500 to-teal-500',
      icon: '✨'
    }
  ];

  // Load social media links
  useEffect(() => {
    const stored = localStorage.getItem('social_media_links');
    if (stored) {
      const links = JSON.parse(stored);
      setSocialLinks(links.filter(link => link.enabled && link.url));
    }
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <nav className="bg-white shadow-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ExportIQ 360
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                Hakkımızda
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Fiyatlandırma
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                İletişim
              </Link>
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Giriş Yap
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Başlayın
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tüm Satış Kanallarınız
              </span>
              <br />
              Tek Bir Platformda Analiz Edin
            </h1>
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Kendi web siteniz mi? Trendyol, Hepsiburada gibi ulusal pazaryerleri mi? 
              Amazon, eBay gibi uluslararası platformlar mı?
            </p>
            <p className="text-lg text-gray-700 font-semibold mb-8 max-w-3xl mx-auto">
              <span className="text-blue-600">Hangi kanalda satış yapıyor olursanız olun</span>, dijital olgunluğunuzu ölçün ve büyüme stratejinizi belirleyin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Hemen Başlayın
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-all shadow-lg border-2 border-blue-600"
              >
                Paketleri İnceleyin
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">4</div>
              <div className="text-gray-600 mt-2">Farklı Satış Kanalı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">100+</div>
              <div className="text-gray-600 mt-2">Uzman Sorusu</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">360°</div>
              <div className="text-gray-600 mt-2">Kanal Analizi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">90 Gün</div>
              <div className="text-gray-600 mt-2">Erişim Süresi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Carousel */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Carousel Container */}
            <div className="relative h-48 md:h-32">
              {announcements.map((announcement, index) => (
                <div
                  key={announcement.id}
                  className={`absolute inset-0 transition-all duration-700 transform ${
                    index === currentSlide
                      ? 'opacity-100 translate-x-0'
                      : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className={`h-full bg-gradient-to-r ${announcement.bgColor} flex items-center justify-between px-8 md:px-12`}>
                    <div className="flex items-center space-x-4 md:space-x-6">
                      <div className="text-5xl md:text-6xl">{announcement.icon}</div>
                      <div className="text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-1">{announcement.title}</h3>
                        <p className="text-sm md:text-base text-white/90">{announcement.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/pricing')}
                      className="hidden md:block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
                    >
                      Detayları Gör
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden ExportIQ 360?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşletmenizin dijital dönüşüm yolculuğunda yanınızdayız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kapsamlı Değerlendirme
              </h3>
              <p className="text-gray-600">
                E-ticaret ve e-ihracat süreçlerinizi 360 derece analiz ediyor, güçlü ve gelişim alanlarınızı belirliyoruz.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Detaylı Raporlar
              </h3>
              <p className="text-gray-600">
                İşletmenize özel detaylı raporlar, grafikler ve aksiyonlar ile stratejik kararlar alın.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hızlı ve Kolay
              </h3>
              <p className="text-gray-600">
                20-35 dakikada tamamlayın, anında raporunuza erişin. İstediğiniz zaman ara verip devam edin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Channels Section */}
      <div className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hangi Kanalda Satış Yapıyorsanız, Sizi Kapsıyoruz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her satış kanalının kendine özgü dinamikleri var. Biz hepsini analiz ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Own E-commerce Site - Domestic */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Kendi E-Ticaret Siteniz (Yurtiçi)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    WooCommerce, Shopify, T-Soft, Ideasoftveyadijerozelplatformunuzvar?Sitenizin teknik altyapısından SEO'suna,ödeme sistemlerinden müşteri deneyimine kadar herşeyi değerlendiriyoruz.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">SEO</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">Ödeme Sistemleri</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">UX/UI</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">Lojistik</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Domestic Marketplaces */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-500">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ulusal Pazaryerleri
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Trendyol, Hepsiburada, N11, Çiçeksepeti gibi platformlarda satış yapıyormusunuz?Ürün listeleme, kampanya yönetimi, müşteri hizmetleri ve performans metriklerinizi analiz ediyoruz.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">Listing Optimizasyonu</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">Kampanya Yönetimi</span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">Stok Yönetimi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Own Website - International */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-green-500">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Kendi Web Siteniz (Yurtdışı)
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Uluslararası müşterilere kendi sitenizden satış yapıyormusunuz?Çok dilli destek, uluslararasıödeme yöntemleri, gümrük süreçleri ve global lojistik yetkinliklerinizi değerlendiriyoruz.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">Çok Dil Desteği</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">Global Ödemeler</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">Gümrük</span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">Lojistik</span>
                  </div>
                </div>
              </div>
            </div>

            {/* International Marketplaces */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-orange-500">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Uluslararası Pazaryerleri
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Amazon, eBay, Etsy, AliExpress gibi global platformlarda mı satış yapıyormusunuz?FBA yönetimi, uluslararası SEO, reklam kampanyaları ve pazar analizi konularında yetkinliklerinizi ölçüyoruz.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">Amazon FBA</span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">Global SEO</span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">Pazar Analizi</span>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">Reklam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-semibold text-blue-600">Assessment başlangıcında</span> hangi kanallarda aktif olduğunuzu seçeceksiniz.
                Biz de size <span className="font-semibold">sadece ilgili kanallara özgü sorular</span> soracak ve 
                <span className="font-semibold text-blue-600"> her kanal için ayrı skorlar</span> sunacağız.
              </p>
              <button
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Paketleri İnceleyin ve Başlayın
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              İhtiyacınıza Uygun Paket Seçin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tek seferlik ödeme ile dijital dönüşüm yolculuğunuza başlayın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* E-Commerce Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{PLANS.ecommerce.name}</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">{PLANS.ecommerce.price} {PLANS.ecommerce.currency}</div>
              <p className="text-gray-600 mb-6">50+ soru • 20-25 dakika</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Kendi site + Pazaryerleri analizi</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Her kanal için ayrı skorlar</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">90 gün erişim + Anında rapor</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Detayları Görüntüle
              </button>
            </div>

            {/* E-Export Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{PLANS.eexport.name}</h3>
              <div className="text-4xl font-bold text-blue-600 mb-4">{PLANS.eexport.price} {PLANS.eexport.currency}</div>
              <p className="text-gray-600 mb-6">60+ soru • 30-35 dakika</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Kendi site + Global pazaryerleri</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Uluslararası kanal skorları</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">90 gün erişim + Anında rapor</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Detayları Görüntüle
              </button>
            </div>

            {/* Combined Package - Highlighted */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 relative transform md:scale-105">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                %28 İndirim
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{PLANS.combined.name}</h3>
              <div className="text-4xl font-bold text-white mb-4">{PLANS.combined.price.toLocaleString('tr-TR')} {PLANS.combined.currency}</div>
              <p className="text-blue-100 mb-6">110+ soru • Tüm kanallar</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-300 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Tüm 4 kanal tam analizi</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-300 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">Her kanal için detaylı skorlar</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-300 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">90 gün + Öncelikli destek</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Detayları Görüntüle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Dijital Dönüşüm Yolculuğunuza Bugün Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            İşletmenizin potansiyelini keşfedin ve global pazarlarda fark yaratın
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Ücretsiz Hesap Oluşturun
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <span className="text-xl font-bold text-white">
                  ExportIQ 360
                </span>
              </Link>
              <p className="text-gray-400 text-sm">
                E-ticaret ve e-ihracat dijital olgunluk değerlendirme platformu
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Hızlı Erişim</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white transition-colors">
                    Fiyatlandırma
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Yasal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy-policy" className="hover:text-white transition-colors">
                    Gizlilik Sözleşmesi
                  </Link>
                </li>
                <li>
                  <Link to="/distance-selling" className="hover:text-white transition-colors">
                    Mesafeli Satış Sözleşmesi
                  </Link>
                </li>
                <li>
                  <Link to="/kvkk" className="hover:text-white transition-colors">
                    KVKK
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2 text-sm">
                <li>info@exportiq360.com</li>
                <li>+90 (212) 123 45 67</li>
                <li>İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ExportIQ 360. Tüm hakları saklıdır.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex space-x-6 mt-4 md:mt-0">
                {socialLinks.map((link) => (
                  <a 
                    key={link.platform}
                    href={link.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors" 
                    title={link.platform}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      {DEFAULT_SOCIAL_ICONS[link.platform] || null}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
