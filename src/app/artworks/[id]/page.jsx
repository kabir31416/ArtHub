"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useSession } from "@/app/lib/auth-client";

import {
  FaHeart,
  FaShareAlt,
  FaShoppingCart,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import ArtworkModal from "@/components/ArtworkModal";
import CommentsSection from "./CommentSection";

export default function ArtworkDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks/${id}`
        );

        const data = await res.json();
        setArtwork(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadArtwork();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-zinc-500 animate-pulse">
          Loading artwork...
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <p className="text-red-400">Artwork not found.</p>
      </div>
    );
  }

  const isOwner = user?.email === artwork.artistEmail;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: artwork.title,
          text: artwork.description,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const handleEdit = (art) => {
    setSelected(art);
    setOpen(true);
  };

  const handleUpdate = async (form) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks/edit/${selected._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        setArtwork(data.data); 
        setOpen(false);
        setSelected(null);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteArtwork = async (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks/${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        router.push("/"); 
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] via-[#090909] to-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={1200}
              height={900}
              priority
              className="w-full h-[650px] object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-4xl font-bold">{artwork.title}</h1>

            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-1 rounded-full bg-orange-500/15 text-orange-400 text-sm">
                {artwork.category}
              </span>

              <span className="px-4 py-1 rounded-full bg-green-500/15 text-green-400 text-sm">
                Available
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-8 p-6 rounded-3xl bg-white/[0.03] border border-white/10">
              <p className="text-zinc-400 text-sm">Artwork Price</p>
              <h2 className="text-5xl font-bold mt-2">৳ {artwork.price}</h2>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => router.push(`/checkout/${artwork._id}`)}
                disabled={isOwner}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-40"
              >
                <FaShoppingCart />
                Buy Now
              </button>

              <button className="w-14 rounded-xl border border-white/10 hover:bg-white/5 transition">
                <FaHeart />
              </button>
            </div>

            <button
              onClick={handleShare}
              className="mt-3 w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition flex items-center justify-center gap-2"
            >
              <FaShareAlt />
              Share Artwork
            </button>

            {/* ARTIST */}
            <div className="mt-8 p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-xs text-zinc-500 mb-4">Artist</p>

              <div className="flex items-center gap-4">
                <Image
                  src={artwork.artistImage || "https://i.pravatar.cc/150"}
                  width={56}
                  height={56}
                  alt={artwork.artistName}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <Link
                    href={`/artist/${artwork.artistEmail}`}
                    className="font-medium hover:text-orange-400 transition"
                  >
                    {artwork.artistName}
                  </Link>

                  <p className="text-sm text-zinc-500">Digital Artist</p>
                </div>
              </div>
            </div>

            {/* DATE */}
            <div className="mt-5 flex items-center gap-3 text-sm text-zinc-400">
              <FaCalendarAlt />
              <span>
                Uploaded on{" "}
                {new Date(artwork.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* OWNER ACTIONS */}
            {isOwner && (
              <div className="flex gap-3 mt-10">
                <button
                  onClick={() => handleEdit(artwork)}
                  className="px-5 py-3 rounded-xl bg-yellow-500 text-black font-medium flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Artwork
                </button>

                <button
                  onClick={() => handleDeleteArtwork(artwork._id)}
                  className="px-5 py-3 rounded-xl bg-red-500/10 text-red-400 font-medium flex items-center gap-2"
                >
                  <FaTrash />
                  Delete Artwork
                </button>
              </div>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-16 max-w-5xl">
          <h2 className="text-2xl font-semibold mb-5">
            About this artwork
          </h2>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <p className="text-zinc-300 leading-8">
              {artwork.description}
            </p>
          </div>

        
          <CommentsSection artId={id} />

        </div>
      </div>

      {/* MODAL */}
      <ArtworkModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleUpdate}
        initialData={selected}
        categories={["Digital Art","Illustration","Photography","Painting","NFT Art","3D Art","Abstract",]}
      />
    </div>
  );
}