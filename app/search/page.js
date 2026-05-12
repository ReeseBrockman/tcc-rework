"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SearchProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors p-4 rounded cursor-pointer">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            decoding="async"
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
            className="mb-3 rounded"
          />
        ) : (
          <div className="bg-gray-800 h-48 mb-3 rounded"></div>
        )}
        <p className="text-white text-sm font-medium">{product.name}</p>
        <p className="text-yellow-400 text-sm font-bold mt-1">
          {product.price}
        </p>
      </div>
    </Link>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();

        const productsWithImages = await Promise.all(
          data.items.map(async (item) => {
            let imageUrl = null;
            if (item.imageId) {
              const imgRes = await fetch(`/api/images?imageId=${item.imageId}`);
              const imgData = await imgRes.json();
              imageUrl = imgData.imageUrl;
            }
            return { ...item, imageUrl };
          }),
        );

        setProducts(productsWithImages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-white text-3xl font-bold mb-2">Search Results</h1>
        {query && (
          <p className="text-gray-400 text-sm">
            Showing results for{" "}
            <span className="text-yellow-400">"{query}"</span>
          </p>
        )}
      </div>

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
          <p className="text-gray-500 text-lg mb-4">
            No products found for "{query}"
          </p>
          <Link href="/" className="text-yellow-400 hover:underline text-sm">
            Return to Homepage
          </Link>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <SearchProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-800 h-8 w-48 rounded mb-8 animate-pulse"></div>
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
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
