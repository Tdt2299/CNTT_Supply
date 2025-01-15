import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "../../components/Header"; // Import Header component
const UpdateCategory = () => {
  const categories = {
    key: "",
    name: "",
  };
  const [category, setCategory] = useState(categories);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setCategory({ ...category, [name]: value });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories")
      .then((response) => {
        const categoryData = response.data.find((cat) => cat._id === id);
        if (categoryData) {
          setCategory(categoryData);
        } else {
          console.error("Category not found!");
        }
      })
      .catch((error) => {
        console.error("Error fetching category list:", error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/update/category/${id}`, category)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/categories");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
    <Header/>
    <div className="addCategory">
      <Link to="/categories" type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Quay lại
      </Link>

      <h3>Cập nhật loại sản phẩm</h3>
      <form className="addCategoryForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="key">Mã loại:</label>
          <input
            type="text"
            id="key"
            value={category.key}
            onChange={inputHandler}
            name="key"
            autoComplete="off"
            placeholder="Nhập Mã loại"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Tên loại:</label>
          <input
            type="text"
            id="name"
            value={category.name}
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Nhập Tên loại"
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

export default UpdateCategory;
