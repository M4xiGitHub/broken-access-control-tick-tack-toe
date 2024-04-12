import React, { createContext, useContext, useEffect, useState } from 'react';
import {atom, useAtom} from 'jotai';

import { authenticated } from './UserAtom';

const AuthContext = createContext({ isAuthenticated: false, isLoading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('authStatus') === 'true');        
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
