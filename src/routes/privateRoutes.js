import { Router } from "express";
import { profileRouter } from "./profile.js";
import { logoutSession } from "../utils/jwt.js";
import { categoriesController } from "../controllers/categoryController.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { craeteProductController } from "../controllers/createProductController.js";
import { deleteProductController } from "../controllers/deleteProductController.js";

const router = Router();

// ROTA PARA USUÁRIOS COMUMS
router.get("/profile", profileRouter);
router.post("/logout", logoutSession);

// ROTA PARA ADMINS
router.post("/new-product", isAdmin, craeteProductController);
router.post("/delete-product", isAdmin, deleteProductController);
router.post("/new-category", isAdmin, categoriesController);

export default router;
