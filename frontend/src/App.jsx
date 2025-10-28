import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import AdminRoute from './components/routes/AdminRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import NewPricing from './pages/NewPricing';
import AssessmentPage from './pages/AssessmentPage';
import AssessmentTypeSelector from './pages/AssessmentTypeSelector';
import FreeTrialAssessment from './pages/FreeTrialAssessment';
import AdminDashboard from './pages/admin/AdminDashboard';
import PricingManagement from './pages/admin/PricingManagement';
import PromoManagement from './pages/admin/PromoManagement';
import SocialMediaManagement from './pages/admin/SocialMediaManagement';
import QuestionManagement from './pages/admin/QuestionManagement';
import Checkout from './pages/Checkout';
import ReportPage from './pages/ReportPage';
import ComprehensiveReport from './pages/ComprehensiveReport';
import InvoiceManagement from './pages/InvoiceManagement';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DistanceSelling from './pages/DistanceSelling';
import KVKK from './pages/KVKK';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<NewPricing />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/free-trial" element={<ProtectedRoute><FreeTrialAssessment /></ProtectedRoute>} />
          <Route path="/assessment-type" element={<ProtectedRoute><AssessmentTypeSelector /></ProtectedRoute>} />
          <Route path="/assessment/e-commerce" element={<ProtectedRoute><AssessmentPage assessmentType="e-commerce" /></ProtectedRoute>} />
          <Route path="/assessment/e-export" element={<ProtectedRoute><AssessmentPage assessmentType="e-export" /></ProtectedRoute>} />
          <Route path="/assessment/combined" element={<ProtectedRoute><AssessmentPage assessmentType="combined" /></ProtectedRoute>} />
          <Route path="/assessment" element={<Navigate to="/assessment-type" replace />} />
          <Route path="/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
          <Route path="/report/:assessmentId" element={<ProtectedRoute><ComprehensiveReport /></ProtectedRoute>} />
          
          {/* Legal Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/distance-selling" element={<DistanceSelling />} />
          <Route path="/kvkk" element={<KVKK />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes - Require Admin Role */}
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/pricing-management" element={<AdminRoute><PricingManagement /></AdminRoute>} />
          <Route path="/admin/promo-management" element={<AdminRoute><PromoManagement /></AdminRoute>} />
          <Route path="/admin/social-media" element={<AdminRoute><SocialMediaManagement /></AdminRoute>} />
          <Route path="/admin/invoice-management" element={<AdminRoute><InvoiceManagement /></AdminRoute>} />
          <Route path="/admin/questions" element={<AdminRoute><QuestionManagement /></AdminRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
