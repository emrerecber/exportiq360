import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser?: (updatedUser: User) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('exportiq_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Mock login - gerçek uygulamada API çağrısı
    // Test kullanıcıları:
    // Admin: admin@exportiq.com / admin123
    // User: user@test.com / user123
    // Free Trial: trial@test.com / trial123
    
    let mockUser: User;
    
    if (credentials.email === 'admin@exportiq.com') {
      // Admin user - tüm özelliklere erişim
      mockUser = {
        id: 'admin-1',
        email: credentials.email,
        name: 'Admin User',
        company: 'ExportIQ 360',
        plan: 'combined',
        role: 'admin',
        joinDate: new Date().toISOString(),
        assessments: [],
        trialCompleted: true
      };
    } else if (credentials.email === 'trial@test.com') {
      // Free trial user - sadece 10 soruluk assessment
      mockUser = {
        id: 'trial-1',
        email: credentials.email,
        name: 'Trial User',
        company: 'Test Company',
        plan: 'free_trial',
        role: 'free_trial',
        joinDate: new Date().toISOString(),
        assessments: [],
        trialCompleted: false
      };
    } else {
      // Regular user - satın aldığı pakete göre
      mockUser = {
        id: Date.now().toString(),
        email: credentials.email,
        name: 'Demo User',
        company: 'Demo Company',
        plan: 'combined',
        role: 'user',
        joinDate: new Date().toISOString(),
        assessments: [],
        trialCompleted: true
      };
    }
    
    setUser(mockUser);
    localStorage.setItem('exportiq_user', JSON.stringify(mockUser));
  };

  const register = async (data: RegisterData) => {
    // Mock register - gerçek uygulamada API çağrısı
    // Yeni kullanıcılar free_trial ile başlar
    const newUser: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      company: data.company,
      plan: 'free_trial',
      role: 'free_trial',
      joinDate: new Date().toISOString(),
      assessments: [],
      trialCompleted: false
    };
    
    setUser(newUser);
    localStorage.setItem('exportiq_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('exportiq_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('exportiq_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
