import { useState } from "react";
import { CreditCard, Shield, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function Login({ fn }: { fn: () => void }) {
  const [accountNumber] = useState("741-690-970");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!pin) {
      setError("Please enter your 4-digit PIN.");
      return;
    }

    if (pin.length < 4) {
      setError("PIN must be exactly 4 digits.");
      return;
    }

    setLoading(true);

    // Simulate small delay for better UX
    setTimeout(() => {
      if (pin === "1211") {
        setSuccess("Login successful. Redirecting to dashboard...");
        fn();
      } else {
        setError("Incorrect PIN. Please try again.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Top Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-lg mb-4">
            <CreditCard size={30} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Personal Finance Vault</h1>
          <p className="text-slate-600 mt-2">
            Secure access to your financial dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Sign in</h2>
              <p className="text-sm text-slate-500">Enter your account credentials</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Account Number */}
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Account Number
              </label>

              <div className="relative">
                <CreditCard
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="accountNumber"
                  type="text"
                  value={accountNumber}
                  readOnly
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-slate-700 font-medium cursor-not-allowed"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Your registered account number
              </p>
            </div>

            {/* PIN */}
            <div>
              <label
                htmlFor="pin"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                4-Digit PIN
              </label>

              <div className="relative">
                <Shield
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="pin"
                  type="password"
                  maxLength={4}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPin(value);
                    if (error) setError("");
                  }}
                  placeholder="Enter PIN"
                  className={`w-full rounded-xl border pl-10 pr-4 py-3 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-4 ${
                    error
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                  }`}
                />
              </div>

              {/* Helper Text */}
              {!error && !success && (
                <p className="mt-2 text-xs text-slate-500">
                  Use the 4-digit security PIN associated with this account
                </p>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 p-3">
                  <AlertCircle
                    size={18}
                    className="text-red-600 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-green-50 border border-green-200 p-3">
                  <CheckCircle
                    size={18}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 text-white font-semibold py-3.5 shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-500">
              This is a personal finance management system. Your data remains private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}