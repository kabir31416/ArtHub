export default function Artworks() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">My Artworks</h1>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Art 1</td>
            <td>$20</td>
            <td>
              <button className="text-blue-400">Edit</button>{" "}
              <button className="text-red-400">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}