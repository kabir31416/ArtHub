export default function AddArtwork() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Add Artwork</h1>

      <div className="space-y-3 max-w-lg">
        <input className="w-full p-3 bg-slate-900 rounded" placeholder="Title" />
        <textarea className="w-full p-3 bg-slate-900 rounded" placeholder="Description" />
        <input className="w-full p-3 bg-slate-900 rounded" placeholder="Price" />

        <button className="bg-orange-500 px-4 py-2 rounded">
          Upload Artwork
        </button>
      </div>
    </div>
  );
}