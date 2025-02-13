import { Link, Divider, Typography, Button } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMounted } from "../hooks/use-mounted";
import { productApi } from "../api/productApi";
import { Product, ProductDB } from "../types/product";
import Pagination from "../components/pagination";
import DialogConfirmDeleteProduct from "../components/dialogConfirmDeleteProduct";

function Products() {
  const isMounted = useMounted();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([
    { _id: "1", nom: "", description: "", image: "", prix: 1, stock: 5 },
  ]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false);

  const getProducts = useCallback(async () => {
    try {
      const productsDB: ProductDB = await productApi.getProducts(
        page,
        limit
        // checkLocalStorage("jwt").replaceAll('"', "")
      );
      console.log("Produits récupérés de la BDD");
      console.log(productsDB);

      if (isMounted()) {
        setProducts(productsDB.products);
        setTotalPages(productsDB.totalPages);
      }
    } catch (err) {
      console.error(err);
    }
  }, [page, limit]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // const handleChangeLimit = (event: any) => {
  //   console.log(event.target.value);
  //   setLimit(Number(event.target.value));
  // };
  // const handleChangePage = (event: any) => {
  //   console.log(event.target.value);
  //   setPage(Number(event.target.value));
  // };

  const handleDeleteProduct = (id: string) => {
    console.log(id);
    setOpen(true);
  };

  return (
    <>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <DialogConfirmDeleteProduct
              id={product._id}
              open={open}
              setOpen={setOpen}
              products={products}
              setProducts={setProducts}
            />
            <Typography>{product.nom}</Typography>
            {product.image !== "" && (
              <img src={product.image} alt={product.nom}></img>
            )}
            <Typography>{product.description}</Typography>
            <Typography>{product.prix} €</Typography>
            <Typography>Stock : {product.stock}</Typography>
            <Button
              onClick={() => {
                navigate("/product/update", { state: { product } });
              }}
            >
              Mettre à jour
            </Button>
            <Button
              onClick={() => {
                handleDeleteProduct(product._id);
              }}
            >
              Supprimer
            </Button>
            {/* <Link
          component={RouterLink}
          underline="none"
          // sx={{ marginBottom: "20px", color: "black" }}
          // sx={linkStyles('help')}
          to="/product/update"
        >
          Mettre à jour
        </Link> */}
            <Divider />
          </div>
        );
      })}
      {/* <FormControl className="w-64">
      <InputLabel id="dropdown-limit">Choisir une option</InputLabel>
      <Select
        labelId="dropdown-limit"
        value={limit}
        onChange={handleChangeLimit}
        className="bg-white rounded-lg shadow-md"
      >
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="25">25</MenuItem>
      </Select>
      <InputLabel id="dropdown-page">Choisir une option</InputLabel>
      <Select
        labelId="dropdown-page"
        value={page}
        onChange={handleChangePage}
        className="bg-white rounded-lg shadow-md"
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="25">25</MenuItem>
      </Select>
    </FormControl> */}
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={totalPages}
      />
      <Link
        component={RouterLink}
        underline="none"
        // sx={{ marginBottom: "20px", color: "black" }}
        // sx={linkStyles('help')}
        to="/product/create"
      >
        Créer un produit
      </Link>
    </>
  );
}

export default Products;
