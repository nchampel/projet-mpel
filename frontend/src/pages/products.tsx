import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useMounted } from "../hooks/use-mounted";
import { productApi } from "../api/productApi";

function Products() {
    const isMounted = useMounted();
    const [products, setProducts] = useState([{nom: "premier"}]);

    const getProducts = useCallback(async () => {
        try {
          const productsDB = await productApi.getProducts(
            // checkLocalStorage("jwt").replaceAll('"', "")
          );
          console.log('Produits récupérés de la BDD');
          console.log(productsDB);
          
          if (isMounted()){
            setProducts(productsDB);
          }
          
        } catch (err) {
          console.error(err);
        }
      }, []);
      
      useEffect(() => {
        getProducts();
      }, []);
    return (

        <>
        {products.map((product) => {
          return (
            <Typography>{ product.nom }</Typography>
          );
        })}
        </>
        
    )
}

export default Products;