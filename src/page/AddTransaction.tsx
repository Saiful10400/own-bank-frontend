import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { createTransaction } from "../utils/transaction.api";
import { Banknote, CalendarDays, FileText, ListChecks, StickyNote } from "lucide-react";
import type { TTransaction } from "../types/transaction.types";

const transactionSchema = z.object({
    type: z.enum(["income", "expense"], { message: "Type is required" }),
    category: z.string().min(1, "Category is required"),
    amount: z.number({ error: "Amount must be a number" }).min(1, "Amount must be positive"),
    note: z.string().optional(),
    date: z.string().min(1, "Date is required"),
});

type FormData = z.infer<typeof transactionSchema>;

export default function AddTransaction() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            type: "expense",
            category: "",
            note: "",
            date: new Date().toISOString().split("T")[0],
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        try {
            await createTransaction(data as TTransaction);
            reset();
            navigate("/transactions");
        } catch (error) {
            console.error("Failed to add transaction:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto   py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">➕ Add Transaction</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 bg-white p-6 rounded-xl shadow-md border"
            >
                {/* Type */}
                <div>
                    <label className="font-medium mb-1 flex items-center gap-2 text-gray-700">
                        <ListChecks size={18} /> Type
                    </label>
                    <select
                        {...register("type")}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="font-medium mb-1 flex items-center gap-2 text-gray-700">
                        <FileText size={18} /> Category
                    </label>
                    <input
                        type="text"
                        {...register("category")}
                        placeholder="e.g. Salary, Grocery"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.category && (
                        <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
                    )}
                </div>

                {/* Amount */}
                <div>
                    <label className="font-medium mb-1 flex items-center gap-2 text-gray-700">
                        <Banknote size={18} /> Amount (৳)
                    </label>
                    <input
                        type="number"
                        {...register("amount", { valueAsNumber: true })}
                        placeholder="Enter amount"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.amount && (
                        <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
                    )}
                </div>

                {/* Note */}
                <div>
                    <label className="font-medium mb-1 flex items-center gap-2 text-gray-700">
                        <StickyNote size={18} /> Note (optional)
                    </label>
                    <input
                        type="text"
                        {...register("note")}
                        placeholder="Description..."
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Date */}
                <div>
                    <label className="font-medium mb-1 flex items-center gap-2 text-gray-700">
                        <CalendarDays size={18} /> Date
                    </label>
                    <input
                        type="date"
                        {...register("date")}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Transaction
                    </button>
                </div>
            </form>
        </div>
    );
}
