"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { useProducts } from "./hooks/useProducts";
import { pillClass } from "@/components/CategoryPills";
import BackgroundVideo from "@/components/BackgroundVideo";
import ProductCard from "@/components/ProductCard";

function ProductSlider({ title, category, viewAllHref }) {
  const { products, loading } = useProducts(category);
  const visibleProducts = products.slice(0, 10);

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
          {title}
        </h2>
      </div>
      {loading && (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[200px] bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
            >
              <div className="bg-gray-800 h-48 mb-3 rounded"></div>
              <div className="bg-gray-800 h-4 rounded mb-2"></div>
              <div className="bg-gray-800 h-4 w-16 rounded"></div>
            </div>
          ))}
        </div>
      )}
      {!loading && products.length === 0 && (
        <p className="text-gray-500 text-sm">No products found.</p>
      )}
      {!loading && products.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="w-48 flex-shrink-0 bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors rounded flex flex-col items-center justify-center gap-3 min-h-[260px] group"
            >
              <span className="text-4xl text-yellow-400 group-hover:scale-110 transition-transform">
                →
              </span>
              <span className="text-white text-sm font-bold text-center px-3">
                View All {title}
              </span>
              <span className="text-yellow-400 text-xs font-bold border border-yellow-400 px-3 py-1 rounded-full group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                View All
              </span>
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

function OnSaleSlider({
  title,
  category,
  viewAllHref,
  backgroundVideo,
  backgroundPoster,
}) {
  const { products, loading } = useProducts(category);
  const visibleProducts = products.slice(0, 10);

  return (
    <section className="relative py-10 overflow-hidden">
      <BackgroundVideo
        src={backgroundVideo}
        poster={backgroundPoster}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="relative z-10 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
            {title}
          </h2>
        </div>
        {loading && (
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="min-w-[200px] bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
              >
                <div className="bg-gray-800 h-48 mb-3 rounded"></div>
                <div className="bg-gray-800 h-4 rounded mb-2"></div>
                <div className="bg-gray-800 h-4 w-16 rounded"></div>
              </div>
            ))}
          </div>
        )}
        {!loading && products.length === 0 && (
          <p className="text-gray-500 text-sm">No products found.</p>
        )}
        {!loading && products.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="w-48 flex-shrink-0 bg-gray-900 border border-gray-800 hover:border-yellow-400 transition-colors rounded flex flex-col items-center justify-center gap-3 min-h-[260px] group"
              >
                <span className="text-4xl text-yellow-400 group-hover:scale-110 transition-transform">
                  →
                </span>
                <span className="text-white text-sm font-bold text-center px-3">
                  View All {title}
                </span>
                <span className="text-yellow-400 text-xs font-bold border border-yellow-400 px-3 py-1 rounded-full group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                  View All
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function JustArrived() {
  const { products, loading } = useProducts();
  const [paused, setPaused] = useState(false);
  if (loading) return null;
  return (
    <section className="py-10 bg-black border-t border-b border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <h2 className="text-white text-2xl font-bold border-l-4 border-yellow-400 pl-4">
          Just Arrived
        </h2>
      </div>
      <div
        className="overflow-hidden hide-scrollbar"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`flex gap-4 px-4 animate-marquee ${paused ? "paused" : ""}`}
          style={{ width: "max-content" }}
        >
          {[...products, ...products, ...products].map((product, i) => (
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
            href="https://www.instagram.com/thecollectorscorner2021/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-yellow-400 bg-black text-yellow-400 font-bold px-6 py-3 hover:bg-yellow-300 hover:text-black transition-colors rounded-full"
          >
            Follow Us
          </a>
        </div>
        <behold-widget feed-id="1xH5TwqzAbDU0aCmjbXh"></behold-widget>
        <Script
          src="https://w.behold.so/widget.js"
          type="module"
          strategy="lazyOnload"
        />
      </div>
    </section>
  );
}

function PillIcon({ icon, label, wide }) {
  if (!icon) return null;
  return (
    <span
      className={`inline-block h-4 flex-shrink-0 ${wide ? "w-10" : "w-4"}`}
      style={{
        maskImage: `url(${icon})`,
        WebkitMaskImage: `url(${icon})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        backgroundColor: "currentColor",
      }}
    />
  );
}

const SPORTS_PILLS = [
  { label: "All", icon: null },
  { label: "Baseball", icon: "/icons/icon-baseball.svg" },
  { label: "Basketball", icon: "/icons/icon-basketball.svg" },
  { label: "Football", icon: "/icons/icon-football.svg" },
];

const TCG_PILLS = [
  { label: "All", icon: null },
  { label: "Pokemon", icon: "/icons/icon-coll-pokemon.svg" },
  { label: "Magic The Gathering", icon: "/icons/icon-coll-mtg.svg" },
  { label: "One Piece", icon: "/icons/icon-coll-onp.svg" },
  { label: "Lorcana", icon: "/icons/icon-coll-disney.svg" },
];

const SPORTS_SLABS_CATEGORY = {
  All: "Sports Slabs",
  Baseball: "Baseball Sports Slabs",
  Basketball: "Basketball Sports Slabs",
  Football: "Football Sports Slabs",
};

const SPORTS_BOXES_CATEGORY = {
  All: "Sports Boxes",
  Baseball: "Baseball Sports Boxes",
  Basketball: "Basketball Sports Boxes",
  Football: "Football Sports Boxes",
};

const TCG_SLABS_CATEGORY = {
  All: "TCG Slabs",
  Pokemon: "Pokemon TCG Slabs",
  "Magic The Gathering": "Magic The Gathering TCG Slabs",
  "One Piece": "One Piece TCG Slabs",
  Lorcana: "Lorcana TCG Slabs",
};

const TCG_SEALED_CATEGORY = {
  All: "TCG Sealed",
  Pokemon: "Pokemon TCG Sealed",
  "Magic The Gathering": "Magic The Gathering TCG Sealed",
  "One Piece": "One Piece TCG Sealed",
  Lorcana: "Lorcana TCG Sealed",
};

function SportsSection() {
  const [selected, setSelected] = useState("All");
  return (
    <div>
      <div className="px-4 max-w-7xl mx-auto pt-10 flex gap-2 flex-wrap">
        {SPORTS_PILLS.map((pill) => (
          <button
            key={pill.label}
            onClick={() => setSelected(pill.label)}
            className={pillClass(selected === pill.label)}
          >
            <span className="flex items-center gap-2">
              <PillIcon icon={pill.icon} label={pill.label} />
              {pill.label}
            </span>
          </button>
        ))}
      </div>
      <ProductSlider
        title={selected === "All" ? "Sports Slabs" : `${selected} Slabs`}
        category={SPORTS_SLABS_CATEGORY[selected]}
        viewAllHref="/sports"
      />
      <ProductSlider
        title={selected === "All" ? "Sports Boxes" : `${selected} Boxes`}
        category={SPORTS_BOXES_CATEGORY[selected]}
        viewAllHref="/sports"
      />
      <OnSaleSlider
        title="Sports On Sale"
        category="Sports On Sale"
        viewAllHref="/sports"
        backgroundVideo="/sports-sale-banner.mp4"
        backgroundPoster="/sports-sale-banner-poster.jpg"
      />
    </div>
  );
}

function TCGSection() {
  const [selected, setSelected] = useState("All");
  return (
    <div>
      <div className="px-4 max-w-7xl mx-auto pt-10 flex gap-2 flex-wrap">
        {TCG_PILLS.map((pill) => (
          <button
            key={pill.label}
            onClick={() => setSelected(pill.label)}
            className={pillClass(selected === pill.label)}
          >
            <span className="flex items-center gap-2">
              <PillIcon icon={pill.icon} label={pill.label} wide />
              {pill.label}
            </span>
          </button>
        ))}
      </div>
      <ProductSlider
        title={selected === "All" ? "TCG Slabs" : `${selected} Slabs`}
        category={TCG_SLABS_CATEGORY[selected]}
        viewAllHref="/tcg"
      />
      <ProductSlider
        title={selected === "All" ? "TCG Sealed" : `${selected} Sealed`}
        category={TCG_SEALED_CATEGORY[selected]}
        viewAllHref="/tcg"
      />
      <OnSaleSlider
        title="TCG On Sale"
        category="TCG On Sale"
        viewAllHref="/tcg"
        backgroundVideo="/tcg-sale-banner.mp4"
        backgroundPoster="/tcg-sale-banner-poster.jpg"
      />
    </div>
  );
}

export default function Home() {
  const [preference, setPreference] = useState("sports");

  useEffect(() => {
    const saved = localStorage.getItem("tcc-preference");
    if (saved) queueMicrotask(() => setPreference(saved));
  }, []);

  const handlePreference = (pref) => {
    localStorage.setItem("tcc-preference", pref);
    setPreference(pref);
  };

  return (
    <div className="bg-black">
      <section className="grid grid-cols-2 gap-4 px-4 py-4">
        <Link
          href="/sports"
          onClick={() => handlePreference("sports")}
          className="relative h-96 flex items-center justify-center overflow-hidden group rounded-lg"
        >
          <BackgroundVideo
            eager
            src="/sports-hero.mp4"
            poster="/sports-hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-1">
              SPORTS
            </h2>
            <p className="text-yellow-400 text-xs md:text-sm font-semibold mb-6">
              Shop Unbeatable Prices!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-6 py-3 text-sm md:text-base group-hover:bg-yellow-300 transition-colors whitespace-nowrap rounded-full">
              Shop Sports →
            </span>
          </div>
        </Link>
        <Link
          href="/tcg"
          onClick={() => handlePreference("tcg")}
          className="relative h-96 flex items-center justify-center overflow-hidden group rounded-lg"
        >
          <BackgroundVideo
            eager
            src="/tcg-hero.mp4"
            poster="/tcg-hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent z-10"></div>
          <div className="relative z-20 text-center p-8">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-1">
              TCG
            </h2>
            <p className="text-yellow-400 text-xs md:text-sm font-semibold mb-6">
              Unleash Ultimate Deck!
            </p>
            <span className="bg-yellow-400 text-black font-bold px-6 py-3 text-sm md:text-base group-hover:bg-yellow-300 transition-colors whitespace-nowrap rounded-full">
              Shop TCG →
            </span>
          </div>
        </Link>
      </section>
      <JustArrived />
      {preference === "sports" ? (
        <>
          <SportsSection />
          <TCGSection />
        </>
      ) : (
        <>
          <TCGSection />
          <SportsSection />
        </>
      )}
      <InstagramSection />
      <section className="relative py-24 px-4 overflow-hidden">
        <Image
          src="/store-banner.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
            Want to shop
            <br />
            in person?
          </h2>
          <p className="text-white text-xl font-semibold mb-4 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
            Visit us at the store!
          </p>
          <div className="mb-8">
            <p className="text-white text-sm font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
              2527 W Kennewick Ave, Kennewick, WA 99336
            </p>
            <p className="text-white text-sm font-bold mt-4 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
              Mon - Sat: 11:00 AM - 6:00 PM
            </p>
            <p className="text-white text-sm font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)]">
              Sunday: 12:00 PM - 4:00 PM
            </p>
          </div>
          <Link
            href="/shop-info/location"
            className="inline-block bg-black text-yellow-400 font-bold px-6 py-4 rounded-xl hover:bg-yellow-400 hover:text-black transition-colors border border-yellow-400 hover:border-black -mt-3"
          >
            Location & Directions
          </Link>
        </div>
      </section>
    </div>
  );
}
