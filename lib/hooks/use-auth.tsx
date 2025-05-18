"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useUserStore } from "@/lib/stores/user-store";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  googleAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userStore = useUserStore();

  // Check if user is authenticated when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would validate the session/token with your backend here
        const storedUser = localStorage.getItem("recallmaster-user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // In a real app, you would call your API here
      // This is just a mock implementation for demo purposes

      // Mock successful login
      if (email && password) {
        const mockUser = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          username: email.split("@")[0],
          email,
        };

        setUser(mockUser);
        localStorage.setItem("recallmaster-user", JSON.stringify(mockUser));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);

    try {
      // In a real app, you would call your API here
      // This is just a mock implementation for demo purposes

      if (username && email && password) {
        const mockUser = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          username,
          email,
        };

        setUser(mockUser);
        localStorage.setItem("recallmaster-user", JSON.stringify(mockUser));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("recallmaster-user");
    // Reset user store data
    userStore.resetUserData();
  };

  const googleAuth = async () => {
    setIsLoading(true);

    try {
      // In a real app, you would redirect to Google OAuth
      // This is just a mock implementation for demo purposes

      const mockUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        username: "googleuser",
        email: "user@gmail.com",
      };

      setUser(mockUser);
      localStorage.setItem("recallmaster-user", JSON.stringify(mockUser));

      return true;
    } catch (error) {
      console.error("Google auth failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        googleAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
