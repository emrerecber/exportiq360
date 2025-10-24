# ExportIQ 360 - E-İhracat Botu MVP

![ExportIQ 360](https://img.shields.io/badge/ExportIQ-360-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991)

A complete AI-powered SaaS MVP that measures companies' e-commerce & e-export competence using GPT-powered analysis (E-İhracat Botu) with beautiful analytics dashboard.

## 🚀 Features

- **Bilingual Support**: Turkish and English interface
- **AI-Powered Analysis**: Uses OpenAI GPT as "E-İhracat Botu" for competence analysis
- **Beautiful Dashboard**: Celestial-style UI with charts and visualizations
- **Real-time Assessment**: Interactive sliders for competence evaluation
- **Comprehensive Reports**: SWOT analysis, gap analysis, and action plans
- **Paraşüt Integration**: Automated invoicing for assessment package purchases
- **Modern Tech Stack**: React + Vite + TailwindCSS + FastAPI

## 🏗️ Architecture

```
/exportiq-360
 ├── /frontend          # React + Vite + TailwindCSS
 │     ├── /src
 │     │     ├── App.jsx
 │     │     └── /components
 │     │           ├── Sidebar.jsx
 │     │           ├── AssessmentForm.jsx
 │     │           └── Dashboard.jsx
 │     └── /public
 ├── /backend           # FastAPI + OpenAI
 │     ├── main.py
 │     ├── models.py
 │     ├── gpt_engine.py
 │     └── requirements.txt
 ├── docker-compose.yml
 └── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19.x** with Vite
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Axios** for API communication

### Backend
- **FastAPI** for REST API
- **OpenAI API** (GPT-3.5-turbo) for AI analysis
- **Pydantic** for data validation
- **Python-dotenv** for environment management

## 📋 Prerequisites

- Node.js 18+ 
- Python 3.11+
- OpenAI API Key
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone <repository-url>
cd exportiq-360
```

### 2. Environment Configuration

Create `.env` files:

**Backend (.env):**
```env
OPENAI_API_KEY=your_openai_api_key_here
ENV=development
API_HOST=0.0.0.0
API_PORT=8000

# Paraşüt API Configuration
PARASUT_CLIENT_ID=your_parasut_client_id_here
PARASUT_CLIENT_SECRET=your_parasut_client_secret_here
PARASUT_USERNAME=your_parasut_username_here
PARASUT_PASSWORD=your_parasut_password_here
PARASUT_COMPANY_ID=your_parasut_company_id_here

# Webhook Security (optional)
WEBHOOK_SECRET=your_webhook_secret_key_here
```

**Frontend (.env.local):**
```env
VITE_API_URL=http://localhost:8000
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Manual Setup

#### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Docker Setup (Recommended)

```bash
# Set your OpenAI API key
export OPENAI_API_KEY=your_openai_api_key_here

# Run with Docker Compose
docker-compose up --build
```

## 🌐 Usage

1. **Open your browser** to `http://localhost:5173`
2. **Select Language** (Turkish/English)
3. **Rate Your Company** across 5 categories (1-5 scale):
   - Strategy (Strateji)
   - Technology (Teknoloji) 
   - Marketing (Pazarlama)
   - Logistics (Lojistik)
   - Analytics (Analitik)
4. **Get AI Analysis** with:
   - Competence Level (Temel/Orta/İleri)
   - Visual Charts & Radar Map
   - Gap Analysis
   - SWOT Analysis
   - Action Plan (Immediate/Mid-term/Long-term)
   - Training Recommendations

## 🎯 API Endpoints

### Backend API (Port 8000)

#### Core Endpoints
- `GET /` - Health check
- `POST /analyze` - Analyze competence scores
- `GET /health` - Detailed health status

#### Invoice/Paraşüt Endpoints
- `POST /invoice/create` - Create invoice via Paraşüt API
- `POST /payment/webhook` - Webhook for automatic invoice creation on payment

### Request Example

```json
POST /analyze
{
  "strategy": 4,
  "tech": 3,
  "marketing": 5,
  "logistics": 2,
  "analytics": 3,
  "language": "tr"
}
```

### Response Example

```json
{
  "competence_level": "Orta",
  "competence_report": {
    "overall_score": 3.4,
    "category_scores": {
      "strategy": 4,
      "tech": 3,
      "marketing": 5,
      "logistics": 2,
      "analytics": 3
    }
  },
  "gap_analysis": {
    "major_gaps": ["Lojistik alanında güçlendirme gerekli"],
    "improvement_areas": ["Teknoloji entegrasyonu", "Lojistik optimization"],
    "priority_focus": "Lojistik süreçleri"
  },
  "swot_analysis": {
    "strengths": ["Güçlü pazarlama", "İyi strateji"],
    "weaknesses": ["Zayıf lojistik", "Orta seviye teknoloji"],
    "opportunities": ["Dijital dönüşüm", "E-ticaret büyümesi"],
    "threats": ["Rekabet artışı", "Teknoloji değişimi"]
  },
  "action_plan": {
    "immediate": ["Lojistik süreçlerini analiz et"],
    "mid_term": ["Teknoloji yatırımı planlayın"],
    "long_term": ["Tam entegre sistem kurulumu"]
  }
}
```

## 💳 Paraşüt Integration

ExportIQ 360 includes automated invoicing through Paraşüt accounting software.

### Setup

1. **Get Paraşüt Credentials**
   - Sign up at [parasut.com](https://www.parasut.com)
   - Get API credentials from developer settings
   - Note your Company ID

2. **Configure Environment Variables**
   ```bash
   PARASUT_CLIENT_ID=your_client_id
   PARASUT_CLIENT_SECRET=your_client_secret
   PARASUT_USERNAME=your_email
   PARASUT_PASSWORD=your_password
   PARASUT_COMPANY_ID=your_company_id
   ```

3. **Access Invoice Management**
   - Navigate to `/admin/invoice-management` (Admin only)
   - Create invoices manually or automatically via webhook

### Usage

#### Manual Invoice Creation
Access the Invoice Management page to create invoices:
- Fill customer information
- Specify package/product details
- Set amount (VAT is calculated automatically)
- Invoice is created and emailed to customer

#### Automatic Invoice Creation
Use the webhook endpoint for payment integrations:
```bash
POST /payment/webhook
{
  "customer_name": "Company Name",
  "customer_email": "customer@example.com",
  "package_name": "ExportIQ 360 Assessment Paketi",
  "amount": 1000.00
}
```

### Features
- ✅ Automatic customer creation in Paraşüt
- ✅ Invoice generation with Turkish tax compliance
- ✅ Email delivery to customers
- ✅ 20% VAT calculation
- ✅ Webhook security with secret token

## 🎨 UI Features

- **Language Selection**: Smooth Turkish/English switching
- **Interactive Sliders**: Real-time score adjustment
- **Radar Charts**: Visual competence mapping
- **Bar Charts**: Score distribution visualization
- **Responsive Design**: Works on desktop and mobile
- **Celestial Theme**: Modern indigo/blue color scheme
- **Invoice Management**: Admin panel for invoice creation

## 🔧 Development

### Frontend Development

```bash
cd frontend
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview build
```

### Backend Development

```bash
cd backend
uvicorn main:app --reload           # Development server
python -m pytest                   # Run tests
python -m flake8 .                  # Code linting
```

### Adding New Features

1. **Frontend**: Add new components in `src/components/`
2. **Backend**: Add new endpoints in `main.py`
3. **AI Logic**: Modify prompts in `gpt_engine.py`

## 🚨 Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   ```bash
   # Set your API key
   export OPENAI_API_KEY=sk-your-key-here
   ```

2. **CORS Issues**
   - Check frontend URL in backend CORS settings
   - Verify API URL in frontend .env.local

3. **Port Conflicts**
   - Frontend: Default 5173 (configurable in vite.config.js)
   - Backend: Default 8000 (configurable in main.py)

4. **Docker Issues**
   ```bash
   # Rebuild containers
   docker-compose down
   docker-compose up --build
   
   # Check logs
   docker-compose logs backend
   docker-compose logs frontend
   ```

## 🔐 Security

- **API Keys**: Never commit API keys to repository
- **Environment Variables**: Use .env files for sensitive data
- **CORS**: Restricted to localhost during development
- **Input Validation**: Pydantic models validate all inputs

## 📈 Performance

- **Frontend**: Vite for fast builds and hot reload
- **Backend**: FastAPI for high-performance API
- **Caching**: Component-level state management
- **Optimization**: Lazy loading and code splitting ready

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check existing issues for solutions
- Review API documentation

## 🎉 Acknowledgments

- OpenAI for GPT API
- React and Vite communities
- FastAPI framework
- TailwindCSS for styling
- Recharts for visualizations

---

**ExportIQ 360** - Empowering Turkish companies with AI-driven e-export competence analysis.

Made with ❤️ using React, FastAPI, and OpenAI GPT.