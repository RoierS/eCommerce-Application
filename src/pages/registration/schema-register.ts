import * as yup from "yup";

import emailValidation from "../../constants/email-validation";

// Schema for validation of Registration Form
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
    .matches(
      /^[A-Za-z]+(?:-[A-Za-z]+)*$/,
      "First name must contain only letters (may be devided by hyphen)"
    ),
  lastName: yup
    .string()
    .required("This field is required")
    .matches(
      /^[A-Za-z]+(?:-[A-Za-z]+)*$/,
      "Last name must contain only letters (may be devided by hyphen)"
    ),
  birthday: yup
    .date()
    .typeError("Date is required")
    .required("This field is required")
    .test("date-test", "You must be at least 13 years old", (value) => {
      const today = new Date();
      const userDate = new Date(value);
      const dataDelta = today.getTime() - userDate.getTime();
      const minAge13 = 410240038000;
      return dataDelta >= minAge13;
    }),
  shippingStreet: yup
    .string()
    .required("This field is required")
    .min(1, "Street must contain at least one character"),
  shippingCity: yup
    .string()
    .required("This field is required")
    .min(1, "Must contain at least one character")
    .matches(
      /^[A-Za-z]+(?:-[A-Za-z]+)*$/,
      "City must contain only letters (may be devided by hyphen)"
    ),
  shippingCountry: yup.string().required("This field is required"),
  shippingPostcode: yup
    .string()
    .required("This field is required")
    .test("postcode-test", (value, validationContext) => {
      const {
        createError,
        parent: { shippingCountry },
      } = validationContext;

      if (shippingCountry === "Austria" && !value.match(/^[0-9]{4,4}$/)) {
        return createError({ message: "Postcode must contain 4 digits" });
      }

      if (shippingCountry === "Belarus" && !value.match(/^[0-9]{6,6}$/)) {
        return createError({ message: "Postcode must contain 6 digits" });
      }

      if (
        shippingCountry === "Poland" &&
        !value.match(/^([0-9]{2,2})-([0-9]{3,3})$/)
      ) {
        return createError({
          message: "Postcode must contain only digits in format xx-xxx",
        });
      }

      if (shippingCountry === "USA" && !value.match(/^[0-9]{5,5}$/)) {
        return createError({ message: "Postcode must contain 5 digits" });
      }

      return true;
    }),
  billingStreet: yup
    .string()
    .required("This field is required")
    .min(1, "Street must contain at least one character"),
  billingCity: yup
    .string()
    .required("This field is required")
    .min(1, "Must contain at least one character")
    .matches(/^[A-Za-z]+(?:-[A-Za-z]+)*$/, "City must contain only letters"),
  billingCountry: yup.string().required("This field is required"),
  billingPostcode: yup
    .string()
    .required("This field is required")
    .test("postcode-test", (value, validationContext) => {
      const {
        createError,
        parent: { billingCountry },
      } = validationContext;

      if (billingCountry === "Austria" && !value.match(/^[0-9]{4,4}$/)) {
        return createError({ message: "Postcode must contain 4 digits" });
      }

      if (billingCountry === "Belarus" && !value.match(/^[0-9]{6,6}$/)) {
        return createError({ message: "Postcode must contain 6 digits" });
      }

      if (
        billingCountry === "Poland" &&
        !value.match(/^([0-9]{2,2})-([0-9]{3,3})$/)
      ) {
        return createError({
          message: "Postcode must contain only digits in format xx-xxx",
        });
      }

      if (billingCountry === "USA" && !value.match(/^[0-9]{5,5}$/)) {
        return createError({ message: "Postcode must contain 5 digits" });
      }

      return true;
    }),
});

export default schemaRegister;
