import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import chatgptService from '../services/chatgptService';

export default function FreeTrialAssessment() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);

  useEffect(() => {
    // Check if user already completed trial
    if (user?.trialCompleted) {
      navigate('/pricing');
      return;
    }

    // Load questions
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const response = await chatgptService.generateFreeTrialQuestions();
      if (response.success) {
        setQuestions(response.questions);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: number, selectedValue: string) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questionId);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId, selectedValue };
    } else {
      newAnswers.push({ questionId, selectedValue });
    }
    
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      alert('Lütfen tüm soruları cevaplayın');
      return;
    }

    setSubmitting(true);
    try {
      const assessmentData = {
        userId: user?.id,
        type: 'free_trial',
        answers,
        completedAt: new Date().toISOString()
      };

      const result = await chatgptService.evaluateAssessment(assessmentData);
      
      if (result.success) {
        setEvaluation(result.evaluation);
        
        // Update user - mark trial as completed
        if (user && updateUser) {
          updateUser({
            ...user,
            trialCompleted: true
          });
        }
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Değerlendirme sırasında hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Sorular hazırlanıyor...</p>
        </div>
      </div>
    );
  }

  if (evaluation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Ücretsiz Değerlendirme Tamamlandı!
              </h1>
              <p className="text-xl text-gray-600">
                İşte dijital olgunluk skorunuz
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center mb-8">
              <div className="text-white text-6xl font-bold mb-2">
                {evaluation.overallScore}%
              </div>
              <div className="text-blue-100 text-lg">Genel Skor</div>
            </div>

            {/* Category Scores */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Kategori Skorları</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(evaluation.categoryScores).map(([category, score]: [string, any]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{score}%</div>
                    <div className="text-sm text-gray-600">{category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💪 Güçlü Yönleriniz</h3>
              <ul className="space-y-2">
                {evaluation.strengths.map((strength: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Gelişim Alanları</h3>
              <ul className="space-y-2">
                {evaluation.improvements.map((improvement: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-orange-500 mr-2">!</span>
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                🚀 Daha Detaylı Analiz İster misiniz?
              </h3>
              <p className="text-gray-700 mb-4">
                Bu sadece bir ön değerlendirmeydi! Tam assessment'larımızla:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-blue-600 mr-2">✓</span>
                  50-110 adet detaylı soru
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-blue-600 mr-2">✓</span>
                  AI destekli detaylı analiz ve öneriler
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-blue-600 mr-2">✓</span>
                  Kanal bazlı skorlamalar
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <span className="text-blue-600 mr-2">✓</span>
                  İndirilebilir PDF rapor
                </li>
              </ul>
              <button
                onClick={() => navigate('/pricing')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
              >
                Paketleri İncele
              </button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard'a Dön
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer = answers.find(a => a.questionId === question?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Ücretsiz Değerlendirme</span>
            <span>{currentQuestion + 1} / {questions.length}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-6">
          <div className="mb-8">
            <div className="text-sm text-blue-600 font-semibold mb-2">
              {question.category}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option: any) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    currentAnswer?.selectedValue === option.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      currentAnswer?.selectedValue === option.value
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {currentAnswer?.selectedValue === option.value && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Geri
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!currentAnswer || submitting}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Değerlendiriliyor...' : 'Tamamla'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                İleri
              </button>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-800">
            💡 Bu ücretsiz değerlendirme temel bir ön analiz sağlar. Detaylı analiz için ücretli paketlerimizi inceleyebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
