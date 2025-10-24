export default function Sidebar({ language }) {
  const texts = {
    tr: {
      dashboard: "Panel",
      assessments: "Değerlendirmeler",
      reports: "Raporlar",
      settings: "Ayarlar"
    },
    en: {
      dashboard: "Dashboard",
      assessments: "Assessments", 
      reports: "Reports",
      settings: "Settings"
    }
  };

  const t = texts[language] || texts.en;

  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-indigo-600 mb-2">ExportIQ</h1>
        <span className="text-xs text-gray-500">360</span>
      </div>
      <nav className="flex flex-col gap-3 text-gray-700">
        <a href="#" className="font-semibold bg-indigo-50 text-indigo-700 px-3 py-2 rounded-md">
          {t.dashboard}
        </a>
        <a href="#" className="px-3 py-2 hover:bg-gray-50 rounded-md transition-colors">
          {t.assessments}
        </a>
        <a href="#" className="px-3 py-2 hover:bg-gray-50 rounded-md transition-colors">
          {t.reports}
        </a>
        <a href="#" className="px-3 py-2 hover:bg-gray-50 rounded-md transition-colors">
          {t.settings}
        </a>
      </nav>
      
      <div className="mt-auto pt-4 border-t">
        <div className="text-xs text-gray-500 text-center">
          E-İhracat Botu MVP
        </div>
      </div>
    </aside>
  );
}