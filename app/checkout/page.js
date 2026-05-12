"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [squareReady, setSquareReady] = useState(false);
  const cardRef = useRef(null);
  const initialized = useRef(false);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const orderCompleted = useRef(false);

  useEffect(() => {
    if (cart.length === 0 && !orderCompleted.current) {
      router.push("/cart");
    }
  }, [cart]);

  useEffect(() => {
    let cardInstance = null;

    async function initSquare() {
      if (!squareReady || !window.Square || initialized.current) return;
      initialized.current = true;

      const paymentsInstance = window.Square.payments(
        process.env.NEXT_PUBLIC_SQUARE_APP_ID,
        "sandbox",
      );

      cardInstance = await paymentsInstance.card();
      await cardInstance.attach("#card-container");
      setCard(cardInstance);
    }

    initSquare();

    return () => {
      if (cardInstance) {
        cardInstance.destroy();
        initialized.current = false;
      }
    };
  }, [squareReady]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await card.tokenize();

      if (result.status === "OK") {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceId: result.token,
            amount: Math.round(cartTotal * 100),
            cart,
            customer: form,
          }),
        });

        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          orderCompleted.current = true;
          clearCart();
          router.push("/order-confirmation");
        }
      } else {
        setError("Payment failed. Please check your card details.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
        onLoad={() => setSquareReady(true)}
      />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                  CONTACT
                </h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                />
              </div>

              <div>
                <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                  SHIPPING
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                    />
                    <input
                      type="text"
                      name="zip"
                      placeholder="ZIP"
                      value={form.zip}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 text-white text-sm px-4 py-3 border border-gray-700 focus:border-yellow-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
                  PAYMENT
                </h2>
                <div
                  id="card-container"
                  ref={cardRef}
                  className="bg-gray-900 border border-gray-700 p-4 rounded"
                ></div>
              </div>

              {error && (
                <div className="bg-red-900 border border-red-500 text-red-200 text-sm px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !card}
                className="w-full bg-yellow-400 text-black font-bold py-4 hover:bg-yellow-300 transition-colors text-lg disabled:opacity-50"
              >
                {loading ? "Processing..." : `Pay $${cartTotal.toFixed(2)}`}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-yellow-400 text-sm font-bold tracking-widest mb-4">
              ORDER SUMMARY
            </h2>
            <div className="flex flex-col gap-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "contain",
                      }}
                      className="rounded bg-gray-900"
                    />
                  ) : (
                    <div className="bg-gray-800 w-12 h-12 rounded"></div>
                  )}
                  <div className="flex-1">
                    <p className="text-white text-xs font-medium">
                      {item.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-white text-xs font-bold">
                    $
                    {(
                      parseFloat(item.price.replace("$", "")) * item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Total</p>
                <p className="text-white text-xl font-bold">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
