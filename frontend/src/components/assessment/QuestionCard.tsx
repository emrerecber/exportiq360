import React from 'react';
import { Question, Answer, AnswerValue, Category } from '../../types/assessment';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
  questionNumber: number;
  totalQuestions: number;
  language: 'tr' | 'en';
  category: Category;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
  language,
  category,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  const texts = {
    tr: {
      yes: 'Evet',
      no: 'Hayır',
      unknown: 'Fikrim Yok',
      previous: 'Önceki',
      next: 'Sonraki',
      unknownTooltip: 'Bu konuda henüz bilgim/deneyimim yok veya emin değilim',
      progress: 'İlerleme',
      category: 'Kategori'
    },
    en: {
      yes: 'Yes',
      no: 'No',
      unknown: 'I Don\'t Know',
      previous: 'Previous',
      next: 'Next',
      unknownTooltip: 'I don\'t have knowledge/experience about this or I\'m not sure',
      progress: 'Progress',
      category: 'Category'
    }
  };

  const t = texts[language];

  const handleAnswerClick = (value: AnswerValue) => {
    const answer: Answer = {
      questionId: question.id,
      value,
      timestamp: new Date()
    };
    onAnswer(answer);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  const getButtonStyle = (answerValue: AnswerValue, isSelected: boolean) => {
    const baseStyle = 'flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 border-2 text-center';
    
    if (isSelected) {
      switch (answerValue) {
        case 'yes':
          return `${baseStyle} bg-green-500 text-white border-green-500 shadow-lg transform scale-105`;
        case 'no':
          return `${baseStyle} bg-red-500 text-white border-red-500 shadow-lg transform scale-105`;
        case 'unknown':
          return `${baseStyle} bg-yellow-500 text-white border-yellow-500 shadow-lg transform scale-105`;
      }
    }

    // Not selected styles
    switch (answerValue) {
      case 'yes':
        return `${baseStyle} bg-white text-green-700 border-green-200 hover:border-green-300 hover:bg-green-50`;
      case 'no':
        return `${baseStyle} bg-white text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50`;
      case 'unknown':
        return `${baseStyle} bg-white text-yellow-700 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50`;
      default:
        return baseStyle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: category.color }}
              >
                {questionNumber}
              </div>
              <div>
                <p className="text-sm text-gray-500">{t.category}</p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.name[language]}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{t.progress}</p>
              <p className="text-lg font-semibold text-gray-800">
                {questionNumber} / {totalQuestions}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {Math.round(progress)}% {language === 'tr' ? 'tamamlandı' : 'completed'}
          </p>
        </div>

        {/* Main Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
              {question.text[language]}
            </h2>
            {question.weight && question.weight > 1 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {language === 'tr' ? 'Yüksek Önem' : 'High Importance'}
              </span>
            )}
          </div>

          {/* Answer Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => handleAnswerClick('yes')}
              className={getButtonStyle('yes', currentAnswer?.value === 'yes')}
            >
              <span className="text-2xl mb-2">✅</span>
              <div>{t.yes}</div>
            </button>

            <button
              onClick={() => handleAnswerClick('no')}
              className={getButtonStyle('no', currentAnswer?.value === 'no')}
            >
              <span className="text-2xl mb-2">❌</span>
              <div>{t.no}</div>
            </button>

            <div className="relative">
              <button
                onClick={() => handleAnswerClick('unknown')}
                className={getButtonStyle('unknown', currentAnswer?.value === 'unknown')}
                title={t.unknownTooltip}
              >
                <span className="text-2xl mb-2">❓</span>
                <div>{t.unknown}</div>
              </button>
              
              {/* Tooltip for "Fikrim Yok" */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {t.unknownTooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </div>

          {/* Current Answer Display */}
          {currentAnswer && (
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700">
                <span className="text-sm font-medium">
                  {language === 'tr' ? 'Seçilen cevap:' : 'Selected answer:'} 
                </span>
                <span className="ml-2 font-bold">
                  {currentAnswer.value === 'yes' && t.yes}
                  {currentAnswer.value === 'no' && t.no}
                  {currentAnswer.value === 'unknown' && t.unknown}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`
              flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${hasPrevious 
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300' 
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.previous}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">
              {category.description[language]}
            </p>
          </div>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`
              flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300
              ${hasNext 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg' 
                : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {t.next}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Auto-save indicator */}
        {currentAnswer && (
          <div className="text-center mt-4">
            <span className="inline-flex items-center text-xs text-green-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {language === 'tr' ? 'Otomatik kaydedildi' : 'Auto-saved'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;