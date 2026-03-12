import { useState, useEffect } from "react";

export function useProducts(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = category
          ? `/api/products?category=${category}`
          : "/api/products";
        const res = await fetch(url);
        const data = await res.json();

        const productsWithImages = await Promise.all(
          data.items.map(async (item) => {
            const imageId = item.itemData?.imageIds?.[0];
            let imageUrl = null;

            if (imageId) {
              const imgRes = await fetch(`/api/images?imageId=${imageId}`);
              const imgData = await imgRes.json();
              imageUrl = imgData.imageUrl;
            }

            const variation = item.itemData?.variations?.[0];
            const priceAmount =
              variation?.itemVariationData?.priceMoney?.amount;
            const price = priceAmount
              ? `$${(parseInt(priceAmount) / 100).toFixed(2)}`
              : "Price unavailable";

            return {
              id: item.id,
              name: item.itemData?.name || "Unknown Product",
              price,
              imageUrl,
            };
          }),
        );

        setProducts(productsWithImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  return { products, loading, error };
}
