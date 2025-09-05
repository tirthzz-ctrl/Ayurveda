import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('ayurveda_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'patient' | 'doctor'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users for demo
    const mockUsers = {
      'doctor@ayurveda.com': {
        id: 'doc1',
        name: 'Dr. Rajesh Sharma',
        email: 'doctor@ayurveda.com',
        role: 'doctor' as const,
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
      },
      'patient@ayurveda.com': {
        id: 'pat1',
        name: 'Priya Patel',
        email: 'patient@ayurveda.com',
        role: 'patient' as const,
        avatar: '/images/portrait.jpg'
      }
    };

    const mockUser = mockUsers[email as keyof typeof mockUsers];
    
    if (mockUser && mockUser.role === role && password === 'demo123') {
      setUser(mockUser);
      localStorage.setItem('ayurveda_user', JSON.stringify(mockUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ayurveda_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};