"use client";

import { useState } from "react";
import { useSession } from "@/app/lib/auth-client";
import {
  FaCrown,
  FaGem,
  FaRocket,
  FaCheck,
} from "react-icons/fa";

export default function UserDashboard() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [upgradingPlan, setUpgradingPlan] = useState(null);

  const currentPlan =
    session?.user?.subscriptionTier || "free";

  const handleUpgrade = async (tier) => {
    try {
      setUpgradingPlan(tier);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/subscription`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session?.user?.email,
            tier,
          }),
        }
      );


      const data = await res.json();

      if (data.success) {
        alert(`Successfully upgraded to ${tier}`);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      alert("Upgrade failed");
    } finally {
      setUpgradingPlan(null);
    }
  };

  const plans = [
    {
      tier: "free",
      title: "Free",
      price: "$0",
      icon: <FaRocket />,
      limit: "3 Purchases",
      color:
        "border-white/10",
    },

    {
      tier: "pro",
      title: "Pro",
      price: "$9.99",
      icon: <FaCrown />,
      limit: "9 Purchases",
      color:
        "border-violet-500/30",
    },

    {
      tier: "premium",
      title: "Premium",
      price: "$19.99",
      icon: <FaGem />,
      limit: "Unlimited",
      color:
        "border-fuchsia-500/30",
    },
  ];

  return (
    <div className="space-y-10">

      {/* CURRENT PLAN */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/10 blur-[120px] rounded-full" />
        <div className="relative z-10">
          <p className="text-zinc-400 text-sm uppercase tracking-wider">
            Current Subscription
          </p>

          <div className="flex items-center gap-4 mt-4">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg">
              <FaCrown className="text-2xl text-white" />
            </div>

            <div>
              <h2 className="text-4xl font-black capitalize bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                {currentPlan}
              </h2>

              <p className="text-zinc-400 mt-1">
                Purchases:{" "}
                <span className="text-white font-medium">
                  {session?.user?.purchasedCount || 0}
                </span>
                {" / "}
                <span className="text-orange-400">
                  {currentPlan === "premium"
                    ? "Unlimited"
                    : session?.user?.maxPurchases}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div>
        <div className="mb-8">
          <h2 className="text-4xl font-bold">
            Upgrade Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="text-zinc-400 mt-2">
            Unlock more purchases and premium marketplace features.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const active = currentPlan === plan.tier;
            return (
              <div
                key={plan.tier}
                className={` relative overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2
              ${active
                    ? "border-orange-500/40 bg-gradient-to-b from-orange-500/10 to-purple-500/10"
                    : "border-white/10 bg-white/[0.03] hover:border-orange-500/30"
                  }
            `}
              >

                {active && (
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs bg-green-500/15 text-green-400 border border-green-500/20">
                    Current Plan
                  </div>
                )}

                <div className="p-7">

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-2xl mb-6">
                    {plan.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {plan.title}
                  </h3>

                  <div className="mt-5">

                    <p className="text-5xl font-black bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                      {plan.price}
                    </p>

                    <p className="text-zinc-500 mt-2">
                      {plan.limit}
                    </p>

                  </div>

                  <div className="mt-8 space-y-4">

                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <FaCheck className="text-green-400" />
                      Buy Digital Artworks
                    </div>

                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <FaCheck className="text-green-400" />
                      Support Artists
                    </div>

                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <FaCheck className="text-green-400" />
                      Marketplace Access
                    </div>

                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                      <FaCheck className="text-green-400" />
                      Premium Dashboard
                    </div>

                  </div>

                  {!active && (
                    <form
                      action="/api/checkout_sessions"
                      method="POST"
                    >
                      <button
                        type="submit"
                        role="link"  disabled={upgradingPlan === plan.tier} 
                        className="  w-full   mt-8  py-3.5 rounded-2xl  font-semibold text-white bg-gradient-to-r from-orange-500 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300  disabled:opacity-60"
                      >
                        {upgradingPlan === plan.tier
                          ? "Processing..."
                          : `Upgrade to ${plan.title}`}
                      </button>
                    </form>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}