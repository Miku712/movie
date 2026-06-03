import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  nickname: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  register: (nickname: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('current_session');
    if (session) {
      try {
        setUser(JSON.parse(session));
      } catch (e) {
        console.error('Failed to parse session', e);
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (nickname: string, email: string, password: string) => {
    await delay(500); // Mock network delay
    const usersStr = localStorage.getItem('users_db');
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Користувач з таким email вже існує');
    }

    const newUser = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      nickname,
      email,
      password // In a real app, this should be hashed
    };

    users.push(newUser);
    localStorage.setItem('users_db', JSON.stringify(users));
    
    const userToSave = { id: newUser.id, nickname: newUser.nickname, email: newUser.email };
    localStorage.setItem('current_session', JSON.stringify(userToSave));
    setUser(userToSave);
  };

  const login = async (email: string, password: string) => {
    await delay(500); // Mock network delay
    const usersStr = localStorage.getItem('users_db');
    const users = usersStr ? JSON.parse(usersStr) : [];

    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Невірний email або пароль');
    }

    const userToSave = { id: foundUser.id, nickname: foundUser.nickname, email: foundUser.email };
    localStorage.setItem('current_session', JSON.stringify(userToSave));
    setUser(userToSave);
  };

  const logout = () => {
    localStorage.removeItem('current_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
