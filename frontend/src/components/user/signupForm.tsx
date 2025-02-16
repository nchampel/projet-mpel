import { Button, Grid2, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { userApi } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email invalide")
            .required("Un email doit être saisi"),
          password: Yup.string()
            .min(8, "Le mot de passe doit contenir au moins 8 caractères")
            .required("Un mot de passe doit être saisi"),
        })}
        onSubmit={async (values, { setStatus, setSubmitting, resetForm }) => {
          try {
            await userApi.signup(values);

            setStatus({ success: true });
            resetForm({});
            setSubmitting(false);
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
                  value={values.email}
                  fullWidth
                  label="Email"
                  name="email"
                  variant="filled"
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  style={{ background: "white", width: "300px" }}
                />
              </Grid2>
              <Grid2 sx={{ mb: 1 }}>
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
                  style={{ background: "white", width: "300px" }}
                />
              </Grid2>
              <Grid2 sx={{ mb: 1 }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  S'enregistrer
                </Button>
              </Grid2>
            </Grid2>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default SignupForm;
