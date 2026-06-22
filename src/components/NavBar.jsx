"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaPalette,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import { useSession, authClient } from "@/app/lib/auth-client";

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
      { title: "Dashboard", href: "/dashboard/user" },
      { title: "Purchases", href: "/dashboard/user/purchases" },
      { title: "Profile", href: "/dashboard/user/profile" },
    ],

    artist: [
      { title: "Dashboard", href: "/dashboard/artist" },
      { title: "My Artworks", href: "/dashboard/artist/artworks" },
      { title: "Add Artwork", href: "/dashboard/artist/add" },
      { title: "Sales", href: "/dashboard/artist/sales" },
      { title: "Profile", href: "/dashboard/artist/profile" },
    ],

    admin: [
      { title: "Dashboard", href: "/dashboard/admin" },
      { title: "Users", href: "/dashboard/admin/users" },
      { title: "Artworks", href: "/dashboard/admin/artworks" },
      { title: "Transactions", href: "/dashboard/admin/transactions" },
      { title: "Analytics", href: "/dashboard/admin/analytics" },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDashboardOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <div className="animate-pulse text-white text-sm">
          Loading session...
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-xl bg-slate-950/70 border-b border-white/10 shadow-xl"
          : "bg-gray-950 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="h-20 flex items-center justify-between gap-5">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center">
              <FaPalette className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                ArtHub
              </h1>

              <p className="text-[10px] uppercase text-zinc-400">
                Marketplace
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">

            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium transition duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.title}

                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute left-0 -bottom-2 h-[2px] w-full bg-orange-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            {isLoggedIn && (
              <div
                className="relative"
                ref={dropdownRef}
              >
                <button
                  onClick={() =>
                    setDashboardOpen(!dashboardOpen)
                  }
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
                >
                  Dashboard

                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      dashboardOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dashboardOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: 10,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="absolute top-12 left-0 w-56 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-2 shadow-2xl"
                    >
                      {dashboardLinks[role]?.map(
                        (link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() =>
                              setDashboardOpen(false)
                            }
                            className="block px-4 py-3 rounded-lg text-sm text-zinc-300 hover:bg-white/5 transition"
                          >
                            {link.title}
                          </Link>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* SEARCH BAR */}
          <div className="hidden xl:flex flex-1 max-w-md">
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

              <input
                type="text"
                placeholder="Search artworks..."
                className="
                  w-full
                  pl-11
                  pr-4
                  py-2.5
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder:text-zinc-500
                  focus:outline-none
                  focus:border-orange-500
                  transition
                "
              />
            </div>
          </div>

          {/* USER AREA */}
          <div className="hidden lg:flex items-center gap-4">

            {isLoggedIn ? (
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {session?.user?.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <p className="text-white text-sm font-medium">
                    {session?.user?.name}
                  </p>

                  <p className="text-xs text-zinc-400 capitalize">
                    {session?.user?.role}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 cursor-pointer rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/sign-in"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-white text-xl"
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
          >
            {mobileOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="lg:hidden bg-slate-900 border-t border-white/10 overflow-hidden"
          >
            <div className="p-5 space-y-3">

              {/* Mobile Search */}
              <div className="relative mb-4">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="text"
                  placeholder="Search artworks..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none"
                />
              </div>

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="block px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 transition"
                >
                  {item.title}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  {dashboardLinks[role]?.map(
                    (link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        className="block px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 transition"
                      >
                        {link.title}
                      </Link>
                    )
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-lg bg-red-500/10 text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="block text-center py-3 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium"
                >
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