import "./assets/css/Cart.css";
import { useState, useEffect } from "react";

const Cart = () => {
  // ✅ Lấy dữ liệu giỏ hàng từ localStorage (hoặc API sau này)
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // ✅ Cập nhật số lượng
  const handleQuantityChange = (index, newQty) => {
    if (newQty < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQty;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Xóa sản phẩm khỏi giỏ
  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Tổng tiền
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Giỏ hàng trống. Hãy thêm sản phẩm nhé!</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toLocaleString()} ₫</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>{(item.price * item.quantity).toLocaleString()} ₫</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(index)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>
              Tổng cộng: <span>{totalPrice.toLocaleString()} ₫</span>
            </h3>
            <button className="checkout-btn">🧾 Thanh toán</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
