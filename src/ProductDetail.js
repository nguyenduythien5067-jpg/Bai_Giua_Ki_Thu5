import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Lấy thông tin user từ localStorage
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from("product1")
        .select("*")
        .eq("id", id)
        .single();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="loading">Đang tải...</p>;

  const handleAdd = () => {
    if (!user) {
      alert("❌ Vui lòng đăng nhập trước khi thêm vào giỏ hàng!");
      navigate("/login"); // chuyển tới trang login nếu muốn
      return;
    }
    addToCart(product);
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  return (
    <>
      <style>{`
        .pd-container { max-width: 1100px; margin: 40px auto; padding: 20px; animation: fadeIn 0.4s ease; }
        .pd-back-btn { padding: 10px 18px; background: #f1f1f1; border: none; border-radius: 8px; cursor: pointer; transition: 0.2s; font-size: 15px; }
        .pd-back-btn:hover { background: #ddd; }
        .pd-card { display: flex; gap: 30px; margin-top: 25px; padding: 25px; background: #fff; border-radius: 14px; box-shadow: 0px 6px 20px rgba(0,0,0,0.08); animation: slideUp 0.4s ease; }
        .pd-image-box { flex: 1; display: flex; justify-content: center; }
        .pd-image { width: 100%; max-width: 420px; border-radius: 12px; transition: 0.3s ease; }
        .pd-image:hover { transform: scale(1.03); }
        .pd-info { flex: 1; }
        .pd-title { font-size: 26px; font-weight: bold; margin-bottom: 10px; }
        .pd-price { font-size: 28px; color: #e63946; font-weight: bold; margin-bottom: 10px; }
        .pd-rating { font-size: 15px; color: #333; margin-bottom: 20px; }
        .pd-description { font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #444; }
        .pd-add-btn { padding: 12px 20px; background: linear-gradient(45deg, #28a745, #20c997); border: none; border-radius: 10px; font-size: 16px; color: white; cursor: pointer; transition: 0.3s ease; box-shadow: 0px 6px 15px rgba(40,167,69,0.3); }
        .pd-add-btn:hover { transform: translateY(-2px); box-shadow: 0px 10px 20px rgba(40,167,69,0.4); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .pd-card { flex-direction: column; text-align: center; } }
      `}</style>

      <div className="pd-container">
        <button className="pd-back-btn" onClick={() => navigate(-1)}>
          ← Quay lại
        </button>

        <div className="pd-card">
          <div className="pd-image-box">
            <img src={product.image} alt={product.title} className="pd-image" />
          </div>

          <div className="pd-info">
            <h2 className="pd-title">{product.title}</h2>
            <p className="pd-price">${product.price}</p>
            <p className="pd-rating">
              ⭐ {product.rating_rate} ({product.rating_count} đánh giá)
            </p>
            <p className="pd-description">
              {product.description || "Chưa có mô tả"}
            </p>
            <button className="pd-add-btn" onClick={handleAdd}>
              🛒 Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
