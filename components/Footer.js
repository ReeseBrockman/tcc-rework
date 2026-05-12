"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const MAILCHIMP_URL =
  "https://app.us17.list-manage.com/subscribe/post-json?u=ff87c60cfbff25e2df11f8902&id=30c214ae49&f_id=00e22be0f0";

const paymentIcons = [
  { src: "/payments/american_express.svg", alt: "American Express" },
  { src: "/payments/apple_pay.svg", alt: "Apple Pay" },
  { src: "/payments/diners_club.svg", alt: "Diners Club" },
  { src: "/payments/discover.svg", alt: "Discover" },
  { src: "/payments/google_pay.svg", alt: "Google Pay" },
  { src: "/payments/jcb.svg", alt: "JCB" },
  { src: "/payments/maestro.svg", alt: "Maestro" },
  { src: "/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/payments/paypal.svg", alt: "PayPal" },
  { src: "/payments/shopify_pay.svg", alt: "Shop Pay" },
  { src: "/payments/unionpay.svg", alt: "UnionPay" },
  { src: "/payments/visa.svg", alt: "Visa" },
];

function WhatnotIcon() {
  return (
    <svg
      viewBox="0 0 706.76 550.76"
      width="24"
      height="24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M552.96,319.23c-24.98,25.01-62.26,36.83-96.18,32.43-26.09-3.38-49.4-14.35-68.02-32.81l-83.23-82.55,24.55,69c-25.65,32.49-65.73,51.3-106.59,46.61-31.37-3.6-53-15.57-75.08-37.66l-103.8-103.85c-5.48-5.48-10.37-10.05-15.48-15.81C6.12,168.65-3.5,135.37,1.13,100.97,7.99,50.03,47.42,9.93,98.26,1.52c34.66-5.73,73.66,4.83,99.12,29.95l34.26,33.81c.69.69,2.5,1.82,3.37,1.95,1.04.16,3.19-1.01,4.06-1.88l28.11-28.15c18.5-18.52,41.18-32.07,67.77-35.78,37.88-5.28,73.5,5.38,100.94,32.49l32.34,31.95c1.61,1.59,4.59,1.5,6.26-.16l34.23-33.94c25.74-25.53,61.6-34.84,97.43-30.47,24.25,2.96,45.86,14.29,63.76,30.83,26.92,24.9,41.15,64.69,35.46,101.62-3.49,22.65-12.78,45.68-29.38,62.3l-123.02,123.18Z" />
      <path d="M341.87,547.03l-.64-11.92c-.76.17-3.12,1.39-3.64,2.15-5.19,7.59-13.75,11.56-22.5,12.76-20.87,2.85-41.38-7.55-48.72-28.88l-.88-2.55c-.19-.55-1.91-.31-2.94-.19l-.08,28.64-30.43-.1.03-54.53c0-6.78-4.02-14.21-9.82-16.61-6.84-2.83-14.24-2.47-19.74,1.7-5.08,3.85-7.65,10.35-7.69,17.48l-.31,52.01h-31.16s-1-80.27-1-80.27l-29.59,80.03-26.95.16-21.75-56.79-21.63,56.8-26.96.07L.08,449.93l30.62-.5,18.73,57.75,18.78-53.27c.9-2.55,2.4-4.19,5.07-4.69l25.19.5,20.12,57.31,18.84-57.35,25.8-.19-.09-32.27h31.39s.01,40.11.01,40.11c0,1.19.89,3.65,1.36,4.5,10.84-13.89,21.77-16.04,38.53-14.39,17.21,1.69,28.11,16.82,28.28,33.96,2.55-1.57,3.04-4.15,4.14-7.04,5.04-13.13,16.61-23.68,30.87-26.54,6.43-1.29,13.95-.8,20.62-.16,10.24.98,16.4,9.35,22.83,14.67l.77-12.88h47.4s.1-32.26.1-32.26h30.29c.54,9.44.54,19.26.24,28.27-.03.93.69,3.93,1.54,3.94l11.2.18.18,25.4-12.56.75.05,34.27c0,6.07,6.27,9.03,12.21,8.19l.02,28.79c-6.62.02-11.88.22-18.41-.22-11.94-.81-24.27-11.08-24.38-23.57l-.38-43.1c-.01-1.48-1.75-4.58-3.17-4.56l-13.76.16-.11,71.3-30.53.03ZM340.84,498.46c0-12.89-10.46-23.33-23.35-23.33s-23.35,10.45-23.35,23.33,10.46,23.33,23.35,23.33,23.35-10.45,23.35-23.33Z" />
      <path d="M545.88,513.07l-.73,33.93-30.54-.04-.56-56.26c-.05-4.8-3.31-10.65-6.89-13.25-7.74-5.62-19.53-4.55-25.67,2.9-2.96,3.59-5.05,9.96-5.07,14.7l-.18,52-30.65-.18-.02-97.12,30.36-.31.75,14.56c6.58-8.29,13.78-15.34,24.76-16.54,5.5-.6,12.12-.72,17.57.34,11.33,2.21,20.87,10.99,23.6,21.99l3.59,14.49c5.82-19.45,20.37-32.6,40.09-36.31,7.69-1.45,16.89-1.13,24.79-.17,12.41,1.5,21.04,7.85,30.81,15.67l.73-13.6,18.78-.35.28-32.21,30.59-.15.21,32.13,14.08.55-.03,25.55c-6.08,0-9.15.08-14.01.9l.08,32.6c.03,10.66,12.64,9.32,13.56,10.04.53.42.61,1.48.6,2.55l-.25,25.48c-7.87-.09-15.37.77-22.56-.6-12.28-2.34-21.74-12.16-21.91-24.72l-.62-45.44c-3.65-1.04-7.48-1.2-11.11.09.27,3.44,1.99,7.21,2.41,10.37,1.02,7.7,1.43,16.47-.07,23.87-3.76,18.61-17.17,31.83-34.75,37.16-3.02.91-6.37,1.23-9.34,1.95-6.55,1.58-11.73,1.4-18.43.04-3.8-.77-7.87-1.23-11.51-2.53-15.91-5.69-26.67-17.11-32.73-34.07ZM622.68,498.47c0-12.96-10.52-23.47-23.5-23.47s-23.5,10.51-23.5,23.47,10.52,23.47,23.5,23.47,23.5-10.51,23.5-23.47Z" />
    </svg>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=__mailchimpCallback`;

    window.__mailchimpCallback = (data) => {
      if (data.result === "success") {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
      delete window.__mailchimpCallback;
      document.getElementById("mc-jsonp")?.remove();
    };

    const script = document.createElement("script");
    script.id = "mc-jsonp";
    script.src = url;
    document.body.appendChild(script);
  };

  return (
    <div>
      <p className="text-gray-400 text-sm mb-3">
        Get notified about new releases, sales, and special events:
      </p>
      {status === "success" ? (
        <p className="text-yellow-400 text-sm font-bold">
          Thanks for signing up!
        </p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="bg-transparent text-white text-sm px-3 py-2 border border-gray-500 focus:border-yellow-400 outline-none flex-1 rounded-lg"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="!bg-yellow-400 !text-black text-sm font-bold px-4 py-2 hover:!bg-yellow-300 transition-colors rounded-lg disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Sign Up"}
            </button>
          </form>
          {status === "error" && (
            <p className="text-red-400 text-xs mt-2">
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-yellow-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* MOBILE LAYOUT */}
        <div className="md:hidden">
          <h3 className="text-yellow-400 font-bold text-3xl mb-4">
            The Collectors Corner
          </h3>
          <div className="flex items-start gap-2 mb-2">
            <MapPin size={16} className="text-white mt-0.5 flex-shrink-0" />
            <p className="text-sm text-white font-semibold">
              2527 W Kennewick Ave, Kennewick, WA 99336
            </p>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Phone size={16} className="text-white flex-shrink-0" />
            <p className="text-sm text-white font-semibold">(509) 579-0282</p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Mail size={16} className="text-white flex-shrink-0" />
            <p className="text-sm text-white font-semibold">
              hello@thecollectorscorner.com
            </p>
          </div>
          <div className="mb-8">
            <NewsletterForm />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-white font-bold text-base mb-3">
                Collections
              </h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/sports"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Sports Cards & Boxes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tcg"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    TCG Cards & Boxes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/supplies"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Supplies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/merch"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Merch
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop-info/gift-card"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Gift Cards
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-base mb-3">Shop Info</h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/shop-info/location"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Location & Hours
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop-info/events"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop-info/sell"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Sell Us Your Cards
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop-info/grading"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Grading Submissions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop-info/live-selling"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    Live Selling & Breaking
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop-info/faq"
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/thecollectorscorner2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCbaI_j7_bM9abjZlaRUL0cw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
              <a
                href="https://www.whatnot.com/user/collectorscorner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Whatnot"
              >
                <WhatnotIcon />
              </a>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_180px_220px_120px] gap-8 mb-2 items-end">
            <h3 className="text-yellow-400 font-bold text-5xl">
              The Collectors Corner
            </h3>
            <h3 className="text-white font-bold text-base pl-10">
              Collections
            </h3>
            <h3 className="text-white font-bold text-base pl-14">Shop Info</h3>
            <h3 className="text-white font-bold text-base">Follow Us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_180px_220px_120px] gap-8 items-start">
            <div>
              <div className="flex items-start gap-2 mb-2">
                <MapPin size={16} className="text-white mt-0.5 flex-shrink-0" />
                <p className="text-md text-white font-semibold">
                  2527 W Kennewick Ave, Kennewick, WA 99336
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-white flex-shrink-0" />
                <p className="text-md text-white font-semibold">
                  (509) 579-0282
                </p>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Mail size={16} className="text-white flex-shrink-0" />
                <p className="text-md text-white font-semibold">
                  hello@thecollectorscorner.com
                </p>
              </div>
              <NewsletterForm />
            </div>
            <ul className="flex flex-col gap-2 pl-10">
              <li>
                <Link
                  href="/sports"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Sports Cards & Boxes
                </Link>
              </li>
              <li>
                <Link
                  href="/tcg"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  TCG Cards & Boxes
                </Link>
              </li>
              <li>
                <Link
                  href="/supplies"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Supplies
                </Link>
              </li>
              <li>
                <Link
                  href="/merch"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Merch
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-info/gift-card"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Gift Cards
                </Link>
              </li>
            </ul>
            <ul className="flex flex-col gap-2 pl-14">
              <li>
                <Link
                  href="/shop-info/location"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Location & Hours
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-info/events"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-info/sell"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Sell Us Your Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-info/grading"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Grading Submissions
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-info/live-selling"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  Live Selling & Breaking
                </Link>
              </li>
              <li>
                <Link
                  href="/shop-info/faq"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium whitespace-nowrap"
                >
                  FAQ
                </Link>
              </li>
            </ul>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/thecollectorscorner2021/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCbaI_j7_bM9abjZlaRUL0cw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
              <a
                href="https://www.whatnot.com/user/collectorscorner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="Whatnot"
              >
                <WhatnotIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Icons */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 mb-6">
            {paymentIcons.map((icon) => (
              <div
                key={icon.alt}
                className="h-8 flex items-center justify-center"
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-6 w-auto"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-gray-600 text-xs">
              © 2026 The Collectors Corner. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="/policies/refund"
                className="text-gray-600 hover:text-yellow-400 text-xs transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                href="/policies/privacy"
                className="text-gray-600 hover:text-yellow-400 text-xs transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/policies/terms"
                className="text-gray-600 hover:text-yellow-400 text-xs transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

