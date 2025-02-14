import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid2,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { productApi } from "../api/productApi";
import { Product } from "../types/product";

interface DialogConfirmDeleteProductProps {
  id: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

type DeleteOK = {
    message: string
}

function DialogConfirmDeleteProduct(props: DialogConfirmDeleteProductProps) {
  const { id, open, setOpen, products, setProducts } = props;
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteProduct = useCallback(async () => {
    try {
      const deleteOK: DeleteOK = await productApi.deleteProduct(
        id
        // checkLocalStorage("jwt").replaceAll('"', "")
      );
      if(deleteOK.message === 'Objet supprimé !'){
        const productsTemp = products.filter((el) => el._id !== id);
        setProducts(productsTemp);
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
    </Dialog>
  );
}

export default DialogConfirmDeleteProduct;
