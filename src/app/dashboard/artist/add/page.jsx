"use client";

import { useSession } from "@/app/lib/auth-client";
import { useState } from "react";
import {
  FaCloudUploadAlt,
  FaPalette,
  FaTag,
  FaMoneyBillWave,
  FaAlignLeft,
  FaImage,
} from "react-icons/fa";



export default function AddArtwork() {
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const imgbbapi = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const categories = [
    "Digital Art",
    "Illustration",
    "Photography",
    "Painting",
    "NFT Art",
    "3D Art",
    "Abstract",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!formData.title.trim()) return "Title required";
    if (!formData.description.trim()) return "Description required";
    if (!formData.category) return "Category required";
    if (!formData.price) return "Price required";
    if (!image) return "Image required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("image", image);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbapi}`,
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();
      const imageUrl = data?.data?.url;

      const payload = {
        ...formData,
        image: imageUrl,
        artistName: session?.user?.name || "Anonymous",
        artistImage: session?.user?.image || "https://i.pravatar.cc/150",
        artistEmail: session?.user?.email || "artist@arthub.com",
      };

      console.log("FINAL DATA:", payload);


      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving artwork:", errorData.message);
      } else {
        const savedArtwork = await response.json();
        console.log("Successfully saved:", savedArtwork);
      }


      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
      });

      setImage(null);
      setPreview("");

      alert("Artwork uploaded successfully");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Artwork</h1>
        <p className="text-zinc-400 mt-1">
          Upload your creation and start selling on Arthub
        </p>
      </div>

      <div className="bg-[#111114] border border-white/5 rounded-3xl p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2 text-zinc-300">
              <FaPalette /> Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#0b0b0c] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
              placeholder="Artwork title"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2 text-zinc-300">
              <FaAlignLeft /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full bg-[#0b0b0c] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
              placeholder="Describe your artwork"
            />
          </div>

          {/* CATEGORY + PRICE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="flex items-center gap-2 text-sm mb-2 text-zinc-300">
                <FaTag /> Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#0b0b0c] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm mb-2 text-zinc-300">
                <FaMoneyBillWave /> Price
              </label>

              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-[#0b0b0c] border border-white/5 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-3 text-zinc-300">
              <FaImage /> Upload Image
            </label>

            <label className="block cursor-pointer">
              <div className="border border-dashed border-white/10 rounded-3xl p-10 text-center bg-[#0b0b0c] hover:border-violet-500 transition">
                <FaCloudUploadAlt className="text-violet-500 text-4xl mx-auto mb-3" />
                <p className="text-zinc-300">Click to upload image</p>
                <p className="text-zinc-500 text-sm mt-1">
                  PNG, JPG, WEBP
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </label>

            {preview && (
              <img
                src={preview}
                className="mt-4 w-full h-72 object-cover rounded-2xl border border-white/5"
              />
            )}
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Upload Artwork"}
          </button>

        </form>
        
      </div>
    </div>
  );
}