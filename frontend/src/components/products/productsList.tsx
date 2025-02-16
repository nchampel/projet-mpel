import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product";
import { useAuth } from "../../context/AuthContext";
interface ProductsListProps {
  products: Product[];
  handleDeleteProduct: (id: string, productName: string) => void;
}

const ProductsList = (props: ProductsListProps) => {
  const { products, handleDeleteProduct } = props;
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex mt-5 flex-wrap justify-center gap-4">
      {products.map((product) => {
        return (
          <div
            key={product._id}
            // className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-2xl mb-[10px]"
            className="p-6 w-[450px] h-[300px] bg-white rounded-xl shadow-2xl mb-[1px]"
          >
            <div className="flex items-center">
              {product.image !== "" ? (
                <img
                  src={product.image}
                  alt={product.nom}
                  className="w-full h-48 object-contain"
                ></img>
              ) : (
                <div className="w-full h-48 object-contain flex items-center justify-center bg-gray-200">
                  Pas d'image
                </div>
              )}
              <div className="p-5">
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {product.nom}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {product.description}
                </p>
                <p className="whitespace-nowrap">{product.prix} €</p>
                <p className="whitespace-nowrap">Stock : {product.stock}</p>
              </div>
            </div>
            {user && (
              <div className="mt-10">
                <Button
                  onClick={() => {
                    navigate("/product/update", { state: { product } });
                  }}
                >
                  Mettre à jour
                </Button>
                <Button
                  onClick={() => {
                    handleDeleteProduct(product._id, product.nom);
                  }}
                >
                  Supprimer
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
