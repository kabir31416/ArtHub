"use client";

import { useEffect, useState } from "react";
import {
  FaSearch,
  FaMoneyBillWave,
  FaShoppingCart,
  FaCrown,
} from "react-icons/fa";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const filtered = transactions.filter(
      (item) =>
        item?.email
          ?.toLowerCase()
          ?.includes(value) ||
        item?.userEmail
          ?.toLowerCase()
          ?.includes(value) ||
        item?.artistEmail
          ?.toLowerCase()
          ?.includes(value) ||
        item?.type
          ?.toLowerCase()
          ?.includes(value)
    );

    setFilteredTransactions(filtered);
  }, [search, transactions]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/transactions`
      );

      const data = await res.json();

      setTransactions(data);
      setFilteredTransactions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const purchaseRevenue = filteredTransactions
    .filter(item => item.type === "purchase")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const subscriptionRevenue = filteredTransactions
    .filter(item => item.type === "subscription")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalRevenue =
    purchaseRevenue + subscriptionRevenue;

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Transactions
          </h1>

          <p className="text-zinc-400 mt-2">
            View all marketplace transactions.
          </p>
        </div>

        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-11 pr-4 h-12 w-80 rounded-2xl bg-[#111114] border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div className="bg-[#111114] border border-white/10 rounded-3xl p-3">
          <p className="text-zinc-400 text-sm">
            Total Transactions
          </p>

          <h3 className="text-2xl font-bold mt-2">
            {filteredTransactions.length}
          </h3>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-3xl p-3">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-cyan-400 text-xl" />
            <div>
              <p className="text-zinc-400 text-sm">
                Purchase Revenue
              </p>

              <h3 className="text-2xl font-bold mt-2 text-cyan-400">
                ${purchaseRevenue.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-3xl p-3">
          <div className="flex items-center gap-3">
            <FaCrown className="text-violet-400 text-xl" />
            <div>
              <p className="text-zinc-400 text-sm">
                Subscription Revenue
              </p>

              <h3 className="text-2xl font-bold mt-2 text-violet-400">
                ${subscriptionRevenue.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-3xl p-3">
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-green-400 text-xl" />
            <div>
              <p className="text-zinc-400 text-sm">
                Total Revenue
              </p>

              <h3 className="text-2xl font-bold mt-2 text-green-400">
                ${totalRevenue.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111114]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="p-3 text-left">
                Transaction ID
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                User / Buyer
              </th>

              <th className="p-3 text-left">
                Artist
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map(
              (transaction, index) => (
                <tr
                  key={
                    transaction._id || index
                  }
                  className="border-b border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="p-3 font-mono text-sm">
                    {transaction._id.slice(14) ||
                      transaction.id}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border capitalize ${transaction.type ===
                          "subscription"
                          ? "bg-violet-500/10 border-violet-500/20 text-violet-400"
                          : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                        }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td className="p-3">
                    {transaction.type ===
                      "subscription"
                      ? transaction.userEmail
                      : transaction.buyerEmail}
                  </td>

                  <td className="p-3">
                    {transaction.type ===
                      "subscription"
                      ? "N/A"
                      : transaction.artistEmail}
                  </td>

                  <td className="p-3 font-semibold text-green-400">
                    $
                    {Number(
                      transaction.amount || 0
                    ).toFixed(2)}
                  </td>

                  <td className="p-3 text-zinc-400">
                    {new Date(
                      transaction.date ||
                      transaction.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
}