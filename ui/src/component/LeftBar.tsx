import React, { useContext } from "react";
import PeopleIcon from "@mui/icons-material/People";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EventIcon from "@mui/icons-material/Event";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import VideocamIcon from "@mui/icons-material/Videocam";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import NameIconTab from "./NameIconTab";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Avatar, Box, Divider, styled, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userTabList = [
    {
      name: currentUser?.name || "",
      Icon: (
        <Avatar
          sx={{ width: "2.1875rem", height: "2.1875rem" }}
          src={currentUser?.profilePic}
        />
      ),
      link: "/profile/" + currentUser?.id,
    },
    {
      name: "Follower",
      Icon: <PeopleIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Following",
      Icon: <PeopleIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "MarketPlace",
      Icon: <StorefrontIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Watch",
      Icon: <SmartDisplayIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Mermories",
      Icon: <WatchLaterIcon fontSize="large" />,
      link: "/",
    },
  ];
  const shortcutTabList = [
    {
      name: "Events",
      Icon: <EventIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Gaming",
      Icon: <SportsEsportsIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Gallery",
      Icon: <CollectionsIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Videos",
      Icon: <VideocamIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Messages",
      Icon: <EmailIcon fontSize="large" />,
      link: "/",
    },
  ];
  const otherTabList = [
    {
      name: "Fundraiser",
      Icon: <PointOfSaleIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Tutorials",
      Icon: <VideocamIcon fontSize="large" />,
      link: "/",
    },
    {
      name: "Courses",
      Icon: <SchoolIcon fontSize="large" />,
      link: "/",
    },
  ];
  return (
    <Root>
      <Container>
        <Menu>
          {userTabList.map((e) => {
            return (
              <NameIconTab
                tabIcon={e.Icon}
                tabName={e.name}
                key={e.name}
                onClickIt={() => {
                  navigate(e.link);
                }}
              />
            );
          })}
        </Menu>
        <TabDivider />
        <Menu>
          <Typography fontSize={"14px"}>Your shortcuts</Typography>
          {shortcutTabList.map((e) => {
            return (
              <NameIconTab
                tabIcon={e.Icon}
                tabName={e.name}
                key={e.name}
                onClickIt={() => {
                  navigate(e.link);
                }}
              />
            );
          })}
        </Menu>
        <TabDivider />
        <Menu>
          <Typography fontSize={"14px"}>Others</Typography>
          {otherTabList.map((e) => {
            return (
              <NameIconTab
                tabIcon={e.Icon}
                tabName={e.name}
                key={e.name}
                onClickIt={() => {
                  navigate(e.link);
                }}
              />
            );
          })}
        </Menu>
      </Container>
    </Root>
  );
};

export default LeftBar;

const Root = styled(Box)(({ theme }) => ({
  flex: "2",
  overflowY: "auto",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Container = styled(Box)(() => ({
  padding: "20px",
}));
const TabDivider = styled(Divider)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  margin: "20px 0px",
}));

const Menu = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));
