"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette, FaSearch, FaBars, FaTimes, FaChevronDown, FaSignOutAlt, FaUser, FaTachometerAlt, FaShoppingBag, FaPaintBrush, FaDollarSign, FaUsers, FaChartLine, FaCreditCard, FaPlusCircle, } from "react-icons/fa";
import { useSession, authClient } from "@/app/lib/auth-client";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session, isLoading } = useSession();

  const role = session?.user?.role || "user";
  const isLoggedIn = Boolean(session?.user?.id);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Browse Artworks", href: "/artworks" },
  ];

  const dashboardLinks = {
    user: [
      {
        title: "Dashboard",
        href: "/dashboard/user",
        icon: <FaTachometerAlt />,
      },
      {
        title: "Purchases",
        href: "/dashboard/user/purchases",
        icon: <FaShoppingBag />,
      },
      {
        title: "Profile",
        href: "/dashboard/user/profile",
        icon: <FaUser />,
      },
    ],

    artist: [
      {
        title: "Dashboard",
        href: "/dashboard/artist",
        icon: <FaTachometerAlt />,
      },
      {
        title: "My Artworks",
        href: "/dashboard/artist/artworks",
        icon: <FaPaintBrush />,
      },
      {
        title: "Add Artwork",
        href: "/dashboard/artist/add",
        icon: <FaPlusCircle />,
      },
      {
        title: "Sales",
        href: "/dashboard/artist/sales",
        icon: <FaDollarSign />,
      },
      {
        title: "Profile",
        href: "/dashboard/artist/profile",
        icon: <FaUser />,
      },
    ],

    admin: [
      {
        title: "Dashboard",
        href: "/dashboard/admin",
        icon: <FaTachometerAlt />,
      },
      {
        title: "Users",
        href: "/dashboard/admin/users",
        icon: <FaUsers />,
      },
      {
        title: "Artworks",
        href: "/dashboard/admin/artworks",
        icon: <FaPaintBrush />,
      },
      {
        title: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: <FaCreditCard />,
      },

    ],
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDashboardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (isLoading) {
    return (
      <nav className="h-20 bg-gray-950 border-b border-white/10 flex items-center px-5">
        <div className="animate-pulse text-white text-sm">Loading session...</div>
      </nav>
    );
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
  isScrolled
    ? "backdrop-blur-xl bg-slate-950/75 border-b border-orange-500/10 shadow-xl"
    : "bg-gradient-to-r from-slate-950 via-zinc-900 to-slate-950 border-b border-white/5"
}`}>

      <div className="max-w-7xl mx-auto px-5">
        <div className="h-20 flex items-center justify-between gap-5">


          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center">
              <FaPalette className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ArtHub</h1>
              <p className="text-[10px] uppercase text-zinc-400">Marketplace</p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`relative text-sm font-medium transition duration-300 ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                  {item.title}
                  {isActive && <motion.div layoutId="navbar-indicator" className="absolute left-0 -bottom-2 h-[2px] w-full bg-orange-500 rounded-full" />}
                </Link>
              );
            })}

          </div>

          {/* SEARCH BAR */}
          <div className="hidden xl:flex flex-1 max-w-md">
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="text" placeholder="Search artworks..." className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 transition" />
            </div>
          </div>

          {/* USER AREA */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDashboardOpen(!dashboardOpen)}
                    className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-orange-500/40 hover:bg-white/[0.06] transition"
                  >
                    <div className="relative">
                      <Image
                        src={session?.user?.image || "https://i.pravatar.cc/150"}
                        alt={session?.user?.name || "User"}
                        width={42}
                        height={42}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-amber-500"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#111]" />
                    </div>

                    <div className="text-left">
                      <p className="text-sm font-semibold text-white leading-none">{session?.user?.name.slice(" ")}</p>
                    </div>

                    <FaChevronDown className={`text-zinc-400 transition ${dashboardOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {dashboardOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-16 w-80 rounded-3xl overflow-hidden bg-[#111111]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                      >
                        <div className="p-5 border-b border-white/10">
                          <div className="flex items-center gap-4">
                            <Image
                              src={session?.user?.image || "https://i.pravatar.cc/150"}
                              alt={session?.user?.name || "User"}
                              width={60}
                              height={60}
                              className="rounded-full object-cover ring-2 ring-orange-500/40"
                            />

                            <div>
                              <h4 className="font-semibold text-white">{session?.user?.name}</h4>
                              <p className="text-xs text-zinc-400 mt-1">{session?.user?.email}</p>
                              <span className="inline-flex mt-2 px-2 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs capitalize">
                                {session?.user?.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          {dashboardLinks[role]?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setDashboardOpen(false)}
                              className="flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-300 hover:bg-orange-500/10 hover:text-white transition"
                            >
                              <span className="text-orange-400 text-lg">{item.icon}</span>
                              <span>{item.title}</span>
                            </Link>
                          ))}
                        </div>

                        <div className="border-t border-white/10 p-2">
                          <button
                            onClick={handleLogout}
                            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
                          >
                            <FaSignOutAlt />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


              </>
            ) : (
              <Link
                href="/auth/sign-in"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium hover:scale-105 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button className="lg:hidden text-white text-xl" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-slate-900 border-t border-white/10 overflow-hidden">
            <div className="p-5 space-y-3">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input type="text" placeholder="Search artworks..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none" />
              </div>
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 transition">
                  {item.title}
                </Link>
              ))}
              {isLoggedIn ? (
                <>
                  {dashboardLinks[role]?.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 transition">
                      {link.title}
                    </Link>
                  ))}
                  <button onClick={handleLogout} className="w-full py-3 rounded-lg bg-red-500/10 text-red-400">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth/sign-in" className="block text-center py-3 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;