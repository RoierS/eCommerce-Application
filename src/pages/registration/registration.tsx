import React, { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { IRegisterFormData } from "@interfaces/registration-form-data";

import { yupResolver } from "@hookform/resolvers/yup";

import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateValidationError } from "@mui/x-date-pickers/models";

import schemaRegister from "./schema-register";

import styles from "./registration.module.scss";

// const countries: string[] = ["Austria", "Belarus", "USA", "Poland"]; // TODO move to separate file

interface AutocompleteCountry {
  label: string;
  value: string;
}

const countries: AutocompleteCountry[] = [
  { label: "Austria", value: "Austria" },
  { label: "Belarus", value: "Belarus" },
  { label: "Poland", value: "Poland" },
  { label: "USA", value: "USA" },
];

const Registration: React.FC = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [billingChecked, setBillingChecked] = React.useState(false);
  const [shippingChecked, setShippingChecked] = React.useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(schemaRegister),
    mode: "onChange",
  });

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShippingChecked(event.target.checked);
    // eslint-disable-next-line no-console
    console.log("checked-shipping", event.target.checked, shippingChecked);
  };

  const onBillingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBillingChecked(event.target.checked);
    // eslint-disable-next-line no-console
    console.log("checked-billing", event.target.checked, shippingChecked);
  };

  const bilingAdressUpdate = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const newBilingAdress = {
      street: "",
      city: "",
      country: "",
      code: "",
    };

    if (checked) {
      newBilingAdress.street = watch("shippingStreet");
      newBilingAdress.city = watch("shippingCity");
      newBilingAdress.country = watch("shippingCountry");
      newBilingAdress.code = watch("shippingPostcode");
    }

    setValue("billingStreet", newBilingAdress.street);
    setValue("billingCity", newBilingAdress.city);
    setValue("billingCountry", newBilingAdress.country);
    setValue("billingPostcode", newBilingAdress.code);
  };

  // Handle form submission
  // TODO Integrate the login form with Commerctools
  const onSubmit: SubmitHandler<IRegisterFormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log("Submit:", data);
  };

  return (
    <Box sx={{ display: "flex" }} className={styles.container}>
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" color="primary">
          Login data
        </Typography>
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
        <Typography variant="h6" color="primary">
          Personal data
        </Typography>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="First name"
              fullWidth
              error={!!errors.firstName}
              variant="outlined"
              helperText={errors.firstName?.message}
              InputProps={{
                ...field,
              }}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Last name"
              fullWidth
              error={!!errors.lastName}
              variant="outlined"
              helperText={errors.lastName?.message}
              InputProps={{
                ...field,
              }}
            />
          )}
        />
        <Controller
          name="birthday"
          control={control}
          rules={{ required: true }}
          defaultValue=""
          render={({ field }) => {
            const { value, onChange } = field;
            return (
              <DatePicker
                label="Date of birth"
                format="YYYY-MM-DD"
                value={value}
                onChange={(newValue) => onChange(newValue)}
                // TODO minDate={}
                slotProps={{
                  textField: {
                    required: true,
                  },
                }}
              />
            );
          }}
        />
        <Typography variant="h6" color="primary">
          Shipping address
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={shippingChecked}
              onChange={onShippingChange}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          }
          label="Make default shipping address"
        />
        <Controller
          name="shippingStreet"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Street"
              fullWidth
              error={!!errors.shippingStreet}
              variant="outlined"
              helperText={errors.shippingStreet?.message}
              InputProps={{
                ...field,
              }}
            />
          )}
        />
        <Controller
          name="shippingCity"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="City"
              fullWidth
              error={!!errors.shippingCity}
              variant="outlined"
              helperText={errors.shippingCity?.message}
              InputProps={{
                ...field,
              }}
            />
          )}
        />
        <Controller
          name="shippingCountry"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const { value, onChange } = field;
            const country = value
              ? countries.find((opt) => value === opt.value) ?? null
              : null;
            return (
              <Autocomplete
                value={country}
                options={countries}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.value : null);
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    error={!!errors.shippingCountry}
                    helperText={errors.shippingCountry?.message}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            );
          }}
        />
        <Controller
          name="shippingPostcode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Postal code"
              fullWidth
              error={!!errors.shippingPostcode}
              variant="outlined"
              helperText={errors.shippingPostcode?.message}
              InputProps={{
                ...field,
              }}
            />
          )}
        />
        <Typography variant="h6" color="primary">
          Billing address
        </Typography>
        <FormControlLabel
          control={<Checkbox onChange={bilingAdressUpdate} />}
          label="Copy from shipping address"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={billingChecked}
              onChange={onBillingChange}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          }
          label="Make default billing address"
        />
        <Controller
          name="billingStreet"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Street"
              fullWidth
              error={!!errors.billingStreet}
              variant="outlined"
              helperText={errors.billingStreet?.message}
              InputProps={{
                ...field,
              }}
            />
          )}
        />
        <Controller
          name="billingCity"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="City"
              fullWidth
              error={!!errors.billingCity}
              variant="outlined"
              helperText={errors.billingCity?.message}
              InputProps={{
                ...field,
              }}
            />
          )}
        />
        <Controller
          name="billingCountry"
          control={control}
          defaultValue=""
          render={({ field }) => {
            const { value, onChange } = field;
            const country = value
              ? countries.find((opt) => value === opt.value) ?? null
              : null;
            return (
              <Autocomplete
                value={country}
                options={countries}
                onChange={(event, newValue) => {
                  onChange(newValue ? newValue.value : null);
                }}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    error={!!errors.billingCountry}
                    helperText={errors.billingCountry?.message}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            );
          }}
        />
        <Controller
          name="billingPostcode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Postal code"
              fullWidth
              error={!!errors.billingPostcode}
              variant="outlined"
              helperText={errors.billingPostcode?.message}
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
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Registration;
