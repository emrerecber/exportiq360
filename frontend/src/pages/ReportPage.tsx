import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedReportView from '../components/report/EnhancedReportView';

const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  const [language] = useState<'tr' | 'en'>('tr'); // Default to Turkish

  useEffect(() => {
    // Load report from localStorage
    const reportData = localStorage.getItem('current_report');
    if (reportData) {
      try {
        const parsed = JSON.parse(reportData);
        // Ensure completedAt is a Date object
        parsed.completedAt = new Date(parsed.completedAt);
        setResult(parsed);
      } catch (error) {
        console.error('Error loading report:', error);
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Rapor yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <EnhancedReportView
      result={result}
      language={language}
      onNewAssessment={() => {
        localStorage.removeItem('current_report');
        navigate('/assessment-type');
      }}
    />
  );
};

export default ReportPage;
