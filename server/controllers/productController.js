import Product from "../models/productModel.js";



// Trong controller xử lý tạo sản phẩm
export const createProduct = async (req, res) => {
  try {
    const { key, name, category, quantity, price } = req.body;

    // Tạo sản phẩm mới
    const newProduct = new Product({
      key,
      name,
      category, // category là ID của danh mục
      quantity,
      price,
    });

    // Lưu sản phẩm vào cơ sở dữ liệu
    const savedProduct = await newProduct.save();

    // Populate thông tin danh mục trước khi trả về
    await savedProduct.populate('category');

    return res.status(201).json({
      message: "Sản phẩm được thêm thành công",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Đã có lỗi xảy ra" });
  }
};


// Lấy danh sách sản phẩm
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};


export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
    res.status(200).json(productExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
    const updatedData = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    res.status(200).json({ message: "Cập nhật sản phẩm thành công." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Xóa sản phẩm thành công." });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi khi xóa sản phẩm", error });
  }
};
