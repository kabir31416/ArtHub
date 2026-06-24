import { stripe } from "@/app/lib/stripe";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaCheckCircle,
  FaPalette,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";



export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error(
      "Please provide a valid session_id (`cs_test_...`)"
    );
  }

  const session = await stripe.checkout.sessions.retrieve(
    session_id,
    {
      expand: ["line_items", "payment_intent"],
    }
  );

  const status = session.status;
  const customerEmail =
    session.customer_details?.email || "No email found";

  if (status === "open") {
    redirect("/");
  }

  if (status !== "complete") {
    redirect("/");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-zinc-900 to-slate-950 px-4">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-20 left-20 w-80 h-80 bg-orange-500/10 blur-[140px] rounded-full" />

        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 blur-[140px] rounded-full" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md py-5">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">


          {/* Success Icon */}
          <div className="flex justify-center mt-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 flex items-center justify-center">
              <FaCheckCircle className="text-green-400 text-5xl" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mt-6">

            <h1 className="text-3xl font-black text-white">
              Payment{" "}
              <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                Successful
              </span>
            </h1>

            <p className="text-zinc-400 text-sm mt-3">
              Your subscription has been activated successfully.
            </p>

          </div>

          {/* Info Card */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-orange-500/5 to-purple-500/5 p-4">

            <p className="text-sm text-zinc-300 text-center leading-relaxed">
              Your account has been updated successfully. You can now access
              premium features and continue exploring amazing artworks.
            </p>

          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">

            <Link
              href="/artworks"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Browse Artworks
              <FaArrowRight />
            </Link>

          </div>

          {/* Footer */}
          <p className="text-center text-xs text-zinc-500 mt-6">
            Need help? Contact our support team anytime.
          </p>

        </div>

      </div>

    </div>
  );
}