import { useCallback, useEffect, useState } from "react";
import { useMounted } from "../../hooks/use-mounted";
import { productApi } from "../../api/productApi";
import { Product, ProductDB } from "../../types/product";
import Pagination from "../../components/pagination";
import DialogConfirmDeleteProduct from "../../components/products/dialogConfirmDeleteProduct";
import Loader from "../../components/loader";
import ProductsList from "../../components/products/productsList";
import { usePage } from "../../context/PageProvider";

function Products() {
  const isMounted = useMounted();
  const [products, setProducts] = useState<Product[]>([
    { _id: "1", nom: "", description: "", image: "", prix: 1, stock: 5 },
  ]);
  const { page } = usePage();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [causeReloadProductsList, setCauseReloadProductsList] = useState(false);

  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      const productsDB: ProductDB = await productApi.getProducts(page, limit);

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

  const handleDeleteProduct = (id: string, name: string) => {
    setOpen(true);
    setProductId(id);
    setProductName(name);
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <DialogConfirmDeleteProduct
        id={productId}
        productName={productName}
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

      <Pagination limit={limit} setLimit={setLimit} totalPages={totalPages} />
    </div>
  );
}

export default Products;
