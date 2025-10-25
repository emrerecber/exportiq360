import React, { useState, useEffect, useMemo } from 'react';
import { Question, Answer, Category, AssessmentUIState, AssessmentResponse } from '../../types/assessment';
import { categories, questions } from '../../data/assessmentData';
import { ScoringSystem } from '../../lib/scoring/calculator';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { filterQuestionsByPlan } from '../../utils/questionFilter';
import { saveResponses } from '../../services/api';
import QuestionCard from './QuestionCard';

interface AssessmentControllerProps {
  language: 'tr' | 'en';
  assessmentType?: 'e-commerce' | 'e-export' | 'combined';
  onComplete: (result: any) => void;
  onSaveProgress?: (progress: AssessmentResponse) => void;
}

const AssessmentController: React.FC<AssessmentControllerProps> = ({
  language,
  assessmentType = 'e-commerce',
  onComplete,
  onSaveProgress
}) => {
  const { showToast } = useToast();
  const { user } = useAuth();
  
  // Kullanıcının paketine göre soruları filtrele
  const filteredQuestions = useMemo(() => {
    const plan = user?.plan || 'free_trial';
    return filterQuestionsByPlan(plan as any);
  }, [user?.plan]);
  
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentId] = useState<string>(() => {
    // Generate unique assessment ID
    return `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [uiState, setUIState] = useState<AssessmentUIState>({
    currentQuestionIndex: 0,
    currentCategoryId: filteredQuestions[0]?.categoryId || '',
    isNavigating: false,
    progress: {
      answeredQuestions: 0,
      totalQuestions: filteredQuestions.length,
      percentage: 0,
      categoryProgress: {}
    },
    filters: {}
  });

  const texts = {
    tr: {
      categoryNavigation: 'Kategori Navigasyonu',
      allCategories: 'Tüm Kategoriler',
      jumpToCategory: 'Kategoriye Git',
      completed: 'Tamamlandı',
      remaining: 'Kalan',
      finishAssessment: 'Değerlendirmeyi Bitir',
      backToOverview: 'Genel Bakışa Dön'
    },
    en: {
      categoryNavigation: 'Category Navigation',
      allCategories: 'All Categories',
      jumpToCategory: 'Jump to Category',
      completed: 'Completed',
      remaining: 'Remaining',
      finishAssessment: 'Finish Assessment',
      backToOverview: 'Back to Overview'
    }
  };

  const t = texts[language];

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const currentCategory = categories.find(cat => cat.id === currentQuestion?.categoryId);
  const currentAnswer = answers.find(answer => answer.questionId === currentQuestion?.id);

  // Progress hesaplama
  useEffect(() => {
    const categoryProgress: Record<string, number> = {};
    categories.forEach(category => {
      const categoryQuestions = filteredQuestions.filter(q => q.categoryId === category.id);
      const categoryAnswers = answers.filter(answer => 
        categoryQuestions.some(q => q.id === answer.questionId)
      );
      categoryProgress[category.id] = categoryQuestions.length > 0 
        ? (categoryAnswers.length / categoryQuestions.length) * 100
        : 0;
    });

    setUIState(prev => ({
      ...prev,
      currentCategoryId: currentQuestion?.categoryId || '',
      progress: {
        answeredQuestions: answers.length,
        totalQuestions: filteredQuestions.length,
        percentage: (answers.length / filteredQuestions.length) * 100,
        categoryProgress
      }
    }));

    // Otomatik kaydetme
    if (onSaveProgress && answers.length > 0) {
      const assessmentResponse: AssessmentResponse = {
        id: 'current-assessment',
        answers,
        startedAt: new Date(), // Bu gerçek uygulamada başlangıç zamanı saklanmalı
        language,
        // companyInfo buraya eklenebilir
      };
      onSaveProgress(assessmentResponse);
    }
  }, [answers, currentQuestion, language, onSaveProgress]);

  const handleAnswer = async (answer: Answer) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === answer.questionId);
      if (existingIndex >= 0) {
        // Var olan cevabı güncelle
        const newAnswers = [...prev];
        newAnswers[existingIndex] = answer;
        return newAnswers;
      } else {
        // Yeni cevap ekle
        return [...prev, answer];
      }
    });

    // Backend'e kaydet
    if (user?.id && user?.email) {
      try {
        setIsSaving(true);
        // Convert answer value to number: yes=5, no=1, unknown=3
        const numericValue = answer.value === 'yes' ? 5 : answer.value === 'no' ? 1 : 3;
        await saveResponses({
          user_id: user.id,
          user_email: user.email,
          assessment_id: assessmentId,
          responses: [
            {
              question_id: answer.questionId,
              answer: numericValue
            }
          ],
          package_type: user.plan || 'free_trial'
        });
      } catch (error) {
        console.error('Error saving response:', error);
        // Hata durumunda kullanıcıyı bilgilendir ama devam et
      } finally {
        setIsSaving(false);
      }
    }

    // Otomatik olarak bir sonraki soruya geç (opsiyonel)
    setTimeout(() => {
      if (currentQuestionIndex < filteredQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Son soru yanıtlandı - tüm soruları yanıtladıysa otomatik tamamla
        const totalAnswered = answers.length + 1; // Yeni cevap dahil
        if (totalAnswered >= filteredQuestions.length) {
          handleComplete();
        }
      }
    }, 500);
  };

  const jumpToCategory = (categoryId: string) => {
    const firstQuestionInCategory = filteredQuestions.findIndex(q => q.categoryId === categoryId);
    if (firstQuestionInCategory >= 0) {
      setCurrentQuestionIndex(firstQuestionInCategory);
    }
  };

  const jumpToQuestion = (questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < filteredQuestions.length) {
      setCurrentQuestionIndex(questionIndex);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (answers.length >= filteredQuestions.length * 0.8) { // En az %80 tamamlanmış ise
      handleComplete();
    }
  };

  const handleComplete = async () => {
    const scoringSystem = new ScoringSystem(categories, filteredQuestions);
    const result = scoringSystem.calculateScore(answers);
    
    // Add assessment type, company info, and assessment ID to result
    const enhancedResult = {
      ...result,
      assessmentId,
      assessmentType,
      companyInfo: {
        companyName: localStorage.getItem('company_name') || undefined,
        industry: localStorage.getItem('company_industry') || undefined,
      }
    };
    
    // Save to localStorage for persistence
    const savedAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    savedAssessments.push(enhancedResult);
    localStorage.setItem('assessments', JSON.stringify(savedAssessments));
    
    // Son kez tüm yanıtları backend'e kaydet
    if (user?.id && user?.email) {
      try {
        await saveResponses({
          user_id: user.id,
          user_email: user.email,
          assessment_id: assessmentId,
          responses: answers.map(a => {
            // Convert answer value to number: yes=5, no=1, unknown=3
            const numericValue = a.value === 'yes' ? 5 : a.value === 'no' ? 1 : 3;
            return {
              question_id: a.questionId,
              answer: numericValue
            };
          }),
          package_type: user.plan || 'free_trial'
        });
      } catch (error) {
        console.error('Error saving final responses:', error);
      }
    }
    
    showToast('success', '🎉 Değerlendirme tamamlandı! Raporunuz hazırlanıyor...');
    
    setTimeout(() => {
      onComplete(enhancedResult);
    }, 1000);
  };

  const [showNavigation, setShowNavigation] = useState(false);

  if (!currentQuestion || !currentCategory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {/* Floating Navigation Button */}
      <button
        onClick={() => setShowNavigation(!showNavigation)}
        className="fixed top-4 right-4 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300"
        title={t.categoryNavigation}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Navigation Sidebar */}
      {showNavigation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowNavigation(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800">{t.categoryNavigation}</h3>
                <button
                  onClick={() => setShowNavigation(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Overall Progress */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{t.completed}: {uiState.progress.answeredQuestions}</span>
                  <span>{t.remaining}: {uiState.progress.totalQuestions - uiState.progress.answeredQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${uiState.progress.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {Math.round(uiState.progress.percentage)}% {language === 'tr' ? 'tamamlandı' : 'completed'}
                </p>
              </div>

              {/* Category List */}
              <div className="space-y-3">
                {categories.map(category => {
                  const categoryQuestions = filteredQuestions.filter(q => q.categoryId === category.id);
                  const categoryAnswers = answers.filter(answer => 
                    categoryQuestions.some(q => q.id === answer.questionId)
                  );
                  const progress = uiState.progress.categoryProgress[category.id] || 0;
                  const isCurrentCategory = category.id === currentCategory.id;

                  return (
                    <div 
                      key={category.id}
                      className={`
                        p-3 rounded-lg border-2 cursor-pointer transition-all duration-300
                        ${isCurrentCategory 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                        }
                      `}
                      onClick={() => {
                        jumpToCategory(category.id);
                        setShowNavigation(false);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <h4 className="font-medium text-gray-800 text-sm">
                            {category.name[language]}
                          </h4>
                        </div>
                        <span className="text-xs text-gray-500">
                          {categoryAnswers.length}/{categoryQuestions.length}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${progress}%`,
                            backgroundColor: category.color 
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Complete Button */}
              {uiState.progress.percentage >= 80 && (
                <button
                  onClick={handleComplete}
                  className="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {t.finishAssessment}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Question Interface */}
      <QuestionCard
        question={currentQuestion}
        currentAnswer={currentAnswer}
        onAnswer={handleAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={filteredQuestions.length}
        language={language}
        category={currentCategory}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentQuestionIndex > 0}
        hasNext={currentQuestionIndex < filteredQuestions.length - 1 || uiState.progress.percentage >= 80}
      />
    </div>
  );
};

export default AssessmentController;