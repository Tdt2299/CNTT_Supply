import React, { useEffect, useState } from "react";
import "./category.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../components/Header"; // Import Header component

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State mới cho tìm kiếm

  // Lọc sản phẩm dựa trên searchTerm
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://cntt-supply.onrender.com/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteCategory = async (categoryId) => {
    await axios
      .delete(`https://cntt-supply.onrender.com/api/delete/category/${categoryId}`)
      .then((response) => {
        setCategories((prevCategory) => prevCategory.filter((category) => category._id !== categoryId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="categoryTable">
        <h3>Danh sách loại sản phẩm</h3>
        <div className="table-controls">
          <div className="left-controls">
            <Link to="/add-category" type="button" class="btn btn-primary">
              Thêm loại sản phẩm <i class="fa-solid fa-category-plus"></i>
            </Link>
          </div>
          {/* Thêm ô tìm kiếm */}
          <div className="right-controls">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Tìm kiếm loại sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Mã loại</th>
              <th scope="col">Tên loại</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => {
              return (
                <tr>
                  <td>{category.key}</td>
                  <td>{category.name}</td>
                  <td className="actionButtons">
                    <Link
                      to={`/update/category/` + category._id}
                      type="button"
                      className="btn btn-info"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteCategory(category._id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
