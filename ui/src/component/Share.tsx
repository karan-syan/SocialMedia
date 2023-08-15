import PhotoIcon from "@mui/icons-material/Photo";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PeopleIcon from "@mui/icons-material/People";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  styled,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../utils/axiosUtil";
export interface IAddPost {
  desc: string;
  img?: string;
}
const Share = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [desc, setDesc] = useState<string>("");
  const queryClient = useQueryClient();
  const upload = async () => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
        const res = await makeRequest.post("/upload", formData);
        return res.data;
      }
    } catch (error) {}
  };
  const mutation = useMutation({
    mutationFn: (newPost: IAddPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const handleShare = async () => {
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({
      desc,
      img: imgUrl,
    });
    setDesc("");
    setFile(null);
  };
  return (
    <Root className="share">
      <Container>
        <Top>
          <Left>
            <Avatar src={currentUser?.profilePic} />
            <InputField
              type="text"
              placeholder={`What's on your mind ${currentUser?.name}?`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Left>
          <Right>
            {file && (
              <img
                src={URL.createObjectURL(file)}
                style={{ height: "60px", objectFit: "cover", width: "100px" }}
              />
            )}
          </Right>
        </Top>
        <HrDivider />
        <Bottom>
          <Left>
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <Item onClick={() => inputRef.current?.click()}>
              <PhotoIcon />
              <ItemText>Add Image</ItemText>
            </Item>
            <Item>
              <FmdGoodIcon />
              <ItemText>Add Place</ItemText>
            </Item>
            <Item>
              <PeopleIcon />
              <ItemText>Tag Friends</ItemText>
            </Item>
          </Left>
          <Box>
            <ShareBtn variant="contained" onClick={handleShare}>
              Share
            </ShareBtn>
          </Box>
        </Bottom>
      </Container>
    </Root>
  );
};

export default Share;

const Root = styled(Box)(({ theme }) => ({
  boxShadow: "0px 0px 25px -10px rgba(0, 0, 0, 0.38)",
  borderRadius: "20px",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  marginBottom: "10px",
}));
const Container = styled(Box)(({ theme }) => ({
  padding: "20px",
}));
const Top = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
const InputField = styled("input")(({ theme }) => ({
  border: "none",
  outline: "none",
  padding: "20px 10px",
  backgroundColor: "transparent",
  width: "100%",
  color: theme.palette.text.primary,
}));

const Bottom = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
const Right = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
}));

const Left = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  flex: "3",
}));
const Item = styled(Typography)(({ theme }) => ({
  display: "flex",
  fontSize: "12px",
  gap: "5px",
  color: "gray",
  alignItems: "center",
}));
const ItemText = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
}));
const ShareBtn = styled(Button)(({ theme }) => ({
  backgroundColor: "#5271ff",
  color: "#fff",
  ":hover": {
    backgroundColor: "#5271ff",
  },
}));
const HrDivider = styled(Divider)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.background.paper}`,
  margin: "20px 0px",
}));
