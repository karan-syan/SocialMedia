import { Avatar, Box, styled, Typography } from "@mui/material";
import React from "react";
interface Props {
  tabIcon: JSX.Element;
  tabName: string;
  onClickIt: () => void;
}
const NameIconTab = (props: Props) => {
  const { tabIcon, tabName, onClickIt } = props;
  return (
    <Root onClick={onClickIt}>
      {tabIcon}
      <Typography fontWeight={"500"}>{tabName}</Typography>
    </Root>
  );
};

export default NameIconTab;

const Root = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
}));
