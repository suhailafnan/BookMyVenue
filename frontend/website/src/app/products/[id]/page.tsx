"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  category:
    | string
    | {
        name: string;
      };
};

export default function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data: { data: Product }) => setProduct(data.data))
      .catch((err) => console.error(err));
  }, [params.id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>{product.name}</h1>

      {product.image && (
        <div
          aria-label={product.name}
          style={{
            width: "500px",
            maxWidth: "100%",
            height: "300px",
            backgroundImage: `url(http://localhost:5000/uploads/${product.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {typeof product.category === "object"
          ? product.category.name
          : product.category}
      </p>
    </div>
  );
}
