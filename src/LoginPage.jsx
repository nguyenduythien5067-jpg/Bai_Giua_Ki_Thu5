import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import anhlogo1 from "./assets/images/keylogin.png";
import { Link } from "react-router-dom";
import "./assets/css/login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { onLogin } = useOutletContext(); // nhận callback từ Layout

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username.trim() && password.trim()) {
        const userData = { username, role: "user" };
        localStorage.setItem("user", JSON.stringify(userData));
        if (onLogin) onLogin(userData); // cập nhật Layout liền
        alert("✅ Đăng nhập thành công!");
        navigate("/");
      } else {
        alert("❌ Vui lòng nhập đầy đủ thông tin!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />
        <h2 className="login-title">Đăng nhập vào tài khoản</h2>
        <p className="login-subtitle">Sử dụng tài khoản của bạn để tiếp tục</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="register-link">
          Bạn chưa có tài khoản? <Link to="/register">Tạo tài khoản mới</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
