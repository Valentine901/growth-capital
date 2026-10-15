import { useState } from "react"
import { APIInvest } from "../../../constants/API";
import { useInvestAuth } from "../../context/AuthContext";


const Withdrawal = () => {
    const [withdrawalData, setWithdrawalData] = useState({
        paymentMethod: "",
        wallet_address: "",
        amount: ""
    })
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { wallet } = useInvestAuth();

    const paymentMethods = {
        bitcoin: "Bitcoin",
        tron: "Tron",
        ethereum: "Ethereum",
        bnb: "BNB"
    }
    const balance = Number(wallet?.balance);
    const handleWithdrawal = async (e) => {
        e.preventDefault();
        setError("")
        setSuccess("");

        
        const amount = Number(withdrawalData.amount);

        if (!amount || amount <= 0) {
            setError("Enter a valid amount.");
            setLoading(false);
            return;
        }
        if (amount > balance) {
            setError("Insufficient wallet balance.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const payload = {"amount": amount, "payment_method": withdrawalData.paymentMethod, "crypto_withdrawal_address": withdrawalData.wallet_address}
            await APIInvest.post("/withdrawals/make-withdrawal", payload)
           
            setSuccess("Withdrawal success");
            setStep(3);
        } catch (err) {
            setError(error.response.data.detail);
        } finally {
            setLoading(false);
        }
    }

    const handleNextStep = (selectedData) => {
        setWithdrawalData((prev) => ({ ...prev, ...selectedData }))
        setStep((prev) => prev + 1);
    }

    const handlePrevStep = () => {
        setStep((prev) => prev - 1);
    }

    const handleReset = () => {
        setWithdrawalData({paymentMethod:"", amount:"", wallet_address:""});
        setStep(1);
    }

    const headerInfo = () => {
        switch (step) {
            case 2: return { title: "Enter wallet address", desc: "Wallet address should be valid address" }
            case 3: return { title: "Payment Success", desc: "Check your crypto wallet to verify your transaction" }
            default: return { title: "Select payment method", desc: "Withdraw amount with your wallet balance" }
        }
    }

    const header = headerInfo();

    return (
            <div className="flex justify-center w-full min-h-screen">
      <div className="flex flex-col gap-6 max-w-7xl w-full p-4 sm:p-8">
        {/* header title */}
        <div className="max-w-xl w-full rounded-xl p-6 border border-amber-300/10 bg-zinc-900/30 flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold text-zinc-100">{header.title}</h1>
          <p className="text-sm text-zinc-400">{header.desc}</p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto">
          {/* step 1: payment method */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {Object.entries(paymentMethods).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleNextStep({ paymentMethod: key })}
                  className="p-4 rounded-xl border border-amber-300/10 bg-zinc-950 text-left hover:border-amber-300/50 transition-all font-medium text-zinc-200"
                >
                  🪙 {value}
                </button>
              ))}
            </div>
          )}

          {/* step 2: address + amount */}
          {step === 2 && (
            <form onSubmit={handleWithdrawal} className="flex flex-col gap-3 max-w-md">
              <div className="flex flex-col gap-1">
                <label htmlFor="wallet_address" className="pb-1">
                  {paymentMethods[withdrawalData.paymentMethod]} Address
                </label>
                <input
                  id="wallet_address"
                  type="text"
                  required
                  value={withdrawalData.wallet_address}
                  onChange={(e) =>
                    setWithdrawalData((prev) => ({ ...prev, wallet_address: e.target.value }))
                  }
                  placeholder={`Enter ${paymentMethods[withdrawalData.paymentMethod]} wallet address`}
                  className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-300 text-zinc-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="amount">
                  Amount{" "}
                  <span className="text-xs text-zinc-500">
                    (Balance: ${balance.toFixed(2)})
                  </span>
                </label>
                <input
                  id="amount"
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={withdrawalData.amount}
                  onChange={(e) =>
                    setWithdrawalData((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  placeholder="Enter amount (e.g. 500)"
                  className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-300 text-zinc-100"
                />
              </div>

              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-amber-300/50 hover:bg-amber-300/80 disabled:bg-amber-300/40 font-semibold text-zinc-950 transition-colors"
              >
                {loading ? "Processing transaction..." : "Withdraw"}
              </button>
            </form>
          )}

          {/* step 3: success */}
          {step === 3 && (
            <div className="flex flex-col gap-4 items-start">
              {success && <p className="text-sm text-emerald-400 font-medium">{success}</p>}
              <button
                onClick={handleReset}
                className="text-sm text-zinc-400 hover:text-zinc-100 underline"
              >
                Make another withdrawal
              </button>
            </div>
          )}

          {/* back button: step 2 only */}
          {step === 2 && (
            <button
              onClick={handlePrevStep}
              className="mt-8 text-sm text-zinc-500 hover:text-zinc-300 font-medium flex items-center gap-1 transition-colors"
            >
              ← Go Back
            </button>
          )}
        </div>
      </div>
    </div>
    )
}

export default Withdrawal