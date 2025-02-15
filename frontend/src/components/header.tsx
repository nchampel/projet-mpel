import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  const redirect = (path:string ) => {
    navigate(path);
  }
  

  
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <div className="flex justify-between items-center bg-white pb-4 pt-4 h-16 shadow-2xl">
      <button
        onClick={() => redirect("/")}
        className="font-semibold text-gray-800 text-3xl ml-5"
      >
        PROJET
      </button>
      <p className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-gray-800 text-3xl">
        Bienvenue dans l'application de gestion de produits
      </p>
      <div className="flex gap-8 mr-5">
        {user && (
          <button
          onClick={() => redirect("/product/create")}
          className="font-semibold text-blue-800 uppercase"
        >
          Créer un produit
        </button>

        
        )}
        {!user ? (
          <>
          <button
          onClick={() => redirect("/signup")}
          className="font-semibold text-blue-800 uppercase"
        >
          S'inscrire
        </button>
        <button
          onClick={() => redirect("/login")}
          className="font-semibold text-blue-800 uppercase"
        >
          Se connecter
        </button>
        
          </>
        ) : (
          <button
          onClick={handleLogout}
          className="font-semibold text-blue-800 uppercase"
        >
          Déconnexion
        </button>
        )}
        {/* <Button
                  onClick={() => {
                    navigate("/product/update");
                  }}
                  className="text-red-500"
                >
                  Mettre à jour
                </Button> */}
      </div>
    </div>
  );
}

export default Header;
