import { Button, Grid2, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { productApi } from '../api/productApi';
import { Product } from '../types/product';

interface ProductProps {
  product: Product;
}

function ProductUpdateForm(props: ProductProps) {
  const { product } = props;
  const navigate = useNavigate();

    return (
        <Formik
              initialValues={{ name: product.nom, description: product?.description, picture: product?.image,
                price: product.prix, stock: product.stock }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Un nom doit être saisi"),
                description: Yup.string(),
                picture: Yup.string(),
              //   userId: { type: String, required: false },
                price: Yup.number().required().min(1, "Le prix doit être supérieur à 0"),
                stock: Yup.number().required().min(0, "Le prix doit être supérieur ou égal à 0"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm }
              ) => {
                try {
                  // setIsAuthenticated(true)
                  
                  const jsonAnswer = await productApi.updateProduct(values, product._id);
                  // on enregistre le jwt
                  // if (jsonAnswer.authenticated) {
                  //   window.localStorage.setItem(
                  //     "jwt",
                  //     JSON.stringify(jsonAnswer.jwt)
                  //   );
                    // console.log('auth')
                  

                  setStatus({ success: true });
                  resetForm({});
                  setSubmitting(false);
                  navigate('/');
                } catch (err) {
                  console.error(err);
                  // toast.error("Il y a eu un souci lors de l'enregistrement !");
                  setStatus({ success: false });
                  // setErrors({ submit: err.message });
                  setSubmitting(false);
                }
              } }
            >
              {({
                errors, handleSubmit, handleBlur, handleChange, touched, values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid2
                    // container
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      // height: "100vh",
                    }}
                  >
                    <Grid2
                      // item
                      // xs={2}
                      sx={{ mb: 1 }}
                    >
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
                        style={{ background: "white", width: "300px" }} />
                    </Grid2>
                    <Grid2
                      // item
                      // xs={2}
                      sx={{ mb: 1 }}
                    >
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.description}
                        fullWidth
                        label="Description"
                        name="description"
                        variant="filled"
                        // error={Boolean(touched.description && errors.description)}
                        // helperText={touched.description && errors.description}
                        style={{ background: "white", width: "300px" }} />
                    </Grid2>
                    <Grid2
                      // item
                      // xs={2}
                      sx={{ mb: 1 }}
                    >
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.picture}
                        fullWidth
                        label="Image"
                        name="picture"
                        variant="filled"
                        // error={Boolean(touched.description && errors.description)}
                        // helperText={touched.description && errors.description}
                        style={{ background: "white", width: "300px" }} />
                    </Grid2>
                    <Grid2
                      // item
                      // xs={2}
                      sx={{ mb: 1 }}
                    >
                      <TextField
                        // onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.price}
                        fullWidth
                        label="Prix"
                        name="price"
                        // type="number"
                        variant="filled"
                        error={Boolean(touched.price && errors.price)}
                        helperText={touched.price && errors.price}
                        onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
                        onBlur={(e) => e.target.value === "" && (e.target.value = "0")}
                        style={{ background: "white", width: "300px" }} />
                    </Grid2>
                    <Grid2
                      // item
                      // xs={2}
                      sx={{ mb: 1 }}
                    >
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.stock}
                        fullWidth
                        label="Stock"
                        name="stock"
                        // type="number"
                        variant="filled"
                        error={Boolean(touched.stock && errors.stock)}
                        helperText={touched.stock && errors.stock}
                        onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
                        // onBlur={(e) => e.target.value === "" && (e.target.value = "0")}
                        style={{ background: "white", width: "300px" }} />
                    </Grid2>
                    <Grid2
                      // item
                      // xs={1}
                      sx={{ mb: 1 }}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          handleSubmit();
                        } }
                      >
                        Mettre à jour le produit
                      </Button>
                    </Grid2>
                    {/* <Grid2
                      // item
                      // xs={1}
                      sx={{ mb: 1 }}
                    >
                      <Link component={RouterLink} underline="none" to="/register">
                        S'inscrire
                      </Link>
                    </Grid2>
                     */}
              </Grid2>
                </form>
              )}
            </Formik>
    )
}

export default ProductUpdateForm;