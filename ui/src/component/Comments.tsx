import { Avatar, Box, Button, styled, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { makeRequest } from "../utils/axiosUtil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
interface IComment {
  createdAt: string;
  desc: string;
  id: number;
  name: string;
  postid: number;
  profilePic: string;
  userId: number;
}

const Comments = ({ postId }: { postId: number }) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [desc, setDesc] = useState<string>("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: () =>
      makeRequest.get("/comments?postId=" + postId).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationFn: (newComment: { desc: string; postId: number }) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  const handleComment = async () => {
    mutation.mutate({
      desc,
      postId,
    });
    setDesc("");
  };
  return (
    <Root>
      <Write>
        <Avatar src={currentUser?.profilePic} />
        <InputField
          type={"text"}
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.currentTarget.value)}
        />
        <SendBtn variant="contained" onClick={handleComment}>
          Send
        </SendBtn>
      </Write>
      {isLoading
        ? "loading..."
        : data.map((e: IComment) => (
            <Comment key={e.userId}>
              <Avatar src={e.profilePic} />
              <Info>
                <Username>{e.name}</Username>
                <CommentDesc>{e.desc}</CommentDesc>
              </Info>
              <Date>{moment(e.createdAt).fromNow()}</Date>
            </Comment>
          ))}
    </Root>
  );
};

export default Comments;

const Root = styled(Box)(({ theme }) => ({}));
const Write = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  margin: "20px 0px",
}));
const InputField = styled("input")(({ theme }) => ({
  border: `1px solid ${theme.palette.background.paper}`,
  flex: "5",
  backgroundColor: "transparent",
  outline: "none",
  color: theme.palette.text.primary,
  padding: "10px",
}));
const SendBtn = styled(Button)(({ theme }) => ({
  backgroundColor: "#5271ff",
  ":hover": {
    backgroundColor: "#5271ff",
  },
}));

const Comment = styled(Box)(({ theme }) => ({
  margin: "30px 0px",
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
}));
const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  alignItems: "flex-start",
  flex: 5,
}));
const Username = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
}));
const CommentDesc = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
const Date = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  flex: 1,
  alignSelf: "center",
  fontSize: "12px",
}));
