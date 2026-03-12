"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const placeholderProducts = [
  { id: 1, name: "Product Name", price: "$0.00" },
  { id: 2, name: "Product Name", price: "$0.00" },
  { id: 3, name: "Product Name", price: "$0.00" },
  { id: 4, name: "Product Name", price: "$0.00" },
  { id: 5, name: "Product Name", price: "$0.00" },
  { id: 6, name: "Product Name", price: "$0.00" },
  { id: 7, name: "Product Name", price: "$0.00" },
  { id: 8, name: "Product Name", price: "$0.00" },
];

function ProductCard({ product }) {
  return (
    <div className="min-w-[200px] bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors p-4 rounded cursor-pointer">
      <div className="bg-gray-800 h-48 mb-3 rounded"></div>
      <p className="text-white text-sm font-medium">{product.name}</p>
      <p className="text-yellow-400 text-sm font-bold mt-1">{product.price}</p>
    </div>
  );
}

function ProductSlider({ title, products }) {
  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-white text-2xl font-bold mb-6 border-l-4 border-yellow-400 pl-4">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function GlitchBanner() {
  const [current, setCurrent] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const banners = [
    "/banners/banner-1.png",
    "/banners/banner-2.png",
    "/banners/banner-3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
        setGlitching(false);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-64 overflow-hidden bg-gray-900">
      <div
        className={`w-full h-full ${glitching ? "glitch-effect" : ""}`}
        style={{
          backgroundImage: `url(${banners[current]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "286px",
          display: "block",
        }}
      />
      {glitching && (
        <>
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `url(${banners[current]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translate(-4px, 2px)",
              mixBlendMode: "screen",
              filter: "hue-rotate(90deg)",
            }}
          />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `url(${banners[current]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "translate(4px, -2px)",
              mixBlendMode: "screen",
              filter: "hue-rotate(200deg)",
            }}
          />
        </>
      )}
    </section>
  );
}

function JustArrived({ products }) {
  const [paused, setPaused] = useState(false);

  return (
    <section className="py-10 bg-black border-t border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
          Just Arrived
        </h2>
      </div>
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`flex gap-4 px-4 ${paused ? "" : "animate-marquee"}`}
          style={{ width: "max-content" }}
        >
          {[...products, ...products].map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramSection() {
  return (
    <section className="py-16 px-4 bg-gray-900 border-t border-yellow-400">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
            Follow Us on Instagram
          </h2>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black font-bold px-6 py-3 hover:bg-yellow-300 transition-colors"
          >
            Follow Us
          </a>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800 aspect-square rounded"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [preference, setPreference] = useState("sports");

  useEffect(() => {
    const saved = localStorage.getItem("tcc-preference");
    if (saved) setPreference(saved);
  }, []);

  const handlePreference = (pref) => {
    localStorage.setItem("tcc-preference", pref);
    setPreference(pref);
  };

  const sportsSections = (
    <>
      <ProductSlider title="Sports Cards" products={placeholderProducts} />
      <ProductSlider title="Sports Boxes" products={placeholderProducts} />
      <ProductSlider title="Sports On Sale" products={placeholderProducts} />
    </>
  );

  const tcgSections = (
    <>
      <ProductSlider title="TCG Singles" products={placeholderProducts} />
      <ProductSlider title="TCG Sealed" products={placeholderProducts} />
      <ProductSlider title="TCG On Sale" products={placeholderProducts} />
    </>
  );

  return (
    <div className="bg-black">
      <section className="grid grid-cols-2 gap-0">
        <Link
          href="/products/sports"
          onClick={() => handlePreference("sports")}
          className="relative h-96 bg-gray-900 flex items-center justify-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-4xl font-bold mb-4">Sports Cards</h2>
            <p className="text-yellow-400 text-lg mb-6">
              at Unbeatable Prices!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-6 py-3 group-hover:bg-yellow-300 transition-colors">
              Shop Sports
            </span>
          </div>
        </Link>

        <Link
          href="/products/tcg"
          onClick={() => handlePreference("tcg")}
          className="relative h-96 bg-gray-800 flex items-center justify-center overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-4xl font-bold mb-4">TCG</h2>
            <p className="text-yellow-400 text-lg mb-6">
              Unleash Your Ultimate Deck!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-6 py-3 group-hover:bg-yellow-300 transition-colors">
              Shop TCG
            </span>
          </div>
        </Link>
      </section>

      <GlitchBanner />

      <JustArrived products={placeholderProducts} />

      {preference === "sports" ? (
        <>
          {sportsSections}
          {tcgSections}
        </>
      ) : (
        <>
          {tcgSections}
          {sportsSections}
        </>
      )}

      <InstagramSection />

      <section className="bg-gray-900 border-t border-yellow-400 py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-white text-3xl font-bold mb-6">
              Want to shop in person?
            </h2>
            <p className="text-gray-400 mb-2">
              2527 W Kennewick Ave, Kennewick, WA 99336
            </p>
            <div className="mt-4">
              <p className="text-yellow-400 font-bold mb-2">Store Hours</p>
              <p className="text-gray-400 text-sm">
                Monday - Saturday: 11:00 AM - 6:00 PM
              </p>
              <p className="text-gray-400 text-sm">
                Sunday: 12:00 PM - 4:00 PM
              </p>
            </div>
          </div>
          <Link
            href="/shop-info/location"
            className="bg-yellow-400 text-black font-bold px-8 py-4 hover:bg-yellow-300 transition-colors whitespace-nowrap"
          >
            Location and Directions
          </Link>
        </div>
      </section>
    </div>
  );
}
