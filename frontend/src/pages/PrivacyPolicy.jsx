import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Gizlilik Sözleşmesi</h1>
          <p className="text-gray-600 mb-8">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Giriş</h2>
              <p className="text-gray-700 leading-relaxed">
                ExportIQ 360 olarak, kullanıcılarımızın gizliliğine önem veriyoruz. Bu Gizlilik Sözleşmesi, 
                platformumuz üzerinden topladığımız kişisel verilerin nasıl kullanıldığını, saklandığını ve korunduğunu 
                açıklamaktadır. Hizmetlerimizi kullanarak bu gizlilik politikasını kabul etmiş olursunuz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Toplanan Bilgiler</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platformumuz üzerinden aşağıdaki bilgileri toplayabiliriz:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
                <li>Şirket bilgileri (şirket adı, vergi numarası, adres)</li>
                <li>Ödeme bilgileri (kredi kartı bilgileri üçüncü taraf ödeme sağlayıcıları üzerinden işlenir)</li>
                <li>Assessment yanıtları ve işletme verileri</li>
                <li>Platform kullanım verileri (IP adresi, tarayıcı bilgileri, ziyaret süreleri)</li>
                <li>Çerez (cookie) verileri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Verilerin Kullanımı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Topladığımız verileri aşağıdaki amaçlarla kullanırız:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Hizmetlerimizi sunmak ve iyileştirmek</li>
                <li>Assessment raporları oluşturmak ve kişiselleştirilmiş öneriler sunmak</li>
                <li>Ödeme işlemlerini gerçekleştirmek</li>
                <li>Müşteri desteği sağlamak</li>
                <li>Platform güvenliğini sağlamak</li>
                <li>Yasal yükümlülükleri yerine getirmek</li>
                <li>Size bilgilendirme e-postaları göndermek (izniniz dahilinde)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Verilerin Paylaşımı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmayız:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Yasal zorunluluklar (mahkeme kararı, resmi talep)</li>
                <li>Ödeme işlemleri için güvenilir ödeme sağlayıcıları (örn. Iyzico, PayTR)</li>
                <li>Hizmet sağlayıcılar (hosting, e-posta servisleri) - gizlilik sözleşmeleri ile korunarak</li>
                <li>Açık rızanızın bulunduğu durumlar</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Veri Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed">
                Verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri kullanıyoruz. 
                Bu önlemler şunları içerir:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>SSL/TLS şifreleme</li>
                <li>Güvenli veri saklama</li>
                <li>Düzenli güvenlik denetimleri</li>
                <li>Erişim kontrolü ve yetkilendirme</li>
                <li>Şifreleme algoritmaları ile hassas verilerin korunması</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Çerezler (Cookies)</h2>
              <p className="text-gray-700 leading-relaxed">
                Platformumuz, kullanıcı deneyimini iyileştirmek ve analiz yapmak amacıyla çerezler kullanmaktadır. 
                Tarayıcı ayarlarınızdan çerezleri yönetebilir veya reddedebilirsiniz. Ancak, bazı çerezlerin reddedilmesi 
                platformun bazı özelliklerinin çalışmamasına neden olabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Kullanıcı Hakları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenmiş kişisel verileriniz hakkında bilgi talep etme</li>
                <li>Kişisel verilerinizin düzeltilmesini talep etme</li>
                <li>Kişisel verilerinizin silinmesini veya yok edilmesini talep etme</li>
                <li>Otomatik sistemler ile profilleme yapılmasına itiraz etme</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Bu haklarınızı kullanmak için info@exportiq360.com adresine e-posta gönderebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Veri Saklama Süresi</h2>
              <p className="text-gray-700 leading-relaxed">
                Kişisel verilerinizi, ilgili yasal düzenlemelerde öngörülen veya işleme amacının gerektirdiği süre boyunca 
                saklıyoruz. Hesabınızı sildiğinizde, yasal yükümlülükler dışında kalan verileriniz kalıcı olarak silinir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Üçüncü Taraf Bağlantılar</h2>
              <p className="text-gray-700 leading-relaxed">
                Platformumuz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik politikalarından 
                sorumlu değiliz. Üçüncü taraf siteleri ziyaret ettiğinizde kendi gizlilik politikalarını incelemenizi öneririz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Politika Değişiklikleri</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu Gizlilik Sözleşmesi'ni zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda sizi 
                e-posta yoluyla bilgilendireceğiz. Güncellenmiş politika, yayınlandığı tarihte yürürlüğe girer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. İletişim</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Gizlilik politikamız hakkında sorularınız varsa bizimle iletişime geçebilirsiniz:
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

export default PrivacyPolicy;
