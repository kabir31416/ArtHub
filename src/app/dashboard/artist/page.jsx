export default function ArtistDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Artist Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900 p-4 rounded-xl">Artworks: 12</div>
        <div className="bg-slate-900 p-4 rounded-xl">Sales: $300</div>
        <div className="bg-slate-900 p-4 rounded-xl">Orders: 18</div>
      </div>
    </div>
  );
}