"use client";

import { useSession } from "@/app/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import ArtworkModal from "@/components/ArtworkModal";

export default function Artworks() {
  const { data: session } = useSession();

  const [artworks, setArtworks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchMyArtworks = async () => {
      try {
        const userEmail = session?.user?.email;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks?email=${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setArtworks(data.artworks || []);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    if (session?.user?.email) {
      fetchMyArtworks();
    }
  }, [session]);

  // DELETE
  const handleDeleteArtwork = async () => {
    if (!selectedArtwork) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks/${selectedArtwork._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        setArtworks((prev) =>
          prev.filter(
            (item) => item._id !== selectedArtwork._id
          )
        );

        toast.success("Artwork deleted successfully");
      } else {
        toast.error("Failed to delete artwork");
      }

      setDeleteModal(false);
      setSelectedArtwork(null);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  // OPEN EDIT
  const handleEdit = (art) => {
    setSelected(art);
    setOpen(true);
  };

  // UPDATE
  const handleUpdate = async (form) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks/edit/${selected._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (data.success) {
        setArtworks((prev) =>
          prev.map((item) =>
            item._id === selected._id ? data.data : item
          )
        );

        setOpen(false);
        setSelected(null);
      } else {
        console.error("Update failed:", data.message);
      }

    } catch (err) {
      console.log("Network or Client Error:", err);
    }
  };

  return (
    <div className="text-white p-3">

      {/* HEADER */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold">My Artworks</h1>
        <p className="text-zinc-400 mt-1">
          Manage your uploaded artworks
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-[#111114] border border-white/5 rounded-2xl overflow-hidden">

        {/* HEADER (desktop only) */}
        <div className="hidden md:grid grid-cols-4 px-6 py-4 border-b border-white/5 text-zinc-400 text-sm">
          <span>Artwork</span>
          <span>Price</span>
          <span>Category</span>
          <span className="text-right">Actions</span>
        </div>

        {/* ROWS */}
        <div className="divide-y divide-white/5">

          {artworks.map((art) => (
            <div
              key={art._id}
              className="p-4 md:p-0 md:grid md:grid-cols-4 md:items-center md:px-6 md:py-4 hover:bg-white/5 transition"
            >

              {/* ART INFO */}
              <div className="flex items-center gap-3 md:gap-3">

                <Image
                  src={art.image}
                  alt={art.title}
                  width={50}
                  height={50}
                  className="rounded-xl object-cover w-12 h-12"
                />

                <div>
                  <p className="font-medium">{art.title}</p>
                  <p className="text-xs text-zinc-500 md:hidden">
                    ৳ {art.price} • {art.category}
                  </p>
                </div>
              </div>

              {/* PRICE (desktop only) */}
              <div className="hidden md:block text-violet-400 font-semibold">
                ৳ {art.price}
              </div>

              {/* CATEGORY (desktop only) */}
              <div className="hidden md:block">
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10">
                  {art.category}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 md:gap-3 mt-3 md:mt-0">

                <Link href={`/artworks/${art._id}`}>
                  <button className="p-2 rounded-lg bg-white/5 cursor-pointer hover:bg-white/10">
                    <FaEye />
                  </button>
                </Link>

                <button
                  onClick={() => handleEdit(art)}
                  className="p-2 rounded-lg bg-blue-500/10 text-blue-400 cursor-pointer hover:bg-blue-500/20"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => {
                    setSelectedArtwork(art);
                    setDeleteModal(true);
                  }}
                  className="p-2 rounded-xl bg-red-500/10 border cursor-pointer border-red-500/20 text-red-400"
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* EDIT MODAL */}
      <ArtworkModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleUpdate}
        initialData={selected}
        categories={["Digital Art", "Illustration", "Photography", "Painting", "NFT Art", "3D Art", "Abstract",]}
      />

      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111114] p-6">

            <h2 className="text-2xl font-bold text-white">
              Delete Artwork
            </h2>

            <p className="mt-3 text-zinc-400">
              Are you sure you want to delete
              <span className="text-white font-semibold">
                {" "}
                {selectedArtwork?.title}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-red-400">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedArtwork(null);
                }}
                className="px-5 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteArtwork}
                className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>


  );


}