import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const InvoiceManagement = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    taxOffice: '',
    taxNumber: '',
    address: '',
    city: '',
    packageName: 'ExportIQ 360 Assessment Paketi',
    amount: 0,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const invoicePayload = {
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
          tax_office: formData.taxOffice || null,
          tax_number: formData.taxNumber || null,
          address: formData.address || null,
          city: formData.city || null,
          country: 'TR'
        },
        items: [
          {
            description: formData.packageName,
            quantity: 1,
            unit_price: parseFloat(formData.amount),
            vat_rate: 20
          }
        ],
        notes: formData.notes || null,
        currency: 'TRY'
      };

      const response = await axios.post(`${API_URL}/invoice/create`, invoicePayload);
      
      if (response.data.success) {
        setResult({
          success: true,
          invoiceNumber: response.data.invoice_number,
          invoiceUrl: response.data.invoice_url,
          totalAmount: response.data.total_amount
        });
        
        // Form sıfırla
        setFormData({
          customerName: '',
          customerEmail: '',
          taxOffice: '',
          taxNumber: '',
          address: '',
          city: '',
          packageName: 'ExportIQ 360 Assessment Paketi',
          amount: 0,
          notes: ''
        });
      } else {
        setError(response.data.error || 'Fatura oluşturulamadı');
      }
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Fatura Yönetimi
            </h1>
            <p className="text-gray-600">
              Paraşüt entegrasyonu ile fatura oluşturun
            </p>
          </div>

          {result && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">✓ Fatura Başarıyla Oluşturuldu</h3>
              <div className="text-sm text-green-700">
                <p><strong>Fatura No:</strong> {result.invoiceNumber}</p>
                <p><strong>Toplam Tutar:</strong> {result.totalAmount} TRY</p>
                {result.invoiceUrl && (
                  <a 
                    href={result.invoiceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block"
                  >
                    Faturayı Görüntüle →
                  </a>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">✕ Hata</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Müşteri Bilgileri */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Müşteri Bilgileri
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Müşteri Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Şirket veya Kişi Adı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vergi Dairesi
                  </label>
                  <input
                    type="text"
                    name="taxOffice"
                    value={formData.taxOffice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Kadıköy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vergi Numarası / TC
                  </label>
                  <input
                    type="text"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tam adres..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şehir
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="İstanbul"
                />
              </div>
            </div>

            {/* Fatura Detayları */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Fatura Detayları
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paket/Ürün Adı <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tutar (KDV Hariç) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
                <p className="text-sm text-gray-500 mt-1">
                  KDV Dahil: {(formData.amount * 1.2).toFixed(2)} TRY
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notlar
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Fatura ile ilgili ek notlar..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Fatura Oluşturuluyor...' : 'Fatura Oluştur'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManagement;
