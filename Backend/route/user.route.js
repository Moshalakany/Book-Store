import express from "express";
import { signup, login,editName,editPassword } from "../controller/user.controller.js";
import { authenticateUser } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/edit-name",authenticateUser , editName);
router.put("/edit-password",authenticateUser, editPassword);
export default router;