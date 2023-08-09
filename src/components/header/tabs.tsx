import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";
import HowToRegTwoToneIcon from "@mui/icons-material/HowToRegTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import React from "react";

interface IHeaderTab {
  value: number;
  icon: React.ReactElement;
  label: string;
  link: string;
}

const tabs: IHeaderTab[] = [
  {
    value: 1,
    icon: <CottageTwoToneIcon />,
    label: "HOME",
    link: "/",
  },
  {
    value: 2,
    icon: <LoginTwoToneIcon />,
    label: "LOGIN",
    link: "/login",
  },
  {
    value: 3,
    icon: <HowToRegTwoToneIcon />,
    label: "REGISTRATION",
    link: "/registration",
  },
];

export default tabs;
