"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaPalette,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [salesChart, setSalesChart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    Promise.all([
      fetch(`${serverUrl}/api/admin/analytics`).then((res) => {
        if (!res.ok) throw new Error("Analytics fetch failed");
        return res.json();
      }),
      fetch(`${serverUrl}/api/admin/sales-chart`).then((res) => {
        if (!res.ok) throw new Error("Sales chart fetch failed");
        return res.json();
      }),
      fetch(`${serverUrl}/api/admin/category-stats`).then((res) => {
        if (!res.ok) throw new Error("Category stats fetch failed");
        return res.json();
      }),
      fetch(`${serverUrl}/api/admin/transactions`).then((res) => {
        if (!res.ok) throw new Error("Transactions fetch failed");
        return res.json();
      }),
    ])
      .then(([analyticsData, salesData, categoryData, transactionData]) => {
        setAnalytics(analyticsData);
        setSalesChart(salesData);
        setCategories(categoryData);
        setTransactions(transactionData.slice(0, 8));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const COLORS = [
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          Admin Overview
        </h1>

        <p className="text-zinc-400 mt-2">
          Platform analytics, sales insights and recent activity.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div className="bg-[#111114] border border-white/10 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">
                Total Users
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {analytics?.totalUsers || 0}
              </h3>
            </div>

            <FaUsers className="text-violet-400 text-3xl" />
          </div>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">
                Total Artists
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {analytics?.totalArtists || 0}
              </h3>
            </div>

            <FaPalette className="text-pink-400 text-3xl" />
          </div>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">
                Artworks Sold
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {analytics?.totalArtworksSold || 0}
              </h3>
            </div>

            <FaShoppingCart className="text-cyan-400 text-3xl" />
          </div>
        </div>

        <div className="bg-[#111114] border border-white/10 rounded-3xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">
                Revenue
              </p>

              <h3 className="text-4xl font-bold mt-2">
                ${analytics?.totalRevenue || 0}
              </h3>
            </div>

            <FaDollarSign className="text-green-400 text-3xl" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-2 gap-8">
        {/* Sales */}
        <div className="bg-[#111114] border border-white/10 rounded-3xl p-4">
          <h2 className="text-xl font-bold mb-6">
            Monthly Sales Revenue
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart data={salesChart}>
              <XAxis dataKey="_id.month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8B5CF6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category */}
        <div className="bg-[#111114] border border-white/10 rounded-3xl p-4">
          <h2 className="text-xl font-bold mb-6">
            Artworks by Category
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="count"          
                nameKey="categoryName"   
                cx="50%"                 
                cy="50%"           
                outerRadius={120}
                label={(entry) => entry.categoryName}
              >
                {categories?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#111114] border border-white/10 rounded-3xl overflow-hidden">
        <div className="p-3 border-b border-white/10">
          <h2 className="text-xl font-bold">
            Recent Transactions
          </h2>
        </div>

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
                User Email
              </th>

              <th className="p-3 text-left">
                Artist Email
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
            {transactions.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/5 hover:bg-white/[0.02]"
              >
                <td className="p-3">
                  {item.id?.slice(-8)}
                </td>

                <td className="p-3 capitalize">
                  {item.type}
                </td>

                <td className="p-3">
                  {item.email}
                </td>

                <td className="p-3">
                  {item.artistEmail}
                </td>

                <td className="p-3 font-semibold text-green-400">
                  ${item.amount}
                </td>

                <td className="p-3 text-zinc-400">
                  {new Date(
                    item.date
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}