"use client";

import { useEffect, useState } from "react";
import { FaTimes, FaTag, FaMoneyBillWave } from "react-icons/fa";

export default function ArtworkModal({
  open,
  onClose,
  onSubmit,
  initialData,
  categories = [],
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        price: initialData.price || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4 overflow-y-auto">

      <div className="w-full max-w-2xl bg-[#0b0b0c] border border-white/10 rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          Edit Artwork
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Artwork title"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            placeholder="Description"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-violet-500"
          />

          {/* CATEGORY + PRICE */}
          <div className="grid grid-cols-2 gap-3">

            <div className="relative">
              <FaTag className="absolute left-3 top-3 text-gray-800" />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 py-3 outline-none focus:border-violet-500"
              >
                <option value="">Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <FaMoneyBillWave className="absolute left-3 top-3 text-zinc-500" />

              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 py-3 outline-none focus:border-violet-500"
              />
            </div>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold hover:opacity-90 transition"
          >
            {initialData ? "Update Artwork" : "Upload Artwork"}
          </button>

        </form>
      </div>
    </div>
  );
}