"use client";

import Link from "next/link";

const categories = [
  {
    title: "Digital Art",
    desc: "Modern AI & digital creations",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=70",
    color: "from-orange-500 to-purple-600",
    link: "/artworks?category=Digital+Art",
  },
  {
    title: "Paintings",
    desc: "Classic hand-painted artworks",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1600&q=70",
    color: "from-purple-600 to-pink-500",
    link: "/artworks?category=Painting",
  },
  {
    title: "Concept Art",
    desc: "Professional captured moments",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=70",
    color: "from-orange-500 to-red-500",
    link: "/artworks?category=Concept+Art",
  },
  {
    title: "Sculpture",
    desc: "3D artistic sculptures & models ",
    image:
      "https://images.unsplash.com/photo-1529154166925-574a0236a4f4?auto=format&fit=crop&w=1600&q=70",
    color: "from-purple-500 to-orange-500",
    link: "/artworks?category=3D+Abstract",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            Explore <span className="text-orange-500">Categories</span>
          </h2>

          <p className="text-zinc-400 mt-3">
            Discover different forms of art from talented creators
          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.link}
              className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-xl"
            >

              {/* Image */}
              <div
                className="h-64 bg-cover bg-center scale-105 group-hover:scale-110 transition duration-500"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-60 group-hover:opacity-80 transition`} />

              {/* Glass content */}
              <div className="absolute bottom-0 p-5 text-white">

                <h3 className="text-xl font-bold">
                  {cat.title}
                </h3>

                <p className="text-sm text-zinc-200 mt-1">
                  {cat.desc}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}