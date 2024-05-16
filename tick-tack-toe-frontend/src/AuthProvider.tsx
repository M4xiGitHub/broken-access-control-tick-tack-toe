import React, { createContext, useContext, useEffect, useState } from 'react';
import {atom, useAtom} from 'jotai';

import { authenticated } from './UserAtom';

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: true,
    setAuthStatus: (authStatus: boolean) => {}  // Method to update the authentication status
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Method to update isAuthenticated from components
    const setAuthStatus = (authStatus: boolean) => {
        setIsAuthenticated(authStatus);
        setIsLoading(false);  // Optionally reset loading state if applicable
    };

    useEffect(() => {
        // Simulated fetch operation
        setTimeout(() => {
            setIsAuthenticated(true);  // Assume initially authenticated for testing
            setIsLoading(false);
        }, 1000);  // Simulate fetching auth status with delay
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export the useAuth hook to access the context
export const useAuth = () => useContext(AuthContext);