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
    <div className="space-y-8">

      <div className="bg-[#111114] border border-white/5 rounded-3xl p-7">

        <p className="text-zinc-500 text-sm">
          Current Subscription
        </p>

        <div className="flex items-center gap-3 mt-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
            <FaCrown />
          </div>

          <div>
            <h2 className="text-3xl font-black capitalize">
              {currentPlan}
            </h2>

            <p className="text-zinc-500 text-sm">
              Purchases:
              {" "}
              {session?.user?.purchasedCount || 0}
              /
              {currentPlan === "premium"
                ? "Unlimited"
                : session?.user?.maxPurchases}
            </p>
          </div>

        </div>

      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">
          Upgrade Your Plan
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {plans.map((plan) => {

            const active =
              currentPlan === plan.tier;

            return (
              <div
                key={plan.tier}
                className={`relative rounded-3xl border bg-[#111114] p-6 ${plan.color}`}
              >

                {active && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/20">
                    Current
                  </div>
                )}

                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-xl mb-5">
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {plan.title}
                </h3>

                <p className="text-4xl font-black mt-4">
                  {plan.price}
                </p>

                <p className="text-zinc-500 mt-2">
                  {plan.limit}
                </p>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <FaCheck className="text-green-400" />
                    Buy Digital Artworks
                  </div>

                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <FaCheck className="text-green-400" />
                    Artist Support
                  </div>

                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <FaCheck className="text-green-400" />
                    Marketplace Access
                  </div>

                </div>

                {!active && (
                  <button
                    onClick={() => handleUpgrade(plan.tier)}
                    disabled={upgradingPlan === plan.tier}
                    className="w-full mt-8 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold hover:opacity-90 transition disabled:opacity-60"
                  >
                    {upgradingPlan === plan.tier
                      ? "Processing..."
                      : `Upgrade to ${plan.title}`}
                  </button>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}