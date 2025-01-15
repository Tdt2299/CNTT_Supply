import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Header"; // Import Header component

const UpdateProduct = () => {
  const products = {
    key: "",
    name: "",
    group: "",
    quantity: "",
    price: "",
  };
  const [product, setProduct] = useState(products);
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setProduct({ ...product, [name]: value });
  };

  // Lấy danh sách danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories"); // Đường dẫn API lấy danh mục
        setCategories(response.data); // Lưu danh mục vào state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/products")
      .then((response) => {
        const productData = response.data.find((prod) => prod._id === id);
        if (productData) {
          setProduct(productData);
        } else {
          console.error("Product not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching product list:", error);
      });
  }, [id]);
  

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/product/${id}`, product)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <Header />
    <div className="addProduct">
      <Link to="/products" type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Quay lại
      </Link>

      <h3>Cập nhật sản phẩm</h3>
      <form className="addProductForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="key">Mã sản phẩm:</label>
          <input
            type="text"
            id="key"
            value={product.key}
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
            value={product.name}
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Nhập Tên sản phẩm"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="category">Loại sản phẩm:</label>
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
            value={product.quantity}
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
            value={product.price}
            onChange={inputHandler}
            name="price"
            autoComplete="off"
            placeholder="Nhập Giá tiền"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Cập nhật
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default UpdateProduct;
