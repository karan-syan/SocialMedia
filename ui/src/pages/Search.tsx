import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeRequest } from "../utils/axiosUtil";
import { Iuser } from "../context/AuthContext";
import ListUsers from "../component/ListUsers";
const Search = () => {
  const { username } = useParams();
  const [userList, setUserList] = useState<
    Pick<Iuser, "id" | "profilePic" | "name" | "username">[] | null
  >(null);
  useEffect(() => {
    if (username) {
      makeRequest
        .get("/search/" + username)
        .then((res) => {
          setUserList(res.data);
        })
        .catch((err) => {
          setUserList(null);
        });
    }
  }, [username]);
  return (
    <Root>{userList && userList.map((user) => <ListUsers user={user} />)}</Root>
  );
};

export default Search;
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
