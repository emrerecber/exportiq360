"""
AI-Powered Comprehensive Report Generation Service
Generates detailed analysis with AI comments for each question
"""
import os
from typing import Dict, List, Any
from datetime import datetime
import openai
from models import ComprehensiveReport, QuestionAnalysis, ChannelScore

class ReportService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        if self.api_key:
            openai.api_key = self.api_key
        
        # Channel and category mappings
        self.channel_names = {
            "ecommerce": "E-Ticaret (Yurtiçi)",
            "eexport": "E-İhracat (Uluslararası)",
            "combined": "Kapsamlı Paket"
        }
        
        self.category_names = {
            "strategy": "Strateji ve Planlama",
            "tech": "Teknoloji ve Altyapı",
            "marketing": "Pazarlama ve İletişim",
            "logistics": "Lojistik ve Operasyon",
            "analytics": "Analitik ve Veri Yönetimi"
        }
    
    def generate_comprehensive_report(
        self, 
        user_id: str,
        assessment_id: str,
        user_responses: List[Dict],
        questions_data: List[Dict],
        package_type: str,
        language: str = "tr"
    ) -> ComprehensiveReport:
        """Generate a comprehensive AI-powered report"""
        
        # Create question map for easy lookup
        question_map = {q["id"]: q for q in questions_data}
        
        # Calculate scores
        channel_scores = self._calculate_channel_scores(user_responses, questions_data, package_type)
        category_scores = self._calculate_category_scores(user_responses, questions_data)
        overall_score = self._calculate_overall_score(user_responses)
        
        # Generate AI analysis for each question
        question_analyses = self._generate_question_analyses(
            user_responses, 
            question_map, 
            language
        )
        
        # Generate strategic insights
        insights = self._generate_strategic_insights(
            user_responses,
            question_map,
            channel_scores,
            category_scores,
            language
        )
        
        # Create comprehensive report
        report = ComprehensiveReport(
            user_id=user_id,
            assessment_id=assessment_id,
            package_type=package_type,
            overall_score=overall_score,
            channel_scores=channel_scores,
            category_scores=category_scores,
            question_analyses=question_analyses,
            strengths=insights["strengths"],
            weaknesses=insights["weaknesses"],
            recommendations=insights["recommendations"],
            action_plan=insights["action_plan"],
            generated_at=datetime.now()
        )
        
        return report
    
    def _calculate_overall_score(self, responses: List[Dict]) -> float:
        """Calculate overall score from all responses"""
        if not responses:
            return 0.0
        
        total_score = sum(resp["answer"] for resp in responses)
        max_score = len(responses) * 5
        return round((total_score / max_score) * 100, 2)
    
    def _calculate_channel_scores(
        self, 
        responses: List[Dict], 
        questions: List[Dict],
        package_type: str
    ) -> List[ChannelScore]:
        """Calculate scores for each channel"""
        question_map = {q["id"]: q for q in questions}
        channel_scores_dict = {}
        
        for resp in responses:
            question = question_map.get(resp["question_id"])
            if not question:
                continue
            
            channels = question.get("channels", ["general"])
            for channel in channels:
                if channel not in channel_scores_dict:
                    channel_scores_dict[channel] = {"score": 0, "count": 0}
                
                channel_scores_dict[channel]["score"] += resp["answer"]
                channel_scores_dict[channel]["count"] += 1
        
        # Convert to ChannelScore objects
        channel_scores = []
        for channel, data in channel_scores_dict.items():
            max_score = data["count"] * 5
            score = data["score"]
            percentage = round((score / max_score) * 100, 2) if max_score > 0 else 0
            
            # Determine level
            if percentage >= 80:
                level = "Uzman"
            elif percentage >= 60:
                level = "İleri"
            elif percentage >= 40:
                level = "Orta"
            else:
                level = "Başlangıç"
            
            channel_scores.append(ChannelScore(
                channel=self.channel_names.get(channel, channel.title()),
                score=score,
                max_score=max_score,
                percentage=percentage,
                level=level
            ))
        
        return channel_scores
    
    def _calculate_category_scores(
        self, 
        responses: List[Dict], 
        questions: List[Dict]
    ) -> Dict[str, float]:
        """Calculate scores for each category"""
        question_map = {q["id"]: q for q in questions}
        category_scores = {}
        category_counts = {}
        
        for resp in responses:
            question = question_map.get(resp["question_id"])
            if not question:
                continue
            
            category = question.get("category", "general")
            if category not in category_scores:
                category_scores[category] = 0
                category_counts[category] = 0
            
            category_scores[category] += resp["answer"]
            category_counts[category] += 1
        
        # Calculate percentages
        result = {}
        for category, score in category_scores.items():
            max_score = category_counts[category] * 5
            percentage = round((score / max_score) * 100, 2) if max_score > 0 else 0
            category_name = self.category_names.get(category, category.title())
            result[category_name] = percentage
        
        return result
    
    def _generate_question_analyses(
        self, 
        responses: List[Dict], 
        question_map: Dict[str, Dict],
        language: str
    ) -> List[QuestionAnalysis]:
        """Generate AI analysis for each question"""
        analyses = []
        
        for resp in responses:
            question = question_map.get(resp["question_id"])
            if not question:
                continue
            
            question_text = question["question"].get(language, question["question"].get("tr", ""))
            user_answer = resp["answer"]
            category = question.get("category", "general")
            
            # Generate AI comment
            ai_comment = self._generate_ai_comment(
                question_text, 
                user_answer, 
                category,
                language
            )
            
            analyses.append(QuestionAnalysis(
                question_id=resp["question_id"],
                question_text=question_text,
                user_answer=user_answer,
                ai_comment=ai_comment,
                category=self.category_names.get(category, category.title())
            ))
        
        return analyses
    
    def _generate_ai_comment(
        self, 
        question: str, 
        answer: int,
        category: str,
        language: str
    ) -> str:
        """Generate AI comment for a specific question-answer pair"""
        
        if not self.api_key:
            return self._get_fallback_comment(answer, language)
        
        try:
            # Prepare prompt
            prompt = self._create_comment_prompt(question, answer, category, language)
            
            # Call OpenAI API
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": self._get_system_prompt(language)},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=200
            )
            
            comment = response.choices[0].message.content.strip()
            return comment
            
        except Exception as e:
            print(f"Error generating AI comment: {e}")
            return self._get_fallback_comment(answer, language)
    
    def _create_comment_prompt(self, question: str, answer: int, category: str, language: str) -> str:
        """Create prompt for AI comment generation"""
        if language == "tr":
            return f"""Aşağıdaki e-ticaret/e-ihracat değerlendirme sorusu ve kullanıcının verdiği yanıt için kısa, öz ve yapıcı bir yorum yaz:

Kategori: {self.category_names.get(category, category)}
Soru: {question}
Kullanıcının Puanı: {answer}/5

Yorumun:
- 2-3 cümle olsun
- Mevcut durumu değerlendir
- Kısa bir iyileştirme önerisi sun
- Pozitif ve motive edici olsun"""
        else:
            return f"""Write a brief, constructive comment for this e-commerce/e-export assessment question and user's answer:

Category: {category}
Question: {question}
User's Score: {answer}/5

Comment should:
- Be 2-3 sentences
- Evaluate current situation
- Provide a brief improvement suggestion
- Be positive and motivating"""
    
    def _get_system_prompt(self, language: str) -> str:
        """Get system prompt for AI"""
        if language == "tr":
            return """Sen e-ticaret ve e-ihracat konusunda uzman bir danışmansın. 
Şirketlerin dijital dönüşüm ve uluslararası ticaret yetkinliklerini değerlendiriyorsun.
Yorumların kısa, öz, yapıcı ve motive edici olmalı."""
        else:
            return """You are an expert consultant in e-commerce and e-export.
You evaluate companies' digital transformation and international trade competencies.
Your comments should be brief, constructive, and motivating."""
    
    def _get_fallback_comment(self, answer: int, language: str) -> str:
        """Fallback comments when AI is not available"""
        if language == "tr":
            comments = {
                5: "Mükemmel! Bu alanda çok güçlüsünüz. Bu başarıyı sürdürün.",
                4: "İyi durumdasınız. Birkaç iyileştirme ile mükemmel seviyeye ulaşabilirsiniz.",
                3: "Orta seviyedesiniz. Gelişim için potansiyel var. Odaklanın.",
                2: "Başlangıç aşamasındasınız. Bu alana yatırım yapmanız önerilir.",
                1: "Bu alan sizin için öncelikli gelişim alanı. Acil aksiyon gerekiyor."
            }
        else:
            comments = {
                5: "Excellent! You're very strong in this area. Keep up the great work.",
                4: "You're doing well. A few improvements can take you to excellent level.",
                3: "You're at an intermediate level. There's potential for growth. Focus here.",
                2: "You're at beginner level. Investment in this area is recommended.",
                1: "This is a priority development area for you. Immediate action needed."
            }
        
        return comments.get(answer, comments[3])
    
    def _generate_strategic_insights(
        self,
        responses: List[Dict],
        question_map: Dict[str, Dict],
        channel_scores: List[ChannelScore],
        category_scores: Dict[str, float],
        language: str
    ) -> Dict[str, Any]:
        """Generate strategic insights using AI"""
        
        if not self.api_key:
            return self._get_fallback_insights(channel_scores, category_scores, language)
        
        try:
            # Prepare comprehensive context
            context = self._prepare_insights_context(
                responses, 
                question_map, 
                channel_scores, 
                category_scores
            )
            
            prompt = self._create_insights_prompt(context, language)
            
            # Call OpenAI API
            response = openai.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": self._get_insights_system_prompt(language)},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=1500
            )
            
            insights_text = response.choices[0].message.content.strip()
            insights = self._parse_insights_response(insights_text)
            
            return insights
            
        except Exception as e:
            print(f"Error generating strategic insights: {e}")
            return self._get_fallback_insights(channel_scores, category_scores, language)
    
    def _prepare_insights_context(
        self,
        responses: List[Dict],
        question_map: Dict[str, Dict],
        channel_scores: List[ChannelScore],
        category_scores: Dict[str, float]
    ) -> str:
        """Prepare context for insights generation"""
        context_parts = []
        
        # Channel scores
        context_parts.append("Kanal Skorları:")
        for cs in channel_scores:
            context_parts.append(f"- {cs.channel}: {cs.percentage}% ({cs.level})")
        
        # Category scores
        context_parts.append("\nKategori Skorları:")
        for cat, score in category_scores.items():
            context_parts.append(f"- {cat}: {score}%")
        
        # Low scoring questions
        context_parts.append("\nDüşük Puanlı Sorular:")
        for resp in responses:
            if resp["answer"] <= 2:
                q = question_map.get(resp["question_id"])
                if q:
                    context_parts.append(f"- {q['question'].get('tr', '')}: {resp['answer']}/5")
        
        return "\n".join(context_parts)
    
    def _create_insights_prompt(self, context: str, language: str) -> str:
        """Create prompt for strategic insights"""
        if language == "tr":
            return f"""Aşağıdaki e-ticaret/e-ihracat değerlendirme sonuçlarına göre stratejik analiz yap:

{context}

Şu formatta yanıt ver:

GÜÇLÜ YÖNLER:
- [3-4 madde]

ZAYIF YÖNLER:
- [3-4 madde]

ÖNERİLER:
- [4-5 madde]

AKSİYON PLANI:
Kısa Vadeli (0-3 ay):
- [2-3 madde]

Orta Vadeli (3-6 ay):
- [2-3 madde]

Uzun Vadeli (6-12 ay):
- [2-3 madde]"""
        else:
            return f"""Provide strategic analysis based on these e-commerce/e-export assessment results:

{context}

Response format:

STRENGTHS:
- [3-4 items]

WEAKNESSES:
- [3-4 items]

RECOMMENDATIONS:
- [4-5 items]

ACTION PLAN:
Short Term (0-3 months):
- [2-3 items]

Medium Term (3-6 months):
- [2-3 items]

Long Term (6-12 months):
- [2-3 items]"""
    
    def _get_insights_system_prompt(self, language: str) -> str:
        """Get system prompt for insights generation"""
        if language == "tr":
            return """Sen e-ticaret ve e-ihracat konusunda uzman bir stratejik danışmansın.
Değerlendirme sonuçlarını analiz edip şirketler için stratejik öneriler sunuyorsun.
Önerilerin spesifik, uygulanabilir ve önceliklendirilmiş olmalı."""
        else:
            return """You are an expert strategic consultant in e-commerce and e-export.
You analyze assessment results and provide strategic recommendations for companies.
Your suggestions should be specific, actionable, and prioritized."""
    
    def _parse_insights_response(self, text: str) -> Dict[str, Any]:
        """Parse AI insights response"""
        insights = {
            "strengths": [],
            "weaknesses": [],
            "recommendations": [],
            "action_plan": {
                "Kısa Vadeli (0-3 ay)": [],
                "Orta Vadeli (3-6 ay)": [],
                "Uzun Vadeli (6-12 ay)": []
            }
        }
        
        current_section = None
        current_subsection = None
        
        for line in text.split("\n"):
            line = line.strip()
            if not line:
                continue
            
            # Check for main sections
            if "GÜÇLÜ YÖNLER" in line or "STRENGTHS" in line:
                current_section = "strengths"
                current_subsection = None
            elif "ZAYIF YÖNLER" in line or "WEAKNESSES" in line or "ZAYIFLIK" in line:
                current_section = "weaknesses"
                current_subsection = None
            elif "ÖNERİLER" in line or "RECOMMENDATIONS" in line:
                current_section = "recommendations"
                current_subsection = None
            elif "AKSİYON PLANI" in line or "ACTION PLAN" in line:
                current_section = "action_plan"
                current_subsection = None
            # Check for action plan subsections
            elif current_section == "action_plan":
                if "Kısa Vadeli" in line or "Short Term" in line:
                    current_subsection = "Kısa Vadeli (0-3 ay)"
                elif "Orta Vadeli" in line or "Medium Term" in line:
                    current_subsection = "Orta Vadeli (3-6 ay)"
                elif "Uzun Vadeli" in line or "Long Term" in line:
                    current_subsection = "Uzun Vadeli (6-12 ay)"
                elif line.startswith("-") and current_subsection:
                    insights["action_plan"][current_subsection].append(line[1:].strip())
            # Add items to current section
            elif line.startswith("-") and current_section and current_section != "action_plan":
                insights[current_section].append(line[1:].strip())
        
        return insights
    
    def _get_fallback_insights(
        self, 
        channel_scores: List[ChannelScore],
        category_scores: Dict[str, float],
        language: str
    ) -> Dict[str, Any]:
        """Fallback insights when AI is not available"""
        
        # Find strongest and weakest
        sorted_categories = sorted(category_scores.items(), key=lambda x: x[1], reverse=True)
        
        if language == "tr":
            return {
                "strengths": [
                    f"{sorted_categories[0][0]} alanında güçlü performans ({sorted_categories[0][1]}%)",
                    "Genel olarak dijital dönüşüme açık bir yapı",
                    "İyileştirmeye istekli bir organizasyon"
                ],
                "weaknesses": [
                    f"{sorted_categories[-1][0]} alanında gelişim gerekiyor ({sorted_categories[-1][1]}%)",
                    "Bazı alanlarda sistematik yaklaşım eksikliği",
                    "Dijital araçların etkin kullanımında boşluklar"
                ],
                "recommendations": [
                    f"{sorted_categories[-1][0]} alanına öncelik verin",
                    "Ekip eğitimlerine yatırım yapın",
                    "Dijital araçları sistematik kullanmaya başlayın",
                    "Veri odaklı karar alma süreçleri oluşturun"
                ],
                "action_plan": {
                    "Kısa Vadeli (0-3 ay)": [
                        f"{sorted_categories[-1][0]} için hızlı kazanımlar sağlayın",
                        "Mevcut araçların kullanımını optimize edin"
                    ],
                    "Orta Vadeli (3-6 ay)": [
                        "Sistematik süreçler oluşturun",
                        "Ekip kapasitesini geliştirin"
                    ],
                    "Uzun Vadeli (6-12 ay)": [
                        "Tam entegre dijital ekosistem kurun",
                        "Sürekli iyileştirme kültürü oluşturun"
                    ]
                }
            }
        else:
            return {
                "strengths": [
                    f"Strong performance in {sorted_categories[0][0]} ({sorted_categories[0][1]}%)",
                    "Generally open to digital transformation",
                    "Organization willing to improve"
                ],
                "weaknesses": [
                    f"Need development in {sorted_categories[-1][0]} ({sorted_categories[-1][1]}%)",
                    "Lack of systematic approach in some areas",
                    "Gaps in effective use of digital tools"
                ],
                "recommendations": [
                    f"Prioritize {sorted_categories[-1][0]}",
                    "Invest in team training",
                    "Start systematic use of digital tools",
                    "Create data-driven decision processes"
                ],
                "action_plan": {
                    "Kısa Vadeli (0-3 ay)": [
                        f"Achieve quick wins in {sorted_categories[-1][0]}",
                        "Optimize use of existing tools"
                    ],
                    "Orta Vadeli (3-6 ay)": [
                        "Create systematic processes",
                        "Develop team capacity"
                    ],
                    "Uzun Vadeli (6-12 ay)": [
                        "Build fully integrated digital ecosystem",
                        "Create continuous improvement culture"
                    ]
                }
            }

# Global instance
report_service = ReportService()
