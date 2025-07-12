import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ecoCoins, setEcoCoins] = useState(1247); // Starting with demo coins
  const [carbonCredits, setCarbonCredits] = useState(25); // Starting with demo credits
  const [redeemedRewards, setRedeemedRewards] = useState([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCoins = localStorage.getItem('ecoCoins');
    const savedCredits = localStorage.getItem('carbonCredits');
    const savedRewards = localStorage.getItem('redeemedRewards');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create demo user
      const demoUser = {
        id: 'demo-user',
        email: 'demo@ecomart.com',
        full_name: 'Demo User',
        eco_coins: 1247,
        carbon_credits: 25
      };
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    }
    
    if (savedCoins) {
      setEcoCoins(parseInt(savedCoins));
    }
    
    if (savedCredits) {
      setCarbonCredits(parseInt(savedCredits));
    }
    
    if (savedRewards) {
      setRedeemedRewards(JSON.parse(savedRewards));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify({ 
        ...user, 
        eco_coins: ecoCoins,
        carbon_credits: carbonCredits 
      }));
      localStorage.setItem('ecoCoins', ecoCoins.toString());
      localStorage.setItem('carbonCredits', carbonCredits.toString());
      localStorage.setItem('redeemedRewards', JSON.stringify(redeemedRewards));
    }
  }, [user, ecoCoins, carbonCredits, redeemedRewards]);

  const addEcoCoins = (amount) => {
    setEcoCoins(prev => prev + amount);
  };

  const spendEcoCoins = (amount) => {
    if (ecoCoins >= amount) {
      setEcoCoins(prev => prev - amount);
      return true;
    }
    return false;
  };
  
  const addCarbonCredits = (amount) => {
    setCarbonCredits(prev => prev + amount);
  };
  
  const spendCarbonCredits = (amount) => {
    if (carbonCredits >= amount) {
      setCarbonCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addRedeemedReward = (reward) => {
    setRedeemedRewards(prev => [...prev, reward]);
  };

  const login = (email, name) => {
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
    setCarbonCredits(0);
    setRedeemedRewards([]);
    localStorage.removeItem('user');
    localStorage.removeItem('ecoCoins');
    localStorage.removeItem('carbonCredits');
    localStorage.removeItem('redeemedRewards');
  };

  return (
    <UserContext.Provider value={{
      user,
      ecoCoins,
      carbonCredits,
      addEcoCoins,
      spendEcoCoins,
      addCarbonCredits,
      spendCarbonCredits,
      redeemedRewards,
      addRedeemedReward,
      isLoggedIn: !!user,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};