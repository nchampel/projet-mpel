import { Typography, Link } from "@mui/material";
import ProductCreateForm from "../../components/products/productCreateForm";
import { Link as RouterLink } from "react-router-dom";

function ProductCreate() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Typography variant="h5" className="mb-2 font-semibold text-gray-800">
        Créer un produit
      </Typography>
      <ProductCreateForm />
      <Link
        component={RouterLink}
        underline="none"
        className="uppercase"
        to="/"
      >
        Annuler
      </Link>
    </div>
  );
}

export default ProductCreate;
