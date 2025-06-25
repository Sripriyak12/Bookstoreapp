import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem("userId"); // 👈 pulls from login storage

  useEffect(() => {
    if (!userId) return;

    axios.get(`/api/cart/${userId}`)
      .then(res => {
        setCart(res.data);
        const sum = res.data.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
        setTotal(sum);
      })
      .catch(err => {
        console.error("Failed to load cart:", err);
        alert("Could not load cart. Please try again.");
      });
  }, [userId]);

  const removeFromCart = (id) => {
    axios.delete(`/api/cart/remove/${id}`)
      .then(() => {
        setCart(prev => prev.filter(item => item.id !== id));
      });
  };
  const handleCheckout = async () => {
  try {
    const response = await axios.post('/api/orders/place', null, {
      params: {
        userId: userId,
        totalAmount: total.toFixed(2)
      }
    });
    alert("🎉 Order placed successfully!");
    setCart([]);
    setTotal(0);
  } catch (error) {
    console.error("Checkout failed:", error);
    alert("Failed to place order.");
  }
};


  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="mb-3">
          <strong>{item.book.title}</strong> x {item.quantity} = ₹{(item.book.price * item.quantity).toFixed(2)}
          <button className="btn btn-sm btn-danger ms-2" onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h4>Total: ₹{total.toFixed(2)}</h4>
          {cart.length > 0 && (
      <button className="btn btn-success mt-3" onClick={handleCheckout}>
        ✅ Proceed to Checkout
      </button>
    )}

    </div>
  );
}

export default Cart;
