import React from "react";

import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";

interface IHeaderTab {
  index: number;
  key: string;
  icon: React.ReactElement;
  label: string;
  link: string;
}

const tabs: IHeaderTab[] = [
  {
    index: 1,
    key: "home",
    icon: <CottageTwoToneIcon />,
    label: "HOME",
    link: "/",
  },
  {
    index: 2,
    key: "login",
    icon: <LoginTwoToneIcon />,
    label: "LOGIN",
    link: "/login",
  },
  {
    index: 3,
    key: "registration",
    icon: <HowToRegTwoToneIcon />,
    label: "REGISTRATION",
    link: "/registration",
  },
  {
    index: 4,
    key: "logout",
    icon: <LogoutIcon />,
    label: "LOGOUT",
    link: "/logout",
  },
];

export default tabs;
