"use client";

import { Suspense, useEffect, useState } from "react";
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

  const handlePurchase = async () => {
    try {

      const purchaseData = {
        artworkId: artwork._id,
        title: artwork.title,
        image: artwork.image,
        price: artwork.price,
        type: "purchase",
        artistName: artwork.artistName,
        artistEmail: artwork.artistEmail,
        buyerName: session?.user?.name,
        buyerEmail: session?.user?.email,
        buyerImage: session?.user?.image,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Purchase Successful");
      }

    } catch (error) {
      console.log(error);
      alert("Purchase Failed");
    }
  };


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950 text-white relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 py-10">

          <div className="grid lg:grid-cols-2 gap-12">

            {/* IMAGE */}
            <div className="group">

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  width={1200}
                  height={900}
                  priority
                  className="w-full h-[650px] object-cover transition duration-700 group-hover:scale-105"
                />

              </div>

            </div>

            {/* DETAILS */}
            <div className="lg:sticky lg:top-24 h-fit">

              {/* Category */}
              <div className="flex flex-wrap gap-3 mb-4">

                <span className="px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm">
                  {artwork.category}
                </span>

                <span className="px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                  Available
                </span>

              </div>

              <h1 className="text-4xl lg:text-5xl font-black leading-tight">
                {artwork.title}
              </h1>

              {/* PRICE CARD */}
              <div className="mt-8 p-3 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

                <p className="text-zinc-500 text-sm">
                  Artwork Price
                </p>

                <h2 className="text-4xl font-black mt-2 bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                  ৳ {artwork.price}
                </h2>

              </div>

              {/* ACTIONS */}
              <div className="mt-6 flex gap-3">

                <button
                  onClick={handlePurchase}
                  disabled={isOwner}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-purple-600 font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 disabled:opacity-40"
                >
                  <FaShoppingCart />
                  Buy Now
                </button>

              </div>

              <button
                onClick={handleShare}
                className="mt-3 w-full py-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-purple-500/30 transition flex items-center justify-center gap-2"
              >
                <FaShareAlt />
                Share Artwork
              </button>

              {/* ARTIST */}
              <div className="mt-8 p-5 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                  Artist
                </p>

                <div className="flex items-center gap-4">

                  <Image
                    src={artwork.artistImage || "https://i.pravatar.cc/150"}
                    width={60}
                    height={60}
                    alt={artwork.artistName}
                    className="w-15 h-15 rounded-2xl object-cover ring-2 ring-orange-500/20"
                  />

                  <div>

                    <Link
                      href={`/artist/${artwork.artistEmail}`}
                      className="font-semibold hover:text-orange-400 transition"
                    >
                      {artwork.artistName}
                    </Link>

                    <p className="text-sm text-zinc-500">
                      Digital Artist
                    </p>

                  </div>

                </div>

              </div>

              {/* DATE */}
              <div className="mt-5 flex items-center gap-3 text-sm text-zinc-500">
                <FaCalendarAlt />
                {new Date(artwork.createdAt).toLocaleDateString()}
              </div>

              {/* OWNER ACTIONS */}
              {isOwner && (
                <div className="flex gap-3 mt-8">

                  <button
                    onClick={() => handleEdit(artwork)}
                    className="px-5 py-3 rounded-xl bg-yellow-500 text-black font-medium flex items-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteArtwork(artwork._id)}
                    className="px-5 py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>
              )}

            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mt-16">

            <div className="inline-flex items-center gap-2 mb-5">

              <div className="w-2 h-8 rounded-full bg-gradient-to-b from-orange-500 to-purple-600" />

              <h2 className="text-2xl font-bold">
                About this Artwork
              </h2>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">

              <p className="text-zinc-300 leading-8">
                {artwork.description}
              </p>

            </div>

            <div className="mt-12">
              <CommentsSection artId={id} />
            </div>

          </div>

        </div>

        <ArtworkModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleUpdate}
          initialData={selected}
          categories={[
            "Digital Art",
            "Illustration",
            "Photography",
            "Painting",
            "NFT Art",
            "3D Art",
            "Abstract",
          ]}
        />
      </div>
    </Suspense>
  );
}