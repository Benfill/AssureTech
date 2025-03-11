/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { loginHandler, logoutHandler, registerHandler } from "../apis/auth";
import { User } from "../models/User";
import { StorageKeys, StorageUtility } from "../utils/localStrorageUtil";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user: User | null = StorageUtility.getItem(StorageKeys.SESSION_USER);

    if (user) {
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(
        user.roles?.some((role) => role.name === "ROLE_ADMIN") ?? false
      );
    }
  }, []);

  const login = async (email: string, password: string) => {
    const resp = await loginHandler(email, password);
    try {
      setIsAuthenticated(true);
      setUser(resp.data);
      StorageUtility.setItem(StorageKeys.SESSION_USER, resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await logoutHandler();
    try {
      setIsAuthenticated(false);
      setUser(null);
      StorageUtility.removeItem(StorageKeys.SESSION_USER);
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await registerHandler(name, email, password);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
