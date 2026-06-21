export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded">Users: 120</div>
        <div className="bg-slate-900 p-4 rounded">Artists: 40</div>
        <div className="bg-slate-900 p-4 rounded">Sales: 300</div>
        <div className="bg-slate-900 p-4 rounded">Revenue: $5000</div>
      </div>
    </div>
  );
}