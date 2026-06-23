"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";

export default function Bought() {
  const { data: session } = useSession();

  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/purchase?email=${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch(console.error);

  }, [session]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Bought Artworks
      </h1>

      {artworks.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          No purchased artworks found
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="group bg-[#111114] rounded-2xl overflow-hidden border border-white/5 hover:border-violet-500/30 transition"
            >
              <div className="overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">
                  {art.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}