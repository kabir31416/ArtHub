"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import { FaChartLine } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Sales() {
  const { data: session } = useSession();

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sales?artistEmail=${session.user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setSales(data);
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

  // total earnings calculation
  const totalEarnings = sales.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <FaChartLine className="text-2xl text-green-400" />
          <h1 className="text-3xl font-bold">Sales History</h1>
        </div>

        <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-xl border border-green-500/20">
          Total Earnings: ${totalEarnings}
        </div>
      </div>

      {/* Empty state */}
      {sales.length === 0 ? (
        <div className="bg-[#111114] rounded-3xl border border-white/10 p-10 text-center">
          <h3 className="text-xl font-semibold mb-2">
            No Sales Yet
          </h3>

          <p className="text-zinc-500">
            Your artwork sales will appear here once buyers purchase your work.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111114]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400">
                <th className="p-2 text-left">Artwork</th>
                <th className="p-2 text-left">Buyer</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b border-white/5 hover:bg-white/2"
                    >
                      {/* Artwork */}
                      <td className="p-2">
                        <div className="flex items-center gap-4">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="w-14 h-14 rounded-xl object-cover"
                          />

                          <div>
                            <Link href={`/artworks/${item.artworkId}`}>
                            <h4 className="font-semibold">
                              {item.title}
                            </h4>
                            </Link>

                            <p className="text-sm text-zinc-500">
                              {item.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Buyer */}
                      <td className="p-2">
                        <div className="font-medium">
                          {item.buyerName || "Anonymous"}
                        </div>
                        <div className="text-sm text-zinc-500">
                          {item.buyerEmail}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-2 font-semibold text-green-400">
                        ${item.price}
                      </td>

                      {/* Date */}
                      <td className="p-2 text-zinc-400">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A"}
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