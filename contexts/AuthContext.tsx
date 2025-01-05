"use client";

import { createContext, useState, useEffect, useContext } from "react";

import { AuthSession } from "@supabase/supabase-js";

import { supabase } from "@/app/lib/supabase";

import { toast } from "react-toastify";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userSession, setUserSession] = useState<AuthSession | null>(null);

  //Function to get user session
  async function getUserSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      toast.error("Error getting user session");
      return null;
    }

    setUserSession(data.session);
  }

  // Fetch user session once on component load
  useEffect(() => {
    getUserSession();
  }, []); // Empty dependency array ensures this runs only once

  // Check if the user is authenticated on app load
  useEffect(() => {
    if (userSession) {
      // fetchUserProfile(session.user?.id); // Fetch profile if session exists
      console.log(userSession);
    }
    /*   const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          fetchUserProfile(session.user?.id); // Fetch profile after login
        } else {
          setUser(null);
          setIsAuthenticated(false); // Clear user data on logout
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    }; */
  }, [userSession]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
