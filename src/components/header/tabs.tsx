import React from "react";

import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import LogoutIcon from "@mui/icons-material/Logout";

interface IHeaderRoute {
  index: number;
  icon: React.ReactElement;
  label: string;
  link: string;
}

type RouteDictionary = Record<string, IHeaderRoute>;

const routes: RouteDictionary = {
  home: {
    index: 1,
    icon: <CottageTwoToneIcon />,
    label: "HOME",
    link: "/",
  },
  login: {
    index: 2,
    icon: <LoginTwoToneIcon />,
    label: "LOGIN",
    link: "/login",
  },
  registration: {
    index: 3,
    icon: <HowToRegTwoToneIcon />,
    label: "REGISTRATION",
    link: "/registration",
  },
  logout: {
    index: 4,
    icon: <LogoutIcon />,
    label: "LOGOUT",
    link: "/logout",
  },
};

export default routes;
