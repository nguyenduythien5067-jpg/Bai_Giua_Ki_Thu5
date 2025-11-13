import "./assets/css/layout.css";
import logo from "./assets/images/logo-ngang.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();

  // ✅ Lấy thông tin user từ localStorage
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate(0); // 🔄 Làm mới lại trang => tự reset giao diện
  };

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <div className="banner">
          {/* Menu trái */}
          <div className="menu-left">
            <nav>
              <ul className="nav-list">
                <li>
                  <Link to="/" className="nav-link">
                    🏠 Trang Chủ
                  </Link>
                </li>
                <li>
                  <Link to="/trang1" className="nav-link">
                    🛍️ Sản Phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/trang2" className="nav-link">
                    👩‍💼 Nhân Viên
                  </Link>
                </li>
                <li>
                  <Link to="/gioi-thieu" className="nav-link">
                    ℹ️ Giới Thiệu
                  </Link>
                </li>
                <li>
                  <Link to="/lien-he" className="nav-link">
                    📞 Liên Hệ
                  </Link>
                </li>
                <li>
                  <Link to="/admin/products" className="nav-link">
                    Quản Trị
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Logo giữa */}
          <div className="logo-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>

          {/* Ô tìm kiếm phải */}
          <div className="search-box">
            <li>
              <Link to="/cart" className="nav-link">
                🛒 Giỏ Hàng
              </Link>
            </li>
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm..."
              className="search-input"
            />
          </div>
        </div>

        {/* Thanh menubar */}
        <div id="menubar" className="menubar">
          <div className="menubar-left">
            <a href="/menu1" className="menu-item">
              Menu 1
            </a>
            <a href="/menu2" className="menu-item">
              Menu 2
            </a>
            <a href="/menu3" className="menu-item">
              Menu 3
            </a>
          </div>

          <div className="menubar-right">
            {user ? (
              <>
                <span className="username">👤 {user.username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" className="login-link">
                🔑 Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Nội dung */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Classic Store — Thiết kế bởi Bạn 🦊</p>
      </footer>
    </div>
  );
};

export default Layout;
