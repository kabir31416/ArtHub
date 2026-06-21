export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-gray-400">Subscription</p>
          <h2 className="text-xl font-bold">Free Plan</h2>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-gray-400">Purchases</p>
          <h2 className="text-xl font-bold">2 / 3</h2>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-gray-400">Total Spent</p>
          <h2 className="text-xl font-bold">$25</h2>
        </div>
      </div>
    </div>
  );
}