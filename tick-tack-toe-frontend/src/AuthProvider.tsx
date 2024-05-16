import React, { createContext, useContext, useEffect, useState } from 'react';
import {atom, useAtom} from 'jotai';

import { authenticated } from './UserAtom';
import { stat } from 'fs';

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    setAuthStatus: (authStatus: boolean) => {}  // Method to update the authentication status
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const setAuthStatus = (authStatus: boolean) => {
        setIsAuthenticated(authStatus);
        setIsLoading(false);  
    };

    useEffect(() => {
        var status = localStorage.getItem('authStatus');
        // console.log('status:', status);
            setAuthStatus(status === 'true');        
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export the useAuth hook to access the context
export const useAuth = () => useContext(AuthContext);