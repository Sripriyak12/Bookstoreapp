import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const userId = 1; // You can replace this with dynamic auth later

  useEffect(() => {
    axios.get(`/api/cart/${userId}`).then((res) => {
      setCartItems(res.data);
      const sum = res.data.reduce(
        (acc, item) => acc + item.book.price * item.quantity,
        0
      );
      setTotal(sum);
    });
  }, []);

  const placeOrder = async () => {
    try {
      await axios.post("/api/orders/place", { userId });
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <strong>{item.book.title}</strong> × {item.quantity} = ₹
          {(item.book.price * item.quantity).toFixed(2)}
        </div>
      ))}
      <hr />
      <h4>Total: ₹{total.toFixed(2)}</h4>
      <button className="btn btn-success mt-3" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
