import { useInvestAuth } from "../context/AuthContext";
import PlanCard from "./PlanCard";
import Plans from "./Plans";
const Invest = () => {
  const { plans, loading } = useInvestAuth();

  return (
    <div className="w-full min-h-screen flex">
      <div className="flex flex-col gap-6 p-8 w-full max-w-7xl">
        <div className="max-w-xl w-full rounded-xl p-2 h-30 border border-amber-500/20">

        </div>
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl min-h-[400px] scroll-auto">
          <Plans />
        </div>
      </div>
    </div>
  )
}

export default Invest