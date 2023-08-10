import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import schemaLogin from "../../constants/schema-login";

interface ILoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ILoginFormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const emailErrorMessage = errors.email?.message;
  const passwordErrorMessage = errors.password?.message;

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
              helperText={emailErrorMessage}
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
              error={!!errors.password}
              helperText={passwordErrorMessage}
              variant="outlined"
              InputProps={{
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
    </div>
  );
};

export default Login;
