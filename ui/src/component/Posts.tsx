import { Box, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../utils/axiosUtil";
import Post from "./Post";
import { useEffect } from "react";
export interface IPosts {
  createdAt: string | null;
  desc: string;
  id: number;
  img: string;
  name: string;
  profilePic: string;
  userId: number;
}
const Posts = ({ userId }: { userId?: number }) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      makeRequest
        .get(userId ? "/posts?userId=" + userId : "/posts")
        .then((res) => {
          return res.data;
        }),
  });
  useEffect(() => {
    refetch();
  }, [userId]);
  return (
    <Root>
      {error
        ? "something went wrong"
        : isLoading
        ? "Loading"
        : data.map((e: IPosts) => <Post post={e} key={e.id} />)}
    </Root>
  );
};

export default Posts;
const Root = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  marginBottom: "40px",
}));
