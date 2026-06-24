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
    <div className="relative text-white">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <span className="inline-flex px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-xs mb-4">
            Account Settings
          </span>
          <h1 className="text-4xl font-bold">
            My <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-zinc-400 mt-3">
            Manage your account information and security settings.
          </p>

        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleUpdate}
          className=" relative overflow-hidden space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 ">

          <div className="relative z-10 flex flex-col items-center pb-8 border-b border-white/10">

            <div className="relative">

              <img
                src={session?.user?.image || "https://i.pravatar.cc/150"}
                alt="Profile"
                className="w-28 h-28 rounded-3xl object-cover border border-white/10"
              />

              <div className="absolute inset-0 rounded-3xl ring-2 ring-orange-500/40" />

            </div>

            <h3 className="mt-4 text-xl font-semibold text-white">
              {name}
            </h3>

            <p className="text-zinc-500 text-sm">
              {email}
            </p>

          </div>

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Full Name
            </label>

            <div className="relative mt-2">
              <User className="absolute left-3 top-3 text-orange-400" size={16} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm backdrop-blur outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Email (cannot change)
            </label>

            <div className="relative mt-2 opacity-70">
              <Mail className="absolute left-3 top-3 text-orange-400" size={16} />
              <input
                value={email}
                disabled
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm backdrop-blur outline-none transition-all duration-300 placeholder:text-zinc-500 opacity-70 cursor-not-allowed"
              />
            </div>
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm font-medium text-zinc-300 block mb-2">
              Role
            </label>
            <div className="flex items-center gap-3">
              <Palette
                className="text-orange-400"
                size={16}
              />
              <span
                className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/15 to-purple-500/15 border border-orange-500/20 text-orange-300 text-sm capitalize"
              >
                {role}
              </span>
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              New Password (optional)
            </label>

            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 text-orange-400" size={16} />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave empty to keep current password"
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white text-sm backdrop-blur outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-white/20 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className=" w-full py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>

        </form>

      </div>
    </div>
  );
}