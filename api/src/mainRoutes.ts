import { Router } from "express";
import authRoutes from "./routes/auth";
import commentRoutes from "./routes/comments";
import likeRoutes from "./routes/likes";
import postRoutes from "./routes/posts";
import relationshipRoutes from "./routes/relationships";
import userRoutes from "./routes/users";
import search from "./routes/search";
import { verifyAuthToken } from "./middleware/jwt_token";

const mainRouter = Router();

mainRouter.use("/api/auth", authRoutes);
mainRouter.use("/api/users", verifyAuthToken, userRoutes);
mainRouter.use("/api/comments", verifyAuthToken, commentRoutes);
mainRouter.use("/api/likes", verifyAuthToken, likeRoutes);
mainRouter.use("/api/posts", verifyAuthToken, postRoutes);
mainRouter.use("/api/relationships", verifyAuthToken, relationshipRoutes);
mainRouter.use("/api/search", verifyAuthToken, search);

export default mainRouter;
