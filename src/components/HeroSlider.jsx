"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";

export default function HeroSlider() {
    return (
        <div className="w-full">

            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-[85vh]"
            >

                <SwiperSlide>
                    <div className="relative h-[85vh] overflow-hidden">

                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1652398859643-dbe3299f19cf')",
                            }}
                        />

                        {/* Dark + Gradient Overlay */}
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-purple-950/40" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto">

                            <h1 className="text-5xl md:text-6xl font-bold text-white">
                                Discover <span className="text-orange-500">Masterpieces</span>
                            </h1>

                            <p className="text-zinc-300 mt-4">
                                Explore unique digital & physical artworks from talented artists around the world.
                            </p>

                            <Link
                                href="/artworks"
                                className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                            >
                                Browse Artworks
                            </Link>

                        </div>

                    </div>
                </SwiperSlide>

                {/* SLIDE 2 - Featured Artist */}
                <SwiperSlide>
                    <div className="relative h-[85vh] overflow-hidden">

                        <div
                            className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1461344577544-4e5dc9487184')",
                            }}
                        />

                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/60 via-transparent to-slate-950/80" />

                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto">

                            <h1 className="text-5xl md:text-6xl font-bold text-white">
                                Meet <span className="text-purple-400">Creative Artists</span>
                            </h1>

                            <p className="text-zinc-300 mt-4">
                                Support independent creators and collect exclusive art pieces directly from artists.
                            </p>

                            <Link
                                href="/artists"
                                className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white"
                            >
                                Explore Artists
                            </Link>

                        </div>

                    </div>
                </SwiperSlide>

                {/* SLIDE 3 - Featured Collection */}
                <SwiperSlide>
                    <div className="relative h-[85vh] overflow-hidden">

                        <div
                            className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1560421683-6856ea585c78')",
                            }}
                        />

                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-orange-950/40" />

                        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto">

                            <h1 className="text-5xl md:text-6xl font-bold text-white">
                                Curated <span className="text-orange-400">Collections</span>
                            </h1>

                            <p className="text-zinc-300 mt-4">
                                Hand-picked art collections designed for collectors and art lovers.
                            </p>

                            <Link
                                href="/collections"
                                className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white"
                            >
                                View Collections
                            </Link>

                        </div>

                    </div>
                </SwiperSlide>

            </Swiper>

        </div>
    );
}