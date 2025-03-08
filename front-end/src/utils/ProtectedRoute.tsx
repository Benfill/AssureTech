import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, render the children (protected content)
  // Otherwise, redirect to the login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
