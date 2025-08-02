import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    if (userId) {
      axios
        .get(`http://localhost:8080/api/orders/${userId}`)
        .then((res) => {
          console.log("Orders data:", res.data);
          setOrders(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch orders", err);
          setOrders([]);
        });
    }
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>

            <h4>Items:</h4>
            <ul>
              {Array.isArray(order.items) && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <li key={index}>
                    {item.book?.title || "Unknown Title"} x {item.quantity} — ₹
                    {item.book?.price || "N/A"}
                  </li>
                ))
              ) : (
                <li>No items in this order.</li>
              )}
            </ul>

            <hr />
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
