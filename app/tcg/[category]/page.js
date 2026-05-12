"use client";

import { use } from "react";
import Link from "next/link";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../context/CartContext";
import GlitchBanner from "@/components/GlitchBanner";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors rounded cursor-pointer group">
      <Link href={`/products/${product.id}`}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
            className="rounded-t"
          />
        ) : (
          <div className="bg-gray-800 h-48 rounded-t"></div>
        )}
        <div className="p-3">
          <p className="text-white text-xs font-medium truncate">
            {product.name}
          </p>
          <p className="text-yellow-400 text-xs font-bold mt-1">
            {product.price}
          </p>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            })
          }
          className="w-full bg-yellow-400 text-black text-xs font-bold py-2 hover:bg-yellow-300 transition-colors rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const categoryMap = {
  "pokemon-singles": {
    label: "Pokemon Singles",
    squareCategory: "Pokemon TCG Singles",
  },
  "pokemon-sealed": {
    label: "Pokemon Sealed",
    squareCategory: "Pokemon TCG Sealed",
  },
  "pokemon-slabs": {
    label: "Pokemon Slabs",
    squareCategory: "Pokemon TCG Slabs",
  },
  "mtg-singles": {
    label: "Magic The Gathering Singles",
    squareCategory: "Magic The Gathering TCG Singles",
  },
  "mtg-sealed": {
    label: "Magic The Gathering Sealed",
    squareCategory: "Magic The Gathering TCG Sealed",
  },
  "mtg-slabs": {
    label: "Magic The Gathering Slabs",
    squareCategory: "Magic The Gathering TCG Slabs",
  },
  "onepiece-singles": {
    label: "One Piece Singles",
    squareCategory: "One Piece TCG Singles",
  },
  "onepiece-sealed": {
    label: "One Piece Sealed",
    squareCategory: "One Piece TCG Sealed",
  },
  "onepiece-slabs": {
    label: "One Piece Slabs",
    squareCategory: "One Piece TCG Slabs",
  },
  "lorcana-singles": {
    label: "Lorcana Singles",
    squareCategory: "Lorcana TCG Singles",
  },
  "lorcana-sealed": {
    label: "Lorcana Sealed",
    squareCategory: "Lorcana TCG Sealed",
  },
  "lorcana-slabs": {
    label: "Lorcana Slabs",
    squareCategory: "Lorcana TCG Slabs",
  },
  "on-sale-tcg": { label: "On Sale TCG", squareCategory: "On Sale TCG" },
};

export default function TCGCategoryPage({ params }) {
  const { category } = use(params);
  const categoryInfo = categoryMap[category] || {
    label: category,
    squareCategory: category,
  };
  const { products, loading } = useProducts(categoryInfo.squareCategory);

  return (
    <div className="bg-black min-h-screen">
      <GlitchBanner section="tcg" />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-yellow-400 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href="/tcg"
              className="text-gray-500 hover:text-yellow-400 transition-colors"
            >
              TCG
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{categoryInfo.label}</span>
          </div>

          <h1 className="text-white text-3xl font-bold mb-8">
            {categoryInfo.label}
          </h1>

          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
                >
                  <div className="bg-gray-800 h-48 mb-3 rounded"></div>
                  <div className="bg-gray-800 h-4 rounded mb-2"></div>
                  <div className="bg-gray-800 h-4 w-16 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">No products found.</p>
              <Link
                href="/tcg"
                className="text-yellow-400 hover:underline text-sm"
              >
                Back to TCG
              </Link>
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
