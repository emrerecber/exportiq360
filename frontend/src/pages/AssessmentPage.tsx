import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssessmentController from '../components/assessment/AssessmentController';
import EnhancedReportView from '../components/report/EnhancedReportView';

interface AssessmentPageProps {
  assessmentType?: 'e-commerce' | 'e-export' | 'combined';
}

export default function AssessmentPage({ assessmentType = 'e-commerce' }: AssessmentPageProps) {
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState<'tr' | 'en' | null>(null);
  const navigate = useNavigate();

  // Language selection screen
  if (!language) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">ExportIQ 360</h1>
          <p className="text-gray-600 text-center mb-8">Dil seçiniz / Choose your language</p>
          <div className="space-y-4">
            <button
              onClick={() => setLanguage('tr')}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              🇹🇷 Türkçe
            </button>
            <button
              onClick={() => setLanguage('en')}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              🇺🇸 English
            </button>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              ← Panele Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!result ? (
        <AssessmentController 
          language={language}
          assessmentType={assessmentType}
          onComplete={(completedResult) => {
            // Assessment tamamlandı, AI rapor sayfasına yönlendir
            if (completedResult.assessmentId) {
              navigate(`/report/${completedResult.assessmentId}`);
            } else {
              // Fallback: Eski rapor sayfasını göster
              setResult(completedResult);
            }
          }}
          onSaveProgress={(progress) => {
            localStorage.setItem('assessment-progress', JSON.stringify(progress));
          }}
        />
      ) : (
        <EnhancedReportView
          result={result}
          language={language}
          onNewAssessment={() => {
            setResult(null);
            setLanguage(null);
          }}
        />
      )}
    </div>
  );
}
