import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { users } from "../data/users";
// import ReCAPTCHA from "react-google-recaptcha";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [captchaValue, setCaptchaValue] = useState(null);
  
  // const captchaRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Sử dụng environment variable thay vì hardcode
  // const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  // useEffect(() => {
  //   // Log để debug reCAPTCHA
  //   console.log("RECAPTCHA_SITE_KEY:", RECAPTCHA_SITE_KEY);
  //   console.log("Current domain:", window.location.hostname);
  // }, []);

  const validateForm = () => {
    if (!username.trim()) {
      setError("Vui lòng nhập tên đăng nhập!");
      return false;
    }
    if (!password.trim()) {
      setError("Vui lòng nhập mật khẩu!");
      return false;
    }
    // if (!captchaValue) {
    //   setError("Vui lòng xác thực Captcha!");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
        // captchaRef.current?.reset();
        // setCaptchaValue(null);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleCaptchaChange = (value) => {
  //   // console.log("Captcha value received:", value ? "yes" : "no");
  //   // setCaptchaValue(value);
  //   setError("");
  // };

  // const handleCaptchaError = (err) => {
  //   console.error("reCAPTCHA Error:", err);
  //   setError("Có lỗi xảy ra với xác thực. Vui lòng tải lại trang!");
  //   // setCaptchaValue(null);
  // };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setError("");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h3>Quản lý vật tư tiêu hao CNTT</h3>
        <h4>Đăng nhập</h4>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
            required
            placeholder="Điền tên đăng nhập"
            disabled={isLoading}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            required
            placeholder="Điền mật khẩu"
            disabled={isLoading}
            autoComplete="current-password"
          />
        </div>

        {/* <div className="captcha-container">
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            onError={handleCaptchaError}
            onExpired={() => {
              console.log("Captcha expired");
              setCaptchaValue(null);
            }}
            hl="vi"
          />
        </div> */}

        <button
          type="submit"
          disabled={isLoading}
          className={isLoading ? 'loading' : ''}
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}

export default Login;