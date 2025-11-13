import React from "react";
import "./assets/css/layout.css";

const LienHe = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">📞 Liên Hệ Với Chúng Tôi</h2>

      <div className="contact-content">
        <div className="contact-info">
          <h3>Thông Tin Liên Hệ</h3>
          <p>
            <strong>Địa chỉ:</strong> 123 Đường Trà Sữa, Quận Hương Vị, TP. HCE
          </p>
          <p>
            <strong>Điện thoại:</strong> (028) 1234 5678
          </p>
          <p>
            <strong>Email:</strong> contact@coffeeandtea.vn
          </p>
          <p>
            <strong>Giờ mở cửa:</strong> 7:00 - 22:00 (T2 - CN)
          </p>
        </div>

        <div className="contact-form">
          <h3>Gửi Thông Tin Cho Chúng Tôi</h3>
          <form>
            <label>Họ và tên:</label>
            <input type="text" placeholder="Nhập họ và tên..." required />

            <label>Email:</label>
            <input type="email" placeholder="Nhập email..." required />

            <label>Nội dung:</label>
            <textarea
              rows="5"
              placeholder="Nhập nội dung..."
              required
            ></textarea>

            <button type="submit">Gửi Liên Hệ</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LienHe;
