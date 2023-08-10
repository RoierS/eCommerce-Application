import * as yup from "yup";

import emailValidation from "./email-validation";

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

export default schemaLogin;
