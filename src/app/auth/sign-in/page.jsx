"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { authClient } from "@/app/lib/auth-client";
import { FaPalette } from "react-icons/fa";

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSignin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrorMsg("");

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                rememberMe: true,
            });

            if (error) {
                setErrorMsg(error.message);
                return;
            }

            if (data) {
                router.push("/");
            }
        } catch (err) {
            setErrorMsg("Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950 px-4 py-4">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/15 blur-[120px] rounded-full" />

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/15 blur-[120px] rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="inline-flex mb-5 w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-purple-600 items-center justify-center shadow-lg">
            <FaPalette className="text-white text-2xl" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-3">
            Sign in to continue exploring amazing artworks
          </p>

        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSignin}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="text-sm font-medium text-zinc-300">
              Email Address
            </label>

            <div className="relative mt-2">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
              />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="text-sm font-medium text-zinc-300">
              Password
            </label>

            <div className="relative mt-2">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
              />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        {/* Divider */}
        <div className="my-8 flex items-center">

          <div className="flex-1 h-px bg-white/10" />

          <span className="px-4 text-sm text-zinc-500">
            OR CONTINUE WITH
          </span>

          <div className="flex-1 h-px bg-white/10" />

        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full border border-white/10 bg-white/[0.03] rounded-xl py-3 flex items-center justify-center gap-3 text-white hover:border-orange-500/30 hover:bg-white/[0.05] transition-all duration-300"
        >
          <FaGoogle className="text-lg" />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-400 mt-8">

          Dont have an account?{" "}

          <Link
            href="/auth/sign-up"
            className="font-semibold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
    );
}