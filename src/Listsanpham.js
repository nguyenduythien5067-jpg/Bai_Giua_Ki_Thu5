const Listsanpham = () => {
  const dssp = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      rating: { rate: 4.1, count: 259 },
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      rating: { rate: 4.7, count: 500 },
    },
    {
      id: 4,
      title: "Mens Casual Slim Fit",
      price: 15.99,
      description:
        "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
      rating: { rate: 2.1, count: 430 },
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        {dssp.map((sanpham) => (
          <div
            key={sanpham.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)")
            }
          >
            <img
              src={sanpham.image}
              alt={sanpham.title}
              style={{
                height: "160px",
                width: "100%",
                objectFit: "contain",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            />
            <h3
              style={{
                fontSize: "16px",
                height: "48px",
                overflow: "hidden",
                margin: "8px 0",
              }}
            >
              {sanpham.title}
            </h3>
            <p style={{ color: "#007BFF", fontWeight: "bold" }}>
              ${sanpham.price}
            </p>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
              {sanpham.category}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#999",
                height: "40px",
                overflow: "hidden",
              }}
            >
              {sanpham.description}
            </p>
            <p style={{ fontSize: "13px", marginTop: "6px", color: "#555" }}>
              ⭐ {sanpham.rating.rate} / {sanpham.rating.count} đánh giá
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listsanpham;
