import express from "express";
import {
  addRelationships,
  getFollower,
  getFollowing,
  getRelationships,
  removeRelationships,
} from "../controllers/relationship";
const router = express.Router();

router.get("/", getRelationships);
router.get("/follower", getFollower);
router.get("/following", getFollowing);
router.post("/", addRelationships);
router.delete("/", removeRelationships);

export default router;
