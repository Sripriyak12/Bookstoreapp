import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios.get(`/api/orders/${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => {
        console.error("Failed to load orders:", err);
        alert("Could not fetch your orders. Please make sure you're logged in.");
      });
  }, [userId]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        orders.map(o => (
          <div key={o.id} className="card mb-3">
            <div className="card-body">
              <h5>Order #{o.id}</h5>
              <p>Date: {new Date(o.orderDate).toLocaleString()}</p>
              <p>Total: ₹{o.totalAmount?.toFixed(2)}</p>
              <ul>
                {o.items.map(it => (
                  <li key={it.id}>{it.book.title} × {it.quantity}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
