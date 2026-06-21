export default function Sales() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Sales History</h1>

      <table className="w-full text-left">
        <tr>
          <th>Artwork</th>
          <th>Buyer</th>
          <th>Amount</th>
        </tr>

        <tr>
          <td>Art 1</td>
          <td>John</td>
          <td>$15</td>
        </tr>
      </table>
    </div>
  );
}