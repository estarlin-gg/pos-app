import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ReactNode } from "react";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { credentials } = useAuth();

  if (credentials) {
    return <Navigate to="/" />;
  }

  return children;
};
