import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../utils/transaction.api";
import type { TTransaction } from "../types/transaction.types";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useCallback } from "react";
export default function Transactions() {
    const [transactions, setTransactions] = useState<TTransaction[]>([]);
    const [filterType, setFilterType] = useState<string>("");
    const [month, setMonth] = useState<string>("");



    const fetchData = useCallback(async () => {
        const res = await getTransactions({ type: filterType, month });
        setTransactions(res.data?.data);
    }, [filterType, month]);

    useEffect(() => {
        fetchData();
    }, [filterType, month, fetchData]);

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this transaction?");
        if (!confirm) return;

        try {
            await deleteTransaction(id);
            fetchData(); // Refresh list after delete
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className=" max-w-5xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-center">📋 Transactions</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <select
                    className="border p-2 rounded w-40"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>

                <input
                    type="month"
                    className="border p-2 rounded"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
            </div>

            {/* Totals */}
            <div className="flex justify-between text-lg font-medium px-2">
                <span>💰 Income: <span className="text-green-600">৳{totalIncome}</span></span>
                <span>🧾 Expense: <span className="text-red-600">৳{totalExpense}</span></span>
                <span>📊 Balance: <span className="text-blue-600">৳{totalIncome - totalExpense}</span></span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                <table className="min-w-full text-sm text-left bg-white">
                    <thead className="bg-gray-100 text-gray-700 font-semibold">
                        <tr>
                            <th className="p-3 border">SN</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Type</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Amount</th>
                            <th className="p-3 border">Note</th>
                            <th className="p-3 border text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((t, index) => (
                                <tr
                                    key={t._id}
                                    className={`hover:bg-opacity-75 ${t.type === "income" ? "bg-green-200 hover:bg-green-300" : "bg-red-200 hover:bg-red-300"
                                        }`}
                                >
                                    <td className="p-3 border text-center">{index + 1}</td>
                                    <td className="p-3 border">{format(new Date(t.date), "dd MMM yyyy")}</td>
                                    <td className={`p-3 border capitalize font-bold text-gray-600`}>
                                        {t.type}
                                    </td>
                                    <td className="p-3 border">{t.category}</td>
                                    <td className="p-3 border">৳{t.amount}</td>
                                    <td className="p-3 border">{t.note || "N/A"}</td>
                                    <td className="p-3 border text-center">
                                        <button
                                            onClick={() => handleDelete(t._id as string)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );
}
