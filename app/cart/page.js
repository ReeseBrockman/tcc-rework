"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-400 text-sm mb-6">Your cart is empty.</p>
        <Link
          href="/"
          className="bg-yellow-400 text-black font-bold px-8 py-3 hover:bg-yellow-300 rounded-md transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold mb-8">Your Cart</h1>

        <div className="flex flex-col gap-4 mb-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-gray-900 border border-gray-800 p-4 rounded"
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                  className="rounded"
                />
              ) : (
                <div className="bg-gray-800 w-20 h-20 rounded"></div>
              )}

              <div className="flex-1">
                <p className="text-white text-sm font-medium">{item.name}</p>
                <p className="text-yellow-400 text-sm font-bold mt-1">
                  {item.price}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-800 text-white w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="text-white text-sm w-6 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-800 text-white w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  +
                </button>
              </div>

              <p className="text-white text-sm font-bold w-20 text-right">
                $
                {(
                  parseFloat(item.price.replace("$", "")) * item.quantity
                ).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-500 hover:text-red-400 transition-colors text-sm ml-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-400 text-sm">Subtotal</p>
            <p className="text-white text-xl font-bold">
              ${cartTotal.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/checkout"
              className="w-full bg-yellow-400 text-black font-bold py-4 text-center hover:bg-yellow-300 rounded-md transition-colors text-lg"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={clearCart}
              className="w-full border border-gray-700 text-gray-400 font-bold py-3 hover:border-red-400 rounded-md hover:text-red-400 transition-colors text-sm"
            >
              Clear Cart
            </button>
            <Link
              href="/"
              className="w-full text-center text-gray-400 hover:text-yellow-400 text-sm transition-colors font-medium py-2 border border-gray-700 rounded-md hover:border-yellow-400"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
