/* eslint-disable no-console */
import React, { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

import AppHeader from "@components/header/header";
import getValidAccessToken from "@helpers/check-token";
import { ICart } from "@interfaces/cart";
import { ILoginData } from "@interfaces/login-form-data";

import { getTokenAndLogin } from "@services/authentication-service";
import { getCart } from "@services/cart-services";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import schemaLogin from "./schema-login";

import styles from "./login.module.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const hasToken = localStorage.getItem("tokenObject");

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ILoginData>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    try {
      const customerInfo = await getTokenAndLogin(data);
      const tokenObject = await getValidAccessToken();
      const cart: ICart = await getCart(tokenObject.access_token);
      localStorage.setItem("cartItems", JSON.stringify(cart.lineItems));
      console.log("Customer logged in successfully", customerInfo);

      navigate("/", { replace: true });
    } catch (error) {
      // Handle error messages from response
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.data.errors) {
          const errorMessage = response.data.message;

          setError("email", { type: "manual", message: errorMessage });
          setError("password", { type: "manual", message: errorMessage });
        } else {
          console.log("Error:", error.message);
        }
      } else {
        console.log("Error:", error);
      }
    }
  };

  if (hasToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <AppHeader />
      <Box className={styles.container}>
        <Paper className={styles.paper}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  variant="outlined"
                  helperText={errors.email?.message}
                  InputProps={{
                    ...field,
                    autoComplete: "off",
                  }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    ...field,
                    autoComplete: "off",
                  }}
                />
              )}
            />
            <Button
              className="button"
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </form>
          <Typography className={styles.title} variant="h6" color="secondary">
            I’m new here{" "}
            <Link className={styles.link} to="/registration">
              Register
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
