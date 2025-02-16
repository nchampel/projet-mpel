import { Typography, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Product } from "../../types/product";
import ProductUpdateForm from "../../components/products/productUpdateForm";

function ProductUpdate() {
  const location = useLocation();
  const product: Product = location.state?.product;
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Typography variant="h5" className="mb-2 font-semibold text-gray-800">
        Mise à jour du produit
      </Typography>
      {product.image !== "" && (
        <img
          src={product.image}
          alt={product.nom}
          className="w-full h-48 object-contain"
        ></img>
      )}
      <ProductUpdateForm product={product} />
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

export default ProductUpdate;
