import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { createInvestment } from "../utils/transaction.api";

type TInvestmentForm = {
    personName: string;
    phone: string;
    amount: number;
    expectedProfit: number;
    investmentDate: string;
    returnDate: string;
    receivedAmount: number;
    notes: string;
};

const initialState: TInvestmentForm = {
    personName: "",
    phone: "",
    amount: 0,
    expectedProfit: 0,
    investmentDate: "",
    returnDate: "",
    receivedAmount: 0,
    notes: "",
};

export default function InvestmentForm() {
    const [formData, setFormData] = useState<TInvestmentForm>(initialState);
    const [loading, setLoading] = useState(false);

    // Auto calculate total return
    const totalReturn = useMemo(() => {
        return Number(formData.amount) + Number(formData.expectedProfit);
    }, [formData.amount, formData.expectedProfit]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "amount" ||
                    name === "expectedProfit" ||
                    name === "receivedAmount"
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const payload = {
                ...formData,
                totalReturn,
                investmentDate: new Date(formData.investmentDate).toISOString(),
                returnDate: new Date(formData.returnDate).toISOString(),
            };

            await createInvestment(payload);

            alert("Investment added successfully!");

            setFormData(initialState);
        } catch (error) {
            console.error("Failed to add investment:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto rounded-xl bg-white p-8 shadow">
            <h2 className="mb-6 text-3xl font-bold">Add Investment</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
                {/* Person Name */}
                <div>
                    <label className="mb-2 block font-medium">Person Name</label>
                    <input
                        type="text"
                        name="personName"
                        required
                        value={formData.personName}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-2 block font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Amount */}
                <div>
                    <label className="mb-2 block font-medium">
                        Investment Amount
                    </label>
                    <input
                        type="number"
                        name="amount"
                        min={0}
                        required
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Expected Profit */}
                <div>
                    <label className="mb-2 block font-medium">
                        Expected Profit
                    </label>
                    <input
                        type="number"
                        name="expectedProfit"
                        min={0}
                        required
                        value={formData.expectedProfit}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Auto Calculated Total Return */}
                <div>
                    <label className="mb-2 block font-medium">
                        Total Return
                    </label>
                    <input
                        type="number"
                        value={totalReturn}
                        readOnly
                        tabIndex={-1}
                        className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-2 text-gray-600"
                    />
                </div>

               

                {/* Investment Date */}
                <div>
                    <label className="mb-2 block font-medium">
                        Investment Date
                    </label>
                    <input
                        type="date"
                        name="investmentDate"
                        required
                        value={formData.investmentDate}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Return Date */}
                <div>
                    <label className="mb-2 block font-medium">
                        Return Date
                    </label>
                    <input
                        type="date"
                        name="returnDate"
                        required
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                    <label className="mb-2 block font-medium">Notes</label>
                    <textarea
                        name="notes"
                        rows={4}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none"
                        placeholder="Write any notes..."
                    />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Add Investment"}
                    </button>
                </div>
            </form>
        </div>
    );
}