import { useState } from "react";
import PlanCard from "./PlanCard";
import { APIInvest } from "../../constants/API";
import { useInvestAuth } from "../context/AuthContext";

const Invest = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { wallet, plans } = useInvestAuth();
  const [investData, setInvestData] = useState({
    planId: null,
    amount: ""
  });

  const balance = Number(wallet?.balance);

  const handleNextStep = (newData) => {
    setInvestData((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  }

  const handleInvest = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const amount = Number(investData.amount);

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
    
    try{
      const payload = {"plan_id": investData.planId, "amount": investData.amount}
      APIInvest.post("/investments/invest", payload);
      setStep(3);
    } catch (error) {
      setError(error.response.data.detail);
    }
  }

  const handleReset = () => {
    setInvestData({ planId: null, amount: "" });
    setStep(1);
  }

  const getHeader = () => {
    switch (step) {
      case 2: return { title: "Enter amount to invest", desc: "Amount should be within your wallet balance" }
      case 3: return { title: "Investment made successfully", desc: "Continue investment, your money works for you." }
      default: return { title: "Select investment plan ans start investing", desc: "Pick an investment plan of your choice" }
    }
  }

  const header = getHeader();

  return (
    <div className="w-full min-h-screen flex">
      <div className="flex flex-col gap-6 p-8 w-full max-w-7xl">

        <div className="max-w-xl w-full rounded-xl p-6 border border-amber-300/10 bg-zinc-900/30 flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold text-zinc-100">{header.title}</h1>
          <p className="text-sm text-zinc-400">{header.desc}</p>
        </div>
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto">
          {step === 1 &&
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
              {plans.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-zinc-950 border border-zinc-900 rounded-2xl text-zinc-500">
                  No active investment packages found.
                </div>
              ) : (
                plans.map((plan) => (
                  <PlanCard key={plan.id} plan={plan} onSelect={() => handleNextStep({ planId: plan.id })} loading={loading} />
                ))
              )}
            </div>

          }

          {step === 2 && (
            <form onSubmit={handleInvest} className="flex flex-col gap-3 max-w-md">
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
                  value={investData.amount}
                  onChange={(e) =>
                    setInvestData((prev) => ({ ...prev, amount: e.target.value }))
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
                {loading ? "Processing transaction..." : "Invest"}
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
                Make another investment, your money is working for you.
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

export default Invest