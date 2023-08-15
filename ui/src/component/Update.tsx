import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Button, Typography, styled } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Iuser } from "../context/AuthContext";
import { baseImageURL, makeRequest } from "../utils/axiosUtil";
interface Props {
  closeUpdate: () => void;
  user?: Iuser;
}
interface UserInter {
  email: string;
  name: string;
  city: string;
  website: string;
}
const Update = ({ closeUpdate, user }: Props) => {
  const [cover, setCover] = useState<File | null>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [texts, setTexts] = useState<UserInter>({
    email: user?.email || "",
    name: user?.name || "",
    city: user?.city || "",
    website: user?.website || "",
  });
  const upload = async (file: File) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        const res = await makeRequest.post("/upload", formData);
        return res.data;
      }
    } catch (error) {}
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (
      user: UserInter & { coverPic?: string; profilePic?: string }
    ) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const handleClick = async () => {
    let coverUrl = user?.coverPic;
    let profileUrl = user?.profilePic;
    coverUrl = cover ? await upload(cover) : user?.coverPic;
    profileUrl = profile ? await upload(profile) : user?.profilePic;
    mutation.mutate({
      ...texts,
      coverPic: coverUrl,
      profilePic: profileUrl,
    });
    closeUpdate();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <Root>
      <Wrapper>
        <Typography>Update Your Profile</Typography>
        <Form>
          <Files>
            <Box onClick={() => coverInputRef.current?.click()}>
              <span>Cover Picture</span>
              <Box sx={{ position: "relative" }}>
                <Img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : user?.coverPic
                      ? baseImageURL + user?.coverPic
                      : user?.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </Box>
            </Box>
            <InputField
              type="file"
              ref={coverInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files) setCover(e.target.files[0]);
              }}
            />
            <Box onClick={() => profileInputRef.current?.click()}>
              <span>Profile Picture</span>
              <Box sx={{ position: "relative" }}>
                <Img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : user?.profilePic
                      ? baseImageURL + user?.profilePic
                      : user?.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon />
              </Box>
            </Box>
            <InputField
              type="file"
              ref={profileInputRef}
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files) setProfile(e.target.files[0]);
              }}
            />
          </Files>
          <Label>Email</Label>
          <InputField
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <Label>Name</Label>
          <InputField
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <Label>Country / City</Label>
          <InputField
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <Label>Website</Label>
          <InputField
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <UpdateBtn onClick={handleClick}>Update</UpdateBtn>
        </Form>
        <CloseBtn className="close" onClick={closeUpdate}>
          close
        </CloseBtn>
      </Wrapper>
    </Root>
  );
};

export default Update;

const Root = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
}));
const Wrapper = styled(Box)(({ theme }) => ({
  margin: "auto",
  width: "40%",
  height: "70%",
  backgroundColor: theme.palette.background.default,
  padding: "50px",
  zIndex: 999,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  boxShadow: "0px 0px 15px 1px rgba(0, 0, 0, 0.09)",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "100%",
  },
}));
const Form = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));
const Files = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "50px",
}));
const Label = styled("label")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "gray",
  fontSize: "14px",
}));
const Img = styled("img")(({ theme }) => ({
  width: "100px",
  height: "100px",
  objectFit: "cover",
}));
const InputField = styled("input")(({ theme }) => ({
  padding: "5px",
  border: "none",
  borderBottom: "1px solid " + theme.palette.background.paper,
  color: "gray",
  backgroundColor: "transparent",
}));
const CloseBtn = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "20px",
  border: "none",
  backgroundColor: "#f0544f",
  padding: "5px",
  cursor: "pointer",
  color: "white",
}));
const UpdateBtn = styled(Button)(({ theme }) => ({
  border: "none",
  padding: "10px",
  cursor: "pointer",
  color: "white",
  backgroundColor: "#5271ff",
}));
