import { Box, styled } from "@mui/material";
import React from "react";

const RightBar = () => {
  return <Root>RightBar</Root>;
};

export default RightBar;
const Root = styled(Box)(({ theme }) => ({
  flex: "3",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
