import express from "express";
import Auth from "../controllers/auth.controller";
const router = express.Router();

router.post("/login", Auth.login);
router.post("/register", Auth.register);
router.post("/logout", Auth.logout);

export default router;
