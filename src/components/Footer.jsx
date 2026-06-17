"use client";

import Link from "next/link";
import {
    FaInstagram,
    FaFacebookF,
    FaXTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-linear-to-b from-slate-950 via-slate-900 to-zinc-950 text-white border-t border-white/10">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Section */}
                    <div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                            ArtHub
                        </h1>

                        <p className="text-zinc-400 mt-4 leading-7">
                            Discover unique artworks, connect with artists,
                            and build your personal art collection with a modern marketplace experience.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-6">

                            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-amber-500 transition">
                                <FaInstagram />
                            </a>

                            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-amber-500 transition">
                                <FaFacebookF />
                            </a>

                            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-amber-500 transition">
                                <FaXTwitter />
                            </a>

                            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-amber-500 transition">
                                <FaLinkedinIn />
                            </a>

                            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-amber-500 transition">
                                <FaPinterestP />
                            </a>

                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h2 className="text-lg font-semibold mb-5 text-white ">
                            Explore
                        </h2>

                        <div className="space-y-3 text-zinc-400">
                            <Link href="/" className="hover:text-orange-600 block">
                                Home
                            </Link>

                            <Link href="/artworks" className="hover:text-orange-600 block">
                                Browse Artworks
                            </Link>

                            <Link href="/artists" className="hover:text-orange-600 block">
                                Artists
                            </Link>

                            <Link href="/dashboard" className="hover:text-orange-600 block">
                                Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h2 className="text-lg font-semibold mb-5 text-white ">
                            Support
                        </h2>

                        <div className="space-y-3 text-zinc-400">
                            <Link href="/about" className="hover:text-orange-600  block">
                                About Us
                            </Link>

                            <Link href="/contact" className="hover:text-orange-600  block">
                                Contact
                            </Link>

                            <Link href="/privacy" className="hover:text-orange-600  block">
                                Privacy Policy
                            </Link>

                            <Link href="/terms" className="hover:text-orange-600  block">
                                Terms & Conditions
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h2 className="text-lg font-semibold mb-5 text-white ">
                            Stay Inspired
                        </h2>

                        <p className="text-zinc-400 mb-4 leading-6">
                            Get updates about featured artworks and artists.
                        </p>

                        <div className="flex flex-col gap-3">

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-full bg-white/10 border border-white/10 outline-none text-white placeholder:text-zinc-500"
                            />

                            <button className="px-4 py-3 rounded-full bg-linear-to-r from-orange-500 to-purple-600 text-white font-medium hover:scale-105 transition">
                                Subscribe
                            </button>

                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-zinc-500 text-sm">
                        © {new Date().getFullYear()} ArtHub. All rights reserved.
                    </p>

                    <p className="text-zinc-600 text-sm">
                        Made for Artists • Collectors • Creators
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;