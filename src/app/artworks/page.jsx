"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ArtworkCard from "@/components/ArtworkCard";

export default function AllArtworks() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const page = searchParams.get("page") || 1;

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const url = new URL(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks`
        );

        if (search) url.searchParams.append("search", search);
        if (category) url.searchParams.append("category", category);
        if (page) url.searchParams.append("page", page);

        const res = await fetch(url.toString());
        const data = await res.json();

        setArtworks(data);
      } catch (err) {
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, category, page]);

  const updateQuery = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-6 bg-[#050505] lg:p-10 text-white">


      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Artworks</h1>
        <p className="text-zinc-400">Discover artworks</p>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">

        <input
          value={search}
          onChange={(e) => updateQuery("search", e.target.value)}
          placeholder="Search artworks..."
          className="px-4 py-2 rounded-lg bg-black border border-white/10"
        />

        <select
          value={category}
          onChange={(e) => updateQuery("category", e.target.value)}
          className="px-4 py-2 rounded-lg bg-black border border-white/10"
        >
          <option value="">All Categories</option>
          <option value="Digital Art">Digital Art</option>
          <option value="Painting">Painting</option>
          <option value="3d">3D</option>
        </select>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : artworks.length === 0 ? (
        <p>No artworks found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {artworks.map((art) => (
            <ArtworkCard key={art._id} art={art} />
          ))}
        </div>
      )}
    </div>
  );
}