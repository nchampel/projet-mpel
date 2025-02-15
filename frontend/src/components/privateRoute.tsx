import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est authentifié, on affiche la route protégée
  return <Outlet />;
};

export default PrivateRoute;
