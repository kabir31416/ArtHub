"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaSearch,
  FaTrash,
  FaPalette,
} from "react-icons/fa";

export default function ManageArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] =
    useState(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const filtered = artworks.filter(
      (art) =>
        art?.title
          ?.toLowerCase()
          .includes(value) ||
        art?.artistName
          ?.toLowerCase()
          .includes(value)
    );

    setFilteredArtworks(filtered);
  }, [search, artworks]);

  const fetchArtworks = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/artworks`
      );

      const data = await res.json();

      setArtworks(data);
      setFilteredArtworks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/artworks/${selectedArtwork._id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (result.deletedCount > 0) {
        const remaining = artworks.filter(
          (item) =>
            item._id !== selectedArtwork._id
        );

        setArtworks(remaining);
        setFilteredArtworks(remaining);

        setDeleteModal(false);
        setSelectedArtwork(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold">
              Manage Artworks
            </h1>

            <p className="text-zinc-400 mt-2">
              View and manage all uploaded
              artworks.
            </p>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              placeholder="Search artwork..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-11 pr-4 h-12 w-80 rounded-2xl bg-[#111114] border border-white/10 outline-none"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#111114] border border-white/10 rounded-3xl p-5">
          <div className="flex items-center gap-3">
            <FaPalette className="text-pink-400 text-xl" />

            <span className="text-zinc-400">
              Total Artworks:
            </span>

            <span className="font-bold text-xl">
              {filteredArtworks.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111114]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="p-3 text-left">
                  Artwork
                </th>

                <th className="p-3 text-left">
                  Artist
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                  Price
                </th>

                <th className="p-3 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredArtworks.map((art) => (
                <tr
                  key={art._id}
                  className="border-b border-white/5 hover:bg-white/2"
                >
                  {/* Artwork */}
                  <td className="p-3">
                    <div className="flex items-center gap-4">
                      <Image
                        src={art.image}
                        alt={art.title}
                        width={100}
                        height={100}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">
                          {art.title}
                        </h4>

                        <p className="text-sm text-zinc-500">
                          {art._id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Artist */}
                  <td className="p-3">
                    <div>
                      <h4>
                        {art.artistName}
                      </h4>

                      <p className="text-sm text-zinc-500">
                        {art.artistEmail}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
                      {art.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-3 font-semibold text-green-400">
                    ${art.price}
                  </td>

                  {/* Delete */}
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedArtwork(art);
                        setDeleteModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredArtworks.length === 0 && (
            <div className="text-center py-16 text-zinc-500">
              No artworks found.
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-5">
          <div className="bg-[#111114] border border-white/10 rounded-3xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              Delete Artwork
            </h2>

            <p className="text-zinc-400">
              Are you sure you want to delete
              <span className="text-white font-semibold">
                {" "}
                {selectedArtwork?.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() =>
                  setDeleteModal(false)
                }
                className="px-5 py-2 rounded-xl border border-white/10"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-xl bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}