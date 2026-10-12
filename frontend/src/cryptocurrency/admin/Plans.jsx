import { ChartNoAxesCombined, Sprout, ChartNoAxesColumnIncreasing, Gem, Crown, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { APIInvest } from "../../constants/API";

// Helper function to return unique design icons based on plan name strings coming from the backend schema
const getPlanIcon = (planName) => {
  const normalized = planName?.toLowerCase() || "";

  if (normalized.includes("starter")) return <Sprout size={24} className="text-emerald-400" />;
  if (normalized.includes("standard")) return <ChartNoAxesColumnIncreasing size={24} className="text-blue-400" />;
  if (normalized.includes("premium")) return <Star size={24} className="text-amber-400" />;
  if (normalized.includes("platinum")) return <Gem size={24} className="text-purple-400" />;
  if (normalized.includes("grandmaster")) return <Crown size={24} className="text-red-400" />;

  return <ChartNoAxesCombined size={24} className="text-amber-400" />;
};

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleFetchPlans();
  }, [])

  const handleFetchPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await APIInvest.get("/plans/")
      setPlans(response.data);
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError("Could not reach the server");
      } else {
        setError("Internet connection failure");
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 md:p-8 flex flex-col w-full min-h-screen items-start bg-black text-gray-100 font-body gap-6'>

      {/* Header Section */}
      <div className='flex flex-col max-w-7xl w-full p-6 bg-zinc-950 border border-amber-400/20 rounded-2xl h-fit shadow-2xl shadow-amber-400/5'>
        <div className='flex items-center gap-4 w-full'>
          <div className='w-14 h-14 bg-amber-400/10 border border-amber-400/30 items-center flex justify-center rounded-xl text-amber-400 shrink-0'>
            <ChartNoAxesCombined size={28} />
          </div>
          <div className='flex flex-col gap-1'>
            <h2 className='text-xl font-bold text-amber-400 tracking-tight'>Investment Plans</h2>
            <p className='text-sm text-zinc-400 leading-relaxed'>Browse and manage the available investment tier structures for platform users.</p>
          </div>
        </div>
      </div>

      {/* Loading / Error States Handling */}
      {loading && (
        <div className="text-center w-full py-12 text-zinc-500 font-medium">Loading investment tiers...</div>
      )}

      {error && (
        <div className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center text-red-400 font-medium text-sm">
          {error}
        </div>
      )}

      {/* Body Grid Display Layout Section */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {plans.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-zinc-950 border border-zinc-900 rounded-2xl text-zinc-500">
              No active investment packages found. Create a new plan layout to start.
            </div>
          ) : (
            plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} loading={loading} setLoading={setLoading} setError={setError} error={error} handleFetchPlans={handleFetchPlans} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Plans;

const PlanCard = ({ plan, loading, setLoading, error, setError, handleFetchPlans}) => {
  const handleDeletePlan = async (planId) => {
    setLoading(true);
    try {
      await APIInvest.delete(`/plans/delete-plan/${planId}`);
      handleFetchPlans();
    } catch (error) {
      if (error.response?.data?.detail) {
        setError(error.response.data.detail);
      } else if (error.request) {
        setError("Could not reach the server");
      } else {
        setError("Internet connection failure");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col justify-between p-6 bg-zinc-950 border border-zinc-900 hover:border-amber-400/30 rounded-2xl shadow-xl hover:shadow-amber-400/5 transition-all duration-300 group">


      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            {getPlanIcon(plan.plan_name)}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-gray-100 group-hover:text-amber-400 transition-colors duration-200">
              {plan.plan_name}
            </h3>
            <span className="text-xs text-zinc-500 tracking-wider">ACTIVE CONTRACT</span>
          </div>
        </div>


        <div className="flex flex-col items-end">
          <span className="text-xl font-black text-amber-400">+{plan.daily_profit_percentage}%</span>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">DAILY RETURN</span>
        </div>
      </div>


      <div className="grid grid-cols-2 gap-y-4 gap-x-2 py-5 border-b border-zinc-900/60">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 font-semibold tracking-wide">Minimum Entry</span>
          <span className="text-sm font-bold text-gray-200 mt-0.5">
            ${plan.min_amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 font-semibold tracking-wide">Maximum Limit</span>
          <span className="text-sm font-bold text-gray-200 mt-0.5">
            ${plan.max_amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 font-semibold tracking-wide">Lock Duration</span>
          <span className="text-sm font-bold text-zinc-300 mt-0.5">{plan.duration} Days</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 font-semibold tracking-wide">Referral Reward</span>
          <span className="text-sm font-bold text-zinc-300 mt-0.5">{plan.referral_bonus}% Bonus</span>
        </div>
      </div>


      <div className="pt-4 flex items-center justify-between w-full">
        <span className="text-xs text-zinc-500 font-mono">Plan ID: #{plan.id}</span>
        <button type="submit" disabled={loading} onClick={() => handleDeletePlan(plan.id)} className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-red-600 hover:border-red-600 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer">
          {loading ? "deleting..." : "Delete Plan"}
        </button>
      </div>

    </div>
  )
};
