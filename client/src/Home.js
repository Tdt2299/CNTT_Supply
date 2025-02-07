import React from "react";

// import { Link } from "react-router-dom";
import Header from "./components/Header"; // Import Header component
// import Login from "./components/Login"; // Import Login component


const Home = () => {
  


  return (
    <div>
      <Header /> {/* Include Header */}

      {/* Main Content */}
      <main style={styles.main}>

        <h1>Chào mừng đến với Trang chủ</h1>
        <p>Nhấp vào các liên kết điều hướng ở trên để khám phá Sản phẩm hoặc Danh mục.</p>


      </main>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  header: {
    backgroundColor: "#f8f9fa",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "18px",
  },
  main: {
    padding: "20px",
    textAlign: "center",
  },
};

export default Home;
