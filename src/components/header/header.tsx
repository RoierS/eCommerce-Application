import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import { Box, Tabs, Tab } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <header className="header">
      <Box
        sx={{
          mb: 2,
          width: "95%",
        }}
      >
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab
            value="1"
            icon={<CottageTwoToneIcon />}
            label="HOME"
            to="/"
            component={Link}
          />
          <Tab
            value="2"
            icon={<HowToRegTwoToneIcon />}
            label="LOGIN"
            to="/login"
            component={Link}
          />
          <Tab
            value="3"
            icon={<LoginTwoToneIcon />}
            label="REGISTRATION"
            to="/registration"
            component={Link}
          />
        </Tabs>
      </Box>
    </header>
  );
};

export default AppHeader;
