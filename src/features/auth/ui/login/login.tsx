import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { useLogin } from "features/auth/lib/useLogin";
import s from "features/auth/ui/login/login.module.css";

export const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { formik } = useLogin();

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent="center" style={{marginTop: "40px"}}>
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                Для входа пройдите регистрацию{" "}
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                  здесь
                </a>
              </p>
              <p>или используйте данные тестовой учетной записи:</p>
            </FormLabel>
            <FormGroup>
              <TextField
                InputProps={{
                  style: {
                    color: "#ffffff"
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: "#ffffff"
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#7D7D7D" // Цвет рамки
                    },
                    "&:hover fieldset": {
                      borderColor: "#7D7D7D" // Цвет рамки при hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#7D7D7D" // Цвет рамки при фокусе
                    }
                  }
                }}
                label="Email" margin="normal"
                {...formik.getFieldProps("email")} />
              {formik.touched.email && formik.errors.email && <p className={s.error}>{formik.errors.email}</p>}
              <TextField type="password"
                         InputProps={{
                           style: {
                             color: "#ffffff"
                           }
                         }}
                         InputLabelProps={{
                           style: {
                             color: "#ffffff"
                           }
                         }}
                         sx={{
                           "& .MuiOutlinedInput-root": {
                             "& fieldset": {
                               borderColor: "#7D7D7D" // Цвет рамки
                             },
                             "&:hover fieldset": {
                               borderColor: "#7D7D7D" // Цвет рамки при hover
                             },
                             "&.Mui-focused fieldset": {
                               borderColor: "#7D7D7D" // Цвет рамки при фокусе
                             }
                           }
                         }}
                         label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched.password && formik.errors.password && <p className={s.error}>{formik.errors.password}</p>}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox style={{color:"#7D7D7D"}} {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
              />
              <Button
                type={"submit"}
                variant={"contained"}
                color={"success"}
                disabled={!(formik.isValid && formik.dirty)}
                style={{ color: "#ffffff" }}
              >
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
