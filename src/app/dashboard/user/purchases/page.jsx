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
      <div className="flex items-center gap-3 mb-4">
        <FaShoppingBag className="text-2xl text-violet-400" />
        <h1 className="text-3xl font-bold">
          Purchase History
        </h1>
      </div>

      {purchases.length === 0 ? (
        <div className="bg-[#111114] rounded-3xl border border-white/10 p-10 text-center">
          <h3 className="text-xl font-semibold mb-2">
            No Purchases Yet
          </h3>

          <p className="text-zinc-500">
            Your purchased artworks will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111114]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="p-2 text-left">Artwork</th>
                <th className="p-2 text-left">Artist</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {purchases.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="p-2">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">
                          {item.title}
                        </h4>

                        <p className="text-sm text-zinc-500">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-2">
                    {item.artistName}
                  </td>

                  <td className="p-2 font-semibold">
                    ${item.price}
                  </td>

                  <td className="p-2 text-zinc-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}