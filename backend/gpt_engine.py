from openai import OpenAI
import os
import json
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class GPTAnalyzer:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    def analyze_competence(self, scores: Dict[str, float], language: str = "tr") -> Dict[str, Any]:
        """
        Analyze e-export competence using GPT as E-İhracat Botu
        """
        avg_score = sum(scores.values()) / len(scores)
        
        # Determine competence level
        if avg_score < 2.6:
            level = "Temel" if language == "tr" else "Basic"
        elif avg_score < 4.0:
            level = "Orta" if language == "tr" else "Intermediate"
        else:
            level = "İleri" if language == "tr" else "Advanced"
        
        # Create prompt in the appropriate language
        if language == "tr":
            prompt = f"""
Sen 'E-İhracat Botu'sun, Türk şirketlerinin e-ihracat yetkinliklerini analiz eden bir AI uzmanısın.

Şirket Skorları:
- Strateji: {scores.get('strategy', 0)}/5
- Teknoloji: {scores.get('tech', 0)}/5  
- Pazarlama: {scores.get('marketing', 0)}/5
- Lojistik: {scores.get('logistics', 0)}/5
- Analitik: {scores.get('analytics', 0)}/5

Ortalama Skor: {avg_score:.1f}/5
Belirlenen Seviye: {level}

Lütfen aşağıdaki JSON formatında detaylı analiz sağla:

{{
    "competence_level": "{level}",
    "competence_report": {{
        "overall_score": {avg_score:.1f},
        "category_scores": {{
            "strategy": {scores.get('strategy', 0)},
            "tech": {scores.get('tech', 0)},
            "marketing": {scores.get('marketing', 0)},
            "logistics": {scores.get('logistics', 0)},
            "analytics": {scores.get('analytics', 0)}
        }}
    }},
    "gap_analysis": {{
        "major_gaps": ["en zayıf alanları listele"],
        "improvement_areas": ["geliştirilmesi gereken konular"],
        "priority_focus": "öncelikli odaklanılması gereken alan"
    }},
    "swot_analysis": {{
        "strengths": ["güçlü yönler"],
        "weaknesses": ["zayıf yönler"], 
        "opportunities": ["fırsatlar"],
        "threats": ["tehditler"]
    }},
    "action_plan": {{
        "immediate": ["hemen yapılabilecek eylemler"],
        "mid_term": ["3-6 ay içinde yapılacaklar"],
        "long_term": ["1 yıl içinde hedeflenenler"]
    }},
    "training_recommendations": ["önerilen eğitimler ve kaynaklar"]
}}

Türkçe olarak cevapla ve her kategori için spesifik, uygulanabilir öneriler ver.
            """
        else:
            prompt = f"""
You are the 'E-İhracat Botu', an AI expert analyzing Turkish companies' e-export competencies.

Company Scores:
- Strategy: {scores.get('strategy', 0)}/5
- Technology: {scores.get('tech', 0)}/5
- Marketing: {scores.get('marketing', 0)}/5
- Logistics: {scores.get('logistics', 0)}/5
- Analytics: {scores.get('analytics', 0)}/5

Average Score: {avg_score:.1f}/5
Determined Level: {level}

Please provide detailed analysis in the following JSON format:

{{
    "competence_level": "{level}",
    "competence_report": {{
        "overall_score": {avg_score:.1f},
        "category_scores": {{
            "strategy": {scores.get('strategy', 0)},
            "tech": {scores.get('tech', 0)},
            "marketing": {scores.get('marketing', 0)},
            "logistics": {scores.get('logistics', 0)},
            "analytics": {scores.get('analytics', 0)}
        }}
    }},
    "gap_analysis": {{
        "major_gaps": ["list weakest areas"],
        "improvement_areas": ["areas that need development"],
        "priority_focus": "priority area to focus on"
    }},
    "swot_analysis": {{
        "strengths": ["strong points"],
        "weaknesses": ["weak points"],
        "opportunities": ["opportunities"],
        "threats": ["threats"]
    }},
    "action_plan": {{
        "immediate": ["actions that can be taken immediately"],
        "mid_term": ["things to do in 3-6 months"],
        "long_term": ["targets within 1 year"]
    }},
    "training_recommendations": ["recommended training and resources"]
}}

Respond in English and provide specific, actionable recommendations for each category.
            """

        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are E-İhracat Botu, an expert AI assistant for e-export competence analysis. Always respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=2000
            )
            
            result = response.choices[0].message.content
            
            # Try to parse as JSON
            try:
                return json.loads(result)
            except json.JSONDecodeError:
                # If parsing fails, return a fallback structure
                return {
                    "competence_level": level,
                    "competence_report": {
                        "overall_score": avg_score,
                        "category_scores": scores
                    },
                    "gap_analysis": {
                        "major_gaps": ["Analysis temporarily unavailable"],
                        "improvement_areas": ["Please try again"],
                        "priority_focus": "System optimization needed"
                    },
                    "swot_analysis": {
                        "strengths": ["Data collection successful"],
                        "weaknesses": ["Analysis engine needs optimization"],
                        "opportunities": ["System improvement in progress"],
                        "threats": ["Temporary service interruption"]
                    },
                    "action_plan": {
                        "immediate": ["Retry analysis"],
                        "mid_term": ["System will be optimized"],
                        "long_term": ["Full service restoration"]
                    },
                    "training_recommendations": ["Please contact support for recommendations"]
                }
                
        except Exception as e:
            # Fallback response if OpenAI fails
            return {
                "competence_level": level,
                "competence_report": {
                    "overall_score": avg_score,
                    "category_scores": scores
                },
                "gap_analysis": {
                    "major_gaps": [f"Analysis error: {str(e)}"],
                    "improvement_areas": ["OpenAI API configuration needed"],
                    "priority_focus": "Configure OpenAI API key"
                },
                "swot_analysis": {
                    "strengths": ["Basic analysis available"],
                    "weaknesses": ["AI analysis unavailable"],
                    "opportunities": ["Configure API for full features"],
                    "threats": ["Limited functionality without API"]
                },
                "action_plan": {
                    "immediate": ["Set OPENAI_API_KEY environment variable"],
                    "mid_term": ["Configure OpenAI account"],
                    "long_term": ["Enable full AI analysis"]
                },
                "training_recommendations": ["Configure OpenAI API to access recommendations"]
            }