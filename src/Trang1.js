import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // 🟢 nhớ đổi đúng đường dẫn

const Trang1 = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("product1")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;

        setListProduct(data);
      } catch (err) {
        console.error("Lỗi Supabase:", err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛍️ Danh sách sản phẩm</h2>

      <div style={styles.grid}>
        {listProduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <div style={styles.imageWrapper}>
              <img src={p.image} alt={p.title} style={styles.image} />
            </div>

            <h4 style={styles.name}>{p.title}</h4>
            <p style={styles.price}>${p.price}</p>
            <small style={styles.rating}>
              ⭐ {p.rating_rate} ({p.rating_count})
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------------ CSS STYLE ------------------------ */
const styles = {
  container: {
    padding: "20px 30px",
    background: "#f6f7fb",
    minHeight: "100vh",
    fontFamily: "Segoe UI, Roboto, sans-serif",
  },

  title: {
    fontSize: "1.7rem",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#333",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "22px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "14px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.25s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  imageWrapper: {
    width: "100%",
    height: "200px",
    borderRadius: "14px",
    overflow: "hidden",
    marginBottom: "12px",
    background: "#fafafa",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  name: {
    fontSize: "1.05rem",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#333",
  },

  price: {
    fontSize: "1.15rem",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#e63946",
  },

  rating: {
    color: "#666",
  },
};

export default Trang1;
