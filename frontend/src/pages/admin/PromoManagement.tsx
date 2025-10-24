import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PromoCode } from '../../types/auth';

const PromoManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [showCreateForm, setShowCreateForm] = useState(false);

  // TEMPORARILY DISABLED FOR TESTING
  // if (!isAdmin) {
  //   navigate('/dashboard');
  //   return null;
  // }

  // Mock promo codes - gerçek uygulamada API'den gelecek
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: '1',
      code: 'WELCOME2025',
      discountType: 'percentage',
      discountValue: 20,
      planApplicable: ['basic', 'standard', 'premium'],
      maxUses: 100,
      usedCount: 45,
      validFrom: '2025-01-01',
      validUntil: '2025-03-31',
      isActive: true,
      createdBy: 'admin@exportiq.com',
      createdAt: '2025-01-01'
    },
    {
      id: '2',
      code: 'PREMIUM50',
      discountType: 'percentage',
      discountValue: 50,
      planApplicable: ['premium'],
      maxUses: 50,
      usedCount: 12,
      validFrom: '2025-01-15',
      validUntil: '2025-02-15',
      isActive: true,
      createdBy: 'admin@exportiq.com',
      createdAt: '2025-01-15'
    },
    {
      id: '3',
      code: 'NEWYEAR100',
      discountType: 'fixed',
      discountValue: 100,
      planApplicable: ['standard', 'premium'],
      maxUses: 200,
      usedCount: 156,
      validFrom: '2025-01-01',
      validUntil: '2025-01-31',
      isActive: false,
      createdBy: 'admin@exportiq.com',
      createdAt: '2025-01-01'
    }
  ]);

  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 0,
    planApplicable: [] as string[],
    maxUses: undefined as number | undefined,
    validFrom: '',
    validUntil: '',
    isActive: true
  });

  const handleCreate = () => {
    const newPromo: PromoCode = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      discountType: formData.discountType,
      discountValue: formData.discountValue,
      planApplicable: formData.planApplicable as any,
      maxUses: formData.maxUses,
      usedCount: 0,
      validFrom: formData.validFrom,
      validUntil: formData.validUntil,
      isActive: formData.isActive,
      createdBy: user?.email || 'admin',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPromoCodes([...promoCodes, newPromo]);
    setShowCreateForm(false);
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      planApplicable: [],
      maxUses: undefined,
      validFrom: '',
      validUntil: '',
      isActive: true
    });
    alert('Kampanya kodu başarıyla oluşturuldu!');
  };

  const togglePromoStatus = (id: string) => {
    setPromoCodes(promoCodes.map(promo => 
      promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
    ));
  };

  const deletePromo = (id: string) => {
    if (confirm('Bu kampanya kodunu silmek istediğinizden emin misiniz?')) {
      setPromoCodes(promoCodes.filter(promo => promo.id !== id));
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Kod kopyalandı: ${code}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <h1 className="text-2xl font-bold text-gray-900">Kampanya Yönetimi</h1>
                <p className="text-sm text-gray-600">İndirim ve promosyon kodları oluşturun</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Yeni Kampanya Kodu</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Aktif Kampanya</p>
                <p className="text-3xl font-bold text-gray-900">
                  {promoCodes.filter(p => p.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Toplam Kullanım</p>
                <p className="text-3xl font-bold text-gray-900">
                  {promoCodes.reduce((sum, p) => sum + p.usedCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Kalan Kullanım</p>
                <p className="text-3xl font-bold text-gray-900">
                  {promoCodes.reduce((sum, p) => sum + ((p.maxUses || 0) - p.usedCount), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pasif Kampanya</p>
                <p className="text-3xl font-bold text-gray-900">
                  {promoCodes.filter(p => !p.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-indigo-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Yeni Kampanya Kodu Oluştur</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kampanya Kodu *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="ÖRNEK2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İndirim Tipi *
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="percentage">Yüzde (%)</option>
                      <option value="fixed">Sabit (TL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İndirim Miktarı *
                    </label>
                    <input
                      type="number"
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maksimum Kullanım
                  </label>
                  <input
                    type="number"
                    value={formData.maxUses || ''}
                    onChange={(e) => setFormData({ ...formData, maxUses: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="Limitsiz için boş bırakın"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geçerli Paketler
                  </label>
                  <div className="space-y-2">
                    {['free', 'basic', 'standard', 'premium'].map(plan => (
                      <label key={plan} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.planApplicable.includes(plan)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, planApplicable: [...formData.planApplicable, plan] });
                            } else {
                              setFormData({ ...formData, planApplicable: formData.planApplicable.filter(p => p !== plan) });
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700 capitalize">{plan}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Başlangıç Tarihi *
                    </label>
                    <input
                      type="date"
                      value={formData.validFrom}
                      onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitiş Tarihi *
                    </label>
                    <input
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Aktif olarak oluştur
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleCreate}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Kampanya Oluştur
              </button>
            </div>
          </div>
        )}

        {/* Promo Codes List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kampanya Kodu</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">İndirim</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Kullanım</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Geçerlilik</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Durum</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {promoCodes.map((promo) => (
                  <tr key={promo.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-semibold text-gray-900">{promo.code}</span>
                        <button
                          onClick={() => copyToClipboard(promo.code)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Kodu kopyala"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-indigo-600">
                        {promo.discountType === 'percentage' 
                          ? `%${promo.discountValue}` 
                          : `₺${promo.discountValue}`}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-900">{promo.usedCount}</span>
                        {promo.maxUses && (
                          <span className="text-sm text-gray-500">/ {promo.maxUses}</span>
                        )}
                      </div>
                      {promo.maxUses && (
                        <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-indigo-600 h-1.5 rounded-full"
                            style={{ width: `${(promo.usedCount / promo.maxUses) * 100}%` }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-gray-600">
                        <div>{promo.validFrom}</div>
                        <div>{promo.validUntil}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        promo.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {promo.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => togglePromoStatus(promo.id)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          {promo.isActive ? 'Durdur' : 'Aktifleştir'}
                        </button>
                        <button
                          onClick={() => deletePromo(promo.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoManagement;
