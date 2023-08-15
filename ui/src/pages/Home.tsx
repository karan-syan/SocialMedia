import { Box, styled } from "@mui/material";
import { useContext } from "react";
import Posts from "../component/Posts";
import Share from "../component/Share";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <Root>
      {/* <Stories /> */}
      <Share />
      <Posts />
    </Root>
  );
};

export default Home;
const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  height: "92.5vh",
  padding: "10px 30px",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
}));
