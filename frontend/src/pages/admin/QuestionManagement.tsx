import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface Question {
  id: string;
  question_text_tr: string;
  question_text_en: string;
  category: string;
  channels: string[];
  is_free_trial_question: boolean;
  order: number;
  is_active: boolean;
  created_at?: string;
}

const CATEGORIES = [
  { id: 'strategy', name: 'Strateji ve Planlama', color: 'blue' },
  { id: 'technology', name: 'Teknoloji ve Altyapı', color: 'green' },
  { id: 'marketing', name: 'Dijital Pazarlama', color: 'yellow' },
  { id: 'operations', name: 'Operasyonlar', color: 'red' },
  { id: 'analytics', name: 'Analitik ve Raporlama', color: 'purple' },
  { id: 'customer', name: 'Müşteri Deneyimi', color: 'pink' },
  { id: 'finance', name: 'Finans ve Ödeme', color: 'cyan' }
];

const PACKAGES = [
  { id: 'ecommerce', name: 'E-Ticaret', color: 'blue' },
  { id: 'eexport', name: 'E-İhracat', color: 'purple' },
  { id: 'combined', name: 'Kapsamlı', color: 'orange' }
];

export default function QuestionManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Filters
  const [filterPackage, setFilterPackage] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  
  // Form data
  const [formData, setFormData] = useState({
    question_text_tr: '',
    question_text_en: '',
    category: 'strategy',
    channels: [] as string[],
    is_free_trial_question: false,
    order: 1
  });

  useEffect(() => {
    loadQuestions();
  }, [filterPackage, filterCategory]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('exportiq_token');
      const params = new URLSearchParams();
      if (filterPackage) params.append('package_type', filterPackage);
      if (filterCategory) params.append('category', filterCategory);
      
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/admin/questions?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to load questions');
      
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error loading questions:', error);
      alert('Sorular yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      question_text_tr: question.question_text_tr,
      question_text_en: question.question_text_en,
      category: question.category,
      channels: question.channels || [],
      is_free_trial_question: question.is_free_trial_question,
      order: question.order
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingQuestion(null);
    setFormData({
      question_text_tr: '',
      question_text_en: '',
      category: 'strategy',
      channels: [],
      is_free_trial_question: false,
      order: questions.length + 1
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('exportiq_token');
      const url = isCreating
        ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/admin/questions`
        : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/admin/questions/${editingQuestion?.id}`;
      
      const method = isCreating ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to save question');
      
      alert(isCreating ? 'Soru başarıyla oluşturuldu!' : 'Soru başarıyla güncellendi!');
      setEditingQuestion(null);
      setIsCreating(false);
      loadQuestions();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Soru kaydedilemedi');
    }
  };

  const handleDelete = async (questionId: string) => {
    if (!confirm('Bu soruyu silmek istediğinize emin misiniz?')) return;
    
    try {
      const token = localStorage.getItem('exportiq_token');
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/admin/questions/${questionId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to delete question');
      
      alert('Soru başarıyla silindi!');
      loadQuestions();
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Soru silinemedi');
    }
  };

  const toggleChannel = (channel: string) => {
    if (formData.channels.includes(channel)) {
      setFormData({
        ...formData,
        channels: formData.channels.filter(c => c !== channel)
      });
    } else {
      setFormData({
        ...formData,
        channels: [...formData.channels, channel]
      });
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
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Soru Yönetimi</h1>
                <p className="text-sm text-gray-600">Assessment sorularını yönetin</p>
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Yeni Soru</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtreler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Paket</label>
              <select
                value={filterPackage}
                onChange={(e) => setFilterPackage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Tümü</option>
                {PACKAGES.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Tümü</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-indigo-600">{questions.length}</span> soru bulundu
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        #{question.order}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {CATEGORIES.find(c => c.id === question.category)?.name}
                      </span>
                      {question.is_free_trial_question && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          Free Trial
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      🇹🇷 {question.question_text_tr}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      🇬🇧 {question.question_text_en}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {question.channels?.map(channel => (
                        <span
                          key={channel}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium"
                        >
                          {PACKAGES.find(p => p.id === channel)?.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(question)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit/Create Modal */}
        {(editingQuestion || isCreating) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isCreating ? '🆕 Yeni Soru Oluştur' : '✏️ Soruyu Düzenle'}
                </h2>
                <button
                  onClick={() => {
                    setEditingQuestion(null);
                    setIsCreating(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Turkish Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🇹🇷 Soru Metni (Türkçe) *
                  </label>
                  <textarea
                    value={formData.question_text_tr}
                    onChange={(e) => setFormData({ ...formData, question_text_tr: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    required
                  />
                </div>

                {/* English Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🇬🇧 Soru Metni (İngilizce) *
                  </label>
                  <textarea
                    value={formData.question_text_en}
                    onChange={(e) => setFormData({ ...formData, question_text_en: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    required
                  />
                </div>

                {/* Category and Order */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sıra No *</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      min="1"
                    />
                  </div>
                </div>

                {/* Packages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Paketler *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {PACKAGES.map(pkg => (
                      <label
                        key={pkg.id}
                        className={`flex items-center space-x-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.channels.includes(pkg.id)
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.channels.includes(pkg.id)}
                          onChange={() => toggleChannel(pkg.id)}
                          className="w-4 h-4 text-indigo-600"
                        />
                        <span className="font-medium text-gray-900">{pkg.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Free Trial */}
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_free_trial_question}
                      onChange={(e) => setFormData({ ...formData, is_free_trial_question: e.target.checked })}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Ücretsiz deneme paketinde göster
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setEditingQuestion(null);
                    setIsCreating(false);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {isCreating ? 'Oluştur' : 'Kaydet'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
