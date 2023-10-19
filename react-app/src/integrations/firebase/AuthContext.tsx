import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { firebaseAuth } from "./firebaseApp.ts";

interface AuthContextValues {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValues>({
  user: null,
  isLoading: true,
  signUp: async () => Promise.resolve(),
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });
  });

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logout = async () => {
    await signOut(firebaseAuth);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const values: AuthContextValues = {
    user: user,
    isLoading: isLoading,

    signUp: signUp,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
