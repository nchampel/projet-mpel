import { Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-around items-center bg-white pb-4 pt-4 h-16 shadow-2xl">
      <button
        onClick={redirectHome}
        className="font-semibold text-gray-800 text-3xl"
      >
        PROJET
      </button>
      <p className="font-semibold text-gray-800 text-3xl">
        Bienvenue dans l'application de gestion de produits
      </p>
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
    </div>
  );
}

export default Header;
