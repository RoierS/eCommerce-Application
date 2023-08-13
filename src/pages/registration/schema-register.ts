import * as yup from "yup";

import emailValidation from "../../constants/email-validation";

// Schema for validation of Login Form
const schemaRegister = yup.object({
  email: yup
    .string()
    .required("This field is required")
    .matches(emailValidation, "Invalid email format"),
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
    )
    .min(8, "Must be more than 8 characters"),
  firstName: yup
    .string()
    .required("This field is required")
    .matches(/^[A-Za-z]+$/, "First name must contain only letters"),
  lastName: yup
    .string()
    .required("This field is required")
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters"),
  birthday: yup.string().required("This field is required"),
  shippingStreet: yup
    .string()
    .required("This field is required")
    .min(1, "Street must contain at least one character"),
  shippingCity: yup
    .string()
    .required("This field is required")
    .min(1, "Must contain at least one character")
    .matches(/^[A-Za-z]+$/, "City must contain only letters"),
  shippingCountry: yup.string().required("This field is required"),
  shippingPostcode: yup.string().required("This field is required"),
  billingStreet: yup
    .string()
    .required("This field is required")
    .min(1, "Street must contain at least one character"),
  billingCity: yup
    .string()
    .required("This field is required")
    .min(1, "Must contain at least one character")
    .matches(/^[A-Za-z]+$/, "City must contain only letters"),
  billingCountry: yup.string().required("This field is required"),
  billingPostcode: yup.string().required("This field is required"),
});

export default schemaRegister;
