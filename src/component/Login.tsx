import { useState } from "react";

import { CreditCard, Shield } from "lucide-react";

export default function Login({ fn }: { fn: () => void }) {
  const [accountNumber, setAccountNumber] = useState("741-690-970"); // Default value here
  const [pin, setPin] = useState("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pin === "1211") {
      fn()
    } else {
      alert("Please enter both account number and PIN.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 text-white rounded-full p-4 shadow-lg">
            <CreditCard size={32} />
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-gray-900 tracking-tight">
            Secure Bank Login
          </h2>
          <p className="mt-1 text-gray-500 text-center">
            Please enter your account details to access your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Account Number */}
          <div>
            <label
              htmlFor="accountNumber"
              className=" text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"
            >
              <CreditCard size={18} />
              Account Number
            </label>
            <input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="e.g. 1234 5678 9012"
              required
              readOnly
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400
                focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          {/* PIN */}
          <div>
            <label
              htmlFor="pin"
              className=" text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"
            >
              <Shield size={18} />
              4-Digit PIN
            </label>
            <input
              id="pin"
              type="password"
              maxLength={4}
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400
                focus:border-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md
              hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
          >
            Access My Account
          </button>
        </form>
      </div>
    </div>
  );
}
