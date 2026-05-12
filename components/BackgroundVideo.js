"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo({
  src,
  poster,
  eager = false,
  className = "",
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () =>
      setPrefersReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () =>
      mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (eager || shouldLoad || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [eager, prefersReducedMotion, shouldLoad]);

  const canLoadVideo = shouldLoad && !prefersReducedMotion;

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      autoPlay={canLoadVideo}
      loop
      muted
      playsInline
      poster={poster}
      preload={eager ? "metadata" : "none"}
      className={className}
    >
      {canLoadVideo && <source src={src} type="video/mp4" />}
    </video>
  );
}
