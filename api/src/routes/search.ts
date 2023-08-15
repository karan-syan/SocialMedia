import express from "express";
import { searchUser } from "../controllers/search";
const router = express.Router();

router.get("/:username", searchUser);

export default router;
