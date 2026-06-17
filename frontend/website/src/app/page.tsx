"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>BookMyVenue Products</h1>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <p>
            <b>Price:</b> ₹{product.price}
          </p>

          <p>
            <b>Stock:</b> {product.stock}
          </p>

          <p>
            <b>Category:</b>{" "}
            {typeof product.category === "object"
              ? product.category.name
              : product.category}
          </p>

          {product.image && (
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              width="400"
            />
          )}
        </div>
      ))}
    </div>
=======
import { useState } from "react";

import Hero from "@/features/venues/components/Hero";
import SearchBar from "@/features/venues/components/SearchBar";
import VenueGrid from "@/features/venues/components/VenueGrid";
import SectionTitle from "@/features/venues/components/SectionTitle";
import Testimonials from "@/features/venues/components/Testimonials";
import WelcomeTag from "@/components/WelcomeTag";
import AdvancedSearchBar from "@/features/venues/components/AdvancedSearchBar";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Hero />

      <main className="max-w-7xl mx-auto px-6">
        <AdvancedSearchBar />
        

        <SectionTitle title="Popular Venues" />

        <VenueGrid
          search={search}
          location=""
          page={1}
        />


        <SectionTitle title="Featured Venues" />

        <VenueGrid
          search={search}
          location=""
          page={1}
        />

        <Testimonials />
        <WelcomeTag />


    
      </main>
    </>
>>>>>>> feature/footer
  );
}