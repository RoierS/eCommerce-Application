/* eslint-disable import/no-duplicates */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

// import React from "react";

// import { Controller, SubmitHandler, useForm } from "react-hook-form";

import PersonalData from "@components/forms/personal-data-form";
import AppHeader from "@components/header/header";
// import { SubtitleText, BodyText } from "@components/input/typography";

// import { IRegisterFormData } from "@interfaces/registration-form-data";
import { IUserDataResponse } from "@interfaces/user-data-response";
// import { IRegisterFormData } from "@interfaces/registration-form-data";
import getUser from "@services/get-user";

// import dayjs from "dayjs";
import { Navigate } from "react-router-dom";

// import { yupResolver } from "@hookform/resolvers/yup";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Box, Button, TextField, Typography } from "@mui/material";

import { Box } from "@mui/material";
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import countries from "./countries";

// import schemaRegister from "./schema-register";

// import testUser from "./testUserData";

import styles from "./profile.module.scss";

// const today = new Date();
// const minAge13 = 410240038000;
// const dataDelta = today.getTime() - minAge13;

const Profile = () => {
  const hasToken = localStorage.getItem("tokenObject");

  if (!hasToken) {
    return <Navigate to="/login" />;
  }

  // const updatedFields = ["email", "firstName", "lastName", "dateOfBirth"];

  // const [isPersonalDataDisabled, setPersonalDataDisabled] =
  //   React.useState(true);

  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  //   setValue,
  // } = useForm<IUserDataResponse>({
  //   resolver: yupResolver(schemaRegister),
  //   mode: "onChange",
  // });

  const [user, setUser] = useState({} as IUserDataResponse);

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
      // updatedFields.forEach((f: string) => {
      //   const fkey = f as keyof IUserDataResponse;
      //   setValue(fkey, response[f]);
      // });
    } catch (error) {
      console.log("Error fetching user (in component render):", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("user", user);

  // Handle form submission
  // const onSubmit: SubmitHandler<IUserDataResponse> = (data) => {
  //   console.log("submit data:", data);
  //   setPersonalDataDisabled(true);
  // };

  // switch edit mode
  // const setEditMode = () => {
  //   // eslint-disable-next-line no-restricted-globals
  //   event?.preventDefault();
  //   setPersonalDataDisabled(false);
  // };

  // const resetPassword = () => {
  //   console.log("reset Password");
  // };

  return (
    <>
      <AppHeader />
      <Box sx={{ display: "flex" }} className={styles.container}>
        <PersonalData {...user} />
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography align="center" variant="h6" color="primary">
              Shipping address
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    value={user.email}
                    disabled={isPersonalDataDisabled}
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    variant="outlined"
                    helperText={errors.email?.message}
                    InputProps={{
                      ...field,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#15528e",
                      },
                      "& .MuiInputBase-root.Mui-disabled": {
                        "& > fieldset": {
                          borderColor: "#15528e",
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    disabled={isPersonalDataDisabled}
                    label="First name"
                    fullWidth
                    error={!!errors.firstName}
                    variant="outlined"
                    helperText={errors.firstName?.message}
                    InputProps={{
                      ...field,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#15528e",
                      },
                      "& .MuiInputBase-root.Mui-disabled": {
                        "& > fieldset": {
                          borderColor: "#15528e",
                        },
                      },
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
                    disabled={isPersonalDataDisabled}
                    label="Last name"
                    fullWidth
                    error={!!errors.lastName}
                    variant="outlined"
                    helperText={errors.lastName?.message}
                    InputProps={{
                      ...field,
                    }}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#15528e",
                      },
                      "& .MuiInputBase-root.Mui-disabled": {
                        "& > fieldset": {
                          borderColor: "#15528e",
                        },
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => {
                  const { value, onChange } = field;
                  return (
                    <DatePicker
                      disabled={isPersonalDataDisabled}
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
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#15528e",
                        },
                        "& .MuiInputBase-root.Mui-disabled": {
                          "& > fieldset": {
                            borderColor: "#15528e",
                          },
                        },
                      }}
                    />
                  );
                }}
              />
              {isPersonalDataDisabled ? (
                <Button
                  className="button"
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={setEditMode}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  className="button"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              )}
            </form>
          </AccordionDetails>
        </Accordion> */}
      </Box>
    </>
  );
};

export default Profile;
