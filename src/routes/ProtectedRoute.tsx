import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { credentials } = useAuth();
  if (!credentials) {
    return <Navigate to={"login"} />;
  }

  return children;
};
