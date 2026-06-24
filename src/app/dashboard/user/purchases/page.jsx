"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import { FaShoppingBag } from "react-icons/fa";

export default function Purchases() {
  const { data: session } = useSession();

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/purchase?email=${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg">
            <FaShoppingBag className="text-white text-xl" />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Purchase{" "}
              <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                History
              </span>
            </h1>

            <p className="text-zinc-400 mt-1">
              View all purchased artworks and transactions.
            </p>

          </div>

        </div>

      </div>

      {/* EMPTY */}
      {purchases.length === 0 ? (

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-14 text-center">

          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center mb-6">
              <FaShoppingBag className="text-3xl text-orange-400" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              No Purchases Yet
            </h3>

            <p className="text-zinc-500 mt-3">
              Your purchased artworks will appear here.
            </p>

          </div>

        </div>

      ) : (

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10 bg-white/[0.02]">

                  <th className="p-3 text-left text-zinc-400 font-medium">
                    Artwork
                  </th>

                  <th className="p-3 text-left text-zinc-400 font-medium">
                    Artist
                  </th>

                  <th className="p-3 text-left text-zinc-400 font-medium">
                    Price
                  </th>

                  <th className="p-3 text-left text-zinc-400 font-medium">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {purchases.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >

                    <td className="p-3">

                      <div className="flex items-center gap-4">

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-2xl object-cover border border-white/10"
                        />

                        <div>

                          <h4 className="font-semibold text-white">
                            {item.title}
                          </h4>

                          <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs bg-orange-500/10 border border-orange-500/20 text-orange-300">
                            {item._id.slice(15)}
                          </span>

                        </div>

                      </div>

                    </td>

                    <td className="p-3 text-zinc-300">
                      {item.artistName}
                    </td>

                    <td className="p-3">

                      <span className="font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                        ৳ {item.price}
                      </span>

                    </td>

                    <td className="p-3 text-zinc-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}