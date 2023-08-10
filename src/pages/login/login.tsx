import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import styles from "./login.module.scss";

import schemaLogin from "../../constants/schema-login";
import { ILoginFormData } from "../../interfaces/types";

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
  // TODO Integrate the login form with Commerctools
  const onSubmit: SubmitHandler<ILoginFormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
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
  );
};

export default Login;
