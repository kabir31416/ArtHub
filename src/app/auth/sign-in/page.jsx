"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { authClient } from "@/app/lib/auth-client";

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
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Sign in to your account
                    </p>
                </div>

                {errorMsg && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-600">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSignin} className="space-y-5">

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
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

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
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">OR</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogle}
                    className="w-full border border-gray-300 rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-gray-50"
                >
                    <FaGoogle />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Dont have an account?{" "}
                    <Link
                        href="/auth/sign-up"
                        className="font-semibold text-blue-600"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}