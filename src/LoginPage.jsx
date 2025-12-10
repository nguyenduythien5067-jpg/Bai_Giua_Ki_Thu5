import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import anhlogo1 from "./assets/images/keylogin.png";
import "./assets/css/login.css";
import { supabase } from "./supabaseClient";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { onLogin } = useOutletContext(); // nhận callback từ Layout

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      alert("❌ Vui lòng nhập đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Lấy user từ Supabase theo username
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (error) throw error;
      if (!user) {
        alert("❌ Tên đăng nhập không tồn tại!");
        setLoading(false);
        return;
      }

      // 2️⃣ Kiểm tra password
      if (user.password !== password) {
        alert("❌ Mật khẩu không đúng!");
        setLoading(false);
        return;
      }

      // 3️⃣ Login thành công
      const userData = { username: user.username, role: user.role };
      localStorage.setItem("user", JSON.stringify(userData));
      if (onLogin) onLogin(userData); // cập nhật Layout liền
      alert("✅ Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />
        <h2 className="login-title">Đăng nhập vào tài khoản</h2>

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
          Bạn chưa có tài khoản? <a href="/register">Tạo tài khoản mới</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
