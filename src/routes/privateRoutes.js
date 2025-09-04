import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { profileRouter } from "./profile.js";
import { logoutSession } from "../utils/jwt.js";
import { productController } from "../controllers/productController.js";

const router = Router();

router.get("/profile", auth, profileRouter);
router.post("/logout", logoutSession)
router.post("/new-product", productController)

export default router;
