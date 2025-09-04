import { Router } from "express";
import { profileRouter } from "./profile.js";
import { logoutSession } from "../utils/jwt.js";
import { productController } from "../controllers/productController.js";
import { categoriesController } from "../controllers/categoryController.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// ROTA PARA USUÁRIOS COMUMS
router.get("/profile", profileRouter);
router.post("/logout", logoutSession);

// ROTA PARA ADMINS
router.post("/new-product", isAdmin, productController);
router.post("/new-category", isAdmin, categoriesController);

export default router;
