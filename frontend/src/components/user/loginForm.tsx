import { Button, Grid2, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from "yup";
import { userApi } from '../../api/userApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface UserDB {
  userId: string;
  token: string;
}

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
    return (
        <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email("Email invalide").required("Un email doit être saisi"),
                password: Yup.string().required("Un mot de passe doit être saisi"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting, resetForm }
              ) => {
                try {
                  // setIsAuthenticated(true)
                  const jsonAnswer: UserDB = await userApi.login(values);
                  // on enregistre le jwt
                  // if (jsonAnswer.authenticated) {
                    window.localStorage.setItem(
                      "jwt",
                      JSON.stringify(jsonAnswer.token)
                    );
                    // console.log('auth')
                  
                  setUser(jsonAnswer.userId);
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
                        value={values.email}
                        fullWidth
                        label="Email"
                        name="email"
                        variant="filled"
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
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
                        value={values.password}
                        fullWidth
                        label="Mot de passe"
                        name="password"
                        type="password"
                        variant="filled"
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
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
                        Se connecter
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

export default Login;