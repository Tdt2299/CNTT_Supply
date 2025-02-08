import React, { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../components/Header"; // Import Header component
const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State mới cho tìm kiếm

  // Lọc sản phẩm dựa trên searchTerm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://cntt-supply.onrender.com/api/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    await axios
      .delete(`https://cntt-supply.onrender.com/api/delete/product/${productId}`)
      .then((response) => {
        setProducts((prevProduct) => prevProduct.filter((product) => product._id !== productId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <div className="productTable">
        <h3>Danh sách sản phẩm</h3>
        <div className="table-controls">
          <div className="left-controls">
          <Link to="/add-product" type="button" class="btn btn-primary">
            Thêm sản phẩm <i class="fa-solid fa-product-plus"></i>
          </Link>
          </div>
          {/* Thêm ô tìm kiếm */}
          <div className="right-controls">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Mã sản phẩm</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Nhóm sản phẩm</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá tiền (VNĐ)</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              return (
                <tr>
                  <td>{product.key}</td>
                  <td>{product.name}</td>
                  {/* <td>{product.category} </td> */}
                  <td>{product.category?.name || "N/A"}</td>
                  <td>{product.quantity} </td>
                  <td>{product.price}</td>
                  <td className="actionButtons">
                    <Link
                      to={`/update/product/` + product._id}
                      type="button"
                      class="btn btn-info"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteProduct(product._id)}
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

export default Product;
