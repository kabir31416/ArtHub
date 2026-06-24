"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUserCircle, FaCalendarAlt, FaTag } from "react-icons/fa";

export default function ArtworkCard({ art }) {


  return (
    <Link href={`/artworks/${art._id}`}>

      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/10" />
        <div className="relative w-full h-60 overflow-hidden">
          <Image
            src={art.image}
            alt={art.title}
            fill
            className="object-cover group-hover:scale-110 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10 bg-black/40 backdrop-blur-md">
              {art.category}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative p-5">
          <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
            {art.title}
          </h2>
          <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
            {art.description}
          </p>
          {/* PRICE + DATE */}
          <div className="flex items-center justify-between mb-5">
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent font-extrabold text-xl">
              ৳ {art.price}
            </span>
            <span className="text-xs text-zinc-500 flex items-center gap-2">
              <FaCalendarAlt />
              {new Date(art.createdAt).toLocaleDateString()}
            </span>
          </div>
          {/* ARTIST */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 min-w-0">
              <Image
                src={art.artistImage}
                alt={art.artistName}
                width={100}
                height={100}
                className="w-11 h-11 rounded-2xl object-cover border border-white/10"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {art.artistName}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {art.artistEmail}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FaUserCircle className="text-orange-400 text-lg" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}