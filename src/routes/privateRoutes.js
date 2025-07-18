import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { profileRouter } from "./profile.js";

const router = Router();

router.get("/profile", auth, profileRouter);

export default router;
