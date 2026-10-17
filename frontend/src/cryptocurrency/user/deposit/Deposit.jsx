import PlanCard from "../PlanCard"
import { useInvestAuth } from "../../context/AuthContext"
import { useState } from "react";
import { APIInvest } from "../../../constants/API";

const Deposit = () => {
  const { plans } = useInvestAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // keep track of current step
  const [step, setStep] = useState(1);
  // memory retainer for all selected data
  const [depositData, setDepositData] = useState({
    planId: null,
    paymentmethod: "",
    amount: "",
  });

  const [generatedAddress, setGeneratedAddress] = useState("");

  // helper function to update data and move to next step
  const handleNextStep = (newData) => {
    setDepositData((prev) => ({ ...prev, ...newData }));
    setStep((prevStep) => prevStep + 1);
  }

  // helper function to go back to make some changes
  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  }

  const paymentMethods = {
    bitcoin: "Bitcoin",
    tron: "Tron",
    ethereum: "Ethereum",
    bnb: "BNB"
  }


  const handleMakeDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (depositData.amount < 10){
      setError("Amount is outside the plan limit");
      setLoading(false);
      return;
    }

    try {
       const plan_id = parseInt(depositData.planId);
      const payload = {
          amount: parseFloat(depositData.amount),
          payment_method: depositData.paymentmethod
        
      }
      const response = await APIInvest.post(`/deposits/make-deposit?plan_id=${plan_id}`, payload);
      setGeneratedAddress(response.data.crypto_address)
      setStep(4);
      // CRYPTO ADDRESS will be included on response
    } catch (error) {
      console.log(error.response.data.detail);
    } finally{
      setLoading(false);
    }
  }

  const getHeaderInfo = () => {
    switch (step) {
      case 2: return { title: "Select Payment Method", desc: "Choose your preferred cryptocurrency option." };
      case 3: return { title: "Enter Deposit Amount", desc: "Specify how much you want to invest in this plan." };
      case 4: return { title: "Send Payment", desc: "Transfer your funds to the secure address below." };
      default: return { title: "Make a Deposit", desc: "Select an investment plan below to fund your account and start earning returns." };
    }
  };

  const header = getHeaderInfo();


  return (
    <div className="w-full min-h-screen flex">
      <div className="flex flex-col gap-6 p-8 w-full max-w-7xl">
        <div className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
          Step {step} of 4 {step > 1 && <span className="text-zinc-600">({depositData.paymentmethod || "Plan Selected"})</span>}
        </div>

        {/* Dynamic Header Section */}
        <div className="max-w-xl w-full rounded-xl p-6 border border-amber-300/10 bg-zinc-900/30 flex flex-col gap-1.5">
          <h1 className="text-2xl font-semibold text-zinc-100">{header.title}</h1>
          <p className="text-sm text-zinc-400">{header.desc}</p>
        </div>

        {/* plans section */}
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto">
          <div>
           
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {plans.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-zinc-500">
                    No active investment plans found.
                  </div>
                ) : (
                  plans.map((plan) => (
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      onSelect={() => handleNextStep({ planId: plan.id })}
                    />
                  ))
                )}
              </div>
            )}

            {/* STEP 2: PAYMENT METHODS */}
            {step === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                {Object.entries(paymentMethods).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleNextStep({ paymentmethod: key })}
                    className="p-4 rounded-xl border border-amber-300/10 bg-zinc-950 text-left hover:border-amber-300/50 transition-all font-medium text-zinc-200"
                  >
                    🪙 {value}
                  </button>
                ))}
              </div>
            )}

            {/* STEP 3: AMOUNT INPUT */}
            {step === 3 && (
              <form onSubmit={handleMakeDeposit} className="max-w-md flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-zinc-400 font-medium">Deposit Amount ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="Enter amount (e.g. 500)"
                    value={depositData.amount}
                    onChange={(e) => setDepositData(prev => ({ ...prev, amount: e.target.value }))}
                    className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:border-amber-300 text-zinc-100"
                  />
                </div>

                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-amber-300/50 hover:bg-amber-300/80 disabled:bg-amber-300/40 font-semibold text-zinc-950 transition-colors"
                >
                  {loading ? "Processing Payment Address..." : "Confirm & Get Address"}
                </button>
              </form>
            )}

            {/* STEP 4: GENERATED INVOICE ADDRESS */}
            {step === 4 && (
              <div className="max-w-md flex flex-col gap-4 bg-zinc-950 p-6 rounded-xl border border-zinc-800">
                <div className="text-center p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-300 font-medium">
                  Send exactly <span className="underline font-bold">${depositData.amount}</span> worth of {depositData.paymentmethod}
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Deposit Address:</span>
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg font-mono text-amber-300 select-all break-all text-zinc-300">
                    {generatedAddress}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setStep(1);
                    setDepositData({ planId: null, paymentmethod: "", amount: "" });
                  }}
                  className="mt-4 text-sm text-zinc-400 hover:text-zinc-100 underline self-center"
                >
                  Start Over / make new deposit
                </button>
              </div>
            )}
          </div>

          {/* BACK NAVIGATION ACTION (Hidden on steps 1 and 4) */}
          {step > 1 && step < 4 && (
            <button
              onClick={handlePrevStep}
              className="mt-8 text-sm text-zinc-500 hover:text-zinc-300 font-medium flex items-center gap-1 transition-colors self-start"
            >
              ← Go Back
            </button>
          )}

        </div>
      </div>
    </div>
  )
}

export default Deposit