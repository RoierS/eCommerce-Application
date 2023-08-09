import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import tabs from "./tabs";

const AppHeader = () => {
  const location = useLocation();
  const processPathName = () => {
    const path = `/${location.pathname.split("/")[1]}`;
    const tab = tabs.find((t) => t.link === path);
    return tab ? tab.index : 1;
  };
  const [value, setIndex] = React.useState(processPathName());

  /** routs to new location according to selected header tab */
  const handleChange = (event: React.SyntheticEvent, newIndex: number) =>
    setIndex(newIndex);

  return (
    <header className="header">
      <Box
        sx={{
          mb: 2,
          width: "95%",
        }}
      >
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          {tabs.map((tab) => (
            <Tab
              value={tab.index}
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
