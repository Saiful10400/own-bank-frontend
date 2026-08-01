import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TInvestment = {
    _id: string;
    personName: string;
    phone: string;
    amount: number;
    expectedProfit: number;
    totalReturn: number;
    investmentDate: string;
    returnDate: string;
    receivedAmount: number;
    notes?: string;
};

type TApiResponse = {
    success: boolean;
    data: TInvestment[];
};

export default function Investments() {
    const [investments, setInvestments] = useState<TInvestment[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const getInvestments = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `https://mybank-pi.vercel.app/api/investments?page=${page}`
            );

            const result: TApiResponse = await response.json();

            setInvestments(result.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load investments.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getInvestments();
    }, [page]);
 
    return (
        <div className="mx-auto max-w-7xl rounded-xl bg-white shadow">
            {/* Header */}
            <div className="border-b p-6">
                <h2 className="text-2xl font-bold">Investment List</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Current Page: {page}
                </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full whitespace-nowrap">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-5 py-4 text-left">Person</th>
                            <th className="px-5 py-4 text-left">Phone</th>
                            <th className="px-5 py-4 text-right">Amount</th>
                            <th className="px-5 py-4 text-right">Profit</th>
                            <th className="px-5 py-4 text-right">Total Return</th>
                            <th className="px-5 py-4 text-right">Received</th>
                            <th className="px-5 py-4 text-center">
                                Investment Date
                            </th>
                            <th className="px-5 py-4 text-center">
                                Return Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="py-16 text-center">
                                    Loading...
                                </td>
                            </tr>
                        ) : investments.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="py-16 text-center">
                                    No investments found.
                                </td>
                            </tr>
                        ) : (
                            investments.map((investment) => (
                                <tr
                                    key={investment._id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">{investment.personName}</td>
                                    <td className="px-5 py-4">{investment.phone}</td>
                                    <td className="px-5 py-4 text-right">
                                        ৳{investment.amount.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4 text-right text-blue-600">
                                        ৳{investment.expectedProfit.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4 text-right font-semibold text-green-600">
                                        ৳{investment.totalReturn.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4 text-right">
                                        ৳{investment.receivedAmount.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        {new Date(
                                            investment.investmentDate
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        {new Date(
                                            investment.returnDate
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-3 border-t p-5">
                <button
                    disabled={page === 1 || loading}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ChevronLeft size={18} />
                    Previous
                </button>

                <span className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white">
                    {page}
                </span>

                <button
                    disabled={loading}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}