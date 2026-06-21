"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const role = pathname.split("/")[2];

  const base = `/dashboard/${role}`;

  const menu = {
    user: [
      { name: "Overview", href: base },
      { name: "Purchases", href: `${base}/purchases` },
      { name: "Bought Artworks", href: `${base}/bought` },
      { name: "Profile", href: `${base}/profile` },
    ],
    artist: [
      { name: "Overview", href: base },
      { name: "My Artworks", href: `${base}/artworks` },
      { name: "Add Artwork", href: `${base}/add` },
      { name: "Sales", href: `${base}/sales` },
      { name: "Profile", href: `${base}/profile` },
    ],
    admin: [
      { name: "Overview", href: base },
      { name: "Users", href: `${base}/users` },
      { name: "Artworks", href: `${base}/artworks` },
      { name: "Transactions", href: `${base}/transactions` },
      { name: "Analytics", href: `${base}/analytics` },
    ],
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-white/10 p-5">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <nav className="space-y-2">
          {menu[role]?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg hover:bg-white/10"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}