import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Trang chủ</Link>
        <Link to="/products" style={styles.link}>Sản phẩm</Link>
        <Link to="/categories" style={styles.link}>Loại sản phẩm</Link>
      </nav>
    </header>
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
};

export default Header;
