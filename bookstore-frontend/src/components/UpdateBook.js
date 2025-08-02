import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: "",
    description: ""
  });

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => {
        console.error("Failed to load book:", err);
        alert("Error fetching book details");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/books/${id}`, book)
      .then(() => {
        alert("Book updated successfully!");
        navigate("/admin/manage-books");
      })
      .catch(err => {
        console.error("Update failed:", err);
        alert("Failed to update book.");
      });
  };

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" />
        Back
      </button>

      <h2>✏️ Update Book</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(book).map(([field, value]) => (
          <div key={field} className="mb-2">
            <input
              type={field === "price" || field === "stock" ? "number" : "text"}
              name={field}
              value={value}
              onChange={handleChange}
              className="form-control"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}
        <button className="btn btn-primary mt-2">Save Changes</button>
      </form>
    </div>
  );
}
