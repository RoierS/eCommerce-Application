/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import AddressesList from "@components/forms/addresses-list";
import PersonalDataForm from "@components/forms/personal-data-form";
import AppHeader from "@components/header/header";
import makeAddressArray from "@helpers/make-address-array";
import { IBaseAddress } from "@interfaces/registration-form-data";
import {
  IUserFullDataResponse,
  IUserPersonalDataResponse,
} from "@interfaces/user-response";

import getUser from "@services/get-user";

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

  const fetchUser = async () => {
    try {
      const response: IUserFullDataResponse = await getUser();
      setUser(response);

      setPersonalData({
        version: response.version,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        dateOfBirth: response.dateOfBirth,
      });

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
        <PersonalDataForm {...personalData} />
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
      </Box>
    </>
  );
};

export default Profile;
