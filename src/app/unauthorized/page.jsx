"use client";

import Link from "next/link";
import { FaLock, FaArrowLeft, FaHome } from "react-icons/fa";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0b0b0c] to-[#111114] flex items-center justify-center px-5">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 text-center">


          <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500/20 to-purple-600/20 border border-orange-500/20 flex items-center justify-center mb-6">
            <FaLock className="text-4xl text-orange-400" />
          </div>


          <div className="mb-2">
            <span className="text-6xl font-black bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              403
            </span>
          </div>

 
          <h1 className="text-3xl font-bold text-white mb-3">
            Access Denied
          </h1>


          <p className="text-zinc-400 leading-relaxed">
            You dont have permission to access this page.
            Please contact an administrator or sign in with
            an authorized account.
          </p>

          <div className="mt-8 flex flex-col gap-3">

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
            >
              <FaHome />
              Back to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white hover:border-orange-500/30 hover:bg-white/[0.05] transition"
            >
              <FaArrowLeft />
              Go Back
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}