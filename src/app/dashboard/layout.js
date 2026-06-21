"use client";



import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { useSession } from "../lib/auth-client";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const { data: session} = useSession();

   const handleLogout = async () => {
      try {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };


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

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <aside className="w-72 h-screen sticky top-0 bg-[#0A0A0B] border-r border-white/5 flex flex-col justify-between px-5 py-6">
        <div>
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
                  className={`group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-900/30"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span>
                    {iconMap[item.icon]}
                  </span>

                  <span className="font-medium">
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="my-4 p-4 rounded-3xl bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 border border-violet-500/10">
            <p className="text-sm font-semibold text-white">
              Upgrade to Pro
            </p>

            <p className="text-xs text-zinc-500 mt-1">
              Sell unlimited artworks and access premium analytics.
            </p>

            <button className="mt-4 w-full py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:opacity-90 transition">
              Upgrade
            </button>
          </div>

          <div className="p-3 my-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="w-11 h-11 rounded-xl object-cover"
              />

              <div>
                <h4 className="text-sm font-semibold text-white">
                  {session?.user?.name}
                </h4>

                <p className="text-xs text-zinc-500 capitalize">
                  {session?.user?.role}
                </p>
              </div>
            </div>

            <button onClick={handleLogout}  className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#050505]">
        <div className="p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}