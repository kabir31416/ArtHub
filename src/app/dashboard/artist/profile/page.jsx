"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import { User, Mail, Palette, Lock } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            role,
            password: password || undefined,
          }),
        }
      );

      alert("Profile updated successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Account Settings
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your profile information and account security
        </p>
      </div>

      {/* CARD */}
      <form
        onSubmit={handleUpdate}
        className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
      >

        <div className="space-y-6">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Full Name
            </label>

            <div className="relative mt-2">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
              />

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Email Address
            </label>

            <div className="relative mt-2 opacity-70">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
              />

              <input
                value={email}
                disabled
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-3">
              Account Type
            </label>

            <div className="flex items-center gap-3">
              <Palette
                className="text-orange-400"
                size={18}
              />

              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/15 to-purple-500/15 border border-orange-500/20 text-orange-300 text-sm capitalize">
                {role}
              </span>
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              New Password
            </label>

            <div className="relative mt-2">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave empty to keep current password"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </div>
      </form>
    </div>
  );
}