"use client";

import Link from "next/link";
import ArtworkCard from "./ArtworkCard";
import { useEffect, useState } from "react";



export default function FeatureArts() {

    const [arts, setArts] = useState([]);

  useEffect(() => {
    const fetchData= async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/artworks/trending`
        );

        const data = await res.json();
        setArts(data);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, []);


    return (
        <section className="py-10 bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950">

            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold text-white">
                        Feature <span className="text-orange-500">Arts</span>
                    </h2>

                    <p className="text-zinc-400 mt-3">
                        Discover the trending arts in ArtHub
                    </p>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                    {arts.map((art) => (
                        <ArtworkCard key={art._id} art={art} />
                    ))}
                </div>



            </div>

        </section>
    );
}