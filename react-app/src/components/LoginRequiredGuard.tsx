import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../integrations/firebase/AuthContext.tsx";

export const LoginRequiredGuard = (props: { children?: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isLoading) {
    return null;
  }

  if (!auth.isLoading && auth.user == null) {
    navigate("/login");
  }

  return <>{props.children}</>;
};
