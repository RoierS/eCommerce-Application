import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import tabs from "./tabs";

const AppHeader = () => {
  const location = useLocation();
  const processPathName = () => {
    const path = `/${location.pathname.split("/")[1]}`;
    const tab = tabs.find((t) => t.link === path);
    return tab ? tab.value : 1;
  };
  const [value, setValue] = React.useState(processPathName());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabsList = tabs.map((tab) => (
    <Tab
      value={tab.value}
      icon={tab.icon}
      label={tab.label}
      to={tab.link}
      component={Link}
    />
  ));

  return (
    <header className="header">
      <Box
        sx={{
          mb: 2,
          width: "95%",
        }}
      >
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          {tabsList}
        </Tabs>
      </Box>
    </header>
  );
};

export default AppHeader;
