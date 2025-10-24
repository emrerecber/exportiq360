import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ExportIQ 360
              </span>
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Hakkımızda</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">ExportIQ 360 Nedir?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ExportIQ 360, e-ticaret ve e-ihracat alanında faaliyet gösteren işletmelerin dijital olgunluk seviyelerini 
                değerlendiren, stratejik yol haritaları sunan ve global pazarlarda başarılı olmalarını sağlayan yenilikçi bir 
                değerlendirme platformudur.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kapsamlı assessment'larımız ile işletmenizin güçlü yönlerini ortaya çıkarır, gelişim alanlarını belirler ve 
                size özel aksiyonlar öneriyoruz.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Kanal Bazlı Değerlendirme</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Farklılığımız: Tüm satış kanallarınızı ayrı ayrı analiz ediyoruz!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-blue-600 font-semibold mb-1">🏠 Kendi Siteniz</div>
                    <p className="text-sm text-gray-600">Yurtiçi & Yurtdışı</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-purple-600 font-semibold mb-1">🛍️ Pazaryerleri</div>
                    <p className="text-sm text-gray-600">Ulusal & Global</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Misyonumuz</h2>
              <p className="text-gray-700 leading-relaxed">
                Türk işletmelerinin e-ticaret ve e-ihracat alanında global rekabet gücünü artırmak, dijital dönüşüm 
                süreçlerinde rehberlik etmek ve sürdürülebilir büyüme stratejileri geliştirmelerine yardımcı olmak.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vizyonumuz</h2>
              <p className="text-gray-700 leading-relaxed">
                E-ticaret ve e-ihracat ekosisteminde Türkiye'nin lider değerlendirme ve danışmanlık platformu olmak, 
                binlerce işletmeye uluslararası pazarlarda başarılı olmaları için stratejik destek sağlamak.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Neden ExportIQ 360?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <strong className="font-semibold">4 Farklı Kanal Analizi:</strong> Kendi siteniz (yurtiçi/yurtdışı) ve pazaryerleri (ulusal/global) için ayrı değerlendirme.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <strong className="font-semibold">Uzman Ekip:</strong> E-ticaret ve uluslararası ticaret alanında yılların deneyimine sahip uzmanlar tarafından geliştirilmiştir.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <strong className="font-semibold">Her Kanal İçin Ayrı Skorlar:</strong> Hangi kanalda güçlüsünüz, hangisinde gelişmeye ihtiyacınız var - net görün.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <strong className="font-semibold">Özelleştirilmiş Yönerg eler:</strong> Sadece aktif olduğunuz kanallara özel sorular ve öneriler.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="ml-3 text-gray-700">
                    <strong className="font-semibold">Uygun Fiyat:</strong> Tüm işletmelerin erişebileceği, tek seferlik ödeme ile kapsamlı değerlendirme.
                  </p>
                </div>
              </div>
            </section>

            {/* Channel Details */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hangi Kanalları Kapsıyoruz?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-2 border-blue-200 rounded-xl p-5 hover:border-blue-400 transition-colors">
                  <div className="text-3xl mb-2">🏠</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kendi E-Ticaret Siteniz (Yurtiçi)</h3>
                  <p className="text-sm text-gray-600 mb-2">WooCommerce, Shopify, T-Soft, Ideasoft vb.</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• SEO & Teknik Altyapı</li>
                    <li>• Ödeme Sistemleri</li>
                    <li>• Kullanıcı Deneyimi</li>
                    <li>• Lojistik & Entegrasyonlar</li>
                  </ul>
                </div>
                <div className="border-2 border-purple-200 rounded-xl p-5 hover:border-purple-400 transition-colors">
                  <div className="text-3xl mb-2">🛍️</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ulusal Pazaryerleri</h3>
                  <p className="text-sm text-gray-600 mb-2">Trendyol, Hepsiburada, N11, Çiçeksepeti</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Ürün Listing Optimizasyonu</li>
                    <li>• Kampanya Yönetimi</li>
                    <li>• Müşteri Hizmetleri</li>
                    <li>• Stok & Fiyat Yönetimi</li>
                  </ul>
                </div>
                <div className="border-2 border-green-200 rounded-xl p-5 hover:border-green-400 transition-colors">
                  <div className="text-3xl mb-2">🌍</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kendi Web Siteniz (Yurtdışı)</h3>
                  <p className="text-sm text-gray-600 mb-2">Uluslararası müşterilere satış</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Çok Dil & Para Birimi Desteği</li>
                    <li>• Global Ödeme Yöntemleri</li>
                    <li>• Gümrük & Lojistik</li>
                    <li>• Uluslararası SEO</li>
                  </ul>
                </div>
                <div className="border-2 border-orange-200 rounded-xl p-5 hover:border-orange-400 transition-colors">
                  <div className="text-3xl mb-2">🌐</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Uluslararası Pazaryerleri</h3>
                  <p className="text-sm text-gray-600 mb-2">Amazon, eBay, Etsy, AliExpress</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• FBA & FBM Stratejileri</li>
                    <li>• Global Listing Optimizasyonu</li>
                    <li>• Pazar Analizi</li>
                    <li>• Uluslararası Reklam</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">İletişim</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700"><strong>E-posta:</strong> info@exportiq360.com</p>
                <p className="text-gray-700"><strong>Telefon:</strong> +90 (212) 123 45 67</p>
                <p className="text-gray-700"><strong>Adres:</strong> İstanbul, Türkiye</p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
