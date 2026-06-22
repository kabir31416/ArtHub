"use client";

import { useSession } from "@/app/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";




export default function Artworks() {

  const { data: session } = useSession();
  const [artworks, setArtworks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyArtworks = async () => {
      try {
        const userEmail = session?.user?.email;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        const artworks = await response.json();
        setArtworks(artworks);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    if (session?.user?.email) {
      fetchMyArtworks();
    }
  }, [session]);


  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Artworks</h1>
        <p className="text-zinc-400 mt-1">
          Manage your uploaded artworks
        </p>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-[#111114] border border-white/5 rounded-3xl overflow-hidden">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-4 px-6 py-4 border-b border-white/5 text-zinc-400 text-sm">
          <span>Artwork</span>
          <span>Price</span>
          <span>Category</span>
          <span className="text-right">Actions</span>
        </div>

        {/* ROWS */}
        {artworks.map((art, i) => (
          <div
            key={i}
            className="grid grid-cols-4 items-center px-6 py-4 hover:bg-white/5 transition"
          >

            {/* ARTWORK INFO */}
            <div className="flex items-center gap-3">
              <Image
                src={art.image}
                alt={art.title}
                width={50}
                height={50}
                className="rounded-xl object-cover"
              />

              <div>
                <p className="font-medium">{art.title}</p>
                <p className="text-xs text-zinc-500">
                  Digital Artwork
                </p>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-violet-400 font-semibold">
              ৳ {art.price}
            </div>

            {/* CATEGORY */}
            <div>
              <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10">
                {art.category}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">

              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <FaEye />
              </button>

              <button className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition">
                <FaEdit />
              </button>

              <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
                <FaTrash />
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}