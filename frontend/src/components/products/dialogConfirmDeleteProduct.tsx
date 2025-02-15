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
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  causeReloadProductsList: boolean;
  setCauseReloadProductsList: React.Dispatch<React.SetStateAction<boolean>>;
}

type DeleteOK = {
    message: string
}

function DialogConfirmDeleteProduct(props: DialogConfirmDeleteProductProps) {
  const { id, open, setOpen, products, setProducts, causeReloadProductsList, setCauseReloadProductsList } = props;
  
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteProduct = useCallback(async () => {
    try {
      setLoading(true);
      const deleteOK: DeleteOK = await productApi.deleteProduct(
        id
        // , page, limit, totalPage
        // checkLocalStorage("jwt").replaceAll('"', "")
      );
      if(deleteOK.message === 'Objet supprimé !'){
        const productsTemp = products.filter((el) => el._id !== id);
        setProducts(productsTemp);
        setCauseReloadProductsList(!causeReloadProductsList);
        setLoading(false);
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  return (
    <Dialog
      open={open}
      // TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="xl"
      // PaperProps={{
      //   style: {
      //     backgroundColor: "#434A54",
      //     color: "white",
      //   },
      // }}
    >
      {/* <DialogTitle>Résultats du combat</DialogTitle> */}
      <DialogContent>
        <Grid2
          container
          justifyContent="center"
          sx={{
            // color: "white",
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
          <Button onClick={handleDeleteProduct}>
            Oui
          </Button>
          <Button onClick={handleClose}>
            Non
          </Button>
        </Grid2>
      </DialogActions>
      ) : (
        <Loader />
      )}
      </Dialog>
  );
}

export default DialogConfirmDeleteProduct;
