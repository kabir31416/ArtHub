export default function Transactions() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Transactions</h1>

      <table className="w-full text-left">
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>

        <tr>
          <td>#1</td>
          <td>user@mail.com</td>
          <td>$10</td>
          <td>2026</td>
        </tr>
      </table>
    </div>
  );
}