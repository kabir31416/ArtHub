"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ArtworkCard from "@/components/ArtworkCard";

export default function AllArtworks() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    fetchArtworks();
  }, [search, category, sort, minPrice, maxPrice, page]);

  const fetchArtworks = async () => {
    try {
      setLoading(true);

      const url = new URL(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks`
      );

      if (search) url.searchParams.append("search", search);
      if (category) url.searchParams.append("category", category);
      if (sort) url.searchParams.append("sort", sort);
      if (minPrice) url.searchParams.append("minPrice", minPrice);
      if (maxPrice) url.searchParams.append("maxPrice", maxPrice);

      url.searchParams.append("page", page);
      url.searchParams.append("limit", "8");

      const res = await fetch(url.toString());

      console.log("Status:", res.status);
      console.log("OK:", res.ok);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || `Request failed with status ${res.status}`
        );
      }

      setArtworks(data.artworks || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setArtworks([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-10 bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950 text-white">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 blur-[140px] rounded-full" />

        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/20 blur-[160px] rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      </div>

      {/* Header */}
      <div className="text-center mb-12">

        <span className="inline-block px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm mb-4">
          Creative Marketplace
        </span>

        <h1 className="text-5xl md:text-6xl font-black">

          Explore{" "}
          <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-purple-500 bg-clip-text text-transparent">
            Artworks
          </span>

        </h1>

        <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
          Discover stunning digital creations, paintings,
          concept art and collectible masterpieces from talented artists.
        </p>

      </div>

      {/* Filters */}
      <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_0_50px_rgba(0,0,0,0.4)]">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search title or artist..."
            value={search}
            onChange={(e) => updateQuery("search", e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/40 backdrop-blur border border-white/10 focus:border-orange-500 focus:outline-none transition "
          />

          <select
            value={category}
            onChange={(e) => updateQuery("category", e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/40 backdrop-blur border border-white/10 focus:border-orange-500 focus:outline-none transition "
          >
            <option value="">All Categories</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Painting">Painting</option>
            <option value="Photography">Photography</option>
            <option value="NFT Art">NFT Art</option>
            <option value="Illustration">Illustration</option>
            <option value="3D Art">3D Art</option>
            <option value="Abstract">Abstract</option>
          </select>

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => updateQuery("minPrice", e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/40 backdrop-blur border border-white/10 focus:border-orange-500 focus:outline-none transition "
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => updateQuery("maxPrice", e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/40 backdrop-blur border border-white/10 focus:border-orange-500 focus:outline-none transition "
          />

          <select
            value={sort}
            onChange={(e) => updateQuery("sort", e.target.value)}
            className="px-4 py-3 rounded-xl bg-black/40 backdrop-blur border border-white/10 focus:border-orange-500 focus:outline-none transition "
          >
            <option value="">Sort By</option>
            <option value="newest">Newest</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center py-32">
          <span className="loading loading-spinner loading-lg text-orange-500" />
          <p className="mt-4 text-zinc-400">
            Loading masterpieces...
          </p>
        </div>
      ) : artworks.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No artworks found
          </h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artworks.map((art) => (
              <ArtworkCard
                key={art._id}
                art={art}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-10 flex-wrap">
            <button
              disabled={Number(page) === 1}
              onClick={() =>
                updateQuery("page", Number(page) - 1)
              }
              className="px-4 py-2 rounded-lg bg-zinc-800 disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  updateQuery("page", index + 1)
                }
                className={`px-4 py-2 rounded-lg ${Number(page) === index + 1
                  ? "bg-purple-600"
                  : "bg-zinc-800"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={Number(page) === totalPages}
              onClick={() =>
                updateQuery("page", Number(page) + 1)
              }
              className="px-4 py-2 rounded-lg bg-zinc-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}