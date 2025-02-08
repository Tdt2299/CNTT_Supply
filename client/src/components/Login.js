import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { users } from "../data/users";
import "../App.css"
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra thông tin đăng nhập
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Tạo token giả (trong thực tế, token sẽ được tạo từ backend)
      const fakeToken = btoa(`${username}:${password}`);

      // Lưu thông tin đăng nhập
      login(fakeToken, {
        id: user.id,
        username: user.username,
        role: user.role
      });

      // Chuyển hướng đến trang home
      navigate("/home");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h3>Quản lý vật tư tiêu hao CNTT</h3>
        <h4>Đăng nhập</h4>
        {error && <div className="error">{error}</div>}
        <div>
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Điền tên đăng nhập"
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Điền mật khẩu"
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>

    </div>
  );
}


export default Login;