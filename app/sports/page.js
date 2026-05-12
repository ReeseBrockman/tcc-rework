"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProducts } from "../hooks/useProducts";
import { pillClass } from "@/components/CategoryPills";
import ProductCard from "@/components/ProductCard";

const bannerSlides = [
  {
    image: "/sports-banner-1.webp",
    mobileImage: "/sports-banner-1-mobile.webp",
    title: "Prizm Season Is Here",
    subtitle: "Grab Your Boxes While They Last!",
    buttonText: "Shop Now",
    buttonHref: "/products/ZBGGWC6UH5AOOUMNUNARC4MQ",
    titleColor: "text-red-800",
    subtitleColor: "text-white font-semibold",
    buttonBg: "bg-red-800 hover:bg-white text-white hover:text-black",
  },
  {
    image: "/sports-banner-2.webp",
    mobileImage: "/sports-banner-2-mobile.webp",
    title: "2026 Topps Baseball Series 1",
    subtitle: "Available Now — Shop Baseball",
    buttonText: "Shop Now",
    buttonHref: "/products/3DAG4PJ3QG742PIFGUF3GRFS",
    titleColor: "text-green-800",
    subtitleColor: "text-black font-semibold",
    buttonBg: "bg-green-800 hover:bg-gray-200 text-white hover:text-black",
  },
];

function BannerCarousel() {
  const [current, setCurrent] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const autoTimer = useRef(null);
  const resumeTimer = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1);

  const slides = [
    bannerSlides[bannerSlides.length - 1],
    ...bannerSlides,
    bannerSlides[0],
  ];
  const goNext = () => {
    setTransitioning(true);
    setDragOffset(0);
    setCurrent((prev) => prev + 1);
  };
  const goPrev = () => {
    setTransitioning(true);
    setDragOffset(0);
    setCurrent((prev) => prev - 1);
  };

  const startAutoPlay = () => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => goNext(), 5000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      clearInterval(autoTimer.current);
      clearTimeout(resumeTimer.current);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => setContainerWidth(node.offsetWidth || 1);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (current === slides.length - 1) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setDragOffset(0);
        setCurrent(1);
      }, 500);
      return () => clearTimeout(timeout);
    }
    if (current === 0) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setDragOffset(0);
        setCurrent(slides.length - 2);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [current]);

  const handleDragStart = (e) => {
    dragStartX.current =
      e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    isDragging.current = true;
    setTransitioning(false);
    clearInterval(autoTimer.current);
    clearTimeout(resumeTimer.current);
  };
  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    setDragOffset(clientX - dragStartX.current);
  };
  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const endX =
      e.type === "mouseup" || e.type === "mouseleave"
        ? e.clientX
        : (e.changedTouches?.[0]?.clientX ?? dragStartX.current);
    const diff = dragStartX.current - endX;
    setTransitioning(true);
    setDragOffset(0);
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    resumeTimer.current = setTimeout(() => startAutoPlay(), 1500);
  };

  const translateX = -(current * 100) + (dragOffset / containerWidth) * 100;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 md:h-96 overflow-hidden bg-gray-900 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div
        className="flex h-full"
        style={{
          transform: `translateX(${translateX}%)`,
          transition: transitioning ? "transform 500ms ease-in-out" : "none",
        }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative h-full flex-shrink-0 w-screen">
            <picture className="absolute inset-0 block">
              <source media="(min-width: 768px)" srcSet={slide.image} />
              <img
                src={slide.mobileImage}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={i === 1 ? "eager" : "lazy"}
                fetchPriority={i === 1 ? "high" : "auto"}
                decoding={i === 1 ? "sync" : "async"}
                draggable={false}
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10"></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-0 md:px-16">
              <h2
                className={`hidden md:block text-2xl md:text-4xl font-bold mb-2 ${slide.titleColor}`}
                dangerouslySetInnerHTML={{ __html: slide.title }}
              />
              <p
                className={`hidden md:block text-sm md:text-base -mb-2 mt-4 ${slide.subtitleColor}`}
                dangerouslySetInnerHTML={{ __html: slide.subtitle }}
              />
              <div className="flex justify-center md:block mt-0 md:mt-10">
                <Link
                  href={slide.buttonHref}
                  className={`inline-block font-bold px-6 py-3 rounded-full transition-colors w-fit ${slide.buttonBg}`}
                  draggable={false}
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 text-white bg-black/50 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 text-white bg-black/50 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center transition-colors"
      >
        ›
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setTransitioning(true);
              setCurrent(i + 1);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${(current - 1 + bannerSlides.length) % bannerSlides.length === i ? "bg-yellow-400" : "bg-white/50 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductSlider({ title, category, viewAllHref }) {
  const { products, loading } = useProducts(category);
  const visibleProducts = products.slice(0, 10);

  return (
    <section className="py-8">
      <h2 className="text-white text-xl font-bold mb-4 border-l-4 border-yellow-400 pl-4">
        {title}
      </h2>
      {loading && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[200px] bg-gray-900 border border-gray-800 p-4 rounded animate-pulse"
            >
              <div className="bg-gray-800 h-40 mb-3 rounded"></div>
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
        <div className="flex gap-4 overflow-x-auto pb-4">
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

function PillIcon({ icon, label }) {
  if (!icon) return null;
  return (
    <span
      className="inline-block h-4 w-4 flex-shrink-0"
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

const sports = [
  { label: "All", icon: null },
  { label: "Baseball", icon: "/icons/icon-baseball.svg" },
  { label: "Basketball", icon: "/icons/icon-basketball.svg" },
  { label: "Football", icon: "/icons/icon-football.svg" },
];

function SportsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const [selected, setSelected] = useState(
    urlCategory && sports.some((s) => s.label === urlCategory)
      ? urlCategory
      : "All",
  );

  useEffect(() => {
    if (urlCategory && sports.some((s) => s.label === urlCategory))
      queueMicrotask(() => setSelected(urlCategory));
    else if (!urlCategory) queueMicrotask(() => setSelected("All"));
  }, [urlCategory]);

  const viewAllHref =
    selected === "All"
      ? "/sports"
      : `/sports?category=${encodeURIComponent(selected)}`;

  return (
    <div className="bg-black min-h-screen">
      <BannerCarousel />
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white text-3xl font-bold mb-8">Sports Cards</h1>
          <div className="flex gap-3 mb-10 flex-wrap">
            {sports.map((sport) => (
              <button
                key={sport.label}
                onClick={() => setSelected(sport.label)}
                className={pillClass(selected === sport.label)}
              >
                <span className="flex items-center gap-2">
                  <PillIcon icon={sport.icon} label={sport.label} />
                  {sport.label}
                </span>
              </button>
            ))}
          </div>
          <ProductSlider
            title={selected === "All" ? "Sports Cards" : `${selected} Cards`}
            category={
              selected === "All" ? "Sports Cards" : `${selected} Sports Cards`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title={selected === "All" ? "Sports Boxes" : `${selected} Boxes`}
            category={
              selected === "All" ? "Sports Boxes" : `${selected} Sports Boxes`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title={selected === "All" ? "Sports Slabs" : `${selected} Slabs`}
            category={
              selected === "All" ? "Sports Slabs" : `${selected} Sports Slabs`
            }
            viewAllHref={viewAllHref}
          />
          <ProductSlider
            title="On Sale"
            category={
              selected === "All"
                ? "Sports On Sale"
                : `${selected} Sports On Sale`
            }
            viewAllHref={viewAllHref}
          />
        </div>
      </div>
    </div>
  );
}

export default function SportsPage() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen"></div>}>
      <SportsContent />
    </Suspense>
  );
}
