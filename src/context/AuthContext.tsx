import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { CareerBridgeDB } from '../services/db';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => void;
  signup: (fullName: string, email: string, role?: UserRole) => UserProfile;
  logout: () => void;
  setRole: (role: UserRole) => void;
  loadDemoUser: () => void;
  resetToNewUser: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const existing = CareerBridgeDB.getProfile();
    if (existing) {
      setUser(existing);
    }
    setIsLoading(false);
  }, []);

  const refreshUser = () => {
    const fresh = CareerBridgeDB.getProfile();
    setUser(fresh);
  };

  const login = (email: string, selectedRole: UserRole = 'student') => {
    let existing = CareerBridgeDB.getProfile();
    if (!existing) {
      existing = {
        id: `usr-${Date.now()}`,
        email,
        fullName: email.split('@')[0].replace('.', ' '),
        role: selectedRole,
        isOnboardingCompleted: false,
        isAnalyzed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      CareerBridgeDB.saveProfile(existing);
    } else {
      existing.role = selectedRole;
      CareerBridgeDB.saveProfile(existing);
    }
    setUser(existing);
  };

  const signup = (fullName: string, email: string, selectedRole: UserRole = 'student'): UserProfile => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email,
      fullName,
      role: selectedRole,
      isOnboardingCompleted: false,
      isAnalyzed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    CareerBridgeDB.saveProfile(newUser);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const setRole = (newRole: UserRole) => {
    if (user) {
      const updated = CareerBridgeDB.updateProfile({ role: newRole });
      setUser(updated);
    }
  };

  const loadDemoUser = () => {
    CareerBridgeDB.loadDemoProfile();
    const demo = CareerBridgeDB.getProfile();
    setUser(demo);
  };

  const resetToNewUser = () => {
    CareerBridgeDB.clearAllData();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'student',
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        setRole,
        loadDemoUser,
        resetToNewUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
