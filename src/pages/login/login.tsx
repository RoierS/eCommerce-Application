import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import emailValidation from "../../constants/email-validation";

interface ILoginFormData {
  email: string;
  password: string;
}

const schemaLogin = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("This field is required")
    .matches(emailValidation, "Enter valid email"),
  password: yup
    .string()
    .required("This field is required")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter (A-Z)"
    )
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter (a-z)"
    )
    .matches(/\d/, "Password must contain at least one digit (0-9)")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character (!@#$%^&*)"
    )
    .test(
      "noWhitespace",
      "Password must not contain leading or trailing whitespace",
      (value) => !value.includes(" ")
    ),
});

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
