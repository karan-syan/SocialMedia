import Brightness5Icon from "@mui/icons-material/Brightness4";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, Box, styled, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DarkThemeContext } from "../context/DarkThemeContext";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { toggleTheme, darkMode } = useContext(DarkThemeContext);

  return (
    <Root>
      <Left>
        <AppName>SocialMedia</AppName>
        <Wrapper>
          <HomeOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          {
            <>
              {darkMode ? (
                <Brightness5Icon
                  onClick={toggleTheme}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                <DarkModeOutlinedIcon
                  onClick={toggleTheme}
                  sx={{ cursor: "pointer" }}
                />
              )}
            </>
          }
          <SearchBox>
            <SearchOutlinedIcon />
            <InputField
              type={"text"}
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyUp={(e) => {
                if (searchValue && searchValue !== "" && e.keyCode === 13) {
                  navigate(`/search/${searchValue}`);
                  setSearchValue("");
                }
              }}
            />
          </SearchBox>
        </Wrapper>
      </Left>
      <Right>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <UserProfile onClick={() => navigate("/profile/" + currentUser?.id)}>
          <Avatar src={currentUser?.profilePic} />
          <Typography fontWeight={"500"}>{currentUser?.name}</Typography>
        </UserProfile>
      </Right>
    </Root>
  );
};

export default NavBar;
const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px 20px",
  height: "7.5vh",
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  position: "sticky",
  zIndex: "10",
  top: "0",
}));
const AppName = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "20px",
  color: "#ff9900",
  cursor: "default",
}));
const Right = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const UserProfile = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const Left = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "30px",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "space-between",
    width: "100%",
  },
}));
const Wrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "30px",
}));
const SearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: `1px solid ${theme.palette.background.paper}`,
  gap: "10px",
  borderRadius: "5px",
  padding: "5px",
}));
const InputField = styled("input")(({ theme }) => ({
  border: "none",
  width: "500px",
  backgroundColor: theme.palette.background.default,
  outline: "none",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    width: "200px",
  },
}));
