export default function Bought() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Bought Artworks</h1>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-900 p-4 rounded-xl">
            <div className="h-40 bg-slate-700 rounded-lg mb-3" />
            <h3>Artwork {i}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}