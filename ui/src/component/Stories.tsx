import { Box, Button, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <Root>
      <Story>
        <Img src={currentUser?.profilePic} />
        <UserName>{currentUser?.name}</UserName>
        <AddBtn>+</AddBtn>
      </Story>
      {stories.map((e) => (
        <Story key={e.id}>
          <Img src={e.img} />
          <UserName>{e.name}</UserName>
        </Story>
      ))}
    </Root>
  );
};

export default Stories;
const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  height: "250px",
  marginBottom: "30px",
  [theme.breakpoints.down("sm")]: {
    height: "50px",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("md")]: {
    height: "150px",
    gap: "20px",
  },
}));
const Story = styled(Box)(({ theme }) => ({
  flex: "1",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    flex: "none",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
}));
const Img = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));
const UserName = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: "10px",
  left: "10px",
  color: "#fff",
  fontWeight: "500",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const AddBtn = styled("button")(({ theme }) => ({
  position: "absolute",
  bottom: "40px",
  left: "10px",
  color: "#fff",
  backgroundColor: "#5271ff",
  borderRadius: "100px",
  width: "30px",
  height: "30px",
  fontSize: "30px",
  padding: "0",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },
}));
