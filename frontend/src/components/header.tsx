import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }
  

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white pb-4 pt-4 h-16 shadow-2xl">
      <button
        onClick={redirectHome}
        className="font-semibold text-gray-800 text-3xl ml-5"
      >
        PROJET
      </button>
      <p className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-gray-800 text-3xl">
        Bienvenue dans l'application de gestion de produits
      </p>
      <div className="flex gap-8 mr-5">
        {user && (

        <Link
          component={RouterLink}
          underline="none"
          // className="!mb-5"
          className="uppercase"
          // sx={{ marginTop: "20px" }}
          // sx={linkStyles('help')}
          to="/product/create"
        >
          Créer un produit
        </Link>
        )}
        {!user ? (
          <>
        <Link
          component={RouterLink}
          underline="none"
          // className="!mb-5"
          className="uppercase"
          // sx={{ marginTop: "20px" }}
          // sx={linkStyles('help')}
          to="/signup"
        >
          S'inscrire
        </Link>
        <Link
          component={RouterLink}
          underline="none"
          // className="!mb-5"
          className="uppercase"
          // sx={{ marginTop: "20px" }}
          // sx={linkStyles('help')}
          to="/login"
        >
          Se connecter
        </Link>
          </>
        ) : (
          <Link
          component={RouterLink}
          underline="none"
          // className="!mb-5"
          className="uppercase"
          // sx={{ marginTop: "20px" }}
          // sx={linkStyles('help')}
          to="/logout"
        >
          Déconnexion
        </Link>
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
