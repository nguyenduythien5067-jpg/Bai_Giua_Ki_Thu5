import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("product1").select("*");
      if (!data) return;
      setListProduct(data);

      const highlights = [...data]
        .sort((a, b) => b.rating_rate - a.rating_rate)
        .slice(0, 4); // top 4 sản phẩm nổi bật
      setFeaturedProducts(highlights);
    };
    fetchProducts();
  }, []);

  // Slider tự động
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredProducts, currentIndex]);

  // Scroll slider
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      featuredProducts.length ? (prev + 1) % featuredProducts.length : 0
    );
  };

  return (
    <div style={styles.container}>
      {/* Featured Products */}
      <h2 style={styles.sectionTitle}>🔥 Sản phẩm nổi bật</h2>
      <div style={styles.sliderOuter}>
        <div style={styles.sliderInner} ref={sliderRef}>
          {featuredProducts.map((p) => (
            <div
              key={p.id}
              style={styles.featuredCard}
              onClick={() => navigate(`/detail/${p.id}`)}
            >
              <img src={p.image} alt={p.title} style={styles.featuredImage} />
              <h4 style={styles.featuredName}>{p.title}</h4>
              <p style={styles.featuredPrice}>${p.price}</p>
              <small style={styles.rating}>
                ⭐ {p.rating_rate} ({p.rating_count})
              </small>
            </div>
          ))}
        </div>

        {/* Prev/Next buttons */}
        <button style={styles.prevBtn} onClick={handlePrev}>
          ❮
        </button>
        <button style={styles.nextBtn} onClick={handleNext}>
          ❯
        </button>

        {/* Indicator dots */}
        <div style={styles.dotsContainer}>
          {featuredProducts.map((_, idx) => (
            <span
              key={idx}
              style={{
                ...styles.dot,
                backgroundColor:
                  idx === currentIndex ? "#f77f00" : "rgba(255,255,255,0.4)",
              }}
              onClick={() => setCurrentIndex(idx)}
            ></span>
          ))}
        </div>
      </div>

      {/* All Products */}
      <h2 style={styles.sectionTitle}>📦 Tất cả sản phẩm</h2>
      <div style={styles.grid}>
        {listProduct.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onClick={() => navigate(`/detail/${p.id}`)}
          >
            <img src={p.image} alt={p.title} style={styles.image} />
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
    padding: "35px 45px",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    background: "#121214",
    color: "#eee",
  },
  sectionTitle: {
    fontSize: "1.7rem",
    fontWeight: "700",
    margin: "22px 0 18px",
    color: "#fff",
  },

  // Slider
  sliderOuter: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "16px",
    marginBottom: "35px",
    height: "300px",
    position: "relative",
  },
  sliderInner: {
    display: "flex",
    transition: "transform 0.8s ease-in-out",
    width: "100%",
  },
  featuredCard: {
    minWidth: "100%",
    background: "#1e1e23",
    borderRadius: "12px",
    padding: "12px",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    cursor: "pointer",
  },
  featuredImage: {
    width: "100%",
    height: "220px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  featuredName: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#ffb997",
    marginBottom: "5px",
  },
  featuredPrice: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#f77f00",
    marginBottom: "5px",
  },
  rating: { color: "#aaa", fontSize: "0.9rem" },

  // Prev/Next buttons
  prevBtn: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.4)",
    border: "none",
    color: "#fff",
    fontSize: "1.8rem",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    zIndex: 5,
  },
  nextBtn: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.4)",
    border: "none",
    color: "#fff",
    fontSize: "1.8rem",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    zIndex: 5,
  },

  // Indicator dots
  dotsContainer: {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "0.3s",
  },

  // Grid sản phẩm
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "22px",
  },
  card: {
    background: "#1e1e23",
    borderRadius: "12px",
    padding: "12px",
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.5)",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  name: {
    color: "#ffd6a5",
    fontWeight: "600",
    margin: "6px 0",
    fontSize: "1rem",
  },
  price: {
    color: "#f77f00",
    fontWeight: "700",
    marginBottom: "4px",
    fontSize: "1.05rem",
  },
};

export default ListProducts_SP;
