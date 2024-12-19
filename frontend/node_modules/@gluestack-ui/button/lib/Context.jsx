import { createContext, useContext } from 'react';
export const ButtonContext = createContext({});
export const useButtonContext = () => useContext(ButtonContext);
