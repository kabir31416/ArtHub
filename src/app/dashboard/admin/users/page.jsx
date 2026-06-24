"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch, FaUserShield } from "react-icons/fa";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    const filtered = users.filter(
      (user) =>
        user?.name?.toLowerCase().includes(value) ||
        user?.email?.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users`
      );

      const data = await res.json();

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      setUpdatingId(userId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/users/${userId}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
        }
      );

      const result = await res.json();

      if (result.modifiedCount > 0 || result.acknowledged) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? { ...user, role }
              : user
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">
            Manage Users
          </h1>

          <p className="text-zinc-400 mt-2">
            View and manage platform users.
          </p>
        </div>

        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-11 pr-4 h-12 rounded-2xl bg-[#111114] border border-white/10 outline-none w-80"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#111114] border border-white/10 rounded-3xl p-5">
        <div className="flex items-center gap-3">
          <FaUserShield className="text-violet-400 text-xl" />

          <span className="text-zinc-400">
            Total Users:
          </span>

          <span className="font-bold text-xl">
            {filteredUsers.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111114]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              <th className="p-3 text-left">
                User
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Current Role
              </th>

              <th className="p-3 text-left">
                Change Role
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-white/5 hover:bg-white/2"
              >
                {/* User */}
                <td className="p-3">
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        user.image ||
                        "https://i.pravatar.cc/150"
                      }
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                      width={12}
                      height={12}
                    />

                    <div>
                      <h4 className="font-semibold">
                        {user.name}
                      </h4>

                      <p className="text-sm text-zinc-500">
                        {user._id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="p-3">
                  {user.email}
                </td>

                {/* Current Role */}
                <td className="p-3">
                  <span className="capitalize px-3 py-1 rounded-full text-sm bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {user.role}
                  </span>
                </td>

                {/* Role Change */}
                <td className="p-3">
                  <select
                    value={user.role}
                    disabled={
                      updatingId === user._id
                    }
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value
                      )
                    }
                    className="bg-[#1a1a1d] border border-white/10 rounded-xl px-4 py-2 outline-none"
                  >
                    <option value="user">
                      User
                    </option>

                    <option value="artist">
                      Artist
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}