import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useCart } from "./CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // từ context

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

  if (!product) return <p>Đang tải...</p>;

  const handleAdd = () => {
    addToCart(product);
    alert("Đã thêm vào giỏ hàng!");
    // Không navigate("/cart"), giữ người dùng ở trang này
  };

  return (
    <div style={{ maxWidth: 900, margin: "30px auto", padding: 20 }}>
      <button onClick={() => navigate(-1)}>← Quay lại</button>
      <div style={{ display: "flex", gap: 30, marginTop: 20 }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: 400, objectFit: "contain" }}
        />
        <div>
          <h2>{product.title}</h2>
          <p
            style={{ fontSize: "1.2rem", color: "#e63946", fontWeight: "bold" }}
          >
            ${product.price}
          </p>
          <p>
            ⭐ {product.rating_rate} ({product.rating_count})
          </p>
          <p>{product.description || "Chưa có mô tả"}</p>
          <button onClick={handleAdd} style={styles.addBtn}>
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  addBtn: {
    marginTop: 20,
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
};

export default ProductDetail;
