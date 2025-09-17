import { Router } from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { forgotPasswordController } from "../controllers/forgotPasswordController.js";
import { resetPasswordController } from "../controllers/resetPasswordController.js";
import { categories } from "./categories.js";

const router = Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/forgot-password", forgotPasswordController)
router.post("/reset-password", resetPasswordController)
router.get("/categories", categories)

export default router