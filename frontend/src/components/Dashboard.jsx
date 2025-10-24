import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar } from "recharts";

export default function Dashboard({ data, onReset, language }) {
  const texts = {
    tr: {
      title: "Analiz Sonuçları",
      overallLevel: "Genel Seviye",
      averageScore: "Ortalama Skor",
      competenceRadar: "Yetkinlik Haritası",
      scoreDistribution: "Puan Dağılımı",
      detailed: "Detaylı Analiz",
      newAnalysis: "Yeni Analiz",
      gapAnalysis: "Eksik Alan Analizi",
      swotAnalysis: "SWOT Analizi",
      actionPlan: "Eylem Planı",
      immediate: "Acil",
      midTerm: "Orta Vadeli", 
      longTerm: "Uzun Vadeli"
    },
    en: {
      title: "Analysis Results",
      overallLevel: "Overall Level",
      averageScore: "Average Score",
      competenceRadar: "Competence Map",
      scoreDistribution: "Score Distribution",
      detailed: "Detailed Analysis",
      newAnalysis: "New Analysis",
      gapAnalysis: "Gap Analysis",
      swotAnalysis: "SWOT Analysis",
      actionPlan: "Action Plan",
      immediate: "Immediate",
      midTerm: "Mid-term",
      longTerm: "Long-term"
    }
  };

  const t = texts[language] || texts.en;

  // Parse the data if it's a string
  let parsedData;
  try {
    parsedData = typeof data === 'string' ? JSON.parse(data) : data;
  } catch (error) {
    parsedData = data;
  }

  // Ensure we have the right data structure
  const competenceReport = parsedData?.competence_report || parsedData || {};
  const categoryScores = competenceReport.category_scores || {};
  const overallScore = competenceReport.overall_score || 0;
  const competenceLevel = parsedData?.competence_level || "Unknown";

  const scoreData = Object.entries(categoryScores).map(([k, v]) => ({ 
    name: k.charAt(0).toUpperCase() + k.slice(1), 
    value: v || 0,
    fullMark: 5 
  }));

  const levelColor = {
    "Temel": "bg-yellow-100 text-yellow-800",
    "Orta": "bg-blue-100 text-blue-800", 
    "İleri": "bg-green-100 text-green-800",
    "Basic": "bg-yellow-100 text-yellow-800",
    "Intermediate": "bg-blue-100 text-blue-800",
    "Advanced": "bg-green-100 text-green-800"
  }[competenceLevel] || "bg-gray-100 text-gray-800";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-indigo-700">{t.title}</h2>
          <button 
            onClick={onReset} 
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {t.newAnalysis}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">{t.overallLevel}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${levelColor}`}>
              {competenceLevel}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">{t.averageScore}</p>
            <p className="text-2xl font-bold text-indigo-600">{overallScore.toFixed(1)}/5</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">{t.competenceRadar}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={scoreData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar 
                dataKey="value" 
                stroke="#4f46e5" 
                fill="#6366f1" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">{t.scoreDistribution}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analysis Sections */}
      {parsedData?.gap_analysis && (
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">{t.gapAnalysis}</h3>
          <div className="prose max-w-none">
            {typeof parsedData.gap_analysis === 'string' ? (
              <p className="text-gray-700">{parsedData.gap_analysis}</p>
            ) : (
              <pre className="whitespace-pre-wrap text-gray-700">{JSON.stringify(parsedData.gap_analysis, null, 2)}</pre>
            )}
          </div>
        </div>
      )}

      {parsedData?.swot_analysis && (
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">{t.swotAnalysis}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(parsedData.swot_analysis).map(([key, value]) => (
              <div key={key} className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium capitalize mb-2 text-gray-800">{key}</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {Array.isArray(value) ? value.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : (
                    <li>{value}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {parsedData?.action_plan && (
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4 text-gray-800">{t.actionPlan}</h3>
          <div className="space-y-4">
            {Object.entries(parsedData.action_plan).map(([timeframe, actions]) => (
              <div key={timeframe} className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  {t[timeframe] || timeframe.replace('_', ' ').toUpperCase()}
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {Array.isArray(actions) ? actions.map((action, index) => (
                    <li key={index}>{action}</li>
                  )) : (
                    <li>{actions}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw Data for debugging */}
      <details className="bg-gray-50 rounded-xl p-6">
        <summary className="cursor-pointer font-medium text-gray-700 mb-4">{t.detailed}</summary>
        <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto text-gray-600">
          {JSON.stringify(parsedData, null, 2)}
        </pre>
      </details>
    </div>
  );
}