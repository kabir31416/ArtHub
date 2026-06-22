"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaUserCircle, FaCalendarAlt, FaTag } from "react-icons/fa";

export default function ArtworkCard({ art }) {


  return (
    <Link href={`/artworks/${art._id}`}>

      <div className="bg-[#111114] border border-white/5 rounded-3xl overflow-hidden hover:border-violet-500/30 transition group">

        {/* IMAGE */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={art.image}
            alt={art.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />

          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full border ">
            {art.category}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-3">

          <h2 className="text-lg font-semibold text-white">
            {art.title}
          </h2>

          <p className="text-sm text-zinc-400 line-clamp-2">
            {art.description}
          </p>

          {/* PRICE */}
          <div className="flex items-center justify-between">
            <span className="text-violet-400 font-bold text-lg">
              ৳ {art.price}
            </span>

            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <FaCalendarAlt />
              {new Date(art.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* ARTIST */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">

            <div className="flex items-center gap-3">
              <img
                src={art.artistImage}
                className="w-9 h-9 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {art.artistName}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {art.artistEmail}
                </p>
              </div>
            </div>

            <FaUserCircle className="text-zinc-500" />
          </div>

        </div>
      </div>

    </Link>
  );
}