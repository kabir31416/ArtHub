"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import { User, Mail, Palette, Lock } from "lucide-react";

export default function UserProfilePage() {
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
    <div className="min-h-screen bg-[#050505] text-white px-3 py-5">

      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">
            Account Settings
          </h1>
          <p className="text-sm text-zinc-500">
            Update your profile information
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleUpdate}
          className="space-y-6 bg-[#0b0b0c] border border-white/5 rounded-2xl p-6"
        >

          {/* NAME */}
          <div>
            <label className="text-xs text-zinc-400">
              Full Name
            </label>

            <div className="relative mt-2">
              <User className="absolute left-3 top-3 text-zinc-500" size={16} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 text-sm outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* EMAIL (readonly optional) */}
          <div>
            <label className="text-xs text-zinc-400">
              Email (cannot change)
            </label>

            <div className="relative mt-2 opacity-70">
              <Mail className="absolute left-3 top-3 text-zinc-500" size={16} />
              <input
                value={email}
                disabled
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2.5 pl-10 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-xs text-zinc-400">
              Role
            </label>

            <div className="relative mt-2">
              <Palette className="absolute left-3 top-3 text-zinc-500" size={16} />

              <select
                value={role}
                disabled
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg cursor-not-allowed py-2.5 pl-10 text-sm outline-none focus:border-white/30"
              >
                <option value="user">User</option>
                <option value="artist">Artist</option>
              </select>
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-zinc-400">
              New Password (optional)
            </label>

            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 text-zinc-500" size={16} />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave empty to keep current password"
                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 text-sm outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </form>

      </div>
    </div>
  );
}