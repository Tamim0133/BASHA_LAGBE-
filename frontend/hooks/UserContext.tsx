import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserStateContextType {
    currentUser: any;
    setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  // Create the context with a default value of `undefined`
  export const UserStateContext = createContext<UserStateContextType | null>(null);
export const UserStateProvider = ({ children } : { children:ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<any>(null); // Global state

  return (
    <UserStateContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserStateContext.Provider>
  );
};

// // Custom hook to use the UserStateContext
export const useUserState = (): UserStateContextType => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserStateProvider');
  }
  return context;
};
