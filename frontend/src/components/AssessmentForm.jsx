import { useState } from "react";
import axios from "axios";

export default function AssessmentForm({ onAnalyze, language }) {
  const [scores, setScores] = useState({
    strategy: 3,
    tech: 3, 
    marketing: 3,
    logistics: 3,
    analytics: 3,
  });
  const [loading, setLoading] = useState(false);

  const texts = {
    tr: {
      title: "E-İhracat Yetkinlik Değerlendirmesi",
      strategy: "Strateji",
      tech: "Teknoloji",
      marketing: "Pazarlama",
      logistics: "Lojistik",
      analytics: "Analitik",
      analyze: "Analiz Et",
      analyzing: "Analiz ediliyor...",
      description: "Her kategori için 1-5 arasında puan verin (1=Zayıf, 5=Mükemmel)"
    },
    en: {
      title: "E-Export Competence Assessment",
      strategy: "Strategy",
      tech: "Technology",
      marketing: "Marketing", 
      logistics: "Logistics",
      analytics: "Analytics",
      analyze: "Analyze",
      analyzing: "Analyzing...",
      description: "Rate each category from 1-5 (1=Poor, 5=Excellent)"
    }
  };

  const t = texts[language] || texts.en;

  const handleChange = (e) => {
    setScores({ ...scores, [e.target.name]: parseInt(e.target.value) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/analyze`, {
        ...scores,
        language: language
      });
      onAnalyze(res.data);
    } catch (err) {
      alert(language === 'tr' ? "Analiz hatası!" : "Analysis error!");
      console.error(err);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white shadow-md p-8 rounded-xl max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{t.title}</h2>
      <p className="text-gray-600 mb-6 text-sm">{t.description}</p>
      
      <div className="grid gap-6">
        {Object.keys(scores).map((key) => (
          <div key={key} className="space-y-2">
            <label className="block font-medium text-gray-700">
              {t[key]} ({scores[key]}/5)
            </label>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">1</span>
              <input 
                type="range" 
                min="1" 
                max="5" 
                name={key} 
                value={scores[key]} 
                onChange={handleChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm text-gray-500">5</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 px-1">
              <span>{language === 'tr' ? 'Zayıf' : 'Poor'}</span>
              <span>{language === 'tr' ? 'Orta' : 'Average'}</span>
              <span>{language === 'tr' ? 'Mükemmel' : 'Excellent'}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleSubmit} 
        disabled={loading}
        className="bg-indigo-600 text-white w-full py-3 rounded-lg mt-8 font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? t.analyzing : t.analyze}
      </button>
    </div>
  );
}