import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories", getAllCategories); // Lấy tất cả danh mục
router.post("/category", createCategory); // Tạo danh mục mới
router.put("/update/category/:id", updateCategory); // Cập nhật danh mục
router.delete("/delete/category/:id", deleteCategory); // Xóa danh mục

export default router;
