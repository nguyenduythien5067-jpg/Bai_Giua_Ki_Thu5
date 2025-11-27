import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "./assets/images/logo-ngang.png";
import "./assets/css/layout.css";
import { useCart } from "./CartContext";

const PRODUCTS = [
  "Cà phê sữa đá",
  "Trà đào cam sả",
  "Bánh mì thịt",
  "Bánh ngọt socola",
  "Trà xanh matcha",
  "Cà phê đen",
  "Milo đá",
  "Smoothie dâu",
];

const Layout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [shrinkHeader, setShrinkHeader] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const searchRef = useRef();

  // Lấy cartItems từ Context
  const { cartItems } = useCart();

  // Tính tổng số lượng sản phẩm
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // load user từ localStorage khi mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    const handleScroll = () => setShrinkHeader(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginUser = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setHighlightIndex(-1);
    if (value.length > 0) {
      const filtered = PRODUCTS.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev <= 0 ? suggestions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0)
        handleSelectSuggestion(suggestions[highlightIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightIndex(-1);
    }
  };

  const handleSelectSuggestion = (item) => {
    setSearchText(item);
    setSuggestions([]);
    navigate(`/san-pham?search=${encodeURIComponent(item)}`);
  };

  return (
    <div className="layout">
      {/* Header */}
      <header className={`header ${shrinkHeader ? "shrink" : ""}`}>
        <div className="header-top fade-in">
          {/* Menu trái */}
          <nav className="menu-left">
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
              {user && (
                <li>
                  <Link to="/admin/products" className="nav-link">
                    ⚙️ Quản Trị
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Logo giữa */}
          <div className="logo-center fade-in">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>

          {/* Search box */}
          <div className="search-box fade-in">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm..."
              className="search-input"
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              ref={searchRef}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className={`suggestion-item ${
                      index === highlightIndex ? "highlight" : ""
                    }`}
                    onMouseEnter={() => setHighlightIndex(index)}
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User / Cart */}
          <div className="user-cart fade-in">
            <Link
              to="/cart"
              className="menu-item"
              style={{
                fontWeight: "bold",
                color: "#fff",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              🛒 Giỏ hàng
              {totalQuantity > 0 && (
                <span
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    marginLeft: "5px",
                  }}
                >
                  {totalQuantity}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <span className="username">👤 {user.username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" className="login-link">
                🔑 Đăng Nhập
              </Link>
            )}
          </div>
        </div>

        {/* Menubar */}
        <div className="menubar fade-in">
          <a href="/menu1" className="menu-item">
            Menu 1
          </a>
          <a href="/menu2" className="menu-item">
            Menu 2
          </a>
          <a href="/menu3" className="menu-item">
            Menu 3
          </a>
          <a href="/menu4" className="menu-item">
            Menu 4
          </a>
          <a href="/chat" className="menu-item">
                Chat với AI
              </a>
        </div>
      </header>

      {/* Main content */}
      <main className="main-content">
        <Outlet context={{ onLogin: handleLoginUser }} />
      </main>

      {/* Footer */}
      <footer className="footer fade-in">
        <p>© 2025 Classic Store — Thiết kế bởi Bạn 🦊</p>
      </footer>
    </div>
  );
};

export default Layout;
