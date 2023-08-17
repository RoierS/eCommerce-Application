/* eslint-disable no-console */
// to test login use this data: email: test@example.com; password: S!secret123
import React, { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import AppHeader from "@components/header/header";
import { ILoginFormData } from "@interfaces/login-form-data";

import {
  obtainAccessToken,
  loginCustomer,
} from "@services/commerce-tools-service";

import { yupResolver } from "@hookform/resolvers/yup";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import schemaLogin from "./schema-login";

import styles from "./login.module.scss";

const Login: React.FC = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const onSubmit: SubmitHandler<ILoginFormData> = async (data) => {
    try {
      const { email, password } = data;
      const tokenObject = await obtainAccessToken(email, password);

      const customerInfo = await loginCustomer(
        tokenObject.access_token,
        email,
        password
      );

      console.log(tokenObject);
      console.log("Customer logged in successfully", customerInfo);
    } catch (error) {
      // TODO: Error handling
      console.log(error);
    }
  };

  return (
    <>
      <AppHeader />
      <Box className={styles.container}>
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
      </Box>
    </>
  );
};

export default Login;
