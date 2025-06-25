import React, { useEffect, useState } from "react";
import axios from "axios";
import BookItem from "./BookItem";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/api/books").then(res => setBooks(res.data));
  }, []);

  return (
    <div className="row">
      {books.map(book => (
        <div className="col-md-4 mb-4" key={book.id}>
          <BookItem book={book} />
        </div>
      ))}
    </div>
  );
}
