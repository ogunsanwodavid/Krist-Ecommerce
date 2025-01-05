"use client";

import { createContext, useState, useEffect, useContext } from "react";

import { AuthSession } from "@supabase/supabase-js";

import { supabase } from "@/app/lib/supabase";

import { toast } from "react-toastify";

import OnboardingLoader from "@/app/components/OnboardingLoader";

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

  //User credentials
  const [userId, setUserId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  //Loading state of getting user profile
  const [isGettingUser, setIsGettingUser] = useState<boolean>(false);

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

  // Update userId and userEmail when userSession changes
  useEffect(() => {
    if (userSession) {
      setUserId(userSession.user?.id);
      setUserEmail(String(userSession.user?.email));
    }
  }, [userSession]);

  // Check if the user is authenticated on app load
  useEffect(() => {
    // Fetch user profile from the database (Profile Table)
    const fetchUserProfile = async (userId: string) => {
      setIsGettingUser(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("userId, firstName, lastName, avatar")
        .eq("userId", userId)
        .single();

      if (error) {
        toast.error("Error fetching user profile");
        return;
      }

      if (data) {
        setUser({
          id: userId,
          email: userEmail,
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          avatar: data.avatar ?? "",
        });
        setIsAuthenticated(true);
      }

      setIsGettingUser(false);
    };

    // Fetch profile if user id exists
    if (userId) {
      fetchUserProfile(userId);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          setUserId(session.user?.id);
          setUserEmail(String(session.user?.email));
        } else {
          setUser(null);
          setIsAuthenticated(false); // Clear user data on logout
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [userId, userEmail]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {/** Show loader while loading user profile */}
      {isGettingUser ? <OnboardingLoader /> : children}
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
