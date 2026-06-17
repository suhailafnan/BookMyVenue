"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>BookMyVenue Products</h1>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {product.category?.name}
          </p>

          <p>
            <strong>Image File:</strong>{" "}
            {product.image}
          </p>

          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            width="300"
            style={{
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
        </div>
      ))}
    </div>
  );
}