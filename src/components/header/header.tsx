import React from "react";

import HeaderRoute from "@components/header/header-route";
import routes from "@components/header/tabs";

import { Box } from "@mui/material";

import styles from "./header.module.scss";

const AppHeader = () => {
  const hasToken = localStorage.getItem("tokenObject");
  return (
    <header className={styles.header}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HeaderRoute
          to={routes.home.link}
          icon={routes.home.icon}
          label={routes.home.label}
        />
        <Box display="flex" alignItems="center">
          {hasToken ? (
            <HeaderRoute
              to={routes.logout.link}
              icon={routes.logout.icon}
              label={routes.logout.label}
            />
          ) : (
            <>
              <HeaderRoute
                to={routes.registration.link}
                icon={routes.registration.icon}
                label={routes.registration.label}
              />
              <HeaderRoute
                to={routes.login.link}
                icon={routes.login.icon}
                label={routes.login.label}
              />
            </>
          )}
        </Box>
      </Box>
    </header>
  );
};
export default AppHeader;
