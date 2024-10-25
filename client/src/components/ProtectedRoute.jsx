import React from "react";
import { Navigate } from "react-router-dom";
import authSignal from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const signal = authSignal((state) => state.signal);

  if (!signal) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
