import React, { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

import {
  IRegisterFormData,
  IRegistrateData,
  IBaseAddress,
} from "@interfaces/registration-form-data";
import { ITokenResponse } from "@interfaces/token-response";

import {
  getAccessToken,
  registrateCustomer,
} from "@services/registration-service";
import dayjs from "dayjs";

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
  Modal,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import countries from "./countries";

import schemaRegister from "./schema-register";

import styles from "./registration.module.scss";

const today = new Date();
const minAge13 = 410240038000;
const dataDelta = today.getTime() - minAge13;
const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 390,
  bgcolor: "background.paper",
  border: "1.5px solid #2196f3",
  borderRadius: 5,
  boxShadow: 24,
  font: "Roboto",
  pt: 2,
  px: 4,
  pb: 3,
};
const enum ModalType {
  INFO,
  ERROR,
}

const Registration: React.FC = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to toggle default shipping address
  const [shippingChecked, setShippingChecked] = React.useState(false);

  // State to toggle default billing address
  const [billingChecked, setBillingChecked] = React.useState(false);

  // States for modal popup
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [modalType, setModalType] = React.useState(ModalType.INFO);

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
  const handleTogglePassword = () => setShowPassword((prevState) => !prevState);

  const onShippingChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setShippingChecked(event.target.checked);

  const onBillingChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBillingChecked(event.target.checked);

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

  const convertFormDataToRegistrateData = (
    data: IRegisterFormData
  ): IRegistrateData => {
    const bilingAdress: IBaseAddress = {
      country: data.billingCountry,
      streetName: data.billingStreet,
      postalCode: data.billingPostcode,
      city: data.billingCity,
    };
    const shippingAdress: IBaseAddress = {
      country: data.shippingCountry,
      streetName: data.shippingStreet,
      postalCode: data.shippingPostcode,
      city: data.shippingCity,
    };
    const user: IRegistrateData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: dayjs(data.birthday).format("YYYY-MM-DD"),
      addresses: [bilingAdress, shippingAdress],
      billingAddresses: [0],
      shippingAddresses: [1],
    };

    if (billingChecked) {
      user.defaultBillingAddress = 0;
    }

    if (shippingChecked) {
      user.defaultShippingAddress = 1;
    }

    return user;
  };

  const showPopup = (type: ModalType, message: string) => {
    setModalType(type);
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    if (modalType === ModalType.INFO) {
      // todo login
    }
  };

  // TODO create login function
  // const login = (data: { email: string, pass: string }) => {
  // };

  // Handle form submission
  const onSubmit: SubmitHandler<IRegisterFormData> = async (data) => {
    // eslint-disable-next-line no-console
    console.log("Submit:", data);

    const tokenObjectStr = localStorage.getItem("tokenObject");
    let tokenObject: ITokenResponse | null = null;

    if (tokenObjectStr) {
      tokenObject = JSON.parse(tokenObjectStr) as ITokenResponse;
    } else {
      tokenObject = await getAccessToken();
      localStorage.setItem("tokenObject", JSON.stringify(tokenObject));
    }

    const user = convertFormDataToRegistrateData(data);

    try {
      await registrateCustomer(tokenObject.access_token, user);
    } catch (error) {
      // Handle error messages from response
      if (axios.isAxiosError(error)) {
        const { response } = error;

        console.log("Error:", error.message);

        if (response?.data.errors) {
          showPopup(ModalType.ERROR, response.data.message);
          return;
        }
      } else {
        console.log("Error:", error);
      }
    }

    // todo save email & password
    showPopup(ModalType.INFO, "You are registrated successfully");
  };

  return (
    <Box sx={{ display: "flex" }} className={styles.container}>
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
          render={({ field, fieldState: { error } }) => {
            const { value, onChange } = field;
            return (
              <DatePicker
                label="Date of birth"
                format="YYYY-MM-DD"
                maxDate={dayjs(dataDelta)}
                value={dayjs(value)}
                onChange={(newValue) => onChange(newValue)}
                slotProps={{
                  textField: {
                    required: true,
                    helperText: error?.message,
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
      {/* TODO Link to login page */}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{modalMessage}</h2>
        </Box>
      </Modal>
    </Box>
  );
};

export default Registration;
