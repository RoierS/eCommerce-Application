/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import axios from "axios";

import AddressesList from "@components/forms/addresses-list";
import PersonalDataForm from "@components/forms/personal-data-form";
import AppHeader from "@components/header/header";
import InfoPopup from "@components/modal/info-popup";
import PasswordPopup from "@components/modal/password-popup";
import makeAddressArray from "@helpers/make-address-array";
import { ILoginData } from "@interfaces/login-form-data";
import { IPasswords } from "@interfaces/modal";
import { IBaseAddress } from "@interfaces/registration-form-data";
import {
  IUserFullDataResponse,
  IUserPersonalDataResponse,
} from "@interfaces/user-response";
import { IPasswordUpdate, IUserUpdate } from "@interfaces/user-update";

import { getTokenAndLogin } from "@services/authentication-service";
import changePasswordRequest from "@services/change-password";
import getUser from "@services/get-user";

import userRequest from "@services/user-request";
import dayjs from "dayjs";
import { Navigate } from "react-router-dom";

import { Box } from "@mui/material";

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

  // States and functions for info modal popup
  const [isOpenInfoModal, setModalInfoOpen] = useState(false);
  const [infoModalMessage, setInfoModalMessage] = useState("");

  const showInfoPopup = (message: string) => {
    setInfoModalMessage(message);
    setModalInfoOpen(true);
  };

  const handleInfoModalClose = async () => {
    setModalInfoOpen(false);
  };

  // States and functions for reset password modal popup
  const [isOpenPasswordModal, setModalPasswordOpen] = useState(false);

  const showPasswordPopup = () => {
    setModalPasswordOpen(true);
  };

  const handlePasswordModalClose = () => {
    setModalPasswordOpen(false);
  };

  const login = async (data: ILoginData) => {
    let customerInfo;
    try {
      customerInfo = await getTokenAndLogin(data);

      console.log("Customer logged in successfully", customerInfo);
      return customerInfo;
    } catch (error) {
      console.log("Error:", error);
    }
    return customerInfo;
  };

  // update password on server
  const onPasswordSubmit = async (data: IPasswords) => {
    const { currentPassword, newPassword } = data;
    const { version } = user;

    console.log(
      "onPasswordSubmit: currentPassword, newPassword, version",
      currentPassword,
      newPassword,
      version
    );

    handlePasswordModalClose();
    const dataObj: IPasswordUpdate = {
      version,
      currentPassword,
      newPassword,
    };

    let response;
    try {
      response = await changePasswordRequest(dataObj);
      console.log("change Password Request response", response);
      showInfoPopup("Data is updated successfully");

      // relogin
      const customerInfo = await login({
        email: user.email,
        password: newPassword,
      });
      if (customerInfo) {
        setUser(customerInfo);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
      }
    }
  };

  // update personal data on server
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
        showInfoPopup(error.message);
        return;
      }
    }

    showInfoPopup("Data is updated successfully");
    setPersonalData(response);
    setUser(response);
  };

  const setDefaultAddress = async (
    id: string,
    action: string,
    srcAdressName: string
  ) => {
    const { version } = user;
    const dataObj: IUserUpdate = {
      version,
      actions: [
        {
          action,
          addressId: id,
        },
      ],
    };

    let response;
    try {
      response = await userRequest(dataObj);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showInfoPopup(error.message);
        return;
      }
    }

    showInfoPopup("Data is updated successfully");

    setShippingAddresses(
      makeAddressArray(response.addresses, response[srcAdressName])
    );

    setUser(response);
  };

  // Set default Shipping address
  const setDefaultShipping = async (id: string) => {
    await setDefaultAddress(
      id,
      "setDefaultShippingAddress",
      "shippingAddressIds"
    );
  };

  // Set default Billing address
  const setDefaultBilling = async (id: string) => {
    await setDefaultAddress(
      id,
      "setDefaultBillingAddress",
      "billingAddressIds"
    );
  };

  // Get user data for page render
  const fetchUser = async () => {
    try {
      const response: IUserFullDataResponse = await getUser();
      setUser(response);

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
          showPasswordPopup={showPasswordPopup}
        />
        <AddressesList
          addresses={shippingAddresses ?? []}
          version={user.version}
          defaultAddressId={user.defaultShippingAddressId}
          typography="Shipping addresses"
          onSetDefault={setDefaultShipping}
        />
        <AddressesList
          addresses={billingAddresses ?? []}
          version={user.version}
          defaultAddressId={user.defaultBillingAddressId}
          typography="Billing addresses"
          onSetDefault={setDefaultBilling}
        />
        <InfoPopup
          open={isOpenInfoModal}
          onClose={handleInfoModalClose}
          message={infoModalMessage}
        />
        <PasswordPopup
          open={isOpenPasswordModal}
          onClose={handlePasswordModalClose}
          onFormSubmit={onPasswordSubmit}
        />
      </Box>
    </>
  );
};

export default Profile;
