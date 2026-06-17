"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Palette,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  // Later connect Firebase/Auth
  const isLoggedIn = true;
  const role = "artist";

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Browse Artworks",
      path: "/artworks",
    },
  ];

  const dashboardRoutes = {
    admin: "/dashboard/admin",
    artist: "/dashboard/artist",
    user: "/dashboard/user",
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-5">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Palette
              size={30}
              className="text-zinc-300"
            />

            <div>

              <h1 className="text-2xl font-bold text-white tracking-wider">
                ArtHub
              </h1>

              <p className="text-[10px] uppercase tracking-[4px] text-zinc-500">
                ART MARKETPLACE
              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-8">

            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`transition duration-300 pb-1

                ${
                  pathname === item.path
                    ? "text-white border-b-2 border-zinc-300"
                    : "text-zinc-400 hover:text-white"
                }

                `}
              >
                {item.name}
              </Link>
            ))}

            {/* Dashboard */}

            {isLoggedIn && (
              <div className="relative">

                <button
                  onClick={() =>
                    setDashboardOpen(!dashboardOpen)
                  }
                  className="flex items-center gap-1 text-zinc-400 hover:text-white"
                >
                  Dashboard

                  <ChevronDown size={16} />
                </button>

                {dashboardOpen && (
                  <div className="absolute top-10 left-0 w-48 bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden">

                    <Link
                      href={dashboardRoutes[role]}
                      className="block px-4 py-3 hover:bg-zinc-800 text-zinc-300"
                    >
                      Go to Dashboard
                    </Link>

                    <Link
                      href="/profile"
                      className="block px-4 py-3 hover:bg-zinc-800 text-zinc-300"
                    >
                      Profile
                    </Link>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* Search */}

          <div className="hidden xl:flex items-center border border-zinc-700 rounded-full px-4 py-2 bg-zinc-900">

            <Search
              size={18}
              className="text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search artwork..."
              className="bg-transparent outline-none px-2 w-56 text-white placeholder:text-zinc-500"
            />

          </div>

          {/* Right */}

          <div className="hidden lg:flex items-center gap-5">

            {isLoggedIn ? (
              <button>

                <User
                  className="text-zinc-300 hover:text-white"
                />

              </button>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 border border-zinc-600 rounded-full text-zinc-300 hover:bg-zinc-800 transition"
              >
                Login
              </Link>
            )}

          </div>

          {/* Mobile */}

          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="lg:hidden bg-black border-t border-zinc-800">

          <div className="px-5 py-5 space-y-5">

            <div className="flex items-center border border-zinc-700 rounded-full px-4 py-2">

              <Search
                size={18}
                className="text-zinc-400"
              />

              <input
                type="text"
                placeholder="Search artwork..."
                className="bg-transparent outline-none px-2 w-full text-white placeholder:text-zinc-500"
              />

            </div>

            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block text-zinc-300 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isLoggedIn && (

              <>
                <Link
                  href={dashboardRoutes[role]}
                  className="block text-zinc-300"
                >
                  Dashboard
                </Link>

                <Link
                  href="/profile"
                  className="block text-zinc-300"
                >
                  Profile
                </Link>

                <button className="text-zinc-300">
                  Logout
                </button>

              </>

            )}

            {!isLoggedIn && (

              <Link
                href="/login"
                className="block text-zinc-300"
              >
                Login
              </Link>

            )}

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;