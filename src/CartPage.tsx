import React, { useState } from "react";
import { useCart } from "./CartContext"; // Import CartContext để lấy thông tin giỏ hàng
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart, // <-- hàm xóa giỏ hàng không cần dùng nữa
  } = useCart();

  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Nếu giỏ hàng trống, hiển thị thông báo giỏ hàng trống
  if (cartItems.length === 0)
    return (
      <div style={styles.cartEmpty as React.CSSProperties}>
        <h3>Giỏ hàng trống!</h3>
        <button
          style={styles.btnSecondary as React.CSSProperties}
          onClick={() => navigate("/")}
        >
          ⬅ Quay lại mua sắm
        </button>
      </div>
    );

  // Xử lý thanh toán (Không xóa giỏ hàng)
  const handleCheckout = () => {
    setShowSuccess(true);

    // Không xóa giỏ hàng sau thanh toán

    // Tự chuyển trang sau 1.5s
    setTimeout(() => {
      navigate("/order-info"); // Chuyển đến trang thông tin đơn hàng
    }, 1500);
  };

  return (
    <div style={styles.cartContainer as React.CSSProperties}>
      <h2 style={styles.cartTitle as React.CSSProperties}>
        Giỏ hàng của bạn ({cartItems.length} sản phẩm)
      </h2>

      <table style={styles.cartTable as React.CSSProperties}>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.product.id}>
              <td style={styles.productCell as React.CSSProperties}>
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  style={styles.productImg as React.CSSProperties}
                />
                <span>{item.product.title}</span>
              </td>

              <td style={{ textAlign: "center" }}>{item.product.price}$</td>

              <td style={{ textAlign: "center" }}>
                <div style={styles.qtyControls as React.CSSProperties}>
                  <button
                    style={styles.qtyBtn as React.CSSProperties}
                    onClick={() => decreaseQuantity(item.product.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    style={styles.qtyBtn as React.CSSProperties}
                    onClick={() => increaseQuantity(item.product.id)}
                  >
                    +
                  </button>
                </div>
              </td>

              <td
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {(item.product.price * item.quantity).toFixed(2)}$
              </td>

              <td style={{ textAlign: "center" }}>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  style={styles.removeBtn as React.CSSProperties}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.checkoutSection as React.CSSProperties}>
        <button
          style={styles.btnSecondary as React.CSSProperties}
          onClick={() => navigate("/")}
        >
          ⬅ Tiếp tục mua hàng
        </button>

        <div style={styles.totalSection as React.CSSProperties}>
          <h3>
            Tổng cộng:{" "}
            <span style={styles.totalPrice as React.CSSProperties}>
              {totalPrice.toFixed(2)}$
            </span>
          </h3>

          <button
            style={styles.btnPrimary as React.CSSProperties}
            onClick={handleCheckout}
          >
            Thanh toán ngay
          </button>
        </div>
      </div>

      {/* Popup Thanh Toán Thành Công */}
      {showSuccess && (
        <div style={styles.successOverlay as React.CSSProperties}>
          <div style={styles.successBox as React.CSSProperties}>
            <h3>🎉 Thanh toán thành công!</h3>
            <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>

            <button
              style={styles.btnPrimary as React.CSSProperties}
              onClick={() => navigate("/order-info")}
            >
              Xem thông tin đơn hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------
// STYLE FULL 100%
// -------------------------
const styles = {
  cartContainer: {
    maxWidth: 1000,
    margin: "30px auto",
    padding: 20,
    backgroundColor: "#f7f8fa",
    fontFamily: "Segoe UI, Roboto, sans-serif",
  },

  cartTitle: { fontSize: 24, marginBottom: 25, color: "#333" },

  cartTable: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  productCell: { display: "flex", alignItems: "center", gap: 12, padding: 12 },

  productImg: {
    width: 60,
    height: 60,
    objectFit: "contain",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    padding: 5,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  qtyControls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: 6,
    fontWeight: "bold",
    transition: "0.2s",
  },

  removeBtn: {
    color: "red",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
  },

  checkoutSection: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 30,
    paddingTop: 20,
    borderTop: "1px solid #eee",
  },

  totalSection: { textAlign: "right" },

  totalPrice: {
    color: "#d32f2f",
    fontSize: "1.3em",
  },

  btnPrimary: {
    padding: "12px 24px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  },

  btnSecondary: {
    padding: "10px 20px",
    background: "white",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 500,
  },

  cartEmpty: {
    textAlign: "center",
    marginTop: 50,
    fontFamily: "Segoe UI, Roboto, sans-serif",
  },

  // Popup
  successOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  successBox: {
    background: "#fff",
    padding: "30px 40px",
    borderRadius: 12,
    textAlign: "center",
    width: 350,
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease",
  },
};
