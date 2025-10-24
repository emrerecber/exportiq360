const https = require('https');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { strategy, tech, marketing, logistics, analytics, language = 'tr' } = JSON.parse(event.body);
    
    // Calculate scores
    const scores = { strategy, tech, marketing, logistics, analytics };
    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;
    
    // Determine level
    let level;
    if (language === 'tr') {
      level = avgScore < 2.5 ? 'Başlangıç' : 
              avgScore < 3.5 ? 'Gelişmekte' : 
              avgScore < 4.5 ? 'Yetkin' : 'İleri Seviye';
    } else {
      level = avgScore < 2.5 ? 'Beginner' : 
              avgScore < 3.5 ? 'Developing' : 
              avgScore < 4.5 ? 'Competent' : 'Advanced';
    }

    // Find strongest and weakest areas
    const sortedScores = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const strongest = sortedScores[0];
    const weakest = sortedScores[sortedScores.length - 1];

    let response;
    
    // Try OpenAI API if key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        response = await callOpenAI(scores, avgScore, level, language);
      } catch (error) {
        console.log('OpenAI failed, using fallback:', error);
        response = getFallbackResponse(scores, avgScore, level, strongest, weakest, language);
      }
    } else {
      response = getFallbackResponse(scores, avgScore, level, strongest, weakest, language);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Analysis failed: ' + error.message })
    };
  }
};

async function callOpenAI(scores, avgScore, level, language) {
  const prompt = language === 'tr' 
    ? `E-ihracat yetkinlik analizi: Strateji:${scores.strategy}, Teknoloji:${scores.tech}, Pazarlama:${scores.marketing}, Lojistik:${scores.logistics}, Analitik:${scores.analytics}. Genel seviye: ${level}. Detaylı JSON analizi sağla.`
    : `E-export competency analysis: Strategy:${scores.strategy}, Technology:${scores.tech}, Marketing:${scores.marketing}, Logistics:${scores.logistics}, Analytics:${scores.analytics}. Overall level: ${level}. Provide detailed JSON analysis.`;

  const data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system", 
        content: "You are an e-export competency analyst. Provide detailed JSON analysis."
      },
      {
        role: "user", 
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 1000
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          const content = parsed.choices[0].message.content;
          resolve(JSON.parse(content));
        } catch (error) {
          reject(new Error('Failed to parse OpenAI response'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getFallbackResponse(scores, avgScore, level, strongest, weakest, language) {
  const categoryNames = {
    tr: {
      strategy: 'Strateji',
      tech: 'Teknoloji', 
      marketing: 'Pazarlama',
      logistics: 'Lojistik',
      analytics: 'Analitik'
    },
    en: {
      strategy: 'Strategy',
      tech: 'Technology',
      marketing: 'Marketing',
      logistics: 'Logistics', 
      analytics: 'Analytics'
    }
  };

  if (language === 'tr') {
    return {
      competence_level: level,
      competence_report: {
        overall_score: parseFloat(avgScore.toFixed(1)),
        category_scores: scores,
        performance_summary: `En güçlü alanınız: ${categoryNames.tr[strongest[0]]} (${strongest[1]}/5), Gelişim alanınız: ${categoryNames.tr[weakest[0]]} (${weakest[1]}/5)`
      },
      gap_analysis: {
        major_gaps: [`${categoryNames.tr[weakest[0]]} alanında ${5-weakest[1]} puan eksiklik`],
        improvement_areas: [categoryNames.tr[weakest[0]]],
        priority_focus: `${categoryNames.tr[weakest[0]]} alanını güçlendirin`,
        strength_areas: [categoryNames.tr[strongest[0]]]
      },
      swot_analysis: {
        strengths: [`${categoryNames.tr[strongest[0]]} alanında güçlü performans`, "Mevcut iş deneyimi"],
        weaknesses: [`${categoryNames.tr[weakest[0]]} alanında gelişim gerekli`, "Dijital dönüşüm boşlukları"],
        opportunities: ["Dijital pazarda büyüme potansiyeli", "E-ihracat teşvikleri", "Teknoloji çözümleri"],
        threats: ["Artan rekabet", "Hızlı teknoloji değişimi", "Müşteri beklentileri"]
      },
      action_plan: {
        immediate: [`${categoryNames.tr[weakest[0]]} için acil eğitim planla`, "Mevcut sistemleri analiz et"],
        mid_term: ["Teknoloji yatırımları yap", `${categoryNames.tr[strongest[0]]} avantajını geliştir`],
        long_term: ["Tüm alanları entegre et", "Sürekli iyileştirme kur"]
      },
      training_recommendations: ["E-ihracat genel eğitimi", "Dijital pazarlama", "Teknoloji entegrasyonu"],
      sector_benchmark: {
        average_score: 3.2,
        your_position: avgScore > 3.2 ? "ortalama üstü" : "ortalama altı",
        improvement_potential: `${((5-avgScore)*20).toFixed(0)}% iyileştirme potansiyeli`
      }
    };
  } else {
    return {
      competence_level: level,
      competence_report: {
        overall_score: parseFloat(avgScore.toFixed(1)),
        category_scores: scores,
        performance_summary: `Strongest area: ${categoryNames.en[strongest[0]]} (${strongest[1]}/5), Development area: ${categoryNames.en[weakest[0]]} (${weakest[1]}/5)`
      },
      gap_analysis: {
        major_gaps: [`${categoryNames.en[weakest[0]]} area has ${5-weakest[1]} point gap`],
        improvement_areas: [categoryNames.en[weakest[0]]],
        priority_focus: `Strengthen ${categoryNames.en[weakest[0]]} area`,
        strength_areas: [categoryNames.en[strongest[0]]]
      },
      swot_analysis: {
        strengths: [`Strong performance in ${categoryNames.en[strongest[0]]}`, "Existing business experience"],
        weaknesses: [`${categoryNames.en[weakest[0]]} needs development`, "Digital transformation gaps"],
        opportunities: ["Digital market growth potential", "E-export incentives", "Technology solutions"],
        threats: ["Increasing competition", "Rapid technology change", "Customer expectations"]
      },
      action_plan: {
        immediate: [`Plan urgent training for ${categoryNames.en[weakest[0]]}`, "Analyze current systems"],
        mid_term: ["Make technology investments", `Develop ${categoryNames.en[strongest[0]]} advantage`],
        long_term: ["Integrate all areas", "Establish continuous improvement"]
      },
      training_recommendations: ["General e-export training", "Digital marketing", "Technology integration"],
      sector_benchmark: {
        average_score: 3.2,
        your_position: avgScore > 3.2 ? "above average" : "below average",
        improvement_potential: `${((5-avgScore)*20).toFixed(0)}% improvement potential`
      }
    };
  }
}