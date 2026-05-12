"use client";

import { useState, useRef, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, ShoppingCart } from "lucide-react";

const navItems = [
  {
    label: "SPORTS",
    href: "/sports",
    sections: [
      {
        title: "SPORTS CARDS",
        links: [
          { label: "Baseball Singles", href: "/sports?category=Baseball" },
          { label: "Basketball Singles", href: "/sports?category=Basketball" },
          { label: "Football Singles", href: "/sports?category=Football" },
        ],
      },
      {
        title: "SPORTS BOXES",
        links: [
          { label: "Baseball Boxes", href: "/sports?category=Baseball" },
          { label: "Basketball Boxes", href: "/sports?category=Basketball" },
          { label: "Football Boxes", href: "/sports?category=Football" },
          { label: "On Sale Sports", href: "/sports?category=On Sale" },
        ],
      },
      {
        title: "SPORTS SLABS",
        links: [
          { label: "Baseball Slabs", href: "/sports?category=Baseball" },
          { label: "Basketball Slabs", href: "/sports?category=Basketball" },
          { label: "Football Slabs", href: "/sports?category=Football" },
        ],
      },
    ],
  },
  {
    label: "TCG",
    href: "/tcg",
    sections: [
      {
        title: "TCG SINGLES",
        links: [
          { label: "Pokemon Singles", href: "/tcg?category=Pokemon" },
          {
            label: "Magic The Gathering Singles",
            href: "/tcg?category=Magic The Gathering",
          },
          { label: "One Piece Singles", href: "/tcg?category=One Piece" },
          { label: "Lorcana Singles", href: "/tcg?category=Lorcana" },
        ],
      },
      {
        title: "TCG SEALED",
        links: [
          { label: "Pokemon Sealed", href: "/tcg?category=Pokemon" },
          {
            label: "Magic The Gathering Sealed",
            href: "/tcg?category=Magic The Gathering",
          },
          { label: "One Piece Sealed", href: "/tcg?category=One Piece" },
          { label: "Lorcana Sealed", href: "/tcg?category=Lorcana" },
          { label: "On Sale TCG", href: "/tcg?category=On Sale" },
        ],
      },
      {
        title: "TCG SLABS",
        links: [
          { label: "Pokemon Slabs", href: "/tcg?category=Pokemon" },
          {
            label: "Magic The Gathering Slabs",
            href: "/tcg?category=Magic The Gathering",
          },
          { label: "One Piece Slabs", href: "/tcg?category=One Piece" },
          { label: "Lorcana Slabs", href: "/tcg?category=Lorcana" },
        ],
      },
    ],
  },
  {
    label: "FUNKO",
    href: "/funko",
    sections: [],
  },
  {
    label: "SUPPLIES",
    href: "/supplies",
    sections: [
      {
        title: "CARD SUPPLIES",
        links: [
          { label: "Toploaders", href: "/supplies?category=Toploaders" },
          { label: "Card Sleeves", href: "/supplies?category=Card Sleeves" },
          { label: "Binders", href: "/supplies?category=Binders" },
        ],
      },
      {
        title: "TCG SUPPLIES",
        links: [
          { label: "Deck Boxes", href: "/supplies?category=Deck Boxes" },
          { label: "Dice", href: "/supplies?category=Dice" },
          { label: "Playmats", href: "/supplies?category=Playmats" },
        ],
      },
    ],
  },
  {
    label: "MERCH",
    href: "/merch",
    sections: [],
  },
  {
    label: "SHOP INFO",
    href: null,
    sections: [
      {
        title: "VISIT US",
        links: [
          { label: "Location & Hours", href: "/shop-info/location" },
          { label: "Events", href: "/shop-info/events" },
          { label: "Sell Us Your Cards", href: "/shop-info/sell" },
          { label: "Grading Submissions", href: "/shop-info/grading" },
        ],
      },
      {
        title: "MORE INFO",
        links: [
          { label: "Live Selling & Breaking", href: "/shop-info/live-selling" },
          {
            label: "Collectors Corner Gift Card",
            href: "/shop-info/gift-card",
          },
          { label: "FAQ", href: "/shop-info/faq" },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState(null);
  const { cartCount } = useCart();
  const searchRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  };

  return (
    <>
      <nav className="bg-black text-white w-full relative z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Hamburger - mobile only */}
          <button
            className="md:hidden text-white hover:text-yellow-400 transition-colors p-2 border border-gray-700 rounded"
            onClick={() => setMobileMenuOpen(true)}
          >
            <div className="flex flex-col gap-1">
              <span className="block w-5 h-0.5 bg-current"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
              <span className="block w-5 h-0.5 bg-current"></span>
            </div>
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <img
              src="/logo.svg"
              alt="The Collectors Corner"
              fetchPriority="high"
              decoding="async"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop: Nav links */}
          <div className="hidden md:flex items-center gap-6 flex-1 ml-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.sections.length > 0 && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-white hover:text-yellow-400 transition-colors text-sm font-bold tracking-wide"
                  >
                    {item.label}
                    {item.sections.length > 0 && (
                      <span className="text-xs">▾</span>
                    )}
                  </Link>
                ) : (
                  <button className="flex items-center gap-1 text-white hover:text-yellow-400 transition-colors text-sm font-bold tracking-wide">
                    {item.label}
                    {item.sections.length > 0 && (
                      <span className="text-xs">▾</span>
                    )}
                  </button>
                )}

                {openDropdown === item.label && item.sections.length > 0 && (
                  <div className="absolute top-full left-0 bg-black border border-yellow-400 p-4 flex gap-8 z-50 min-w-max rounded-xl">
                    {item.sections.map((section) => (
                      <div key={section.title}>
                        <p className="text-yellow-400 text-xs font-bold mb-2 tracking-widest">
                          {section.title}
                        </p>
                        <ul className="flex flex-col gap-1">
                          {section.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="text-white hover:text-yellow-400 text-sm transition-colors"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Gift Card Button */}
            <Link
              href="/shop-info/gift-card"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img
                src="/gift-card.svg"
                alt="Gift Card"
                loading="lazy"
                decoding="async"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Right: Search, Account, Cart */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {searchOpen && (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-gray-900 text-white text-sm px-3 py-1 border border-yellow-400 outline-none w-48 rounded-xl"
                    onBlur={() => {
                      if (!searchQuery) setSearchOpen(false);
                    }}
                  />
                </form>
              )}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>

            {user ? (
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("account")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href="/account"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <User size={20} />
                </Link>
                {openDropdown === "account" && (
                  <div className="absolute top-full right-0 bg-black border border-yellow-400 p-4 z-50 min-w-max flex flex-col gap-2">
                    <Link
                      href="/account"
                      className="text-white hover:text-yellow-400 text-sm transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/account/gift-cards"
                      className="text-white hover:text-yellow-400 text-sm transition-colors"
                    >
                      Gift Cards & Credit
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <User size={20} />
              </Link>
            )}

            <Link
              href="/cart"
              className="text-white hover:text-yellow-400 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: Search + Cart */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              href="/cart"
              className="text-white hover:text-yellow-400 transition-colors relative"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden bg-black border-t border-gray-800 px-4 py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-gray-900 text-white text-sm px-3 py-2 border border-yellow-400 outline-none rounded-lg"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black font-bold px-4 py-2 text-sm"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col md:hidden">
          <div className="px-4 py-4">
            <button
              onClick={closeMobileMenu}
              className="text-white border border-gray-700 rounded p-2 hover:text-yellow-400 transition-colors"
            >
              <span className="block text-xl leading-none">✕</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-800">
                {item.sections.length > 0 ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileExpandedItem(
                          mobileExpandedItem === item.label ? null : item.label,
                        )
                      }
                      className="w-full flex items-center justify-between py-5 text-white text-xl font-bold"
                    >
                      {item.label}
                      <span className="text-gray-400 text-lg">
                        {mobileExpandedItem === item.label ? "∧" : "∨"}
                      </span>
                    </button>

                    {mobileExpandedItem === item.label && (
                      <div className="pb-4 pl-4 border-l border-yellow-400 ml-2">
                        {item.href && (
                          <Link
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="block text-yellow-400 text-sm font-bold mb-3 hover:text-yellow-300 transition-colors"
                          >
                            View All {item.label} →
                          </Link>
                        )}
                        {item.sections.map((section) => (
                          <div key={section.title} className="mb-4">
                            <p className="text-yellow-400 text-xs font-bold tracking-widest mb-2">
                              {section.title}
                            </p>
                            <ul className="flex flex-col gap-2">
                              {section.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={closeMobileMenu}
                                    className="text-gray-300 hover:text-yellow-400 text-sm transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-5 text-white text-xl font-bold hover:text-yellow-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Gift Card - mobile */}
            <div className="border-b border-gray-800">
              <Link
                href="/shop-info/gift-card"
                onClick={closeMobileMenu}
                className="block py-5 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/gift-card.svg"
                  alt="Gift Card"
                  loading="lazy"
                  decoding="async"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </div>

          <div className="px-4 py-6 border-t border-gray-800">
            {user ? (
              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors"
              >
                <User size={20} />
                <span className="text-lg font-bold">ACCOUNT</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 text-white hover:text-yellow-400 transition-colors"
              >
                <User size={20} />
                <span className="text-lg font-bold">LOG IN</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
