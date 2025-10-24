export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  plan: 'free_trial' | 'ecommerce' | 'eexport' | 'combined';
  role: 'admin' | 'user' | 'free_trial';
  joinDate: string;
  assessments?: Assessment[];
  trialCompleted?: boolean;
}

export interface Assessment {
  id: string;
  type: 'e-commerce' | 'e-export';
  score: number;
  date: string;
  status: 'draft' | 'in-progress' | 'completed';
  companyName?: string;
  results?: any;
}

export interface Plan {
  name: string;
  price: number;
  currency: string;
  features: string[];
  limitations?: string[];
  color: string;
  popular?: boolean;
}

export interface Plans {
  ecommerce: Plan;
  eexport: Plan;
  combined: Plan;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  company?: string;
  confirmPassword: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  planApplicable?: ('ecommerce' | 'eexport' | 'combined')[];
  maxUses?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}
