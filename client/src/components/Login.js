import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { users } from "../data/users";
import ReCAPTCHA from "react-google-recaptcha";
//6LdRvNAqAAAAAIKNQLESCPcUnGGCYv4nBEZOshC0
import "../App.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra captcha
    if (!captchaValue) {
      setError("Vui lòng xác thực Captcha!");
      return;
    }

    // Kiểm tra thông tin đăng nhập
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const fakeToken = btoa(`${username}:${password}`);
      login(fakeToken, {
        id: user.id,
        username: user.username,
        role: user.role
      });
      navigate("/home");
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      // Reset captcha khi đăng nhập thất bại
      captchaRef.current.reset();
      setCaptchaValue(null);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    setError(""); // Xóa thông báo lỗi khi người dùng xác thực captcha
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
        <div className="captcha-container">
          <ReCAPTCHA
            ref={captchaRef}
            sitekey="6LeC19AqAAAAANyIugJheEBlQuj7yVInxZH8gbyG" // Thay thế bằng site key của bạn
            onChange={handleCaptchaChange}
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;