import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import ListProducts from "./ListProducts";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import GioiThieu from "./GioiThieu";
// @ts-ignore
import LienHe from "./LienHe";
// @ts-ignore
import RegisterPage from "./RegisterPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//@ts-ignore
import LoginPage from "./LoginPage";
//@ts-ignore
import LogoutPage from "./LogoutPage";
//@ts-ignore
import ProtectedRoute from "./ProtectedRoute";
//@ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
//@ts-ignore
import EditProduct from "./EditProduct";
import ChatPage from "./ChatPage"; // ✅ Import trang Chat

// --- IMPORT MỚI CHO GIỎ HÀNG ---
import { CartProvider } from "./CartContext"; // Context vừa sửa ở Bước 1
import CartPage from "./CartPage"; // Trang hiển thị giỏ hàng (Xem bước 3)

const App = () => {
  //return <Layout />;
  return (
    // ✅ 1. Bọc Provider ở ngoài cùng để state giỏ hàng sống toàn app
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ListProducts_SP />} />
            {/* ✅ 2. Thêm Route cho Giỏ Hàng */}
            <Route path="cart" element={<CartPage />} />

            <Route path="chat" element={<ChatPage />} />
            <Route path="detail/:id" element={<ProductDetail />} />
            <Route path="trang1" element={<Trang1 />} />
            <Route path="sanpham/:id" element={<Chitietsanpham />} />
            <Route path="trang2" element={<Trang2 />} />
            <Route path="gioi-thieu" element={<GioiThieu />} />
            <Route path="lien-he" element={<LienHe />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />
            <Route path="register" element={<RegisterPage />} />

            {/* ✅ Trang đăng nhập (nằm trong Layout) */}
            <Route path="login" element={<LoginPage />} />

            {/* ✅ Trang đăng xuất */}
            <Route path="logout" element={<LogoutPage />} />

            {/* ✅ Trang quản trị (nằm trong Layout, chỉ Admin truy cập) */}
            <Route
              path="admin/products"
              element={
                <ProtectedRoute>
                  <ListProducts_SP_Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
