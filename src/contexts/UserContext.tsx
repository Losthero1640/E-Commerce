import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  full_name: string;
  eco_coins: number;
}

interface UserContextType {
  user: User | null;
  ecoCoins: number;
  addEcoCoins: (amount: number) => void;
  spendEcoCoins: (amount: number) => boolean;
  isLoggedIn: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ecoCoins, setEcoCoins] = useState(1247); // Starting with demo coins

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCoins = localStorage.getItem('ecoCoins');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create demo user
      const demoUser = {
        id: 'demo-user',
        email: 'demo@ecomart.com',
        full_name: 'Demo User',
        eco_coins: 1247
      };
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    }
    
    if (savedCoins) {
      setEcoCoins(parseInt(savedCoins));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify({ ...user, eco_coins: ecoCoins }));
      localStorage.setItem('ecoCoins', ecoCoins.toString());
    }
  }, [user, ecoCoins]);

  const addEcoCoins = (amount: number) => {
    setEcoCoins(prev => prev + amount);
  };

  const spendEcoCoins = (amount: number): boolean => {
    if (ecoCoins >= amount) {
      setEcoCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  const login = (email: string, name: string) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      full_name: name,
      eco_coins: ecoCoins
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setEcoCoins(0);
    localStorage.removeItem('user');
    localStorage.removeItem('ecoCoins');
  };

  return (
    <UserContext.Provider value={{
      user,
      ecoCoins,
      addEcoCoins,
      spendEcoCoins,
      isLoggedIn: !!user,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};