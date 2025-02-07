import express from "express";
import { login } from "../controllers/authController.js"; // Dùng dấu {}

const router = express.Router();

router.post("/login", login);

export default router;
