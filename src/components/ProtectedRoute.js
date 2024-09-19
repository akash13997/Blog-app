import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to view this page.");
      setIsRedirecting(true);
    }
  }, [user]);

  if (!user && isRedirecting) {
    return <Navigate to="/" />;
  }

  return user ? children : null;
};

export default ProtectedRoute;
