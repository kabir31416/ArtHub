"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Palette } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import { FaPalette } from "react-icons/fa";

export default function SignUpPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [image, setImage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                image,
                role,
                password,
            });

            if (error) {
                setError(error.message);
                return;
            }

            if (data) {
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950 px-4 py-10">

            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">

                <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/15 blur-[120px] rounded-full" />

                <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/15 blur-[120px] rounded-full" />

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            </div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="inline-flex mb-5 w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-purple-600 items-center justify-center shadow-lg">
                        <FaPalette className="text-white text-2xl" />
                    </div>

                    <h1 className="text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-zinc-400 mt-3">
                        Join ArtHub as a collector or artist
                    </p>

                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSignUp}
                    className="space-y-5"
                >

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
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            />

                        </div>

                    </div>

                    {/* EMAIL */}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="john@example.com"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            />

                        </div>

                    </div>

                    {/* ROLE */}
                    <div>

                        <label className="text-sm font-medium text-zinc-300">
                            Select Role
                        </label>

                        <div className="relative mt-2">

                            <Palette
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                            />

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white backdrop-blur-xl outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            >
                                <option value="user" className="bg-zinc-900">
                                    User
                                </option>
                                <option value="artist" className="bg-zinc-900">
                                    Artist
                                </option>
                            </select>

                        </div>

                    </div>

                    {/* IMAGE */}
                    <div>

                        <label className="text-sm font-medium text-zinc-300">
                            Profile Image URL
                        </label>

                        <div className="relative mt-2">

                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                            />

                            <input
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                type="url"
                                placeholder="https://example.com/profile.jpg"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            />

                        </div>

                        {image && (
                            <div className="mt-4 flex justify-center">

                                <Image
                                    src={image}
                                    alt="Profile Preview"
                                    width={100}
                                    height={100}
                                    className="h-24 w-24 rounded-full object-cover border-2 border-orange-500/30 ring-4 ring-purple-500/10"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />

                            </div>
                        )}

                    </div>

                    {/* PASSWORD */}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Create Password"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            />

                        </div>

                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>

                        <label className="text-sm font-medium text-zinc-300">
                            Confirm Password
                        </label>

                        <div className="relative mt-2">

                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
                            />

                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-zinc-500 hover:border-orange-500/30 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                            />

                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Account"}
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
                    <FaGoogle />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-zinc-400 mt-8">

                    Already have an account?{" "}

                    <Link
                        href="/auth/sign-in"
                        className="font-semibold bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent"
                    >
                        Sign In
                    </Link>

                </p>

            </div>

        </div>
    );
}