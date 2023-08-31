/* eslint-disable import/no-duplicates */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

// import React from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

// import { SubtitleText, BodyText } from "@components/input/typography";

// import { IRegisterFormData } from "@interfaces/registration-form-data";
import schemaPersonalData from "@constants/schema-personal-data";
import { IUserDataResponse } from "@interfaces/user-data-response";
// import { IRegisterFormData } from "@interfaces/registration-form-data";
// import getUser from "@services/get-user";

import dayjs from "dayjs";

import { yupResolver } from "@hookform/resolvers/yup";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Button, TextField, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import countries from "./countries";

// import testUser from "./testUserData";

import styles from "./forms.module.scss";

const today = new Date();
const minAge13 = 410240038000;
const dataDelta = today.getTime() - minAge13;

const AddressDataForm = (user: IUserDataResponse) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IUserDataResponse>({
    resolver: yupResolver(schemaPersonalData),
    mode: "onChange",
  });

  const updatedFields = ["email", "firstName", "lastName", "dateOfBirth"];

  const setValues = () => {
    updatedFields.forEach((f: string) => {
      const fkey = f as keyof IUserDataResponse;
      // eslint-disable-next-line react/destructuring-assignment
      setValue(f as keyof IUserDataResponse, user[fkey]);
    });
  };

  useEffect(() => {
    setValues();
  }, []);

  const [isPersonalDataDisabled, setPersonalDataDisabled] = useState(true);

  // Handle form submission
  const onSubmit: SubmitHandler<IUserDataResponse> = (data) => {
    console.log("submit data:", data);
    setPersonalDataDisabled(true);
  };

  // switch edit mode
  const setEditMode = () => {
    // eslint-disable-next-line no-restricted-globals
    event?.preventDefault();
    setPersonalDataDisabled(false);
  };

  const resetPassword = () => {
    console.log("reset Password");
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography align="center" variant="h6" color="primary">
          Personal data
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
                // value={email}
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
        <Button
          className="button"
          type="button"
          variant="contained"
          color="primary"
          onClick={resetPassword}
        >
          reset password
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddressDataForm;
