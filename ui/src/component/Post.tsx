import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Avatar, Box, Button, styled, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { baseImageURL, makeRequest } from "../utils/axiosUtil";
import Comments from "./Comments";
import { IPosts } from "./Posts";

interface Props {
  post: IPosts;
}
const Post = (props: Props) => {
  const { post } = props;
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleComments = () => {
    setCommentOpen((prev) => !prev);
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (liked: boolean) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (postId: number) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const handleLike = () => {
    mutation.mutate(data.includes(currentUser?.id));
  };
  const handleDeletePost = () => {
    deleteMutation.mutate(post.id);
  };
  return (
    <Root>
      <Wrapper>
        <User>
          <UserInfo onClick={() => navigate(`/profile/${post.userId}`)}>
            <Avatar src={post.profilePic && baseImageURL + post.profilePic} />
            <Details>
              <UserName>{post.name}</UserName>
              <Date>{moment(post.createdAt).fromNow()}</Date>
            </Details>
          </UserInfo>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <MoreHorizIcon onClick={() => setMenuOpen((prev) => !prev)} />
            {post.userId === currentUser?.id && menuOpen && (
              <Button
                variant="contained"
                sx={{ background: "red" }}
                onClick={handleDeletePost}
              >
                Delete
              </Button>
            )}
          </Box>
        </User>
        <Content>
          <Typography>{post.desc}</Typography>
          <Img
            src={post.img && baseImageURL + post.img}
            onClick={() => openInNewTab(post.img && baseImageURL + post.img)}
          />
        </Content>
        <Info>
          <Item>
            {isLoading ? (
              "loading..."
            ) : data.includes(currentUser?.id) ? (
              <FavoriteOutlinedIcon
                sx={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data && data.length} likes
          </Item>
          <Item onClick={handleComments}>
            <TextsmsOutlinedIcon />
            <Typography fontSize={"inherit"}>comments</Typography>
          </Item>
          {/* <Item>
            <ShareOutlinedIcon />
            <Typography fontSize={"inherit"}>Share</Typography>
          </Item> */}
        </Info>
        {commentOpen && <Comments postId={post.id} />}
      </Wrapper>
    </Root>
  );
};

export default Post;
const Root = styled(Box)(({ theme }) => ({
  boxShadow: "0px 0px 25px -10px rgba(0, 0, 0, 0.38)",
  borderRadius: "20px",
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}));
const Wrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "20px",
}));
const User = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));
const UserInfo = styled(Box)(() => ({
  display: "flex",
  gap: "20px",
  cursor: "pointer",
}));
const Img = styled("img")(() => ({
  width: "100%",
  maxHeight: "500px",
  objectFit: "cover",
  marginTop: "20px",
}));
const Details = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));
const UserName = styled(Typography)(() => ({
  fontWeight: "500",
}));
const Date = styled(Typography)(() => ({
  fontSize: "12px",
}));
const Content = styled(Box)(() => ({
  margin: "20px 0px",
}));
const Info = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));
const Item = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  cursor: "pointer",
  fontSize: "14px",
}));
