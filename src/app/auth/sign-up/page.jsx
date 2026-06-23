"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Palette } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { authClient } from "@/app/lib/auth-client";

export default function SignUpPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Join as Buyer or Artist
                    </p>
                </div>

                {error && (
                    <div className="mb-4 bg-red-100 text-red-600 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignUp} className="space-y-5">

                    {/* NAME */}
                    <div>
                        <label className="text-sm font-medium">
                            Full Name
                        </label>

                        <div className="relative mt-2">
                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="John Doe"
                                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm font-medium">
                            Email Address
                        </label>

                        <div className="relative mt-2">
                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="john@example.com"
                                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* ROLE */}
                    <div>
                        <label className="text-sm font-medium">
                            Select Role
                        </label>

                        <div className="relative mt-2">
                            <Palette
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            >
                                <option value="user">User</option>
                                <option value="artist">Artist</option>
                            </select>
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="text-sm font-medium">
                            Password
                        </label>

                        <div className="relative mt-2">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Create Password"
                                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div>
                        <label className="text-sm font-medium">
                            Confirm Password
                        </label>

                        <div className="relative mt-2">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                {/* OR */}
                <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* GOOGLE */}
                <button
                    type="button"
                    onClick={handleGoogle}
                    className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                >
                    <FaGoogle size={20} />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link
                        href="/auth/sign-in"
                        className="font-semibold text-blue-600"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}