import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import anhlogo1 from "./assets/images/keylogin.png";
import { supabase } from "./supabaseClient";
import "./assets/css/login.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // ⭐ Mặc định user
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !email || !password) {
      alert("❌ Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    try {
      // ⭐ Luôn lưu vào bảng users
      const { error } = await supabase.from("users").insert([
        {
          username,
          email,
          password,
          role, // ⭐ role = 'admin' hoặc 'user'
        },
      ]);

      if (error) throw error;

      alert("✅ Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <img src={anhlogo1} alt="Logo" className="login-logo" />

        <h2 className="login-title">Tạo tài khoản mới</h2>
        <p className="login-subtitle">Điền thông tin để tạo tài khoản</p>

        <form onSubmit={handleRegister} className="login-form">
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          {/* ⭐⭐ NÚT CHỌN PHÂN QUYỀN ⭐⭐ */}
          <div className="form-group">
            <label>Phân quyền</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "⏳ Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <p className="register-link">
          Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
