import React from "react";

import { Link, useLocation } from "react-router-dom";

import { Box, Tab, Tabs } from "@mui/material";

import tabs from "./tabs";

const AppHeader = () => {
  const location = useLocation();
  const processPathName = () => {
    const path = `/${location.pathname.split("/")[1]}`;
    const tab = tabs.find((t) => t.link === path);
    return tab ? tab.index : 1;
  };
  const [index, setIndex] = React.useState(processPathName());

  /**
   * set active header tab
   */
  const handleChange = (event: React.SyntheticEvent, newIndex: number) =>
    setIndex(newIndex);

  const token = localStorage.getItem("tokenObject");
  const filteredTabs = token
    ? tabs.filter((tab) => tab.key !== "login" && tab.key !== "registration")
    : tabs.filter((tab) => tab.key !== "logout");

  return (
    <header className="header">
      <Box
        sx={{
          mb: 2,
          width: "95%",
        }}
      >
        <Tabs value={index} onChange={handleChange} variant="fullWidth">
          {filteredTabs.map((tab) => (
            <Tab
              value={tab.index}
              key={tab.key}
              icon={tab.icon}
              label={tab.label}
              to={tab.link}
              component={Link}
            />
          ))}
        </Tabs>
      </Box>
    </header>
  );
};

export default AppHeader;
