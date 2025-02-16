import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { productApi } from "../../api/productApi";
import { Product } from "../../types/product";
import Loader from "../loader";

interface DialogConfirmDeleteProductProps {
  id: string;
  productName: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  causeReloadProductsList: boolean;
  setCauseReloadProductsList: React.Dispatch<React.SetStateAction<boolean>>;
  limit: number;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

type DeleteOK = {
  message: string;
};

function DialogConfirmDeleteProduct(props: DialogConfirmDeleteProductProps) {
  const {
    id,
    productName,
    open,
    setOpen,
    products,
    setProducts,
    causeReloadProductsList,
    setCauseReloadProductsList,
    limit,
    totalPages,
    setTotalPages,
  } = props;

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteProduct = useCallback(async () => {
    try {
      setLoading(true);
      const deleteOK: DeleteOK = await productApi.deleteProduct(
        id,
        productName
      );
      if (deleteOK.message === "Objet supprimé !") {
        const productsTemp = products.filter((el) => el._id !== id);
        setProducts(productsTemp);
        setCauseReloadProductsList(!causeReloadProductsList);
        setLoading(false);
        setOpen(false);
        const newMaxPage = Math.ceil(products.length - 1 / limit);
        if (newMaxPage !== totalPages) {
          setTotalPages(newMaxPage);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="xl"
    >
      <DialogContent>
        <Grid2
          container
          justifyContent="center"
          sx={{
            mt: 5,
          }}
        >
          <Typography>Voulez-vous supprimer le produit ?</Typography>
        </Grid2>
      </DialogContent>
      {!loading ? (
        <DialogActions>
          <Grid2
            container
            justifyContent="center"
            sx={{
              // color: "white",
              mt: 5,
            }}
          >
            <Button onClick={handleDeleteProduct}>Oui</Button>
            <Button onClick={handleClose}>Non</Button>
          </Grid2>
        </DialogActions>
      ) : (
        <Loader />
      )}
    </Dialog>
  );
}

export default DialogConfirmDeleteProduct;
