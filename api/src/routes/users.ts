import express from "express";
import {
  getUser,
  sendResetPasswordMail,
  updateUser,
  resetPassword,
} from "../controllers/user";
const router = express.Router();

router.get("/:userId", getUser);
router.post("/resetPassword", sendResetPasswordMail);
router.patch("/resetPassword", resetPassword);
router.put("/", updateUser);

export default router;
