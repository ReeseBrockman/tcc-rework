"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);

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
        if (data.product.variations?.length > 0) {
          setSelectedVariation(data.product.variations[0]);
        }
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

  const hasVariations = product.variations?.length > 0;
  const currentPrice = selectedVariation
    ? selectedVariation.price
    : product.price;

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
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                      loading="lazy"
                      decoding="async"
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
          <div className="flex flex-col" style={{ height: "400px" }}>
            <h1 className="text-white text-3xl font-bold mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-yellow-400 text-2xl font-bold">
                {currentPrice}
              </p>
              {product.originalPrice && (
                <p className="text-gray-500 text-lg line-through">
                  {product.originalPrice}
                </p>
              )}
            </div>

            {product.description && (
              <div className="overflow-y-auto flex-1 mb-6 pr-1">
                <p className="text-gray-400 text-sm">{product.description}</p>
              </div>
            )}

            {/* Variation selector */}
            {hasVariations && (
              <div className="mb-6">
                <p className="text-white text-sm font-bold mb-3">
                  {selectedVariation
                    ? `Selected: ${selectedVariation.name}`
                    : "Select an option"}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.variations.map((variation) => (
                    <button
                      key={variation.id}
                      onClick={() => {
                        setSelectedVariation(variation);
                        const variationIndex =
                          product.variations.indexOf(variation);
                        if (product.images?.[variationIndex]) {
                          setSelectedImage(product.images[variationIndex]);
                        }
                      }}
                      className={`px-4 py-2 text-sm font-bold border rounded-lg transition-colors ${
                        selectedVariation?.id === variation.id
                          ? "!bg-yellow-400 !text-black border-yellow-400"
                          : "!bg-black !text-yellow-400 border-yellow-400 hover:!bg-yellow-400 hover:!text-black"
                      }`}
                    >
                      {variation.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto">
              <AddToCartButton
                product={{
                  id: selectedVariation ? selectedVariation.id : product.id,
                  name: selectedVariation
                    ? `${product.name} - ${selectedVariation.name}`
                    : product.name,
                  price: currentPrice,
                  imageUrl: selectedImage,
                  images: product.images,
                }}
                className="w-full text-lg py-4"
              />
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
    </div>
  );
}
