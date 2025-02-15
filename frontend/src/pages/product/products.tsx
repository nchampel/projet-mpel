import { useCallback, useEffect, useState } from "react";
import { useMounted } from "../../hooks/use-mounted";
import { productApi } from "../../api/productApi";
import { Product, ProductDB } from "../../types/product";
import Pagination from "../../components/pagination";
import DialogConfirmDeleteProduct from "../../components/products/dialogConfirmDeleteProduct";
import Loader from "../../components/loader";
import ProductsList from "../../components/products/productsList";
import { useLocation } from "react-router-dom";

type LocationState = {
  page?: number;
};

function Products() {
  const isMounted = useMounted();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([
    { _id: "1", nom: "", description: "", image: "", prix: 1, stock: 5 },
  ]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [causeReloadProductsList, setCauseReloadProductsList] = useState(false);

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.page) {
      setPage(state.page);
    }
  }, [location.state]);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
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
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, [page, limit, causeReloadProductsList]);

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
    setOpen(true);
    setProductId(id);
  };

  // useEffect(() => {
  //   console.log(productId);
  // }, [productId]);

  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <DialogConfirmDeleteProduct
        id={productId}
        // setProductId={setProductId}
        open={open}
        setOpen={setOpen}
        products={products}
        setProducts={setProducts}
        causeReloadProductsList={causeReloadProductsList}
        setCauseReloadProductsList={setCauseReloadProductsList}
        limit={limit}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
      {!loading ? (
        <ProductsList
          products={products}
          handleDeleteProduct={handleDeleteProduct}
        />
      ) : (
        <Loader />
      )}
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
    </div>
  );
}

export default Products;
