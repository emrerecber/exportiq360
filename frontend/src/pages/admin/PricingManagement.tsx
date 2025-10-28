import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PLANS } from '../../data/plans';

const PricingManagement: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [plans, setPlans] = useState(PLANS);

  // TEMPORARILY DISABLED FOR TESTING
  // if (!isAdmin) {
  //   navigate('/dashboard');
  //   return null;
  // }

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    currency: 'TL',
    features: [] as string[],
    limitations: [] as string[],
    color: 'blue',
    popular: false
  });

  const handleEdit = (planKey: string) => {
    const plan = plans[planKey as keyof typeof plans];
    setEditingPlan(planKey);
    setFormData({
      name: plan.name,
      price: plan.price,
      currency: plan.currency,
      features: plan.features,
      limitations: plan.limitations || [],
      color: plan.color,
      popular: plan.popular || false
    });
  };

  const handleSave = () => {
    if (editingPlan) {
      setPlans({
        ...plans,
        [editingPlan]: {
          ...plans[editingPlan as keyof typeof plans],
          ...formData
        }
      });
      setEditingPlan(null);
      // Gerçek uygulamada API'ye kaydedilecek
      alert('Plan başarıyla güncellendi!');
    }
  };

  const handleAddFeature = (newFeature: string) => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature]
      });
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
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
                <h1 className="text-2xl font-bold text-gray-900">Fiyatlandırma Yönetimi</h1>
                <p className="text-sm text-gray-600">Paket fiyatları ve özelliklerini yönetin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(plans).map(([key, plan]) => (
            <div
              key={key}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 ${
                editingPlan === key ? 'border-indigo-500' : 'border-transparent'
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 text-xs font-semibold">
                  EN POPÜLER
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.currency}</span>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">{plan.features.length} özellik</p>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-600">
                        <svg className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                    {plan.features.length > 3 && (
                      <p className="text-xs text-gray-400">+{plan.features.length - 3} daha fazla</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleEdit(key)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
                >
                  Düzenle
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Form */}
        {editingPlan && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {plans[editingPlan as keyof typeof plans].name} Paketini Düzenle
              </h2>
              <button
                onClick={() => setEditingPlan(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paket Adı
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fiyat
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Para Birimi
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="TL">TL</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renk Teması
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="gray">Gri</option>
                    <option value="blue">Mavi</option>
                    <option value="orange">Turuncu</option>
                    <option value="purple">Mor</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                    className="mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    "En Popüler" olarak işaretle
                  </label>
                </div>
              </div>

              {/* Right Column - Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özellikler
                </label>
                <div className="space-y-2 mb-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                      <span className="text-sm text-gray-700">{feature}</span>
                      <button
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Yeni özellik ekle..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddFeature(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={(e) => {
                      const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                      handleAddFeature(input.value);
                      input.value = '';
                    }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Ekle
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setEditingPlan(null)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Önemli Notlar</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Fiyat değişiklikleri mevcut aboneleri etkilemez</li>
                <li>• Yeni kayıtlar güncel fiyatlarla işlem görür</li>
                <li>• Özellik değişiklikleri anında yansır</li>
                <li>• "En Popüler" işareti sadece bir pakette olmalıdır</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingManagement;
