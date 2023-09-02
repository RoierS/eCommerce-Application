/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import axios from "axios";

import AddressesList from "@components/forms/addresses-list";
import PersonalDataForm from "@components/forms/personal-data-form";
import AppHeader from "@components/header/header";
import makeAddressArray from "@helpers/make-address-array";
import { IBaseAddress } from "@interfaces/registration-form-data";
import {
  IUserFullDataResponse,
  IUserPersonalDataResponse,
} from "@interfaces/user-response";
import { IUserUpdate } from "@interfaces/user-update";

import getUser from "@services/get-user";

import userRequest from "@services/user-request";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";

import { Box, Modal, Typography } from "@mui/material";

import styles from "./profile.module.scss";

const Profile = () => {
  const hasToken = localStorage.getItem("tokenObject");

  if (!hasToken) {
    return <Navigate to="/login" />;
  }

  const [user, setUser] = useState({} as IUserFullDataResponse);
  const [personalData, setPersonalData] = useState(
    {} as IUserPersonalDataResponse
  );

  const [shippingAddresses, setShippingAddresses] = useState(
    [] as IBaseAddress[]
  );

  const [billingAddresses, setBillingAddresses] = useState(
    [] as IBaseAddress[]
  );

  // States for info modal popup
  const [isOpenInfoModal, setModalInfoOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");

  const showPopup = (message: string) => {
    setInfoModalMessage(message);
    setModalInfoOpen(true);
  };

  const handleInfoModalClose = async () => {
    setModalInfoOpen(false);
  };

  // States for reset password modal popup
  // const [isOpenPasswordModal, setModalPasswordOpen] = useState(false);

  // const showPasswordPopup = () => {
  //   setModalPasswordOpen(true);
  // };

  // const handlePasswordModalClose = async () => {
  //   setModalPasswordOpen(false);
  // };

  const onPersonalDataSubmit = async (data: IUserPersonalDataResponse) => {
    const { email, firstName, lastName, dateOfBirth } = data;
    const { version } = user;
    const birthDate = dayjs(dateOfBirth).format("YYYY-MM-DD");

    const dataObj: IUserUpdate = {
      version,
      actions: [
        {
          action: "setFirstName",
          firstName,
        },
        {
          action: "setLastName",
          lastName,
        },
        {
          action: "changeEmail",
          email,
        },
        {
          action: "setDateOfBirth",
          dateOfBirth: birthDate,
        },
      ],
    };

    let response;
    try {
      response = await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showPopup(error.message);
        return;
      }
    }

    showPopup("Data is updated successfully");
    setPersonalData(response);
    // todo rerender
  };

  const fetchUser = async () => {
    try {
      const response: IUserFullDataResponse = await getUser();
      setUser(response);

      // setPersonalData({
      //   version: response.version,
      //   email: response.email,
      //   firstName: response.firstName,
      //   lastName: response.lastName,
      //   dateOfBirth: response.dateOfBirth,
      // });
      setPersonalData(response);

      setShippingAddresses(
        makeAddressArray(response.addresses, response.shippingAddressIds)
      );
      setBillingAddresses(
        makeAddressArray(response.addresses, response.billingAddressIds)
      );
    } catch (error) {
      console.log("Error fetching user (in component render):", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("user", user);

  return (
    <>
      <AppHeader />
      <Box sx={{ display: "flex" }} className={styles.container}>
        <PersonalDataForm
          user={personalData}
          onParentSubmit={onPersonalDataSubmit}
        />
        <AddressesList
          addresses={shippingAddresses ?? []}
          version={user.version}
          defaultAddressId={user.defaultShippingAddressId}
          typography="Shipping addresses"
        />
        <AddressesList
          addresses={billingAddresses ?? []}
          version={user.version}
          defaultAddressId={user.defaultBillingAddressId}
          typography="Billing addresses"
        />
        <Modal open={isOpenInfoModal} onClose={handleInfoModalClose}>
          <Box
            className={styles.modal}
            sx={{
              boxShadow: 24,
            }}
          >
            <Typography variant="h6">{infoModalMessage}</Typography>
          </Box>
        </Modal>
        {/* <Modal open={isOpenPasswordModal} onClose={handlePasswordModalClose}>
          <Box
            className={styles.modal}
            sx={{
              boxShadow: 24,
            }}
          >
            <Typography variant="h6">"Password change</Typography>
          </Box>
        </Modal> */}
      </Box>
    </>
  );
};

export default Profile;
