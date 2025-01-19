import React, { useEffect, useState } from "react";
import "./product.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../../components/Header"; // Import Header component
const Product = () => {
  const [products, setProducts] = useState([]);
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
      <Link to="/add-product" type="button" class="btn btn-primary">
        Thêm sản phẩm <i class="fa-solid fa-product-plus"></i>
      </Link>
    
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Mã sản phẩm</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Nhóm sản phẩm</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Giá tiền</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
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
