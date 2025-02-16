import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import { userApi } from "../api/userApi";

interface User {
  user: string | null;
}

interface AuthContextType {
  user: string | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Créer le contexte avec un type générique
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fournir le contexte à l'application
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const userCheck: User = await userApi.checkAuth();
      console.log(userCheck);
      setUser(userCheck.user);
      setLoading(false);
    } catch (err) {
      setUser(null);
      console.error(err);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour accéder au contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
