from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
def health():
    return jsonify({
        "message": "ExportIQ 360 API is running", 
        "status": "healthy",
        "version": "1.0.0"
    })

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    
    # Calculate average score
    scores = {
        "strategy": data.get('strategy', 3),
        "tech": data.get('tech', 3),
        "marketing": data.get('marketing', 3), 
        "logistics": data.get('logistics', 3),
        "analytics": data.get('analytics', 3)
    }
    
    avg_score = sum(scores.values()) / len(scores)
    language = data.get('language', 'tr')
    
    # Determine level
    if avg_score < 2.6:
        level = "Temel" if language == "tr" else "Basic"
    elif avg_score < 4.0:
        level = "Orta" if language == "tr" else "Intermediate"
    else:
        level = "İleri" if language == "tr" else "Advanced"
    
    # Advanced AI Analysis
    def get_advanced_analysis(scores, avg_score, level, language):
        # Find weakest and strongest areas
        sorted_scores = sorted(scores.items(), key=lambda x: x[1])
        weakest = sorted_scores[0]
        strongest = sorted_scores[-1]
        
        # Determine specific recommendations based on scores
        recommendations = {
            "strategy": {
                "tr": ["Dijital strateji geliştirme", "Pazar araştırması", "Rekabet analizi"],
                "en": ["Digital strategy development", "Market research", "Competitive analysis"]
            },
            "tech": {
                "tr": ["E-ticaret platform eğitimi", "API entegrasyonları", "Mobil uygulama geliştirme"],
                "en": ["E-commerce platform training", "API integrations", "Mobile app development"]
            },
            "marketing": {
                "tr": ["SEO optimizasyonu", "Sosyal medya pazarlama", "Google Ads eğitimi"],
                "en": ["SEO optimization", "Social media marketing", "Google Ads training"]
            },
            "logistics": {
                "tr": ["Depo yönetim sistemi", "Kargo entegrasyonları", "Stok optimizasyonu"],
                "en": ["Warehouse management system", "Shipping integrations", "Inventory optimization"]
            },
            "analytics": {
                "tr": ["Google Analytics kurulumu", "Veri analizi eğitimi", "KPI takibi"],
                "en": ["Google Analytics setup", "Data analysis training", "KPI tracking"]
            }
        }
        
        # Generate detailed analysis
        if language == "tr":
            analysis = {
                "competence_level": level,
                "competence_report": {
                    "overall_score": round(avg_score, 1),
                    "category_scores": scores,
                    "performance_summary": f"En güçlü alan: {strongest[0].title()} ({strongest[1]}/5), En zayıf alan: {weakest[0].title()} ({weakest[1]}/5)"
                },
                "gap_analysis": {
                    "major_gaps": [f"{weakest[0].title()} alanında {5-weakest[1]} puan eksiklik var"],
                    "improvement_areas": [area for area, score in sorted_scores[:2]],
                    "priority_focus": f"Önce {weakest[0]} alanını güçlendirin",
                    "strength_areas": [area for area, score in sorted_scores[-2:]]
                },
                "swot_analysis": {
                    "strengths": [f"{strongest[0].title()} alanında iyi performans", "Mevcut iş deneyimi"],
                    "weaknesses": [f"{weakest[0].title()} alanında gelişim gerekli", "Dijital dönüşüm eksiklikleri"],
                    "opportunities": ["Dijital pazarda büyüme potansiyeli", "E-ihracat destekleri", "Teknoloji çözümleri"],
                    "threats": ["Rekabet artışı", "Teknoloji değişimi hızı", "Müşteri beklentileri"]                
                },
                "action_plan": {
                    "immediate": [f"{weakest[0].title()} alanı için acil eğitim planla", "Mevcut sistemi analiz et"],
                    "mid_term": ["Teknoloji yatırımları yap", f"{strongest[0]} avantajını geliştir"],
                    "long_term": ["Tüm alanları entegre et", "Sürekli iyileştirme kur"]
                },
                "training_recommendations": recommendations[weakest[0]]["tr"] + ["E-ihracat genel eğitimi"],
                "sector_benchmark": {
                    "average_score": 3.2,
                    "your_position": "ortalama üstü" if avg_score > 3.2 else "ortalama altı",
                    "improvement_potential": f"{(5-avg_score)*20:.0f}% iyileştirme potansiyeli"
                }
            }
        else:
            analysis = {
                "competence_level": level,
                "competence_report": {
                    "overall_score": round(avg_score, 1),
                    "category_scores": scores,
                    "performance_summary": f"Strongest area: {strongest[0].title()} ({strongest[1]}/5), Weakest area: {weakest[0].title()} ({weakest[1]}/5)"
                },
                "gap_analysis": {
                    "major_gaps": [f"{weakest[0].title()} area has {5-weakest[1]} point gap"],
                    "improvement_areas": [area for area, score in sorted_scores[:2]],
                    "priority_focus": f"Focus on strengthening {weakest[0]} first",
                    "strength_areas": [area for area, score in sorted_scores[-2:]]
                },
                "swot_analysis": {
                    "strengths": [f"Good performance in {strongest[0]}", "Existing business experience"],
                    "weaknesses": [f"{weakest[0].title()} needs development", "Digital transformation gaps"],
                    "opportunities": ["Digital market growth potential", "E-export incentives", "Technology solutions"],
                    "threats": ["Increasing competition", "Rapid technology change", "Customer expectations"]
                },
                "action_plan": {
                    "immediate": [f"Plan urgent training for {weakest[0]}", "Analyze current systems"],
                    "mid_term": ["Make technology investments", f"Develop {strongest[0]} advantage"],
                    "long_term": ["Integrate all areas", "Establish continuous improvement"]
                },
                "training_recommendations": recommendations[weakest[0]]["en"] + ["General e-export training"],
                "sector_benchmark": {
                    "average_score": 3.2,
                    "your_position": "above average" if avg_score > 3.2 else "below average",
                    "improvement_potential": f"{(5-avg_score)*20:.0f}% improvement potential"
                }
            }
            
        return analysis
    
    # Create response based on language  
    response = get_advanced_analysis(scores, avg_score, level, language)
    
    return jsonify(response)

@app.route('/export-pdf', methods=['POST'])
def export_pdf():
    data = request.get_json()
    
    # Create PDF in memory
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    
    # Define styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        textColor=HexColor('#4f46e5'),
        alignment=1  # Center
    )
    
    # Build PDF content
    content = []
    
    # Title
    content.append(Paragraph("ExportIQ 360 - E-İhracat Yetkinlik Raporu", title_style))
    content.append(Spacer(1, 12))
    
    # Date
    content.append(Paragraph(f"Rapor Tarihi: {datetime.now().strftime('%d/%m/%Y %H:%M')}", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Overall Score
    competence_level = data.get('competence_level', 'Bilinmiyor')
    overall_score = data.get('competence_report', {}).get('overall_score', 0)
    
    content.append(Paragraph(f"<b>Genel Yetkinlik Seviyesi:</b> {competence_level}", styles['Heading2']))
    content.append(Paragraph(f"<b>Ortalama Skor:</b> {overall_score}/5", styles['Normal']))
    content.append(Spacer(1, 12))
    
    # Category Scores Table
    if 'competence_report' in data and 'category_scores' in data['competence_report']:
        scores = data['competence_report']['category_scores']
        score_data = [['Kategori', 'Puan', 'Performans']]
        
        for category, score in scores.items():
            performance = 'Mükemmel' if score >= 4.5 else 'İyi' if score >= 3.5 else 'Orta' if score >= 2.5 else 'Zayıf'
            score_data.append([category.title(), f"{score}/5", performance])
        
        score_table = Table(score_data)
        score_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), HexColor('#4f46e5')),
            ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#ffffff')),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 1, HexColor('#e2e8f0'))
        ]))
        
        content.append(Paragraph("<b>Kategori Skorları:</b>", styles['Heading2']))
        content.append(score_table)
        content.append(Spacer(1, 12))
    
    # SWOT Analysis
    if 'swot_analysis' in data:
        content.append(Paragraph("<b>SWOT Analizi:</b>", styles['Heading2']))
        swot = data['swot_analysis']
        
        for key, items in swot.items():
            content.append(Paragraph(f"<b>{key.title()}:</b>", styles['Heading3']))
            for item in items:
                content.append(Paragraph(f"• {item}", styles['Normal']))
            content.append(Spacer(1, 6))
    
    # Action Plan
    if 'action_plan' in data:
        content.append(Paragraph("<b>Eylem Planı:</b>", styles['Heading2']))
        action_plan = data['action_plan']
        
        for timeframe, actions in action_plan.items():
            timeframe_tr = {'immediate': 'Acil', 'mid_term': 'Orta Vadeli', 'long_term': 'Uzun Vadeli'}.get(timeframe, timeframe)
            content.append(Paragraph(f"<b>{timeframe_tr}:</b>", styles['Heading3']))
            for action in actions:
                content.append(Paragraph(f"• {action}", styles['Normal']))
            content.append(Spacer(1, 6))
    
    # Build PDF
    doc.build(content)
    
    # Return PDF
    buffer.seek(0)
    return send_file(
        buffer,
        as_attachment=True,
        download_name=f'ExportIQ_Rapor_{datetime.now().strftime("%Y%m%d_%H%M")}.pdf',
        mimetype='application/pdf'
    )

@app.route('/health')
def health_check():
    return jsonify({
        "api_status": "running",
        "environment": "development"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)