import React, { createContext, useState, useCallback } from 'react';

export const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [appReloadKey, setAppReloadKey] = useState(0);

    const triggerRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setAppReloadKey((prevKey) => prevKey + 1);
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <RefreshContext.Provider value={{ refreshing, triggerRefresh, appReloadKey }}>
            {children}
        </RefreshContext.Provider>
    );
};