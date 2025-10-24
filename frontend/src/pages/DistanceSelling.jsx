import React from 'react';
import { Link } from 'react-router-dom';
import { PLANS } from '../data/plans';

const DistanceSelling = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mesafeli Satış Sözleşmesi</h1>
          <p className="text-gray-600 mb-8">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Taraflar</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">SATICI BİLGİLERİ:</h3>
                <p className="text-gray-700">Ünvan: ExportIQ 360</p>
                <p className="text-gray-700">Adres: İstanbul, Türkiye</p>
                <p className="text-gray-700">E-posta: info@exportiq360.com</p>
                <p className="text-gray-700">Telefon: +90 (212) 123 45 67</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>ALICI:</strong> Platform üzerinden kayıt olan ve satın alma işlemi yapan gerçek veya tüzel kişidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Sözleşmenin Konusu</h2>
              <p className="text-gray-700 leading-relaxed">
                İşbu sözleşme, SATICI'nın dijital ortamda sunduğu e-ticaret ve e-ihracat assessment hizmetlerinin 
                elektronik ortamda sipariş edilen ürünün satışı ve teslimi ile ilgili tarafların hak ve yükümlülüklerini 
                düzenlemektedir. Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler 
                Yönetmeliği (RG: 27.11.2014/29188) hükümlerine tabidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Sözleşme Konusu Ürün/Hizmet</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                SATICI tarafından sunulan dijital ürünler aşağıdaki assessment paketlerinden oluşmaktadır:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{PLANS.ecommerce.name}</h3>
                  <p className="text-gray-700">• 50+ soru</p>
                  <p className="text-gray-700">• Fiyat: {PLANS.ecommerce.price} {PLANS.ecommerce.currency} (KDV Dahil)</p>
                  <p className="text-gray-700">• Tek seferlik ödeme</p>
                  <p className="text-gray-700">• Dijital ürün - Anında erişim</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{PLANS.eexport.name}</h3>
                  <p className="text-gray-700">• 60+ soru</p>
                  <p className="text-gray-700">• Fiyat: {PLANS.eexport.price} {PLANS.eexport.currency} (KDV Dahil)</p>
                  <p className="text-gray-700">• Tek seferlik ödeme</p>
                  <p className="text-gray-700">• Dijital ürün - Anında erişim</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900">{PLANS.combined.name}</h3>
                  <p className="text-gray-700">• Her iki assessment (110+ soru)</p>
                  <p className="text-gray-700">• Fiyat: {PLANS.combined.price.toLocaleString('tr-TR')} {PLANS.combined.currency} (KDV Dahil) - %28 İndirimli</p>
                  <p className="text-gray-700">• Tek seferlik ödeme</p>
                  <p className="text-gray-700">• Dijital ürün - Anında erişim</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Ödeme ve Teslimat</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Ödeme Yöntemi:</strong> Kredi kartı veya banka kartı ile online ödeme
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Teslimat:</strong> Ödeme onayını takiben dijital ürüne anında erişim sağlanır. Assessment'a erişim 
                bilgileri kullanıcı hesabınıza tanımlanır ve e-posta adresinize gönderilir.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Erişim Süresi:</strong> Satın alınan assessment'lara 90 gün boyunca sınırsız erişim sağlanır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cayma Hakkı - ÖNEMLİ</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-4">
                <p className="text-gray-800 font-semibold mb-2">DİKKAT:</p>
                <p className="text-gray-700 leading-relaxed">
                  6502 sayılı Tüketicinin Korunması Hakkında Kanun'un 15. maddesi ve Mesafeli Sözleşmeler Yönetmeliği'nin 
                  15. maddesinin (ğ) bendi uyarınca, <strong className="text-gray-900">dijital içerik ve hizmetlerde, 
                  tüketicinin onayı ile ifanın başlaması durumunda cayma hakkı kullanılamaz.</strong>
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platformumuz üzerinden sunulan assessment hizmetleri dijital içerik niteliğindedir ve satın alma işlemi 
                tamamlandıktan sonra anında erişime açılmaktadır. ALICI, satın alma işlemini tamamlayarak dijital içeriğe 
                erişim sağladığında, <strong>cayma hakkından feragat ettiğini kabul eder.</strong>
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bu nedenle, <strong className="text-gray-900">satın alınan dijital assessment hizmetleri için cayma hakkı 
                bulunmamaktadır ve ücret iadesi yapılmamaktadır.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. ALICI'nın Hak ve Yükümlülükleri</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>ALICI, sözleşme konusu ürün/hizmetin fiyatını ve açıklamalarını okuyup bilgi sahibi olduğunu, 
                elektronik ortamda gerekli teyidi verdiğini kabul eder.</li>
                <li>ALICI, assessment'a erişim bilgilerini güvenli bir şekilde saklamak ve üçüncü kişilerle paylaşmamakla 
                yükümlüdür.</li>
                <li>ALICI, satın aldığı dijital içeriği ticari amaçla kullanamaz, çoğaltamaz veya dağıtamaz.</li>
                <li>ALICI, ödeme bilgilerinin doğruluğundan sorumludur.</li>
                <li>ALICI, platformu kullanırken yürürlükteki mevzuata uygun davranmakla yükümlüdür.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. SATICI'nın Hak ve Yükümlülükleri</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>SATICI, ödeme onayını takiben assessment'a anında erişim sağlamakla yükümlüdür.</li>
                <li>SATICI, teknik arızalar haricinde hizmet kesintisi yaşanmaması için gerekli önlemleri alır.</li>
                <li>SATICI, ALICI'nın kişisel verilerini Gizlilik Politikası ve KVKK hükümleri çerçevesinde korur.</li>
                <li>SATICI, assessment içeriğini önceden haber vermeksizin güncelleme hakkını saklı tutar.</li>
                <li>SATICI, hizmet sunumunda karşılaşılan teknik sorunlarda destek sağlamakla yükümlüdür.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Fikri Mülkiyet Hakları</h2>
              <p className="text-gray-700 leading-relaxed">
                Platform üzerindeki tüm içerik, yazılım, tasarım, logo, grafik, metin ve diğer materyaller SATICI'ya aittir 
                ve telif hakları ile korunmaktadır. ALICI, bu içerikleri izinsiz kopyalayamaz, çoğaltamaz, değiştiremez 
                veya ticari amaçla kullanamaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Mücbir Sebepler</h2>
              <p className="text-gray-700 leading-relaxed">
                Doğal afetler, yangın, patlamalar, iç savaşlar, savaş, ayaklanma, halk hareketleri, seferberlik ilanı, 
                grev, lokavt ve salgın hastalıklar, altyapı ve internet arızaları gibi ve SATICI'nın kontrolünde olmayan 
                mücbir sebep halleri nedeniyle sözleşme yükümlülüklerini süresi içinde yerine getiremezse, SATICI 
                sorumlu tutulmaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Uyuşmazlık Çözümü</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                İşbu sözleşmeden doğabilecek ihtilaflarda; Sanayi ve Ticaret Bakanlığı'nca her yıl Aralık ayında belirlenen 
                parasal sınırlar dahilinde tüketicinin yerleşim yerinin bulunduğu veya tüketici işleminin yapıldığı yerdeki 
                Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bu sözleşme ALICI tarafından elektronik ortamda onaylanmış olup, Türkiye Cumhuriyeti yasalarına tabidir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Yürürlük</h2>
              <p className="text-gray-700 leading-relaxed">
                ALICI, platform üzerinden sipariş verdiği anda bu sözleşmenin tüm koşullarını kabul etmiş sayılır. 
                Sözleşme, sipariş anında yürürlüğe girer ve ödeme tamamlandığında hüküm ifade eder.
              </p>
            </section>

            <div className="bg-blue-50 rounded-lg p-6 mt-8">
              <p className="text-gray-800 font-semibold mb-2">Onay Beyanı:</p>
              <p className="text-gray-700 leading-relaxed">
                Satın alma işlemini tamamlayarak, işbu Mesafeli Satış Sözleşmesi'ni okuduğunuzu, anladığınızı ve 
                kabul ettiğinizi, özellikle cayma hakkının dijital ürünler için geçerli olmadığını bildiğinizi 
                ve dijital içeriğe anında erişim sağlanması nedeniyle cayma hakkından feragat ettiğinizi beyan etmiş 
                olursunuz.
              </p>
            </div>
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

export default DistanceSelling;
