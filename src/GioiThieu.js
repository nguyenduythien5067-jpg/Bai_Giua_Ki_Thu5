import React, { useEffect } from "react";
import "./assets/css/layout.css";
import aboutImage from "./assets/images/about.jpg"; // 🖼️ bạn nhớ thêm ảnh vào thư mục này

const GioiThieu = () => {
  // ✨ Thêm hiệu ứng fade-in khi cuộn
  useEffect(() => {
    const fadeEls = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );

    fadeEls.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="page-container gioi-thieu-page">
      <h1 className="fade-in">Giới thiệu về Classic Store</h1>
      <p className="fade-in">
        <strong>Classic Store</strong> là thương hiệu mang phong cách cổ điển và
        tinh tế, chuyên cung cấp những sản phẩm chất lượng cao, mang lại trải
        nghiệm mua sắm sang trọng và đáng tin cậy cho khách hàng.
      </p>

      <div className="gioi-thieu-image fade-in">
        <img src={aboutImage} alt="Classic Store" />
      </div>

      <p className="fade-in">
        Với đội ngũ nhân viên chuyên nghiệp và tâm huyết, chúng tôi luôn nỗ lực
        để mang đến những sản phẩm độc đáo, bền đẹp cùng dịch vụ tận tâm nhất.
        Classic Store không chỉ là nơi mua sắm, mà còn là nơi lưu giữ giá trị cổ
        điển giữa nhịp sống hiện đại.
      </p>

      <p className="fade-in">
        Sứ mệnh của chúng tôi là giúp khách hàng tìm thấy sự cân bằng giữa phong
        cách và chất lượng – một lựa chọn hoàn hảo cho mọi lứa tuổi, mọi không
        gian.
      </p>

      <div className="quote-box fade-in">
        <blockquote>
          “Classic không chỉ là phong cách – mà là một phần của bản sắc.”
        </blockquote>
      </div>
    </div>
  );
};

export default GioiThieu;
