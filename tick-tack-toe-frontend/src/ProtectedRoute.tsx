import { Navigate } from "react-router-dom";
import React from "react";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
    element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div className="bg-[#1A2238]">Loading...</div>; 
    }

    return isAuthenticated ? Component : <Navigate to="/" replace />;
};

export default ProtectedRoute;
