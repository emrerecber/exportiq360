import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getPlans } from '../utils/planLoader';

interface CheckoutState {
  planKey?: 'ecommerce' | 'eexport' | 'combined' | 'free_trial';
  selectedPackage?: 'ecommerce' | 'eexport' | 'combined' | 'free_trial';
  promoCode?: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const state = location.state as CheckoutState;
  
  // Load plans from localStorage or defaults
  const PLANS = getPlans();
  
  // Support both planKey and selectedPackage (from pricing page)
  const planKey = state?.planKey || state?.selectedPackage;

  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState(state?.promoCode || '');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [invoiceType, setInvoiceType] = useState<'individual' | 'corporate'>('individual');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'google_pay' | 'apple_pay'>('credit_card');
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    identityNumber: '',
    // Corporate fields
    companyName: '',
    taxOffice: '',
    taxNumber: '',
    companyAddress: '',
    // Address fields
    address: '',
    city: '',
    country: 'Türkiye',
    zipCode: ''
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  // Redirect if no plan selected
  useEffect(() => {
    if (!planKey) {
      navigate('/pricing');
    }
  }, [planKey, navigate]);

  if (!planKey || planKey === 'free_trial') {
    // Free trial doesn't need checkout
    if (planKey === 'free_trial') {
      navigate('/free-trial');
      return null;
    }
    return null;
  }

  const selectedPlan = PLANS[planKey];
  const subtotal = selectedPlan.price;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const applyPromoCode = () => {
    // Mock promo code validation - gerçek uygulamada API'den kontrol edilecek
    const validCodes: Record<string, number> = {
      'WELCOME2025': 20,
      'PREMIUM50': 50,
      'NEWYEAR100': 100
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      setPromoApplied(true);
      alert(`Kampanya kodu uygulandı! %${validCodes[promoCode.toUpperCase()]} indirim kazandınız.`);
    } else {
      alert('Geçersiz kampanya kodu!');
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\s/g, '');
    const chunks = numbers.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : '';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardInfo({ ...cardInfo, cardNumber: formatCardNumber(value) });
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // iyzico ödeme entegrasyonu için gerekli parametreler
      const paymentData = {
        // Fiyat bilgileri
        price: total.toFixed(2),
        paidPrice: total.toFixed(2),
        currency: 'TRY',
        installment: '1',
        
        // Sepet bilgileri
        basketId: `BASKET-${Date.now()}`,
        paymentChannel: 'WEB',
        paymentGroup: 'PRODUCT',
        
        // Kart bilgileri
        paymentCard: {
          cardHolderName: cardInfo.cardHolder,
          cardNumber: cardInfo.cardNumber.replace(/\s/g, ''),
          expireMonth: cardInfo.expiryMonth,
          expireYear: cardInfo.expiryYear,
          cvc: cardInfo.cvv,
          registerCard: '0'
        },
        
        // Alıcı bilgileri
        buyer: {
          id: user?.id || 'BUYER-' + Date.now(),
          name: billingInfo.firstName,
          surname: billingInfo.lastName,
          gsmNumber: billingInfo.phone,
          email: billingInfo.email,
          identityNumber: billingInfo.identityNumber,
          registrationAddress: billingInfo.address,
          city: billingInfo.city,
          country: billingInfo.country,
          zipCode: billingInfo.zipCode,
          ip: '85.34.78.112' // Gerçek uygulamada backend'den alınacak
        },
        
        // Fatura adresi
        billingAddress: {
          contactName: `${billingInfo.firstName} ${billingInfo.lastName}`,
          city: billingInfo.city,
          country: billingInfo.country,
          address: billingInfo.address,
          zipCode: billingInfo.zipCode
        },
        
        // Ürün detayları
        basketItems: [{
          id: planKey,
          name: selectedPlan.name,
          category1: 'Subscription',
          itemType: 'VIRTUAL',
          price: total.toFixed(2)
        }]
      };

      // Mock API call - Gerçek uygulamada backend'e gönderilecek
      console.log('iyzico Payment Data:', paymentData);
      
      // Backend'den iyzico'ya istek atılacak
      // const response = await fetch('/api/payment/iyzico', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(paymentData)
      // });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful payment
      alert('Ödeme başarılı! Paketiniz aktifleştirildi.');
      navigate('/dashboard', { 
        state: { 
          paymentSuccess: true,
          plan: planKey 
        } 
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/pricing')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Güvenli Ödeme</h1>
                <p className="text-sm text-gray-600">iyzico ile güvenli ödeme</p>
              </div>
            </div>
            <img 
              src="https://www.iyzico.com/assets/images/logo.svg" 
              alt="iyzico" 
              className="h-8"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Type Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Fatura Tipi</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setInvoiceType('individual')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    invoiceType === 'individual'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-semibold">Bireysel Fatura</span>
                  </div>
                </button>
                <button
                  onClick={() => setInvoiceType('corporate')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    invoiceType === 'corporate'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-semibold">Kurumsal Fatura</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Fatura Bilgileri</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad *
                  </label>
                  <input
                    type="text"
                    value={billingInfo.firstName}
                    onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soyad *
                  </label>
                  <input
                    type="text"
                    value={billingInfo.lastName}
                    onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    value={billingInfo.phone}
                    onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                    placeholder="+90 555 555 55 55"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                {invoiceType === 'individual' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TC Kimlik No *
                    </label>
                    <input
                      type="text"
                      value={billingInfo.identityNumber}
                      onChange={(e) => setBillingInfo({ ...billingInfo, identityNumber: e.target.value })}
                      maxLength={11}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Firma Fatura Ünvanı *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.companyName}
                        onChange={(e) => setBillingInfo({ ...billingInfo, companyName: e.target.value })}
                        placeholder="Örn: ABC Teknoloji A.Ş."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vergi Dairesi *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.taxOffice}
                        onChange={(e) => setBillingInfo({ ...billingInfo, taxOffice: e.target.value })}
                        placeholder="Örn: Kadıköy"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vergi Numarası *
                      </label>
                      <input
                        type="text"
                        value={billingInfo.taxNumber}
                        onChange={(e) => setBillingInfo({ ...billingInfo, taxNumber: e.target.value })}
                        maxLength={10}
                        placeholder="10 haneli vergi numarası"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şehir *
                  </label>
                  <input
                    type="text"
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres *
                  </label>
                  <textarea
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ödeme Yöntemi</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm font-medium">Kredi Kartı</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'google_pay'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">G</div>
                    <span className="text-sm font-medium">Google Pay</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2"></div>
                    <span className="text-sm font-medium">Apple Pay</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Card Information */}
            {paymentMethod === 'credit_card' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Kart Bilgileri</h2>
              <form onSubmit={handlePayment}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kart Üzerindeki İsim *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.cardHolder}
                      onChange={(e) => setCardInfo({ ...cardInfo, cardHolder: e.target.value.toUpperCase() })}
                      placeholder="AD SOYAD"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kart Numarası *
                    </label>
                    <input
                      type="text"
                      value={cardInfo.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ay *
                      </label>
                      <select
                        value={cardInfo.expiryMonth}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiryMonth: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Ay</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Yıl *
                      </label>
                      <select
                        value={cardInfo.expiryYear}
                        onChange={(e) => setCardInfo({ ...cardInfo, expiryYear: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Yıl</option>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                          <option key={year} value={year.toString().slice(-2)}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardInfo.cvv}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value.length <= 3 && /^\d*$/.test(value)) {
                            setCardInfo({ ...cardInfo, cvv: value });
                          }
                        }}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  256-bit SSL şifrelemesi ile güvenli ödeme
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      İşleniyor...
                    </>
                  ) : (
                    `₺${total.toFixed(2)} Öde`
                  )}
                </button>
              </form>
            </div>
            )}

            {/* Alternative Payment Info */}
            {(paymentMethod === 'google_pay' || paymentMethod === 'apple_pay') && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">
                  {paymentMethod === 'google_pay' ? '📱' : ''}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {paymentMethod === 'google_pay' ? 'Google Pay' : 'Apple Pay'} ile Öde
                </h3>
                <p className="text-gray-600 mb-6">
                  Ödeme işlemi için cihazınızdaki {paymentMethod === 'google_pay' ? 'Google Pay' : 'Apple Pay'} uygulaması kullanılacaktır.
                </p>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'İşleniyor...' : `₺${total.toFixed(2)} Öde`}
                </button>
              </div>
            </div>
            )}

            {/* Security Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Güvenli Ödeme</p>
                  <p>Kart bilgileriniz iyzico altyapısı üzerinden güvenli şekilde işlenir. Kartınızdan tek seferde ödeme alınır.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Paket</span>
                  <span className="font-semibold text-gray-900">{selectedPlan.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fiyat</span>
                  <span className="font-semibold text-gray-900">₺{subtotal}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>İndirim ({promoCode})</span>
                    <span className="font-semibold">-₺{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-bold text-gray-900">Toplam</span>
                    <span className="font-bold text-indigo-600">₺{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kampanya Kodu
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="KAMPANYA KODU"
                    disabled={promoApplied}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 uppercase disabled:bg-gray-100"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={promoApplied || !promoCode}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Uygula
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Paket Özellikleri</h3>
                <ul className="space-y-2">
                  {selectedPlan.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                  {selectedPlan.features.length > 5 && (
                    <li className="text-sm text-gray-500 ml-6">+{selectedPlan.features.length - 5} daha fazla özellik</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
