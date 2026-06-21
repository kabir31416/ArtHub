export default function Profile() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Profile</h1>

      <div className="space-y-3 max-w-md">
        <input className="w-full p-3 bg-slate-900 rounded" placeholder="Name" />
        <input className="w-full p-3 bg-slate-900 rounded" placeholder="Email" />

        <button className="bg-orange-500 px-4 py-2 rounded">
          Update Profile
        </button>
      </div>
    </div>
  );
}