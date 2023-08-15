import express from "express";
import commentService from "../services/comment.service";
const router = express.Router();

router.get("/", commentService.getComments);
router.post("/", commentService.addComments);

export default router;
