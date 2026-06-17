"use client";

import Link from "next/link";
import { Palette, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-3xl text-center">

        <div className="flex justify-center mb-6">
          <Palette size={70} className="text-zinc-400" />
        </div>

        <h2 className="text-7xl md:text-9xl font-bold tracking-wider text-zinc-200">
          404
        </h2>

        <h1 className="mt-5 text-4xl font-semibold">
          Artwork Not Found
        </h1>

        <p className="mt-4 text-zinc-400 leading-8">
          The masterpiece you're looking for may have
          been sold, moved to another gallery,
          or simply doesn't exist.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white text-black hover:bg-zinc-300 transition"
          >
            <ArrowLeft size={18} />
            Back Home
          </Link>

          <Link
            href="/artworks"
            className="flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-zinc-700 hover:bg-zinc-900 transition"
          >
            <Search size={18} />
            Browse Gallery
          </Link>

        </div>

      </div>

    </section>
  );
}