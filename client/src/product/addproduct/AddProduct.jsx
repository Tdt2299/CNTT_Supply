import React, { useEffect, useState } from "react";
import "./addproduct.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import Header from "./components/Header"; // Import Header component

const AddProduct = () => {

  const products = {
    key: "",
    name: "",
    category: "",
    quantity: "",
    price: "",
  };
  const [product, setProduct] = useState(products);
  const [categories, setCategories] = useState([]); // Danh sách danh mục

  const navigate = useNavigate();

  // const inputHandler = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);

  //   setProduct({ ...product, [name]: value });
  // };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      // Tìm tên danh mục dựa trên id đã chọn
      const selectedCategory = categories.find(cat => cat._id === value);
      setProduct({
        ...product,
        [name]: value,   // Lưu _id của category
        categoryName: selectedCategory ? selectedCategory.name : '', // Lưu tên category
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };


  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://cntt-supply.onrender.com/api/categories"); // Đường dẫn API lấy danh mục
        setCategories(response.data); // Lưu danh mục vào state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  // const submitForm = async (e) => {
  //   e.preventDefault();

  //   // Kiểm tra nếu các trường bắt buộc chưa được điền
  //   if (!product.key || !product.category || !product.quantity) {
  //     toast.error("Vui lòng điền đầy đủ các trường bắt buộc!", { position: "top-right" });
  //     return;
  //   }

  //   // Kiểm tra nếu quantity không phải là một số hợp lệ và lớn hơn 0
  //   if (isNaN(product.quantity) || product.quantity <= 0) {
  //     toast.error("Số lượng phải là một số hợp lệ và lớn hơn 0!", { position: "top-right" });
  //     return;
  //   }

  //   console.log("Form submitted:", product); // Kiểm tra dữ liệu

  //   await axios
  //     .post("http://localhost:8000/api/product", product)
  //     .then((response) => {
  //       toast.success(response.data.message, { position: "top-right" });
  //       navigate("/products");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const submitForm = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu các trường bắt buộc chưa được điền
    if (!product.key || !product.name || !product.category || !product.quantity || !product.price) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc!", { position: "top-right" });
      return;
    }

    // Kiểm tra nếu quantity không phải là một số hợp lệ và lớn hơn 0
    if (isNaN(product.quantity) || product.quantity <= 0) {
      toast.error("Số lượng phải là một số hợp lệ và lớn hơn 0!", { position: "top-right" });
      return;
    }

    // Kiểm tra nếu price không phải là một số hợp lệ và lớn hơn 0
    if (isNaN(product.price) || product.price <= 0) {
      toast.error("Giá phải là một số hợp lệ và lớn hơn 0!", { position: "top-right" });
      return;
    }

    // Kiểm tra nếu key có phải là một chuỗi hợp lệ
    if (!product.key.trim()) {
      toast.error("Mã sản phẩm không được để trống!", { position: "top-right" });
      return;
    }

    // Log dữ liệu để kiểm tra trước khi gửi
    console.log("Form submitted:", product);

    try {
      // Gửi request tới API để tạo sản phẩm mới
      const response = await axios.post("http://localhost:8000/api/product", product);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/products");
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại!", { position: "top-right" });
    }
  };


  return (

    <div className="addProduct">
      <Link to="/products" type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Quay lại
      </Link>

      <h3>THÊM MỚI SẢN PHẨM</h3>
      <form className="addProductForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="key">Mã sản phẩm:</label>
          <input
            type="text"
            id="key"
            onChange={inputHandler}
            name="key"
            autoComplete="off"
            placeholder="Nhập Mã sản phẩm"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Tên sản phẩm:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Nhập Tên sản phẩm"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="category">Loại sản phẩm</label>
          <select
            id="category"
            name="category"
            value={product.category || ""}
            onChange={inputHandler}
          >
            <option value="">Chọn Loại sản phẩm</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="quantity">Số lượng:</label>
          <input
            type="text"
            id="quantity"
            onChange={inputHandler}
            name="quantity"
            autoComplete="off"
            placeholder="Nhập Số lượng"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="price">Giá tiền:</label>
          <input
            type="text"
            id="price"
            onChange={inputHandler}
            name="price"
            autoComplete="off"
            placeholder="Nhập Giá tiền"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            THÊM MỚI
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
