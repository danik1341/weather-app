import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    // Example: Check local storage for authentication status
    const storedAuthStatus = localStorage.getItem("isAuthenticated");

    if (storedAuthStatus) {
      setIsAuthenticated(JSON.parse(storedAuthStatus));
    }

    // Example: Check local storage for user data
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
}
