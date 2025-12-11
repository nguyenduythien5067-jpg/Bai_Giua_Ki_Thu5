import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Không có dữ liệu đơn hàng.</h2>
        <button onClick={() => navigate("/")}>Về trang chủ</button>
      </div>
    );
  }

  const methodText: Record<string, string> = {
    cod: "Thanh toán khi nhận hàng (COD)",
    momo: "Ví MoMo",
    vnpay: "Ví VNPay",
    bank: "Chuyển khoản ngân hàng",
  };

  return (
    <div style={styles.wrapper as React.CSSProperties}>

      <div style={styles.card as React.CSSProperties}>
        <div style={styles.successIcon}>✔</div>

        <h2 style={styles.title}>Đặt hàng thành công!</h2>

        <p style={styles.desc}>
          Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đang được xử lý.
        </p>

        {/* THÔNG TIN KHÁCH */}
        <div style={styles.infoBox}>
          <h3 style={styles.sectionTitle}>📌 Thông tin khách hàng</h3>
          <p><strong>Tên:</strong> {state.paymentInfo.name}</p>
          <p><strong>Địa chỉ:</strong> {state.paymentInfo.address}</p>
          <p><strong>SĐT:</strong> {state.paymentInfo.phone}</p>
          <p>
            <strong>Thanh toán:</strong>{" "}
            {methodText[state.paymentInfo.paymentMethod]}
          </p>
        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        <div style={styles.infoBox}>
          <h3 style={styles.sectionTitle}>🛒 Sản phẩm đã mua</h3>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {state.cartItems.map((item: any) => (
              <li key={item.id} style={styles.productItem}>
                <span>{item.name} × {item.quantity}</span>
                <span style={{ fontWeight: "bold" }}>${item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* TỔNG TIỀN */}
        <h3 style={styles.totalPrice}>
          Tổng tiền:{" "}
          <span style={{ color: "#d32f2f" }}>
            ${state.totalPrice.toFixed(2)}
          </span>
        </h3>

        <button style={styles.btn} onClick={() => navigate("/")}>
          ⬅ Quay về trang chủ
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#f3f5f7",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    maxWidth: 600,
    width: "100%",
    background: "#fff",
    padding: 30,
    borderRadius: 16,
    boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
  },
  successIcon: {
    fontSize: 60,
    color: "#4caf50",
    marginBottom: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    color: "#555",
    marginBottom: 25,
  },
  infoBox: {
    textAlign: "left" as const,
    background: "#fafafa",
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    border: "1px solid #eee",
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  productItem: {
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    fontSize: 15,
    display: "flex",
    justifyContent: "space-between",
  },
  totalPrice: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 25,
  },
  btn: {
    padding: "12px 24px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    transition: "0.2s",
  },
};
