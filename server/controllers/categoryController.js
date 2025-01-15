import Category from "../models/categoryModel.js";

// Tạo danh mục
export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Lấy danh sách danh mục
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
      return res.status(404).json({ message: "Category not found." });
    }
    res.status(200).json(categoryExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  try {
      const id = req.params.id;
      const categoryExist = await Category.findById(id);
      if (!categoryExist) {
        return res.status(404).json({ message: "Không tìm thấy loại sản phẩm." });
      }
      const updatedData = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // res.status(200).json(updatedData);
      res.status(200).json({ message: "Cập nhật loại sản phẩm thành công." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
