import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts); // Lấy tất cả sản phẩm
router.post("/product", createProduct); // Tạo sản phẩm mới
router.put("/update/product/:id", updateProduct); // Cập nhật sản phẩm
router.delete("/delete/product/:id", deleteProduct); // Xóa sản phẩm

export default router;
