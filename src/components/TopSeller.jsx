"use client";


import ArtworkCard from "./ArtworkCard";


export default function TopSeller() {




    return (
        <section className="py-12 bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white">
                        Top Seller <span className="text-orange-500">Artists</span>
                    </h2>

                    <p className="text-zinc-400 mt-3">
                        Meet the most successful creators on ArtHub
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {[
                        {
                            id: 1,
                            name: "Sophia Carter",
                            username: "@sophiacreates",
                            sales: "1.2K",
                            artworks: "325",
                            image:
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
                        },
                        {
                            id: 2,
                            name: "James Wilson",
                            username: "@jamesart",
                            sales: "980",
                            artworks: "241",
                            image:
                                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
                        },
                        {
                            id: 3,
                            name: "Emma Thompson",
                            username: "@emma.design",
                            sales: "875",
                            artworks: "198",
                            image:
                                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
                        },
                        {
                            id: 4,
                            name: "Michael Brown",
                            username: "@michaelarts",
                            sales: "760",
                            artworks: "173",
                            image:
                                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
                        },
                    ].map((artist, index) => (
                        <div
                            key={artist.id}
                            className="group relative bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2"
                        >
                            {/* Rank Badge */}
                            <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                #{index + 1}
                            </div>

                            {/* Cover */}
                            <div className="h-28 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600"></div>

                            {/* Profile */}
                            <div className="flex justify-center -mt-14">
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-28 h-28 rounded-full object-cover border-4 border-zinc-900"
                                />
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-white">
                                    {artist.name}
                                </h3>

                                <p className="text-zinc-400 text-sm">
                                    {artist.username}
                                </p>

                                <div className="flex justify-center gap-8 mt-5">
                                    <div>
                                        <p className="text-orange-500 font-bold">
                                            {artist.sales}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            Sales
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-white font-bold">
                                            {artist.artworks}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            Artworks
                                        </p>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium transition">
                                    Follow Artist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}