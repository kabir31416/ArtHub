"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Paintbrush,
  Users,
  PlusCircle,
  DollarSign,
  User,
  CreditCard,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { authClient, useSession } from "../lib/auth-client";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

  const role = pathname.split("/")[2] || "user";
  const base = `/dashboard/${role}`;

  const iconMap = {
    overview: <LayoutDashboard size={20} />,
    purchases: <ShoppingCart size={20} />,
    bought: <Paintbrush size={20} />,
    profile: <User size={20} />,
    myArtworks: <Paintbrush size={20} />,
    addArtwork: <PlusCircle size={20} />,
    sales: <DollarSign size={20} />,
    users: <Users size={20} />,
    artworks: <Paintbrush size={20} />,
    transactions: <CreditCard size={20} />,
    analytics: <BarChart3 size={20} />,
  };

  const menu = {
    user: [
      { name: "Overview", href: base, icon: "overview" },
      { name: "Purchases", href: `${base}/purchases`, icon: "purchases" },
      { name: "Bought Artworks", href: `${base}/bought`, icon: "bought" },
      { name: "Profile", href: `${base}/profile`, icon: "profile" },
    ],
    artist: [
      { name: "Overview", href: base, icon: "overview" },
      { name: "My Artworks", href: `${base}/artworks`, icon: "myArtworks" },
      { name: "Add Artwork", href: `${base}/add`, icon: "addArtwork" },
      { name: "Sales", href: `${base}/sales`, icon: "sales" },
      { name: "Profile", href: `${base}/profile`, icon: "profile" },
    ],
    admin: [
      { name: "Overview", href: base, icon: "overview" },
      { name: "Users", href: `${base}/users`, icon: "users" },
      { name: "Artworks", href: `${base}/artworks`, icon: "artworks" },
      { name: "Transactions", href: `${base}/transactions`, icon: "transactions" },
      { name: "Analytics", href: `${base}/analytics`, icon: "analytics" },
    ],
  };

  const handleLogout = async () => {
    try {
      await authClient?.signOut?.();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0A0A0B] border-b border-white/5 flex items-center justify-between px-4 z-50">
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>

        <h1 className="font-bold">ArtHub</h1>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-72 h-full lg:h-screen
          bg-[#0A0A0B] border-r border-white/5
          flex flex-col justify-between px-5 py-6
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>

          {/* CLOSE BUTTON (mobile) */}
          <div className="lg:hidden flex justify-end mb-4">
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="mb-4 px-3 text-xl uppercase text-zinc-600">
            Dashboard
          </div>

          <nav className="space-y-2">
            {menu[role]?.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition ${
                    isActive
                      ? "bg-violet-600 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {iconMap[item.icon]}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* USER */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              className="w-10 h-10 rounded-xl"
            />

            <div>
              <h4 className="text-sm font-semibold">
                {session?.user?.name}
              </h4>
              <p className="text-xs text-zinc-400">
                {session?.user?.role}
              </p>
            </div>
          </div>

          <button onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 lg:ml-0 ml-0 pt-14 lg:pt-0 overflow-y-auto">
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>

    </div>
  );
}