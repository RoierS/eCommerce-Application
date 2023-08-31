/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import PersonalData from "@components/forms/personal-data-form";
import AppHeader from "@components/header/header";

import { IUserDataResponse } from "@interfaces/user-data-response";

import getUser from "@services/get-user";

import { Navigate } from "react-router-dom";

import { Box } from "@mui/material";

import styles from "./profile.module.scss";

const Profile = () => {
  const hasToken = localStorage.getItem("tokenObject");

  if (!hasToken) {
    return <Navigate to="/login" />;
  }

  const [user, setUser] = useState({} as IUserDataResponse);

  const fetchUser = async () => {
    try {
      const response = await getUser();
      setUser(response);
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
        <PersonalData {...user} />
      </Box>
    </>
  );
};

export default Profile;
