import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext"; // Import CartContext để lấy thông tin giỏ hàng
import { useNavigate } from "react-router-dom";

export default function OrderInfoPage() {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const [orderCode, setOrderCode] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "Nguyễn Văn A",
    address: "123 Đường ABC, TP. HCM",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
  });

  // Tạo mã đơn hàng ngẫu nhiên
  useEffect(() => {
    const code = "OD" + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(code);
  }, []);

  return (
    <div style={styles.container as React.CSSProperties}>
      <h2 style={styles.title as React.CSSProperties}>Thông tin đơn hàng</h2>

      {/* Mã đơn hàng */}
      <div style={styles.orderBox as React.CSSProperties}>
        <h3>
          Mã đơn hàng: <span style={{ color: "#1976d2" }}>{orderCode}</span>
        </h3>
      </div>

      {/* Danh sách sản phẩm */}
      <div style={styles.section as React.CSSProperties}>
        <h3>Sản phẩm đã đặt</h3>
        <table style={styles.table as React.CSSProperties}>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>SL</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product.id}>
                <td style={styles.productCell as React.CSSProperties}>
                  <img
                    src={item.product.image}
                    style={styles.productImg as React.CSSProperties}
                    alt={item.product.title}
                  />
                  {item.product.title}
                </td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "center" }}>${item.product.price}</td>
                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tổng tiền */}
      <div style={styles.totalBox as React.CSSProperties}>
        <h3>
          Tổng tiền:{" "}
          <span style={{ color: "#d32f2f" }}>${totalPrice.toFixed(2)}</span>
        </h3>
      </div>

      {/* Thông tin khách hàng */}
      <div style={styles.section as React.CSSProperties}>
        <h3>Thông tin khách hàng</h3>
        <div style={styles.infoBox as React.CSSProperties}>
          <p>
            <strong>Tên khách hàng:</strong> {customerInfo.name}
          </p>
          <p>
            <strong>Địa chỉ giao hàng:</strong> {customerInfo.address}
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong>{" "}
            {customerInfo.paymentMethod}
          </p>
        </div>
      </div>

      {/* Nút quay lại */}
      <div style={{ textAlign: "center" }}>
        <button
          style={styles.btnPrimary as React.CSSProperties}
          onClick={() => navigate("/")}
        >
          ⬅ Quay lại trang chủ
        </button>
        <button
          style={{
            ...styles.btnPrimary,
            background: "#f44336", // Red color for the second button
          }}
          onClick={() => navigate("/cart")}
        >
          🛒 Quay lại giỏ hàng
        </button>
        <button
  style={{
    ...styles.btnPrimary,
    background: "#4caf50", // xanh lá
  }}
  onClick={() => navigate("/payment")}
>
  💳 Thanh toán ngay
</button>

      </div>
    </div>
  );
}

// ====== CSS INLINE ======
const styles = {
  container: {
    maxWidth: 900,
    margin: "30px auto",
    background: "#f7f8fa",
    padding: 20,
    fontFamily: "Segoe UI, Roboto",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  orderBox: {
    padding: 15,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    marginBottom: 20,
  },
  section: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  productCell: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  productImg: {
    width: 50,
    height: 50,
    borderRadius: 6,
    objectFit: "contain",
    background: "#f0f0f0",
    padding: 5,
  },
  totalBox: {
    padding: 15,
    background: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    textAlign: "right",
  },
  infoBox: {
    lineHeight: 1.8,
    background: "#f9f9f9",
    padding: 15,
    borderRadius: 6,
  },
  btnPrimary: {
    padding: "12px 24px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 6,
    display: "block",
    margin: "10px auto",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
