"use client";

export default function Transactions() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Transactions
      </h1>

      <div className="bg-[#111114] rounded-3xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-5">Transaction ID</th>
              <th className="p-5">Type</th>
              <th className="p-5">Email</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Date</th>
            </tr>
          </thead>

          <tbody>
            {/* map transactions */}
          </tbody>
        </table>
      </div>
    </div>
  );
}