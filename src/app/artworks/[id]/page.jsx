"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";
import Image from "next/image";

export default function ArtworkDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks/${id}`
      );
      const data = await res.json();
      setArtwork(data);
    })();
  }, [id]);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  const isOwner = user?.email === artwork.artistEmail;

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="bg-[#0b0b0c] border border-white/5 rounded-xl overflow-hidden">
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={500}
              height={300}
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* RIGHT - DETAILS */}
          <div className="flex flex-col">

            {/* TITLE */}
            <h1 className="text-2xl font-semibold text-white">
              {artwork.title}
            </h1>

            <p className="text-xs text-zinc-500 mt-1">
              {artwork.category}
            </p>

            {/* PRICE */}
            <div className="mt-6">
              <p className="text-xs text-zinc-500">Price</p>
              <p className="text-3xl font-semibold">
                ৳ {artwork.price}
              </p>
            </div>

            {/* BUY BUTTON */}
            <button
              onClick={() =>
                router.push(`/checkout/${artwork._id}`)
              }
              disabled={isOwner}
              className="mt-6 w-full py-3 rounded-lg bg-white text-black font-medium disabled:opacity-40"
            >
              Buy Now
            </button>

            {/* META */}
            <div className="mt-6 border-t border-white/5 pt-4 space-y-3">

              <div className="flex items-center gap-3">
                <img
                  src={artwork.artistImage || "https://i.pravatar.cc/100"}
                  className="w-8 h-8 rounded-full"
                />

                <Link
                  href={`/artist/${artwork.artistEmail}`}
                  className="text-sm hover:text-white"
                >
                  {artwork.artistName}
                </Link>
              </div>

              <p className="text-xs text-zinc-500">
                Uploaded:{" "}
                {new Date(artwork.createdAt).toLocaleDateString()}
              </p>

            </div>

          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 max-w-3xl">

          <h2 className="text-sm text-zinc-400 mb-2">
            Description
          </h2>

          <p className="text-sm text-zinc-300 leading-6">
            {artwork.description}
          </p>

        </div>

        {/* OWNER ACTIONS */}
        {isOwner && (
          <div className="flex gap-3 mt-8">

            <button
              onClick={() =>
                router.push(`/dashboard/edit-artwork/${artwork._id}`)
              }
              className="px-4 py-2 text-sm bg-yellow-500 text-black rounded-lg"
            >
              Edit
            </button>

            <button className="px-4 py-2 text-sm bg-red-500/10 text-red-400 rounded-lg">
              Delete
            </button>

          </div>
        )}

      </div>
    </div>
  );
}