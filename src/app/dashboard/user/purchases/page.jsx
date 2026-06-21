export default function Purchases() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Purchase History</h1>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th>Artwork</th>
            <th>Artist</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b border-white/5">
            <td>Sunset</td>
            <td>John</td>
            <td>$10</td>
            <td>2026-06-21</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}