import { Typography, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Product } from "../types/product";
import ProductUpdateForm from "../components/productUpdateForm";

function ProductUpdate() {
  // const { product } = props;
  const location = useLocation();
  const product: Product = location.state?.product;
  return (
    <>
      <Typography variant="h5" className="mb-2 font-semibold text-gray-800">
          Mise à jour du produit
        </Typography>
        <Typography>{product.nom}</Typography>
    <ProductUpdateForm product={product} />
    <Link
          component={RouterLink}
          underline="none"
          // sx={{ marginBottom: "20px", color: "black" }}
          // sx={linkStyles('help')}
          to="/"
        >
          Voir les produits
        </Link>
    </>
  );
}

export default ProductUpdate;
