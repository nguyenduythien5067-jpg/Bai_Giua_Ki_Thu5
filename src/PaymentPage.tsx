import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const { totalPrice, cartItems } = useCart();
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "cod",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    navigate("/success", { state: { paymentInfo, totalPrice, cartItems } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💳 Thanh toán đơn hàng</h2>

      {/* THÔNG TIN GIAO HÀNG */}
      <div style={styles.box}>
        <h3 style={styles.boxTitle}>Thông tin giao hàng</h3>

        <input
          name="name"
          placeholder="Họ và tên"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Địa chỉ giao hàng"
          style={styles.input}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Số điện thoại"
          style={styles.input}
          onChange={handleChange}
        />
      </div>

      {/* PHƯƠNG THỨC THANH TOÁN */}
      <div style={styles.box}>
        <h3 style={styles.boxTitle}>Phương thức thanh toán</h3>

        <label style={styles.radioRow}>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentInfo.paymentMethod === "cod"}
            onChange={handleChange}
          />
          Thanh toán khi nhận hàng (COD)
        </label>

        <label style={styles.radioRow}>
          <input
            type="radio"
            name="paymentMethod"
            value="bank"
            checked={paymentInfo.paymentMethod === "bank"}
            onChange={handleChange}
          />
          Chuyển khoản ngân hàng
        </label>

        <label style={styles.radioRow}>
          <input
            type="radio"
            name="paymentMethod"
            value="momo"
            checked={paymentInfo.paymentMethod === "momo"}
            onChange={handleChange}
          />
          Ví MoMo
        </label>

        <label style={styles.radioRow}>
          <input
            type="radio"
            name="paymentMethod"
            value="vnpay"
            checked={paymentInfo.paymentMethod === "vnpay"}
            onChange={handleChange}
          />
          Ví VNPay
        </label>
      </div>

      {/* TỔNG TIỀN */}
      <div style={styles.totalBox}>
        Tổng tiền cần thanh toán:
        <span style={{ color: "#b71c1c" }}> ${totalPrice.toFixed(2)}</span>
      </div>

      <button style={styles.btnPay} onClick={handlePayment}>
        ✔ Xác nhận thanh toán
      </button>
    </div>
  );
}

/* ========================== CSS PRO MAX ============================ */

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 650,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "Segoe UI, sans-serif",
  },

  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: 700,
    marginBottom: 25,
    color: "#1a237e",
  },

  box: {
    background: "#ffffff",
    padding: "25px 28px",
    marginBottom: 25,
    borderRadius: 14,
    border: "1px solid #e0e0e0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },

  boxTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 15,
    color: "#0d47a1",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    margin: "10px 0",
    borderRadius: 10,
    border: "1px solid #bdbdbd",
    fontSize: 15,
    transition: "0.3s",
  },

  radioRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    padding: "10px 12px",
    background: "#fafafa",
    borderRadius: 10,
    margin: "8px 0",
    border: "1px solid #e0e0e0",
    cursor: "pointer",
    transition: "0.25s",
  },

  totalBox: {
    textAlign: "center",
    padding: "18px",
    background: "#e3f2fd",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: 600,
    color: "#0d47a1",
    boxShadow: "0 3px 10px rgba(0,0,0,0.07)",
    marginBottom: 25,
  },

  btnPay: {
    width: "100%",
    padding: "14px 0",
    background: "linear-gradient(45deg, #1976d2, #0d47a1)",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0.3,
    boxShadow: "0 4px 14px rgba(25,118,210,0.4)",
    transition: "0.25s",
  },
};

export {};
