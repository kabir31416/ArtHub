"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 
  const dropdownRef = useRef(null);

  const isLoggedIn = true;

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Browse Artworks", href: "/artworks" },
  ];

  const dashboardLinks = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Profile", href: "/profile" },
  ];


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true); 
      } else {
        setIsScrolled(false); 
      }
    };

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
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-linear-to-r from-orange-500 to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
              <FaPalette className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide bg-clip-text group-hover:text-transparent bg-linear-to-r group-hover:from-orange-400 group-hover:to-purple-400 transition-all duration-300">
                ArtHub
              </h1>
              <p className="text-[10px] tracking-widest uppercase text-zinc-400">
                Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-sm font-medium transition duration-300 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.title}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-orange-500 to-purple-600"
                    />
                  )}
                </Link>
              );
            })}

            {/* Dashboard Dropdown */}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDashboardOpen(!dashboardOpen)}
                  className={`flex items-center gap-2 text-sm font-medium transition duration-300 ${
                    dashboardOpen ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Dashboard
                  <FaChevronDown size={10} className={`transition-transform duration-300 ${dashboardOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dashboardOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-12 left-0 w-52 rounded-xl overflow-hidden bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl p-1"
                    >
                      {dashboardLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setDashboardOpen(false)}
                          className="block px-4 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition"
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

          {/* Search Bar */}
          <div className="hidden xl:flex">
            <div className="flex items-center bg-white/5 focus-within:bg-white/10 focus-within:ring-2 focus-within:ring-purple-500/50 backdrop-blur-lg border border-white/10 rounded-full px-4 py-2 transition-all duration-300">
              <FaSearch className="text-zinc-400 text-sm" />
              <input
                type="text"
                placeholder="Search artwork, artists..."
                className="bg-transparent outline-none px-3 w-56 focus:w-64 transition-all duration-300 text-sm text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* User Profile / Login */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn ? (
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group">
                <FaUserCircle className="text-xl text-zinc-300 group-hover:text-orange-400 transition duration-300" />
              </button>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 text-sm rounded-full bg-linear-to-r from-orange-500 to-purple-600 text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-300 shadow-md shadow-orange-500/20"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-xl p-2 hover:bg-white/5 rounded-lg transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-5 py-6 space-y-5">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2.5">
                <FaSearch className="text-zinc-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none px-3 w-full text-sm text-white"
                />
              </div>

              <div className="space-y-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-base font-medium ${
                      pathname === item.href ? "text-orange-400" : "text-zinc-300"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}

                {isLoggedIn ? (
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    {dashboardLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                      >
                        {link.title}
                      </Link>
                    ))}
                    <button className="block w-full text-left py-2 text-sm text-red-400 font-medium">
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center bg-linear-to-r from-orange-500 to-purple-600 text-white py-2.5 rounded-xl font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;