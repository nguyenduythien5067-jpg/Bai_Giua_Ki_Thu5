import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("product1").select("*");
      if (!data) return;

      setListProduct(data);

      const highlights = [...data]
        .sort((a, b) => b.rating_rate - a.rating_rate)
        .slice(0, 4);

      setFeaturedProducts(highlights);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredProducts]);

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>🔥 Sản phẩm nổi bật</h2>
      <div style={styles.featuredWrapper}>
        {featuredProducts.map((p, index) => (
          <div
            key={p.id}
            style={{
              ...styles.featuredCard,
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 5 : 1,
            }}
            onClick={() => navigate(`/detail/${p.id}`)}
          >
            <div style={styles.featuredImageWrapper}>
              <img src={p.image} alt={p.title} style={styles.featuredImage} />
            </div>
            <div style={styles.featuredContent}>
              <h4 style={styles.featuredName}>{p.title}</h4>
              <p style={styles.featuredPrice}>${p.price}</p>
              <small style={{ color: "#666" }}>
                ⭐ {p.rating_rate} | {p.rating_count} đánh giá
              </small>
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>📦 Tất cả sản phẩm</h2>
      <div style={styles.grid}>
        {listProduct.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            className="card-hover"
            onClick={() => navigate(`/detail/${p.id}`)}
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

const styles = {
  container: {
    padding: "25px 40px",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    background: "#f6f7fb",
  },
  sectionTitle: {
    fontSize: "1.8rem",
    fontWeight: "700",
    margin: "20px 0 15px",
    color: "#333",
  },
  featuredWrapper: {
    position: "relative",
    width: "100%",
    height: "320px",
    overflow: "hidden",
  },
  featuredCard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#fff",
    borderRadius: "20px",
    padding: "14px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
    cursor: "pointer",
    textAlign: "center",
    transition: "opacity 1s ease-in-out, transform 0.4s ease",
  },
  featuredImageWrapper: {
    width: "100%",
    height: "200px",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  featuredImage: { width: "100%", height: "100%", objectFit: "cover" },
  featuredContent: { marginTop: "10px" },
  featuredName: { margin: "5px 0", fontSize: "1.2rem", fontWeight: "600" },
  featuredPrice: { fontSize: "1.2rem", fontWeight: "700", color: "#e63946" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "22px",
    marginTop: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center",
  },
  imageWrapper: {
    width: "100%",
    height: "200px",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  name: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "6px",
  },
  price: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#d62828",
    marginBottom: "4px",
  },
  rating: { color: "#777" },
};

export default ListProducts_SP;
