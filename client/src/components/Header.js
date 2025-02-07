import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
export const Header = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <Link to="/home" className="nav-link">Trang chủ</Link>
          <Link to="/products" className="nav-link">Sản phẩm</Link>
          <Link to="/categories" className="nav-link">Loại sản phẩm</Link>
        </div>
        <div className="nav-right">
          {user && (
            <span className="welcome-text">
              Xin chào, {user.username}
            </span>
          )}
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
