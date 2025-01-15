import React, { useState } from "react";
import "./addcategory.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Header"; // Import Header component


const AddCategory = () => {
  const categories = {
    key: "",
    name: "",
  };
  const [category, setCategory] = useState(categories);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setCategory({ ...category, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form submitted");  // Thêm dòng này để kiểm tra khi submit
    try {
      const response = await axios.post("http://localhost:8000/api/category", category);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/categories"); // Điều hướng sau khi thêm thành công
    } catch (error) {
      console.error("Error while adding category:", error);
      toast.error("Failed to add category");
    }
  };
  

  return (
    <>
    <Header />
    <div className="addCategory">
      <Link to="/categories" type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Quay lại
      </Link>

      <h3>Thêm mới loại sản phẩm</h3>
      <form className="addCategoryForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="key">Mã loại:</label>
          <input
            type="text"
            id="key"
            onChange={inputHandler}
            name="key"
            autoComplete="off"
            placeholder="Nhập mã loại" />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Tên loại:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Nhập tên loại" />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Thêm mới
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddCategory;
