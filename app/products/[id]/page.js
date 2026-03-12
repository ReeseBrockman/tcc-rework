"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
          return;
        }

        setProduct(data.product);
        setSelectedImage(data.product.images?.[0] || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-red-400 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-yellow-400 text-sm transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-500 text-sm mx-2">/</span>
          <span className="text-white text-sm">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div
              className="bg-gray-900 border border-gray-800 rounded mb-4 flex items-center justify-center"
              style={{ height: "400px" }}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={{ maxHeight: "380px", objectFit: "contain" }}
                  className="rounded"
                />
              ) : (
                <div className="bg-gray-800 w-full h-full rounded"></div>
              )}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`border-2 rounded overflow-hidden ${selectedImage === img ? "border-yellow-400" : "border-gray-700"}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      style={{
                        width: "64px",
                        height: "64px",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-white text-3xl font-bold mb-4">
              {product.name}
            </h1>
            <p className="text-yellow-400 text-2xl font-bold mb-6">
              {product.price}
            </p>

            {product.description && (
              <p className="text-gray-400 text-sm mb-6">
                {product.description}
              </p>
            )}

            <button className="w-full bg-yellow-400 text-black font-bold py-4 hover:bg-yellow-300 transition-colors text-lg mb-4">
              Add to Cart
            </button>

            <div className="border-t border-gray-800 pt-6 mt-6">
              <p className="text-gray-500 text-xs">
                Category:{" "}
                <span className="text-gray-400">{product.category}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
