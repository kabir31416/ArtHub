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
  FaUserCircle,
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

  const isLoggedIn = Boolean(session?.user?.id);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Browse Artworks", href: "/artworks" },
  ];

  const dashboardLinks = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Profile", href: "/profile" },
  ];

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close dropdown outside click
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // loading state
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
          ? "backdrop-blur-md bg-slate-900/70 border-b border-white/10 shadow-lg"
          : "bg-gray-950 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="h-20 flex justify-between items-center">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-linear-to-r from-orange-500 to-purple-600 flex items-center justify-center">
              <FaPalette className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">ArtHub</h1>
              <p className="text-[10px] text-zinc-400 uppercase">
                Marketplace
              </p>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.title}

                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="h-0.5 bg-orange-500 mt-1"
                    />
                  )}
                </Link>
              );
            })}

            {/* DASHBOARD */}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDashboardOpen(!dashboardOpen)}
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  Dashboard
                  <FaChevronDown
                    className={`transition-transform ${
                      dashboardOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dashboardOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-10 left-0 w-52 bg-slate-900 border border-white/10 rounded-xl p-2"
                    >
                      {dashboardLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setDashboardOpen(false)}
                          className="block px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 rounded"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* USER AREA */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-white text-xl" />

                <div className="text-white text-sm">
                  <p>{session?.user?.name}</p>
                  <p className="text-xs text-zinc-400">
                    {session?.user?.role}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-red-400 text-sm ml-3"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/sign-in"
                className="px-5 py-2 text-sm rounded-full bg-linear-to-r from-orange-500 to-purple-600 text-white"
              >
                Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-slate-900 border-t border-white/10 overflow-hidden"
          >
            <div className="p-5 space-y-4">

              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-zinc-300"
                >
                  {item.title}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  {dashboardLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-zinc-300"
                    >
                      {link.title}
                    </Link>
                  ))}

                  <button
                    onClick={handleLogout}
                    className="text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="block text-center bg-orange-500 text-white py-2 rounded-lg"
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