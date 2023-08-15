import { Avatar, Box, Button, Typography, styled } from "@mui/material";
import { Iuser } from "../context/AuthContext";
import { baseImageURL } from "../utils/axiosUtil";
import { useNavigate } from "react-router-dom";
interface Props {
  user: Pick<Iuser, "id" | "profilePic" | "name" | "username">;
}

const ListUsers = (props: Props) => {
  const { id, name, profilePic, username } = props.user;
  const navigate = useNavigate();
  return (
    <Root>
      <Container>
        <Avatar
          src={profilePic && baseImageURL + profilePic}
          sx={{ width: 76, height: 76 }}
        />
        <Wrapper>
          <NameText>{name}</NameText>
          <UsernameText>@{username}</UsernameText>
        </Wrapper>
      </Container>
      <CustomBtn
        onClick={() => navigate("/profile/" + id)}
        bgClr="#0096c7"
        hovBgClr={"#0077b6"}
      >
        View Profile
      </CustomBtn>
    </Root>
  );
};

export default ListUsers;
const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px 0px 25px -10px rgba(0, 0, 0, 0.38)",
  padding: "20px 30px",
  borderRadius: 20,
}));
const UsernameText = styled(Typography)(() => ({
  color: "#888",
  fontSize: 16,
}));
const NameText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 25,
}));
const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));
const Container = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: 15,
  alignItems: "center",
}));
const CustomBtn = styled(Button)<{ bgClr: string; hovBgClr: string }>(
  ({ bgClr, hovBgClr }) => ({
    backgroundColor: bgClr,
    borderRadius: 20,
    padding: "5px 15px",
    color: "#fff",
    ":hover": {
      backgroundColor: hovBgClr,
    },
  })
);
