'use client';

import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  {
    label: 'Sports',
    href: null,
    sections: [
      {
        title: 'SPORTS CARDS',
        links: [
          { label: 'Baseball Singles', href: '/products/baseball-singles' },
          { label: 'Basketball Singles', href: '/products/basketball-singles' },
          { label: 'Football Singles', href: '/products/football-singles' },
        ],
      },
      {
        title: 'SPORTS BOXES',
        links: [
          { label: 'Baseball Boxes', href: '/products/baseball-boxes' },
          { label: 'Basketball Boxes', href: '/products/basketball-boxes' },
          { label: 'Football Boxes', href: '/products/football-boxes' },
          { label: 'On Sale Sports', href: '/products/on-sale-sports' },
        ],
      },
      {
        title: 'SPORTS SLABS',
        links: [
          { label: 'Baseball Slabs', href: '/products/baseball-slabs' },
          { label: 'Basketball Slabs', href: '/products/basketball-slabs' },
          { label: 'Football Slabs', href: '/products/football-slabs' },
        ],
      },
    ],
  },
  {
    label: 'TCG',
    href: null,
    sections: [
    {
        title: 'TCG SINGLES',
        links: [
        { label: 'Pokemon Singles', href: '/products/pokemon-singles' },
        { label: 'Magic The Gathering Singles', href: '/products/mtg-singles' },
        { label: 'One Piece Singles', href: '/products/onepiece-singles' },
        { label: 'Lorcana Singles', href: '/products/lorcana-singles' },
        ],
    },
    {
        title: 'TCG SEALED',
        links: [
        { label: 'Pokemon Sealed', href: '/products/pokemon-sealed' },
        { label: 'Magic The Gathering Sealed', href: '/products/mtg-sealed' },
        { label: 'One Piece Sealed', href: '/products/onepiece-sealed' },
        { label: 'Lorcana Sealed', href: '/products/lorcana-sealed' },
        { label: 'On Sale TCG', href: '/products/on-sale-tcg' },
        ],
    },
    {
        title: 'TCG SLABS',
        links: [
        { label: 'Pokemon Slabs', href: '/products/pokemon-slabs' },
        { label: 'Magic The Gathering Slabs', href: '/products/mtg-slabs' },
        { label: 'One Piece Slabs', href: '/products/onepiece-slabs' },
        { label: 'Lorcana Slabs', href: '/products/lorcana-slabs' },
        ],
    },
    ],
  },
  {
    label: 'Funko',
    href: '/funko',
    sections: [],
  },
  {
    label: 'Supplies',
    href: null,
    sections: [
      {
        title: 'CARD SUPPLIES',
        links: [
          { label: 'Toploaders', href: '/products/toploaders' },
          { label: 'Card Sleeves', href: '/products/card-sleeves' },
          { label: 'Binders', href: '/products/binders' },
        ],
      },
      {
        title: 'TCG SUPPLIES',
        links: [
          { label: 'Deck Boxes', href: '/products/deck-boxes' },
          { label: 'Dice', href: '/products/dice' },
          { label: 'Playmats', href: '/products/playmats' },
        ],
      },
    ],
  },
  {
    label: 'Merch',
    href: '/merch',
    sections: [],
  },
  {
    label: 'Shop Info',
    href: null,
    sections: [
      {
        title: 'VISIT US',
        links: [
          { label: 'Location & Hours', href: '/shop-info/location' },
          { label: 'Events', href: '/shop-info/events' },
          { label: 'Sell Us Your Cards', href: '/shop-info/sell' },
          { label: 'Grading Submissions', href: '/shop-info/grading' },
        ],
      },
      {
        title: 'MORE INFO',
        links: [
          { label: 'Live Selling & Breaking', href: '/shop-info/live-selling' },
          { label: 'Collectors Corner Gift Card', href: '/shop-info/gift-card' },
          { label: 'FAQ', href: '/shop-info/faq' },
        ],
      },
    ],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="bg-black text-white w-full">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="text-yellow-400 font-bold text-xl tracking-wide">
          The Collectors Corner
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.sections.length > 0 && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.sections.length > 0 ? (
                <button className="text-white hover:text-yellow-400 transition-colors text-sm font-medium">
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="text-white hover:text-yellow-400 transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              )}

              {openDropdown === item.label && item.sections.length > 0 && (
                <div className="absolute top-full left-0 bg-black border border-yellow-400 p-4 flex gap-8 z-50 min-w-max">
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

          {/* Icons */}
          <button className="text-white hover:text-yellow-400 transition-colors">🔍</button>
          <Link href="/login" className="text-white hover:text-yellow-400 text-sm font-medium transition-colors">
            Login
          </Link>
          <Link href="/cart" className="text-white hover:text-yellow-400 transition-colors">🛒</Link>
        </div>
      </div>
    </nav>
  );
}