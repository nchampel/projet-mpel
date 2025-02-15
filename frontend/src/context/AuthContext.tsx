import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from "react";
import { userApi } from "../api/userApi";

// Définir le type de l'utilisateur
// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // Ajouter d'autres champs si nécessaire
// }
interface User {
  user: string | null;
  // Ajouter d'autres champs si nécessaire
}

interface AuthContextType {
  user: User | null;
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

  // type UserCheck = {
  //   user: string | null
  // }

  const checkAuth = useCallback(async () => {
      try {
        setLoading(true);
        const userCheck: User = await userApi.checkAuth();
        console.log(userCheck);
        setUser(userCheck.user);
        setLoading(false);
      } catch (err) {
        setUser(null);
        // console.error(err);
      }
    }, []);

    useEffect(() => {
      checkAuth();
      // const token = localStorage.getItem("token");
  
      // if (token) {
      //   const userCheck = aw
      //   axios
      //     .get("http://localhost:5000/api/auth/check", {
      //       headers: { Authorization: `Bearer ${token}` },
      //     })
      //     .then((response) => {
      //       setUser(response.data.user); // Assure-toi que la réponse contient l'utilisateur
      //     })
      //     .catch(() => {
      //       setUser(null);
      //     })
      //     .finally(() => {
      //       setLoading(false);
      //     });
      // } else {
      //   setLoading(false);
      // }
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
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
};
