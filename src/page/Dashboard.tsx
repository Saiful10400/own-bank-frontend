import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { getTransactions } from "../utils/transaction.api";
import type { TTransaction } from "../types/transaction.types";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();

        setTransactions(data?.data?.data.slice(0, 5)); // show only latest 5
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-100 text-green-800 rounded-xl p-4 shadow">
          <h3 className="text-sm font-medium">Total Income</h3>
          <p className="text-2xl font-bold">৳ {income.toLocaleString()}</p>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl p-4 shadow">
          <h3 className="text-sm font-medium">Total Expense</h3>
          <p className="text-2xl font-bold">৳ {expense.toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 text-gray-800 rounded-xl p-4 shadow">
          <h3 className="text-sm font-medium">Net Balance</h3>
          <p className="text-2xl font-bold">৳ {balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No transactions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Amount</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t._id} className="border-t border-gray-100">
                    <td className="p-2 capitalize">{t.type}</td>
                    <td className="p-2">{t.category}</td>
                    <td className="p-2">৳ {t.amount}</td>
                    <td className="p-2">{dayjs(t.date).format("YYYY-MM-DD")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
