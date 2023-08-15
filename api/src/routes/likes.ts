import express from "express";
import { addLikes, getLikes, removeLikes } from "../controllers/like";
const router = express.Router();

router.get("/", getLikes);
router.post("/", addLikes);
router.delete("/", removeLikes);

export default router;
