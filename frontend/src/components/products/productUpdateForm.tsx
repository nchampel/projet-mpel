import { Button, Grid2, TextField } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { productApi } from "../../api/productApi";
import { Product } from "../../types/product";
import { useState } from "react";
import Loader from "../loader";
import { usePage } from "../../context/PageProvider";

interface ProductProps {
  product: Product;
}

function ProductUpdateForm(props: ProductProps) {
  const { product } = props;
  const { page } = usePage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        name: product.nom,
        description: product?.description,
        picture: product?.image,
        price: product.prix,
        stock: product.stock,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .min(3, "Le nom doit contenir au moins 3 caractères")
          .required("Un nom doit être saisi"),
        description: Yup.string(),
        picture: Yup.string().url("L'URL est invalide"),
        price: Yup.number()
          .required()
          .min(1, "Le prix doit être supérieur à 0"),
        stock: Yup.number()
          .required()
          .min(0, "Le prix doit être supérieur ou égal à 0"),
      })}
      onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
        try {
          setLoading(true);
          await productApi.updateProduct(values, product._id);

          setStatus({ success: true });
          resetForm({});
          setSubmitting(false);
          setLoading(false);
          // navigate("/", { state: { page } });
          navigate("/");
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleSubmit,
        handleBlur,
        handleChange,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid2
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid2 sx={{ mb: 1 }}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                fullWidth
                label="Nom"
                name="name"
                variant="filled"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                style={{ background: "white", width: "300px" }}
              />
            </Grid2>
            <Grid2 sx={{ mb: 1 }}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                fullWidth
                multiline
                label="Description"
                name="description"
                variant="filled"
                style={{ background: "white", width: "300px" }}
              />
            </Grid2>
            <Grid2 sx={{ mb: 1 }}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.picture}
                fullWidth
                label="Image"
                multiline
                name="picture"
                variant="filled"
                style={{ background: "white", width: "300px" }}
              />
            </Grid2>
            <Grid2 sx={{ mb: 1 }}>
              <TextField
                onChange={handleChange}
                value={values.price}
                fullWidth
                label="Prix"
                name="price"
                variant="filled"
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
                onBlur={(e) => e.target.value === "" && (e.target.value = "0")}
                style={{ background: "white", width: "300px" }}
              />
            </Grid2>
            <Grid2 sx={{ mb: 1 }}>
              <TextField
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.stock}
                fullWidth
                label="Stock"
                name="stock"
                variant="filled"
                error={Boolean(touched.stock && errors.stock)}
                helperText={touched.stock && errors.stock}
                onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
                style={{ background: "white", width: "300px" }}
              />
            </Grid2>
            {!loading ? (
              <Grid2 sx={{ mb: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Mettre à jour le produit
                </Button>
              </Grid2>
            ) : (
              <Loader />
            )}
          </Grid2>
        </form>
      )}
    </Formik>
  );
}

export default ProductUpdateForm;
