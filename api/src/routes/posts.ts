import express from "express";
import { getPosts, addPosts, removePosts } from "../controllers/post";
const router = express.Router();

router.get("/", getPosts);
router.post("/", addPosts);
router.delete("/:id", removePosts);

export default router;
