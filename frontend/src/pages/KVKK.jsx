import React from 'react';
import { Link } from 'react-router-dom';

const KVKK = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kişisel Verilerin Korunması</h1>
          <p className="text-gray-600 mb-8">KVKK Aydınlatma Metni - Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Veri Sorumlusu</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700"><strong>Ünvan:</strong> ExportIQ 360</p>
                <p className="text-gray-700"><strong>Adres:</strong> İstanbul, Türkiye</p>
                <p className="text-gray-700"><strong>E-posta:</strong> info@exportiq360.com</p>
                <p className="text-gray-700"><strong>Telefon:</strong> +90 (212) 123 45 67</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu 
                sıfatıyla ExportIQ 360 tarafından aşağıda açıklanan kapsamda işlenebilecektir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Kişisel Verilerin İşlenme Amacı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Platform üyelik işlemlerinin gerçekleştirilmesi ve yönetilmesi</li>
                <li>Assessment hizmetlerinin sunulması ve sonuçlarının raporlanması</li>
                <li>Ödeme ve fatura işlemlerinin gerçekleştirilmesi</li>
                <li>Müşteri ilişkileri yönetimi ve destek hizmetlerinin sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Platform güvenliğinin sağlanması ve dolandırıcılığın önlenmesi</li>
                <li>İstatistiksel analizler ve hizmet kalitesinin iyileştirilmesi</li>
                <li>Pazarlama ve tanıtım faaliyetleri (açık rızanız dahilinde)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. İşlenen Kişisel Veri Kategorileri</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Kimlik Bilgileri</h3>
                  <p className="text-gray-700">Ad, soyad, T.C. kimlik numarası (isteğe bağlı)</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">İletişim Bilgileri</h3>
                  <p className="text-gray-700">E-posta adresi, telefon numarası, adres</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Müşteri İşlem Bilgileri</h3>
                  <p className="text-gray-700">Satın alma geçmişi, ödeme bilgileri, fatura bilgileri</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">İşletme Bilgileri</h3>
                  <p className="text-gray-700">Şirket adı, vergi numarası, sektör bilgileri</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Assessment Verileri</h3>
                  <p className="text-gray-700">Anket yanıtları, değerlendirme sonuçları, raporlar</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Teknik Veriler</h3>
                  <p className="text-gray-700">IP adresi, çerez bilgileri, tarayıcı bilgileri, cihaz bilgileri</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Kişisel Verilerin Toplanma Yöntemi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Platform üzerinden kayıt formları ve kullanıcı girişleri</li>
                <li>Assessment anketleri ve değerlendirme formları</li>
                <li>Ödeme işlemleri sırasında</li>
                <li>E-posta, telefon veya iletişim formu üzerinden yapılan iletişimler</li>
                <li>Çerezler ve otomatik veri toplama araçları</li>
                <li>Üçüncü taraf ödeme sistemleri (Iyzico, PayTR vb.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Kişisel Verilerin Aktarılması</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen şartlar dahilinde aşağıdaki kişi ve 
                kuruluşlara aktarılabilir:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Ödeme Kuruluşları:</strong> Ödeme işlemlerinin gerçekleştirilmesi amacıyla</li>
                <li><strong>Teknoloji Hizmet Sağlayıcıları:</strong> Hosting, bulut depolama ve teknik altyapı</li>
                <li><strong>E-posta Servisleri:</strong> Bilgilendirme ve iletişim amaçlı</li>
                <li><strong>Yasal Otoriteler:</strong> Yasal yükümlülükler kapsamında</li>
                <li><strong>Denetim ve Danışmanlık Firmaları:</strong> Yasal uyumluluk ve denetim süreçleri</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Kişisel verileriniz yurt dışına aktarılması durumunda, KVKK'nın 9. maddesinde belirtilen şartlara 
                uyulacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanarak 
                işlenmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Sözleşmenin kurulması veya ifası için gerekli olması</li>
                <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması</li>
                <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun 
                meşru menfaatleri için veri işlenmesinin zorunlu olması</li>
                <li>Açık rızanızın bulunması (pazarlama faaliyetleri için)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Kişisel Veri Sahibinin Hakları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KVKK'nın 11. maddesi uyarınca, kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
                <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya 
                yok edilmesini isteme</li>
                <li>Kişisel verilerinizin düzeltilmesi, silinmesi veya yok edilmesi halinde bu işlemlerin kişisel 
                verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize 
                bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması halinde zararın 
                giderilmesini talep etme</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Kişisel Veri Sahibinin Haklarını Kullanma Yöntemi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerle başvuruda bulunabilirsiniz:
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-4">
                <p className="text-gray-800 font-semibold mb-2">Başvuru Yöntemleri:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>E-posta:</strong> info@exportiq360.com</li>
                  <li><strong>Yazılı Başvuru:</strong> İstanbul, Türkiye adresine noter veya iadeli taahhütlü posta</li>
                  <li><strong>KEP Adresi:</strong> (varsa KEP adresi eklenebilir)</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Başvurularınızda aşağıdaki bilgilerin yer alması gerekmektedir:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Ad, soyad ve başvuru yazılı ise imza</li>
                <li>T.C. kimlik numarası veya pasaport numarası</li>
                <li>Tebligat için adres bilgisi</li>
                <li>Talep konusu</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Başvurularınız, talebin niteliğine göre en geç 30 (otuz) gün içinde ücretsiz olarak 
                sonuçlandırılacaktır. Ancak, işlemin ayrıca bir maliyeti gerektirmesi halinde, Kişisel Verileri Koruma 
                Kurulu tarafından belirlenen tarifedeki ücret alınabilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Veri Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed">
                Kişisel verilerinizin güvenliğini sağlamak amacıyla aşağıdaki teknik ve idari tedbirler alınmıştır:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                <li>SSL/TLS şifreleme protokolleri</li>
                <li>Güvenlik duvarları ve sızma tespit sistemleri</li>
                <li>Düzenli güvenlik testleri ve denetimleri</li>
                <li>Erişim yetkilendirme ve log kayıtları</li>
                <li>Veri yedekleme ve kurtarma sistemleri</li>
                <li>Personel eğitimleri ve gizlilik taahhütleri</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Çerez Politikası</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platformumuz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerez kullanımı 
                hakkında detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Tarayıcı ayarlarınızdan çerezleri yönetebilir veya reddedebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Değişiklikler</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu Aydınlatma Metni, yasal düzenlemelerdeki değişiklikler veya şirket politikalarındaki güncellemeler 
                nedeniyle zaman zaman güncellenebilir. Güncellemeler platform üzerinden duyurulacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. İletişim</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz hakkında sorularınız için:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 space-y-2">
                <p className="text-gray-700"><strong>E-posta:</strong> info@exportiq360.com</p>
                <p className="text-gray-700"><strong>Telefon:</strong> +90 (212) 123 45 67</p>
                <p className="text-gray-700"><strong>Adres:</strong> İstanbul, Türkiye</p>
              </div>
            </section>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mt-8">
              <p className="text-gray-800 font-semibold mb-2">Bilgilendirme:</p>
              <p className="text-gray-700 leading-relaxed">
                Bu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca hazırlanmıştır. 
                Platformumuzu kullanarak, kişisel verilerinizin bu metinde belirtilen şekilde işleneceğini kabul 
                etmiş olursunuz.
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

export default KVKK;
