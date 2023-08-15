import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Avatar, Box, Button, Typography, styled } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Posts from "../component/Posts";
import Update from "../component/Update";
import { AuthContext, Iuser } from "../context/AuthContext";
import { baseImageURL, makeRequest } from "../utils/axiosUtil";
const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [updateOpen, setUpdateOpen] = useState<boolean>(false);
  const closeUpdateBox = () => {
    setUpdateOpen(false);
  };
  const { id } = useParams();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: (): Promise<Iuser> =>
      makeRequest.get("/users/find/" + id).then((res) => {
        return res.data;
      }),
  });
  useEffect(() => {
    refetch();
  }, [id]);
  const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
    {
      queryKey: ["relationship"],
      queryFn: () =>
        makeRequest.get("/relationships?followedUserId=" + id).then((res) => {
          return res.data;
        }),
    }
  );

  const mutation = useMutation({
    mutationFn: (following: boolean) => {
      if (following) return makeRequest.delete("/relationships?userId=" + id);
      return makeRequest.post("/relationships", { userId: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser?.id));
  };
  return (
    <Root>
      <Images>
        <Box height={"300px"}>
          <Img src={data?.coverPic && baseImageURL + data?.coverPic} />
        </Box>
        <UserAvatar src={data?.profilePic && baseImageURL + data?.profilePic} />
      </Images>
      <ProfileContainer>
        <UserInfo>
          <UserInfoLeft>
            <IconLink href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </IconLink>
            <IconLink href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </IconLink>
            <IconLink href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </IconLink>
            <IconLink href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </IconLink>
            <IconLink href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </IconLink>
          </UserInfoLeft>
          <UserInfoCenter>
            <Username>{data?.name}</Username>
            <Info>
              <Item>
                <PlaceIcon />
                <Typography fontSize="inherit">{data?.city}</Typography>
              </Item>
              <Item>
                <LanguageIcon />
                <Typography fontSize="inherit">{data?.website}</Typography>
              </Item>
            </Info>
            {currentUser?.id === data?.id ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <CustomBtn
                  onClick={() => setUpdateOpen(true)}
                  bgClr={"#5271ff"}
                  hovBgClr={"#38488f"}
                >
                  Update
                </CustomBtn>
                <CustomBtn
                  bgClr="#e63946"
                  hovBgClr="#9d0208"
                  onClick={() => {
                    logOut();
                    navigate("/login");
                  }}
                >
                  Log Out
                </CustomBtn>
              </Box>
            ) : (
              <CustomBtn
                onClick={handleFollow}
                bgClr="#0096c7"
                hovBgClr={"#0077b6"}
              >
                {relationshipIsLoading
                  ? "loading..."
                  : relationshipData.includes(currentUser?.id)
                  ? "Following"
                  : "Follow"}
              </CustomBtn>
            )}
          </UserInfoCenter>
          <UserInfoRight>
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </UserInfoRight>
        </UserInfo>
        <Posts userId={parseInt(id || "0")} />
      </ProfileContainer>
      {updateOpen && <Update closeUpdate={closeUpdateBox} user={data} />}
    </Root>
  );
};

export default Profile;
const Root = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
  height: "92.5vh",
  backgroundColor: theme.palette.background.paper,
}));
const Images = styled(Box)(() => ({
  width: "100%",
  height: "300px",
  position: "relative",
}));
const UserAvatar = styled(Avatar)(() => ({
  height: "200px",
  width: "200px",
  position: "absolute",
  left: 0,
  right: 0,
  margin: "auto",
  top: "200px",
}));
const Img = styled("img")(() => ({
  width: "100%",
  maxHeight: "100%",
  objectFit: "cover",
}));
const ProfileContainer = styled(Box)(({ theme }) => ({
  padding: "20px 70px",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
}));
const UserInfo = styled(Box)(({ theme }) => ({
  boxShadow: "0px 0px 25px -10px rgba(0, 0, 0, 0.38)",
  borderRadius: "20px",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  padding: "100px 50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: "30vh",
    padding: "20px",
    marginTop: "100px",
  },
}));
const UserInfoLeft = styled(Box)(({ theme }) => ({
  flex: "1",
  display: "flex",
  gap: "10px",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },
}));
const IconLink = styled("a")(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
const UserInfoCenter = styled(Box)(() => ({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
}));
const UserInfoRight = styled(Box)(() => ({
  flex: "1",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "10px",
}));
const Info = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-around",
  fontSize: "12px",
}));
const Item = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: theme.palette.text.secondary,
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

const Username = styled(Typography)(() => ({
  fontSize: "30px",
  fontWeight: "500",
}));
